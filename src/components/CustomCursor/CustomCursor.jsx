import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

function CustomCursor() {
    const cursorRef = useRef(null)
    const cursorDotRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const pos = useRef({ x: 0, y: 0 })
    const target = useRef({ x: 0, y: 0 })

    useEffect(() => {
        // Hide on touch devices
        if ('ontouchstart' in window) return

        const cursor = cursorRef.current
        const dot = cursorDotRef.current
        if (!cursor || !dot) return

        const handleMouseMove = (e) => {
            target.current.x = e.clientX
            target.current.y = e.clientY
            // Dot follows instantly
            dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        const handleMouseEnterInteractive = () => setIsHovering(true)
        const handleMouseLeaveInteractive = () => setIsHovering(false)

        // Smooth ring follow
        let animationId
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.15
            pos.current.y += (target.current.y - pos.current.y) * 0.15
            cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
            animationId = requestAnimationFrame(animate)
        }
        animationId = requestAnimationFrame(animate)

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)

        // Add hover detection for interactive elements
        const addHoverListeners = () => {
            const interactives = document.querySelectorAll('a, button, .btn, .nav-link, .mobile-nav-link, .cta-link, .work-card, .status-dot, .nav-status, .footer-status, .mobile-status, [role="button"]')
            interactives.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnterInteractive)
                el.addEventListener('mouseleave', handleMouseLeaveInteractive)
            })
            return interactives
        }

        let interactives = addHoverListeners()

        // Re-attach on DOM changes
        const observer = new MutationObserver(() => {
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnterInteractive)
                el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
            })
            interactives = addHoverListeners()
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            cancelAnimationFrame(animationId)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnterInteractive)
                el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
            })
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <div
                ref={cursorRef}
                className={`custom-cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
            />
            <div
                ref={cursorDotRef}
                className={`custom-cursor-dot ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
            />
        </>
    )
}

export default CustomCursor
