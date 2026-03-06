import { useEffect, useRef } from 'react'
import './Footer.css'
import logo from '../../assets/logo-white.svg'

function Footer() {
    const footerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.2 }
        )

        const elements = footerRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <footer className="footer" ref={footerRef}>
            <div className="container">
                {/* Main footer content */}
                <div className="footer-main reveal">
                    <div className="footer-brand">
                        <div className="footer-logo-group">
                            <img src={logo} alt="Clever Project" className="footer-logo" />
                            <span className="footer-logo-text">
                                <span className="footer-logo-top">CLEVER</span>
                                <span className="footer-logo-bottom">PROJECT</span>
                            </span>
                        </div>
                        <p className="footer-tagline">Software Development Studio</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-col">
                            <span className="footer-col-title mono">Navigation</span>
                            <a href="/#work">Work</a>
                            <a href="/#process">Process</a>
                            <a href="/#capabilities">Capabilities</a>
                            <a href="/#contact">Contact</a>
                        </div>
                        <div className="footer-col">
                            <span className="footer-col-title mono">Connect</span>
                            <a href="https://www.facebook.com/cleverprojects" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://www.instagram.com/clever.project" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="http://www.youtube.com/@Clever.Project" target="_blank" rel="noopener noreferrer">YouTube</a>
                            <a href="https://www.linkedin.com/company/cleverprojects/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://www.tiktok.com/@cleverproject" target="_blank" rel="noopener noreferrer">TikTok</a>
                            <a href="https://wa.me/94704057137" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            <a href="tel:+94704057137">+94 70 405 7137</a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom reveal reveal-delay-1">
                    <div className="footer-copy mono">
                        © 2026 Clever Project | Designed by Clever Project
                    </div>
                    <div className="footer-location mono">
                        <i className="ri-map-pin-line"></i>
                        Sri Lanka
                    </div>
                    <div className="footer-status">
                        <span className="status-dot"></span>
                        <span className="mono">Available for projects</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
