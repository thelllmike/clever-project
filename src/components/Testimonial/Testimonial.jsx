import { useEffect, useRef } from 'react'
import './Testimonial.css'
import CountUp from '../CountUp'

function Testimonial() {
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
        <section className="testimonial" ref={sectionRef}>
            <div className="container">
                <div className="testimonial-content">
                    {/* Quote mark */}
                    <div className="quote-mark reveal">"</div>

                    {/* Quote */}
                    <blockquote className="testimonial-quote reveal reveal-delay-1">
                        The app doesn't just work—it <em>performs</em> flawlessly.
                        Clever Project turned our concept into a production-ready product
                        faster than we imagined.
                    </blockquote>

                    {/* Author */}
                    <div className="testimonial-author reveal reveal-delay-2">
                        <div className="author-avatar">
                            <i className="ri-user-3-line"></i>
                        </div>
                        <div className="author-info">
                            <span className="author-name">Startup Founder</span>
                            <span className="author-title mono">SaaS • E-Commerce Platform</span>
                        </div>
                    </div>

                    {/* Metrics bar */}
                    <div className="metrics-bar reveal reveal-delay-3">
                        <div className="metric-item">
                            <span className="metric-value"><CountUp from={0} to={4.9} duration={2} className="count-up-text" /></span>
                            <span className="metric-label mono">Avg. Rating</span>
                        </div>
                        <div className="metric-divider"></div>
                        <div className="metric-item">
                            <span className="metric-value"><CountUp from={0} to={24} duration={1.5} className="count-up-text" />h</span>
                            <span className="metric-label mono">Avg. Turnaround</span>
                        </div>
                        <div className="metric-divider"></div>
                        <div className="metric-item">
                            <span className="metric-value"><CountUp from={0} to={100} duration={2} className="count-up-text" />%</span>
                            <span className="metric-label mono">Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial
