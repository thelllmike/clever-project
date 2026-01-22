import { useEffect, useRef } from 'react'
import './Testimonial.css'

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
                        The edit doesn't just look better—it <em>performs</em> better.
                        My videos went from 'fine' to genuinely scroll-stopping.
                        That's rare.
                    </blockquote>

                    {/* Author */}
                    <div className="testimonial-author reveal reveal-delay-2">
                        <div className="author-avatar">
                            <i className="ri-user-3-line"></i>
                        </div>
                        <div className="author-info">
                            <span className="author-name">Creator Client</span>
                            <span className="author-title mono">YouTube • 100K+ Subscribers</span>
                        </div>
                    </div>

                    {/* Metrics bar */}
                    <div className="metrics-bar reveal reveal-delay-3">
                        <div className="metric-item">
                            <span className="metric-value">4.9</span>
                            <span className="metric-label mono">Avg. Rating</span>
                        </div>
                        <div className="metric-divider"></div>
                        <div className="metric-item">
                            <span className="metric-value">24h</span>
                            <span className="metric-label mono">Avg. Turnaround</span>
                        </div>
                        <div className="metric-divider"></div>
                        <div className="metric-item">
                            <span className="metric-value">100%</span>
                            <span className="metric-label mono">Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial
