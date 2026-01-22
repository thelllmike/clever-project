import { useEffect, useRef } from 'react'
import './Hero.css'
import Button from '../Button/Button'

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
                        <span className="mono">Visual Transformation Studio</span>
                    </div>

                    {/* Main title */}
                    <h1 className="hero-title">
                        <span className="title-line">
                            <span className="title-word">RAW</span>
                            <span className="title-arrow">→</span>
                            <span className="title-word accent">REFINED</span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle">
                        We don't polish videos. We transform them into
                        <span className="highlight"> high-impact content</span> that performs.
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
                        <span className="trust-label mono">Trusted Tools</span>
                        <div className="trust-logos">
                            <span className="trust-logo">Premiere Pro</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">After Effects</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">DaVinci Resolve</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Photoshop</span>
                        </div>
                    </div>
                </div>

                {/* Stats strip */}
                <div className="hero-stats">
                    <div className="stat">
                        <span className="stat-number">1M+</span>
                        <span className="stat-label mono">Views Generated</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">50+</span>
                        <span className="stat-label mono">Projects Delivered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">∞</span>
                        <span className="stat-label mono">Revisions Included</span>
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
