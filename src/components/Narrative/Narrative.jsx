import { useEffect, useRef } from 'react'
import './Narrative.css'

const problems = [
    {
        number: '01',
        title: "Outdated tech holding you back",
        description: "Legacy systems slow your business down. You need modern solutions that scale with your growth."
    },
    {
        number: '02',
        title: "Software that doesn't convert",
        description: "Poor UX, slow performance, broken flows—your users leave before they see the value."
    },
    {
        number: '03',
        title: "No in-house development team",
        description: "Hiring is expensive and slow. You need a trusted partner who delivers production-ready code."
    }
]

function Narrative() {
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
            { threshold: 0.1, rootMargin: '-50px' }
        )

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="process" className="narrative" ref={sectionRef}>
            <div className="container">
                {/* Section header */}
                <div className="narrative-header reveal">
                    <span className="section-label mono">The Problem</span>
                    <h2 className="narrative-title">
                        Your business deserves<br />
                        better than <span className="strike">good enough</span>
                    </h2>
                </div>

                {/* Problem cards */}
                <div className="problem-grid">
                    {problems.map((problem, index) => (
                        <div
                            className={`problem-card reveal reveal-delay-${index + 1}`}
                            key={problem.number}
                        >
                            <span className="problem-number mono">{problem.number}</span>
                            <h3 className="problem-title">{problem.title}</h3>
                            <p className="problem-desc">{problem.description}</p>
                        </div>
                    ))}
                </div>

                {/* Solution */}
                <div className="solution reveal">
                    <div className="solution-line"></div>
                    <div className="solution-content">
                        <span className="section-label mono accent">The Solution</span>
                        <h3 className="solution-title">
                            Your vision. Our expertise.<br />
                            <span className="accent">World-class digital products.</span>
                        </h3>
                        <p className="solution-desc">
                            We take your ideas and transform them through a precision-driven development process.
                            No bloat. No shortcuts. Just software that performs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Narrative
