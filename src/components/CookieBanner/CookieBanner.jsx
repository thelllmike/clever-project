import { useState, useEffect } from 'react'
import './CookieBanner.css'

function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1500)
            return () => clearTimeout(timer)
        }
        if (consent === 'accepted') {
            grantConsent()
        }
    }, [])

    function grantConsent() {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            })
        }
    }

    function handleAccept() {
        localStorage.setItem('cookie-consent', 'accepted')
        grantConsent()
        setVisible(false)
    }

    function handleDecline() {
        localStorage.setItem('cookie-consent', 'declined')
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied'
            })
        }
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="cookie-banner">
            <div className="cookie-content">
                <div className="cookie-text">
                    <span className="cookie-label mono">Cookies</span>
                    <p>We use cookies to analyze site traffic and improve your experience. No personal data is sold.</p>
                </div>
                <div className="cookie-actions">
                    <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
                        Decline
                    </button>
                    <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner
