import { useEffect, useRef } from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'

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
                        <img src={logo} alt="AGENXY.MEDIA" className="footer-logo" />
                        <p className="footer-tagline">Visual Transformation Studio</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-col">
                            <span className="footer-col-title mono">Navigation</span>
                            <a href="#work">Work</a>
                            <a href="#process">Process</a>
                            <a href="#capabilities">Capabilities</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="footer-col">
                            <span className="footer-col-title mono">Connect</span>
                            <a href="https://www.instagram.com/agenxy.media" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="mailto:aryanjohnsharma@gmail.com">Email</a>
                            <a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer">Fiverr</a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom reveal reveal-delay-1">
                    <div className="footer-copy mono">
                        © 2024 AGENXY.MEDIA
                    </div>
                    <div className="footer-location mono">
                        <i className="ri-map-pin-line"></i>
                        Dhanbad, India
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
