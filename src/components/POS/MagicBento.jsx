import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import './MagicBento.css'

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = '124, 58, 237'
const MOBILE_BREAKPOINT = 768

const createParticleElement = (x, y, color) => {
    const el = document.createElement('div')
    el.className = 'particle'
    el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);pointer-events:none;z-index:100;left:${x}px;top:${y}px;`
    return el
}

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--glow-x', `${((mouseX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--glow-y', `${((mouseY - rect.top) / rect.height) * 100}%`)
    card.style.setProperty('--glow-intensity', glow.toString())
    card.style.setProperty('--glow-radius', `${radius}px`)
}

const ParticleCard = ({ children, className = '', disableAnimations = false, style, particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR, clickEffect = false }) => {
    const cardRef = useRef(null)
    const particlesRef = useRef([])
    const timeoutsRef = useRef([])
    const isHoveredRef = useRef(false)
    const memoizedParticles = useRef([])
    const particlesInitialized = useRef(false)

    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return
        const { width, height } = cardRef.current.getBoundingClientRect()
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, glowColor)
        )
        particlesInitialized.current = true
    }, [particleCount, glowColor])

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
        particlesRef.current.forEach(p => {
            gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) })
        })
        particlesRef.current = []
    }, [])

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return
        if (!particlesInitialized.current) initializeParticles()
        memoizedParticles.current.forEach((particle, index) => {
            const tid = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return
                const clone = particle.cloneNode(true)
                cardRef.current.appendChild(clone)
                particlesRef.current.push(clone)
                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
                gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true })
                gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true })
            }, index * 100)
            timeoutsRef.current.push(tid)
        })
    }, [initializeParticles])

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return
        const el = cardRef.current
        const onEnter = () => { isHoveredRef.current = true; animateParticles() }
        const onLeave = () => { isHoveredRef.current = false; clearAllParticles() }
        const onClick = (e) => {
            if (!clickEffect) return
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left, y = e.clientY - rect.top
            const maxDist = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height))
            const ripple = document.createElement('div')
            ripple.style.cssText = `position:absolute;width:${maxDist * 2}px;height:${maxDist * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x - maxDist}px;top:${y - maxDist}px;pointer-events:none;z-index:1000;`
            el.appendChild(ripple)
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() })
        }
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        el.addEventListener('click', onClick)
        return () => { isHoveredRef.current = false; el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); el.removeEventListener('click', onClick); clearAllParticles() }
    }, [animateParticles, clearAllParticles, disableAnimations, clickEffect, glowColor])

    return (
        <div ref={cardRef} className={`${className} particle-container`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
            {children}
        </div>
    )
}

const GlobalSpotlight = ({ gridRef, disableAnimations, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
    const spotlightRef = useRef(null)

    useEffect(() => {
        if (disableAnimations || !gridRef?.current) return
        const spotlight = document.createElement('div')
        spotlight.className = 'global-spotlight'
        spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15) 0%,rgba(${glowColor},0.08) 15%,rgba(${glowColor},0.04) 25%,rgba(${glowColor},0.02) 40%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`
        document.body.appendChild(spotlight)
        spotlightRef.current = spotlight

        const proximity = spotlightRadius * 0.5
        const fadeDistance = spotlightRadius * 0.75

        const onMove = (e) => {
            if (!spotlightRef.current || !gridRef.current) return
            const section = gridRef.current.closest('.bento-section')
            const rect = section?.getBoundingClientRect()
            const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
            const cards = gridRef.current.querySelectorAll('.magic-bento-card')
            if (!inside) {
                gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 })
                cards.forEach(c => c.style.setProperty('--glow-intensity', '0'))
                return
            }
            let minDist = Infinity
            cards.forEach(card => {
                const cr = card.getBoundingClientRect()
                const dist = Math.max(0, Math.hypot(e.clientX - (cr.left + cr.width / 2), e.clientY - (cr.top + cr.height / 2)) - Math.max(cr.width, cr.height) / 2)
                minDist = Math.min(minDist, dist)
                const glow = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0
                updateCardGlowProperties(card, e.clientX, e.clientY, glow, spotlightRadius)
            })
            gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 })
            const opacity = minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0
            gsap.to(spotlightRef.current, { opacity, duration: opacity > 0 ? 0.2 : 0.5 })
        }

        const onLeave = () => {
            gridRef.current?.querySelectorAll('.magic-bento-card').forEach(c => c.style.setProperty('--glow-intensity', '0'))
            if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 })
        }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', onLeave)
        return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseleave', onLeave); spotlightRef.current?.remove() }
    }, [gridRef, disableAnimations, spotlightRadius, glowColor])

    return null
}

export default function MagicBento({ cards = [], glowColor = DEFAULT_GLOW_COLOR, particleCount = DEFAULT_PARTICLE_COUNT, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) {
    const gridRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <>
            <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} spotlightRadius={spotlightRadius} glowColor={glowColor} />
            <div className="card-grid bento-section" ref={gridRef}>
                {cards.map((card, i) => (
                    <ParticleCard
                        key={i}
                        className="magic-bento-card magic-bento-card--border-glow"
                        style={{ '--glow-color': glowColor }}
                        disableAnimations={isMobile}
                        particleCount={particleCount}
                        glowColor={glowColor}
                        clickEffect
                    >
                        <div className="magic-bento-card__header">
                            <div className="magic-bento-card__icon"><i className={card.icon}></i></div>
                        </div>
                        <div className="magic-bento-card__content">
                            <h3 className="magic-bento-card__title">{card.title}</h3>
                            <p className="magic-bento-card__description">{card.description}</p>
                        </div>
                    </ParticleCard>
                ))}
            </div>
        </>
    )
}
