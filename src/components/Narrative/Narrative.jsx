import { useEffect, useRef } from 'react'
import './Narrative.css'

const problems = [
    {
        number: '01',
        title: "Hours lost to editing",
        description: "Time you could spend creating, building your brand, or actually living your life."
    },
    {
        number: '02',
        title: "Videos that don't feel 'premium'",
        description: "The pacing's off. Sound is muddy. Something's missing—and viewers notice."
    },
    {
        number: '03',
        title: "Retention drops at 30 seconds",
        description: "The hook isn't hooking. You're losing viewers before the value hits."
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
                        Your content deserves<br />
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
                            Raw input. Proven process.<br />
                            <span className="accent">High-impact output.</span>
                        </h3>
                        <p className="solution-desc">
                            We take your footage and transform it through a precision-driven workflow.
                            No gimmicks. No over-editing. Just content that performs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Narrative
