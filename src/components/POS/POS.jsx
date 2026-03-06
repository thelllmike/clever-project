import { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CustomCursor from '../CustomCursor/CustomCursor'
import CookieBanner from '../CookieBanner/CookieBanner'
import VideoModal from '../Projects/VideoModal'
import Button from '../Button/Button'
import MagicBento from './MagicBento'
import '../Projects/Projects.css'
import './POS.css'

const features = [
    { icon: 'ri-cloud-line', title: 'Cloud-Based Infrastructure', description: 'Access your business data from anywhere. 99.9% uptime with automatic backups.' },
    { icon: 'ri-line-chart-line', title: 'Real-Time Analytics', description: 'Live sales data, inventory insights, and customer behavior tracking.' },
    { icon: 'ri-shield-check-line', title: 'Bank-Level Security', description: 'PCI DSS compliance, end-to-end encryption, and multi-factor authentication.' },
    { icon: 'ri-code-s-slash-line', title: 'Seamless Integration', description: 'Connect with accounting software, e-commerce, and payment processors.' },
    { icon: 'ri-customer-service-2-line', title: '24/7 Expert Support', description: 'Dedicated support team available round-the-clock via live chat and phone.' },
    { icon: 'ri-scales-3-line', title: 'Unlimited Scalability', description: 'Start small and grow big. Scale from a single location to hundreds.' },
]

const highlights = [
    { icon: 'ri-checkbox-circle-line', title: 'No Hidden Charges', desc: '100% Transparent Pricing' },
    { icon: 'ri-checkbox-circle-line', title: 'Lifetime Free Updates', desc: 'Always Stay Current' },
    { icon: 'ri-checkbox-circle-line', title: 'Bulk License Discounts', desc: 'Multi-Device Licensing' },
]

const plans = [
    {
        name: 'Starter',
        price: 'LKR 25,000',
        period: 'one-time',
        desc: 'For small optical shops getting started with digital POS.',
        features: ['1 Device License', 'Prescription Management', 'Basic Inventory', 'Sales & Billing', 'Email Support', 'Monthly Reports'],
        disabled: ['Multi-Branch', 'Custom Branding', 'API Access'],
        popular: false,
    },
    {
        name: 'Professional',
        price: 'LKR 55,000',
        period: 'one-time',
        desc: 'For growing optical businesses. Manage stock, prescriptions, and customers.',
        features: ['3 Device Licenses', 'Advanced Prescription Mgmt', 'Full Inventory System', 'Customer Database (CRM)', 'Priority Support', 'Real-Time Analytics', 'Multi-Branch Support'],
        disabled: ['Custom Branding', 'API Access'],
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact us',
        desc: 'For optical chains and large operations. Fully customized to your needs.',
        features: ['Unlimited Devices', 'Full Prescription Suite', 'Advanced Inventory + AI', 'Complete CRM', 'Dedicated Account Manager', 'Custom Reports & Analytics', 'Multi-Branch + Warehouse', 'Custom Branding', 'Full API Access'],
        disabled: [],
        popular: false,
    },
]

const benefits = [
    { icon: 'ri-eye-line', title: 'Built for Optical Shops', desc: 'Prescription tracking, lens inventory, frame catalog, and customer eye history.' },
    { icon: 'ri-smartphone-line', title: 'Mobile-First Design', desc: 'Works on tablets, phones, and desktops. Manage your shop from anywhere.' },
    { icon: 'ri-barcode-line', title: 'Barcode & QR Scanning', desc: 'Fast checkout with barcode scanning for frames, lenses, and accessories.' },
    { icon: 'ri-file-list-3-line', title: 'Prescription Management', desc: 'Store and retrieve customer prescriptions instantly. Auto-fill on repeat orders.' },
    { icon: 'ri-store-2-line', title: 'Multi-Branch Ready', desc: 'Manage multiple locations from one dashboard. Transfer stock between branches.' },
    { icon: 'ri-money-dollar-circle-line', title: 'Transparent Pricing', desc: 'No monthly fees. One-time payment. No hidden costs. No lock-in.' },
    { icon: 'ri-robot-line', title: 'AI-Powered Insights', desc: 'Predict demand, identify trends, and get smart reorder suggestions.' },
    { icon: 'ri-refresh-line', title: 'Free Lifetime Updates', desc: 'Get new features and improvements at no extra cost. Always up to date.' },
]

export default function POS() {
    const sectionRefs = useRef([])
    const [billingAnnual, setBillingAnnual] = useState(false)
    const [videoOpen, setVideoOpen] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
            { threshold: 0.1, rootMargin: '-50px' }
        )
        sectionRefs.current.forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const addRef = (el) => { if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el) }

    return (
        <div className="pos-page">
            <CustomCursor />
            <Header />
            <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoUrl="https://youtu.be/-cEsupIORXM?si=15bru5-dgBvashxA" title="POS System Demo" />

            {/* Hero */}
            <section className="pos-hero">
                <div className="container">
                    <span className="pos-hero-eyebrow mono reveal reveal-delay-1" ref={addRef}>
                        <span className="eyebrow-line"></span>
                        POS Development
                    </span>
                    <h1 className="pos-hero-title reveal reveal-delay-2" ref={addRef}>
                        <span>Best POS System</span>
                        <span className="pos-hero-title-accent"> Sri Lanka</span>
                    </h1>
                    <p className="pos-hero-subtitle reveal reveal-delay-3" ref={addRef}>
                        AI-Powered Smart Point of Sale Solution — built for <span className="highlight">optical shops</span>, retail stores, restaurants, and modern businesses.
                    </p>
                    <p className="pos-hero-powered mono reveal reveal-delay-3" ref={addRef}>Powered by Clever Project (Pvt) Ltd</p>

                    <div className="pos-highlights reveal reveal-delay-4" ref={addRef}>
                        {highlights.map((h, i) => (
                            <div key={i} className="pos-highlight-card">
                                <i className={h.icon}></i>
                                <strong>{h.title}</strong>
                                <span>{h.desc}</span>
                            </div>
                        ))}
                    </div>

                    <p className="pos-hero-desc reveal reveal-delay-4" ref={addRef}>
                        All our POS systems are <strong>100% customized</strong> to your requirements. We do not provide ready-made or common POS solutions. Whether you run an optical shop, retail store, restaurant, or cafe — our cloud-based POS software helps you track sales, manage inventory, and generate detailed business reports instantly.
                    </p>

                    <div className="pos-hero-cta reveal reveal-delay-5" ref={addRef}>
                        <Button href="#pricing" variant="primary">Get Started</Button>
                        <Button onClick={() => setVideoOpen(true)}>Watch Demo</Button>
                    </div>

                    <div className="pos-scroll-down reveal reveal-delay-5" ref={addRef}>
                        <span className="scroll-down-mouse"><span className="scroll-down-wheel" /></span>
                        <span className="mono">Scroll</span>
                    </div>
                </div>
            </section>

            {/* Features Bento */}
            <section className="pos-features">
                <div className="container">
                    <div className="pos-section-header reveal" ref={addRef}>
                        <span className="section-label mono">Why Choose Us</span>
                        <h2 className="pos-section-title">Everything You Need<br /><span className="text-muted">to run your business</span></h2>
                    </div>
                    <MagicBento
                        cards={features}
                        glowColor="124, 58, 237"
                        particleCount={10}
                        spotlightRadius={400}
                    />
                </div>
            </section>

            {/* Pricing */}
            <section className="pos-pricing" id="pricing">
                <div className="container">
                    <div className="pos-section-header reveal" ref={addRef}>
                        <span className="section-label mono">Pricing</span>
                        <h2 className="pos-section-title">Simple, Transparent<br /><span className="text-muted">pricing</span></h2>
                    </div>

                    <div className="pos-billing-toggle reveal" ref={addRef}>
                        <button className={!billingAnnual ? 'active' : ''} onClick={() => setBillingAnnual(false)}>One-Time</button>
                        <button className={billingAnnual ? 'active' : ''} onClick={() => setBillingAnnual(true)}>With Support Plan</button>
                    </div>

                    <div className="pos-pricing-grid">
                        {plans.map((plan, i) => (
                            <div key={i} className={`pos-pricing-card ${plan.popular ? 'pos-pricing-card--popular' : ''} reveal reveal-delay-${i + 1}`} ref={addRef}>
                                {plan.popular && <span className="pos-pricing-badge mono">Most Popular</span>}
                                <h3 className="pos-pricing-name">{plan.name}</h3>
                                <div className="pos-pricing-price">
                                    <span className="pos-pricing-amount">{plan.price}</span>
                                    <span className="pos-pricing-period mono">/{plan.period}</span>
                                </div>
                                <p className="pos-pricing-desc">{plan.desc}</p>
                                <ul className="pos-pricing-features">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="pos-pricing-feature--included">
                                            <i className="ri-checkbox-circle-fill"></i> {f}
                                        </li>
                                    ))}
                                    {plan.disabled.map((f, j) => (
                                        <li key={`d-${j}`} className="pos-pricing-feature--disabled">
                                            <i className="ri-close-circle-line"></i> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button href="https://wa.me/94704057137" target="_blank" rel="noopener noreferrer" variant={plan.popular ? 'primary' : 'default'} className="pos-btn-full">
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="pos-benefits">
                <div className="container">
                    <div className="pos-section-header reveal" ref={addRef}>
                        <span className="section-label mono">Built for Optical & Beyond</span>
                        <h2 className="pos-section-title">Features that<br /><span className="text-muted">make the difference</span></h2>
                    </div>
                    <div className="pos-benefits-grid">
                        {benefits.map((b, i) => (
                            <div key={i} className={`pos-benefit-card reveal reveal-delay-${(i % 4) + 1}`} ref={addRef}>
                                <i className={b.icon}></i>
                                <strong>{b.title}</strong>
                                <p>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pos-cta-section">
                <div className="container">
                    <div className="pos-cta-inner reveal" ref={addRef}>
                        <h2 className="pos-cta-title">Ready to upgrade your business?</h2>
                        <p className="pos-cta-text">Get a free consultation and demo tailored to your optical shop or business.</p>
                        <div className="pos-cta-actions">
                            <Button href="https://wa.me/94704057137" target="_blank" rel="noopener noreferrer" variant="primary">Contact Us on WhatsApp</Button>
                            <Button href="tel:+94704057137">Call +94 70 405 7137</Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <CookieBanner />
        </div>
    )
}
