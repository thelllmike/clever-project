import { useEffect, useRef } from 'react'
import './CTA.css'
import Button from '../Button/Button'

function CTA() {
    const sectionRef = useRef(null)

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

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="contact" className="cta" ref={sectionRef}>
            <div className="cta-grid-bg"></div>
            <div className="container">
                <div className="cta-content reveal">
                    <span className="section-label mono">Ready to build?</span>
                    <h2 className="cta-title">
                        Let's talk solutions.<br />
                        <span className="text-muted">Not just ideas.</span>
                    </h2>
                </div>

                <div className="cta-form reveal reveal-delay-1">
                    <div className="form-actions">
                        <Button href="https://wa.me/94704057137" target="_blank" rel="noopener noreferrer" variant="primary">
                            Start Conversation <i className="ri-arrow-right-line"></i>
                        </Button>
                        <span className="form-note mono">
                            or email directly: <a href="mailto:info@cleverproject.lk">info@cleverproject.lk</a>
                        </span>
                    </div>
                </div>

                {/* Quick links */}
                <div className="cta-links reveal reveal-delay-2">
                    <a href="https://www.instagram.com/clever.project" target="_blank" rel="noopener noreferrer" className="cta-link">
                        <i className="ri-instagram-line"></i>
                        <span>Instagram</span>
                    </a>
                    <a href="https://www.facebook.com/cleverprojects" target="_blank" rel="noopener noreferrer" className="cta-link">
                        <i className="ri-facebook-line"></i>
                        <span>Facebook</span>
                    </a>
                    <a href="https://www.linkedin.com/company/cleverprojects/" target="_blank" rel="noopener noreferrer" className="cta-link">
                        <i className="ri-linkedin-line"></i>
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://wa.me/94704057137" target="_blank" rel="noopener noreferrer" className="cta-link">
                        <i className="ri-whatsapp-line"></i>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CTA
