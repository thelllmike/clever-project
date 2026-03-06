import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

function getYouTubeEmbedUrl(url) {
    if (!url) return null
    try {
        const u = new URL(url)
        if (u.hostname.includes('youtu.be')) {
            const id = u.pathname.replace('/', '')
            return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null
        }
        if (u.hostname.includes('youtube.com')) {
            const id = u.searchParams.get('v')
            if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
            if (u.pathname.startsWith('/embed/')) {
                return `https://www.youtube.com${u.pathname}?autoplay=1&rel=0`
            }
        }
    } catch {}
    return null
}

export default function VideoModal({ open, onClose, videoUrl, title }) {
    const embed = getYouTubeEmbedUrl(videoUrl)

    useEffect(() => {
        if (!open) return
        const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [open, onClose])

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="video-modal-backdrop"
                    onMouseDown={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        onMouseDown={(e) => e.stopPropagation()}
                        className="video-modal-content"
                        initial={{ y: 18, scale: 0.98, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 18, scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="video-modal-header">
                            <p>{title || 'Video'}</p>
                            <button onClick={onClose}>Close</button>
                        </div>
                        <div className="video-modal-frame">
                            {embed ? (
                                <iframe
                                    src={embed}
                                    title={title || 'YouTube video'}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="video-modal-error">Invalid YouTube URL</div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
