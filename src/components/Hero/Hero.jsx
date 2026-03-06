import { useEffect, useRef } from 'react'
import './Hero.css'
import Button from '../Button/Button'
import CountUp from '../CountUp'

function Hero() {
    const heroRef = useRef(null)

    useEffect(() => {
        const hero = heroRef.current
        if (!hero) return

        const handleMouseMove = (e) => {
            const rect = hero.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            hero.style.setProperty('--mouse-x', `${x}%`)
            hero.style.setProperty('--mouse-y', `${y}%`)
        }

        hero.addEventListener('mousemove', handleMouseMove)
        return () => hero.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-spotlight"></div>

            <div className="container">
                <div className="hero-content">
                    {/* Eyebrow */}
                    <div className="hero-eyebrow">
                        <span className="eyebrow-line"></span>
                        <span className="mono">Software Development Studio</span>
                    </div>

                    {/* Main title */}
                    <h1 className="hero-title">
                        <span className="title-line">
                            <span className="title-word">IDEA</span>
                            <span className="title-arrow">→</span>
                            <span className="title-word accent">PRODUCT</span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle">
                        We don't just write code. We build
                        <span className="highlight"> scalable digital solutions</span> that deliver results.
                    </p>

                    {/* CTA Group */}
                    <div className="hero-cta">
                        <Button href="#work" variant="primary" magnetic>
                            View Work <i className="ri-arrow-right-line"></i>
                        </Button>
                        <Button href="#contact" variant="ghost">
                            Start a Project
                        </Button>
                    </div>

                    {/* Trust bar */}
                    <div className="hero-trust">
                        <span className="trust-label mono">Tech Stack</span>
                        <div className="trust-logos">
                            <span className="trust-logo">React & Next.js</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Node.js</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">AI & Blockchain</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Three.js</span>
                        </div>
                    </div>
                </div>

                {/* Stats strip */}
                <div className="hero-stats">
                    <div className="stat">
                        <span className="stat-number"><CountUp from={0} to={180} duration={2} className="count-up-text" />+</span>
                        <span className="stat-label mono">Projects Delivered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number"><CountUp from={0} to={110} duration={2} className="count-up-text" />+</span>
                        <span className="stat-label mono">Happy Clients</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label mono">Support Available</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <span className="mono">Scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}

export default Hero
