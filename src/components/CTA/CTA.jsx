import { useEffect, useRef, useState } from 'react'
import './CTA.css'
import Button from '../Button/Button'

function CTA() {
    const sectionRef = useRef(null)
    const [formData, setFormData] = useState({ email: '', projectType: '' })

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

    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = `mailto:aryanjohnsharma@gmail.com?subject=Project Inquiry: ${formData.projectType || 'General'}&body=Email: ${formData.email}`
    }

    return (
        <section id="contact" className="cta" ref={sectionRef}>
            <div className="cta-grid-bg"></div>
            <div className="container">
                <div className="cta-content reveal">
                    <span className="section-label mono">Ready to transform?</span>
                    <h2 className="cta-title">
                        Let's talk craft.<br />
                        <span className="text-muted">Not pitch decks.</span>
                    </h2>
                </div>

                <form className="cta-form reveal reveal-delay-1" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label mono">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label mono">Project Type</label>
                            <select
                                value={formData.projectType}
                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="Short-form Content">Short-form Content</option>
                                <option value="Long-form Editing">Long-form Editing</option>
                                <option value="Motion Graphics">Motion Graphics</option>
                                <option value="AI Enhancement">AI Enhancement</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button type="submit" variant="primary">
                            Start Conversation <i className="ri-arrow-right-line"></i>
                        </Button>
                        <span className="form-note mono">
                            or email directly: <a href="mailto:aryanjohnsharma@gmail.com">aryanjohnsharma@gmail.com</a>
                        </span>
                    </div>
                </form>

                {/* Quick links */}
                <div className="cta-links reveal reveal-delay-2">
                    <a href="https://www.instagram.com/agenxy.media" target="_blank" rel="noopener noreferrer" className="cta-link">
                        <i className="ri-instagram-line"></i>
                        <span>Instagram</span>
                    </a>
                    <a href="https://drive.google.com/drive/folders/1RJ9J3ZQAHWlyDXyg43mF1DDZFYRB2HfD" target="_blank" rel="noopener noreferrer" className="cta-link">
                        <i className="ri-folder-line"></i>
                        <span>Portfolio</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CTA
