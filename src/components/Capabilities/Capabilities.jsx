import { useEffect, useRef } from 'react'
import './Capabilities.css'
import CurvedLoop from '../CurvedLoop'

const capabilities = [
    {
        icon: 'ri-film-line',
        title: 'Precision Editing',
        description: 'Premiere Pro & DaVinci Resolve. Narrative pacing that keeps viewers watching.',
        featured: true
    },
    {
        icon: 'ri-magic-line',
        title: 'Motion & VFX',
        description: 'After Effects mastery. Custom graphics that elevate production value.'
    },
    {
        icon: 'ri-smartphone-line',
        title: 'Short-Form',
        description: 'Reels, TikToks, Shorts. Hook-driven with retention-optimized pacing.'
    },
    {
        icon: 'ri-brain-line',
        title: 'AI Enhancement',
        description: 'Upscaling, noise reduction, intelligent compression. Modern tools.'
    },
    {
        icon: 'ri-sound-module-line',
        title: 'Sound Design',
        description: 'Audio is half the experience. We mix soundscapes that hit.'
    },
    {
        icon: 'ri-image-line',
        title: 'Thumbnails',
        description: 'Click-worthy thumbnails designed for CTR. Photoshop-crafted.'
    }
]

const tools = ['PREMIERE PRO', 'AFTER EFFECTS', 'DAVINCI RESOLVE', 'PHOTOSHOP', 'TOPAZ AI', 'CAPCUT']

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
