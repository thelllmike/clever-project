import { useEffect, useRef } from 'react'
import './Capabilities.css'
import CurvedLoop from '../CurvedLoop'

const capabilities = [
    {
        icon: 'ri-code-s-slash-line',
        title: 'Web Development',
        description: 'React, Next.js & Node.js. Pixel-perfect, high-performance web applications.',
        featured: true
    },
    {
        icon: 'ri-brain-line',
        title: 'AI Solutions',
        description: 'Machine learning, computer vision, and intelligent automation for your business.'
    },
    {
        icon: 'ri-links-line',
        title: 'Blockchain',
        description: 'Smart contracts, DApps, and Web3 solutions built on Solidity.'
    },
    {
        icon: 'ri-smartphone-line',
        title: 'Mobile Apps',
        description: 'Cross-platform mobile applications with Flutter and React Native.'
    },
    {
        icon: 'ri-box-3-line',
        title: '3D & Interactive',
        description: 'Three.js and WebGL experiences that captivate and engage users.'
    },
    {
        icon: 'ri-cloud-line',
        title: 'Cloud & DevOps',
        description: 'AWS deployment, Docker containers, and CI/CD pipelines for scale.'
    }
]

const tools = ['REACT', 'NEXT.JS', 'NODE.JS', 'THREE.JS', 'PYTHON', 'SOLIDITY', 'AWS', 'DOCKER']

function Capabilities() {
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
        <section id="capabilities" className="capabilities" ref={sectionRef}>
            <div className="container">
                <div className="capabilities-header reveal">
                    <span className="section-label mono">Capabilities</span>
                    <h2 className="capabilities-title">
                        What we<br />
                        <span className="accent">bring to the table</span>
                    </h2>
                </div>

                <div className="cap-grid">
                    {capabilities.map((cap, index) => (
                        <div
                            className={`cap-card ${cap.featured ? 'featured' : ''} reveal reveal-delay-${(index % 3) + 1}`}
                            key={index}
                        >
                            <div className="cap-icon">
                                <i className={cap.icon}></i>
                            </div>
                            <h3 className="cap-title">{cap.title}</h3>
                            <p className="cap-desc">{cap.description}</p>
                        </div>
                    ))}
                </div>

                {/* Tool curved loop */}
                <div className="reveal">
                    <CurvedLoop
                        marqueeText={tools.join(' ✦ ') + ' ✦ '}
                        speed={2}
                        curveAmount={80}
                        direction="left"
                        interactive
                        className="capabilities-loop-text"
                    />
                </div>
            </div>
        </section>
    )
}

export default Capabilities
