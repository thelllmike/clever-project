import { useEffect, useRef } from 'react'
import './Work.css'
import Button from '../Button/Button'

const workItems = [
    {
        index: '01',
        title: 'SECURITY MANAGEMENT APP',
        category: 'Mobile App',
        metric: 'Full-Stack',
        href: 'https://www.instagram.com/clever.project',
        description: 'Complete security operations app for daily management and team coordination'
    },
    {
        index: '02',
        title: 'E-COMMERCE PLATFORM',
        category: 'Web Application',
        metric: 'React & Node.js',
        href: 'https://www.instagram.com/clever.project',
        description: 'Scalable online store with payment integration and inventory management'
    },
    {
        index: '03',
        title: 'AI-POWERED ANALYTICS',
        category: 'AI Solution',
        metric: 'Machine Learning',
        href: 'https://www.instagram.com/clever.project',
        description: 'Intelligent data analytics platform with predictive insights'
    },
    {
        index: '04',
        title: 'BLOCKCHAIN DAPP',
        category: 'Web3',
        metric: 'Solidity & React',
        href: 'https://www.instagram.com/clever.project',
        description: 'Decentralized application with smart contracts and token integration'
    }
]

function Work() {
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
        <section id="work" className="work" ref={sectionRef}>
            <div className="container">
                <div className="work-header reveal">
                    <div className="work-header-left">
                        <span className="section-label mono">Selected Work</span>
                        <h2 className="work-title">
                            Projects<br />
                            <span className="text-muted">that deliver</span>
                        </h2>
                    </div>
                    <Button
                        href="https://www.cleverproject.lk"
                        target="_blank"
                    >
                        All Projects <i className="ri-external-link-line"></i>
                    </Button>
                </div>

                <div className="work-grid">
                    {workItems.map((item, idx) => (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`work-item reveal reveal-delay-${idx + 1}`}
                            key={item.index}
                        >
                            <div className="work-item-header">
                                <span className="work-index mono">{item.index}</span>
                                <div className="work-meta">
                                    <span className="work-category">{item.category}</span>
                                    <span className="work-metric mono">{item.metric}</span>
                                </div>
                            </div>
                            <h3 className="work-item-title">{item.title}</h3>
                            <p className="work-item-desc">{item.description}</p>
                            <div className="work-item-arrow">
                                <i className="ri-arrow-right-up-line"></i>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Work
