import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomCursor from '../CustomCursor/CustomCursor'
import VideoModal from './VideoModal'
import DescriptionModal from './DescriptionModal'
import './Projects.css'

const projects = [
    {
        id: 1,
        title: 'Security Management App',
        image: '/img/app1.jpeg',
        description: `A complete security operations app designed to keep daily management fast, organized, and reliable—built for real teams doing real work.

Key Features:
• Role-based access control (RBAC) — Each staff member sees only what they're allowed to see.
• Incident reporting — Log incidents with structured details so nothing gets missed.
• Visitor management — Track visitors with time, purpose, and status updates.
• Vehicle & parking tracking — Record check-ins/outs and manage spots.
• Search & history — Quickly find past records by date, type, or keyword.
• Clean mobile workflow — Built to reduce taps and speed up actions in the field.

Tech Stack: Flutter • REST API • Secure Auth & Permission Handling`,
        link: 'https://www.instagram.com/clever.project',
        videoUrl: 'https://youtu.be/EamTnw6tv6s?si=lS-WYTXsEut2r8WT',
    },
    {
        id: 2,
        title: 'E-commerce Platform',
        image: '/img/ecom1.jpeg',
        description: `A modern e-commerce website built to look premium, load fast, and convert visitors into customers—optimized for mobile shopping.

Key Features:
• Product catalog — Organized product listing with clear visuals.
• Category structure — Clean categories to guide users to the right items.
• Cart & checkout flow — Simple steps to reduce drop-offs.
• Payment options — Supports online payments and cash-on-delivery.
• Order management — Easy admin view for orders and customer details.
• SEO foundation — Proper headings, meta setup, and structure.

Tech Stack: WordPress • WooCommerce • Elementor • SEO • Performance Optimization`,
        link: 'http://purekosma.com/',
        videoUrl: 'https://youtu.be/nfibyKEB6io?si=p0PKhsljPfbhypIv',
    },
    {
        id: 3,
        title: 'Real Estate Listing',
        image: '/img/ecom2.jpeg',
        description: `A real estate listing website designed to showcase properties beautifully and generate high-quality leads—built to be clean, fast, and SEO-ready.

Key Features:
• Property listings — Easy-to-browse listing cards with key details at a glance.
• Property detail pages — Dedicated pages for photos, pricing, and location.
• Search & filters — Find properties by category, location, and price range.
• Lead capture forms — Collect the right info so agents can respond faster.
• Call/WhatsApp actions — One-tap contact options for mobile users.
• SEO-ready structure — Built to help listings rank on search results.

Tech Stack: WordPress • Elementor • Custom Listing Pages • SEO • Speed Optimization`,
        link: 'https://www.instagram.com/clever.project',
        videoUrl: 'https://youtu.be/T5Q4KnC8VJg?si=MrSMmVMVA39cE1He',
    },
    {
        id: 4,
        title: 'Eye Wear Online Store',
        image: '/img/ecom4.jpeg',
        description: `An eyewear online store built for clarity, speed, and easy ordering—so customers can browse frames confidently and purchase without friction.

Key Features:
• Modern product layout — Clean grid and product pages that feel premium.
• Frame categories — Organize by type, brand, or style.
• Quick contact actions — WhatsApp/call buttons for quick confirmation.
• Smooth checkout — Simple ordering steps to reduce drop-offs.
• Mobile-first design — Optimized for how customers actually shop.
• SEO-friendly pages — Built to rank and bring organic buyers.

Tech Stack: WordPress • WooCommerce • Elementor • SEO • Performance Optimization`,
        link: 'https://www.instagram.com/clever.project',
        videoUrl: 'https://youtu.be/hJNWuVMgMoc?si=DvFCe6imt563VSR_',
    },
]

function RightScrollHint({ hide }) {
    if (hide) return null
    return (
        <div className="pin-scroll-hint-right">
            <span className="scroll-mouse-lg">
                <span className="scroll-wheel-lg" />
            </span>
            <span>scroll</span>
        </div>
    )
}

function ScrollMouseHint() {
    return (
        <span className="projects-scroll-hint mono">
            <span className="scroll-mouse">
                <span className="scroll-wheel" />
            </span>
            <span>scroll</span>
        </span>
    )
}

export default function Projects() {
    const rootRef = useRef(null)
    const [videoOpen, setVideoOpen] = useState(false)
    const [activeVideo, setActiveVideo] = useState(null)
    const [activeTitle, setActiveTitle] = useState('')
    const [descOpen, setDescOpen] = useState(false)
    const [descTitle, setDescTitle] = useState('')
    const [descText, setDescText] = useState('')

    const openVideo = (url, title) => {
        setActiveVideo(url)
        setActiveTitle(title || 'Video')
        setVideoOpen(true)
    }
    const closeVideo = () => { setVideoOpen(false); setActiveVideo(null); setActiveTitle('') }
    const openDesc = (title, description) => {
        setDescTitle(title || 'Details')
        setDescText(description || '')
        setDescOpen(true)
    }
    const closeDesc = () => { setDescOpen(false); setDescTitle(''); setDescText('') }

    useEffect(() => {
        let ctx, lenis, rafId, mm
        let cancelled = false

        ;(async () => {
            const gsapMod = await import('gsap')
            const stMod = await import('gsap/ScrollTrigger')
            const LenisMod = await import('lenis')

            if (cancelled) return

            const gsap = gsapMod.default
            const ScrollTrigger = stMod.ScrollTrigger
            const Lenis = LenisMod.default

            gsap.registerPlugin(ScrollTrigger)

            // Clear any leftover triggers from StrictMode double-mount
            ScrollTrigger.getAll().forEach((t) => t.kill())

            ctx = gsap.context(() => {
                mm = gsap.matchMedia()

                // Desktop: pin + lenis + animation (same as clever-project-main)
                mm.add('(min-width: 1024px)', () => {
                    lenis = new Lenis({ lerp: 0.08, smoothWheel: true, smoothTouch: false })
                    lenis.on('scroll', ScrollTrigger.update)
                    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
                    rafId = requestAnimationFrame(raf)

                    const pinCards = gsap.utils.toArray('.pin-card')
                    pinCards.forEach((card, index) => {
                        gsap.set(card, { zIndex: pinCards.length - index })

                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top top',
                            end: '+=100%',
                            pin: true,
                            pinSpacing: true,
                            anticipatePin: 1,
                        })

                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top top',
                            end: '+=100%',
                            scrub: true,
                            onUpdate: (self) => {
                                const p = self.progress
                                gsap.set(card, {
                                    scale: 1 - p * 0.08,
                                    rotation: index % 2 === 0 ? p * 2.5 : -p * 2.5,
                                    rotationX: index % 2 === 0 ? p * 14 : -p * 14,
                                    transformOrigin: 'center top',
                                })
                                const overlay = card.querySelector('.pin-overlay')
                                if (overlay) gsap.set(overlay, { opacity: p * 0.12 })
                            },
                        })
                    })

                    setTimeout(() => ScrollTrigger.refresh(), 80)
                    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
                })

                // Mobile/tablet: animation only, no pin (same as clever-project-main)
                mm.add('(max-width: 1023px)', () => {
                    const cards = gsap.utils.toArray('.pin-card')
                    cards.forEach((card, index) => {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            scrub: true,
                            onUpdate: (self) => {
                                const p = self.progress
                                gsap.set(card, {
                                    scale: 1 - p * 0.04,
                                    rotation: index % 2 === 0 ? p * 1.2 : -p * 1.2,
                                    rotationX: index % 2 === 0 ? p * 6 : -p * 6,
                                    transformOrigin: 'center top',
                                })
                                const overlay = card.querySelector('.pin-overlay')
                                if (overlay) gsap.set(overlay, { opacity: p * 0.1 })
                            },
                        })
                    })

                    setTimeout(() => ScrollTrigger.refresh(), 40)
                    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
                })
            }, rootRef)
        })()

        return () => {
            cancelled = true
            try {
                if (rafId) cancelAnimationFrame(rafId)
                if (lenis) lenis.destroy()
                if (mm) mm.revert()
                if (ctx) ctx.revert()
            } catch {}
        }
    }, [])

    return (
        <div ref={rootRef} className="projects-page">
            <CustomCursor />
            <VideoModal open={videoOpen} onClose={closeVideo} videoUrl={activeVideo} title={activeTitle} />
            <DescriptionModal open={descOpen} onClose={closeDesc} title={descTitle} description={descText} />

            {/* Back nav */}
            <nav className="projects-nav">
                <Link to="/" className="projects-back-link mono">
                    <i className="ri-arrow-left-line"></i> Back
                </Link>
            </nav>

            {/* Intro (dark) */}
            <section className="projects-intro">
                <h1 className="projects-intro-title">Best Projects To Try.</h1>
                <p className="projects-intro-text">Here are a few of the most memorable builds we've shipped.</p>
                <div className="projects-scroll-down">
                    <span className="scroll-down-mouse">
                        <span className="scroll-down-wheel" />
                    </span>
                    <span className="mono">Scroll</span>
                </div>
            </section>

            {/* Cards (light - same as clever-project-main) */}
            {projects.map((item, idx) => (
                <section key={item.id} className="pin-card">
                    <RightScrollHint hide={idx === projects.length - 1} />
                    <div className="pin-overlay" />
                    <div className="pin-card-inner">
                        {/* Number */}
                        <span className="pin-card-number">({String(idx + 1).padStart(2, '0')})</span>

                        {/* Content */}
                        <div className="pin-card-content">
                            <h2 className="pin-card-title">{item.title}</h2>

                            {/* Image */}
                            <div className="pin-card-image">
                                <img src={item.image} alt={item.title} loading="lazy" />
                            </div>

                            {/* Description + Read more */}
                            <div className="pin-card-desc">
                                <p className="pin-card-desc-text">{item.description}</p>
                                <div className="pin-card-readmore">
                                    <button onClick={() => openDesc(item.title, item.description)}>Read more</button>
                                    <ScrollMouseHint />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="pin-card-actions">
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="pin-btn pin-btn-primary">
                                        View Project
                                    </a>
                                )}
                                {item.videoUrl && (
                                    <button onClick={() => openVideo(item.videoUrl, item.title)} className="pin-btn pin-btn-outline">
                                        Watch Video
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Outro (dark) */}
            <section className="projects-outro">
                <h2 className="projects-outro-title">Let's Build Yours.</h2>
                <p className="projects-outro-text">Want a project like this? We can design + develop it.</p>
                <Link to="/" className="pin-btn pin-btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
                    Get in Touch
                </Link>
            </section>
        </div>
    )
}
