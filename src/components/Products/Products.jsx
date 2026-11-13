import { useEffect, useRef } from 'react'
import './Products.css'

const flagship = {
    name: 'AmigoTap',
    url: 'https://amigotap.com/',
    tagline: 'Tap. Scan. Connect.',
    description:
        'Smart NFC business cards, QR display stands and a QR order menu system for restaurants. Made in Sri Lanka, shipped across the island and worldwide.',
    platforms: [
        { icon: 'ri-global-line', label: 'AmigoTap Web' },
        { icon: 'ri-smartphone-line', label: 'AmigoTap Mobile App' }
    ],
    points: [
        'AmigoTap NFC business card',
        'AmigoStand QR display',
        'QR order menu system for restaurants'
    ]
}

const products = [
    {
        icon: 'ri-store-2-line',
        name: 'Mobile POS',
        category: 'Point of Sale',
        description:
            'A billing app for Sri Lankan grocery shops, cafés and salons. Run your till from the Android phone in your pocket.',
        features: ['Bills & Sinhala receipts', 'Stock tracking', 'Customer credit'],
        href: 'https://mobile-apo-web.vercel.app/'
    },
    {
        icon: 'ri-wallet-3-line',
        name: 'Petty Cash',
        category: 'Finance',
        description:
            'The pocket cash book for small businesses. Track income and expenses and see your profit, all from your phone.',
        features: ['Income & expense tracking', 'Branded invoices & quotations', 'Receipts & profit view'],
        href: 'https://seettuweb.vercel.app/'
    },
    {
        icon: 'ri-tools-line',
        name: 'FixIt',
        category: 'Home Services',
        description:
            'Skilled workers on your doorstep across Sri Lanka. Book an electrician, plumber, cleaner or carpenter in a few taps.',
        features: ['Book trusted workers', 'Price agreed before work starts', 'Pay by cash, card or wallet'],
        href: 'https://fixitweb-psi.vercel.app/'
    },
    {
        icon: 'ri-refresh-line',
        name: 'Seettu Circle',
        category: 'Group Savings',
        description:
            'The app for running a seettu group. One shared record, so everyone in the circle sees the same thing.',
        features: ['Every payment on record', 'Payouts tracked', 'Clear turn order'],
        href: 'https://fixitweb-7w8f.vercel.app/'
    }
]

function Products() {
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
        <section id="products" className="products" ref={sectionRef}>
            <div className="container">
                <div className="products-header reveal">
                    <div className="products-header-left">
                        <span className="section-label mono">Our Products</span>
                        <h2 className="products-title">
                            Software we<br />
                            <span className="accent">build and run</span>
                        </h2>
                    </div>
                    <p className="products-intro">
                        Alongside client work, we ship our own apps. Each one is ready to use today
                        and can be tailored to how your business works.
                    </p>
                </div>

                {/* Flagship */}
                <article className="product-flagship reveal">
                    <div className="product-flagship-body">
                        <span className="product-badge mono">
                            <span className="product-badge-dot"></span>
                            Flagship
                        </span>
                        <h3 className="product-flagship-name">{flagship.name}</h3>
                        <p className="product-flagship-tagline">{flagship.tagline}</p>
                        <p className="product-flagship-desc">{flagship.description}</p>

                        <div className="product-platforms">
                            {flagship.platforms.map(p => (
                                <span className="product-platform" key={p.label}>
                                    <i className={p.icon}></i>
                                    {p.label}
                                </span>
                            ))}
                        </div>

                        <a
                            href={flagship.url}
                            target="_blank"
                            rel="noopener"
                            className="btn btn-primary product-flagship-cta"
                        >
                            Visit amigotap.com <i className="ri-arrow-right-up-line"></i>
                        </a>
                    </div>

                    <div className="product-flagship-side">
                        <div className="product-flagship-mark" aria-hidden="true">
                            <i className="ri-smartphone-line"></i>
                        </div>
                        <ul className="product-flagship-points">
                            {flagship.points.map(point => (
                                <li key={point}>
                                    <i className="ri-check-line"></i>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>

                {/* Other products */}
                <div className="products-grid">
                    {products.map((product, idx) => {
                        const inner = (
                            <>
                                <div className="product-card-top">
                                    <div className="product-card-icon">
                                        <i className={product.icon}></i>
                                    </div>
                                    <span className="product-card-category mono">{product.category}</span>
                                </div>
                                <h3 className="product-card-name">{product.name}</h3>
                                <p className="product-card-desc">{product.description}</p>
                                <ul className="product-card-features">
                                    {product.features.map(f => (
                                        <li key={f}>
                                            <i className="ri-check-line"></i>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <span className="product-card-cta">
                                    Visit website <i className="ri-arrow-right-up-line"></i>
                                </span>
                            </>
                        )
                        const className = `product-card reveal reveal-delay-${(idx % 2) + 1}`
                        return (
                            <a
                                href={product.href}
                                target="_blank"
                                rel="noopener"
                                className={className}
                                key={product.name}
                            >
                                {inner}
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Products
