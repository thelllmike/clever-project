import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Products.css'

const WHATSAPP = 'https://wa.me/94704057137'
const demoLink = (product) =>
    `${WHATSAPP}?text=${encodeURIComponent(`Hi, I'd like a demo of ${product}.`)}`

const flagship = {
    name: 'AmigoTap',
    tagline: 'Our flagship product, on the web and in your pocket.',
    description:
        'AmigoTap is the platform we build and run ourselves. Use it from the browser, or take it with you in the AmigoTap mobile app.',
    platforms: [
        { icon: 'ri-global-line', label: 'AmigoTap Web' },
        { icon: 'ri-smartphone-line', label: 'AmigoTap Mobile App' }
    ],
    points: [
        'One account across web and mobile',
        'Built, hosted and supported by Clever Project',
        'New releases shipped continuously'
    ]
}

const products = [
    {
        icon: 'ri-store-2-line',
        name: 'Mobile POS',
        category: 'Point of Sale',
        description:
            'Sell from a phone or tablet. Billing, inventory and sales reports stay in sync wherever you are.',
        features: ['Billing & receipts', 'Inventory tracking', 'Sales reports'],
        to: '/pos',
        cta: 'Explore POS'
    },
    {
        icon: 'ri-wallet-3-line',
        name: 'Petty Cash',
        category: 'Finance',
        description:
            'Record day-to-day spending as it happens and always know where the cash float went.',
        features: ['Expense logging', 'Float & balance tracking', 'Spending reports'],
        href: demoLink('the Petty Cash app'),
        cta: 'Request a demo'
    },
    {
        icon: 'ri-tools-line',
        name: 'Fix It',
        category: 'Service & Repairs',
        description:
            'Log a repair job, assign it, and follow it through to done, without losing a request on the way.',
        features: ['Job requests', 'Status tracking', 'Team assignment'],
        href: demoLink('the Fix It app'),
        cta: 'Request a demo'
    },
    {
        icon: 'ri-refresh-line',
        name: 'Seettu Cycle',
        category: 'Group Savings',
        description:
            'Run a seettu without the notebook. Track members, contributions and whose turn it is each cycle.',
        features: ['Member & group management', 'Contribution tracking', 'Payout schedule per cycle'],
        href: demoLink('the Seettu Cycle app'),
        cta: 'Request a demo'
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
                            href={demoLink('AmigoTap')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary product-flagship-cta"
                        >
                            Request a demo <i className="ri-arrow-right-line"></i>
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
                                    {product.cta} <i className="ri-arrow-right-up-line"></i>
                                </span>
                            </>
                        )
                        const className = `product-card reveal reveal-delay-${(idx % 2) + 1}`
                        return product.to ? (
                            <Link to={product.to} className={className} key={product.name}>
                                {inner}
                            </Link>
                        ) : (
                            <a
                                href={product.href}
                                target="_blank"
                                rel="noopener noreferrer"
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
