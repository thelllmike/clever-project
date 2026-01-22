import { useEffect, useRef } from 'react'
import './Work.css'
import Button from '../Button/Button'

const workItems = [
    {
        index: '01',
        title: 'FROZT MUZIC',
        category: 'Music Visuals',
        metric: '1M+ Reach',
        href: 'https://www.instagram.com/froztmuzic',
        description: 'Music visualization and rhythm-driven edits'
    },
    {
        index: '02',
        title: 'AGENXY CLIENTS BEFORE AND AFTER',
        category: 'Agency Work',
        metric: 'Brand Content',
        href: 'https://www.instagram.com/agenxy.media',
        description: 'Professional client content and campaigns'
    },
    {
        index: '03',
        title: 'AI-RAW VIDS TO EDITED VIDS',
        category: 'AI Enhancement',
        metric: 'HeyGen Post-Production',
        href: 'https://www.instagram.com/ai.with.100',
        description: 'Raw AI videos transformed into polished reels'
    },
    {
        index: '04',
        title: 'B_MAHIR22',
        category: 'Short Form',
        metric: 'Viral Reels',
        href: 'https://www.instagram.com/b_mahir22',
        description: 'Hook-driven content with retention optimization'
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
                            Transformations<br />
                            <span className="text-muted">that perform</span>
                        </h2>
                    </div>
                    <Button
                        href="https://drive.google.com/drive/folders/1RJ9J3ZQAHWlyDXyg43mF1DDZFYRB2HfD"
                        target="_blank"
                    >
                        Full Portfolio <i className="ri-external-link-line"></i>
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
