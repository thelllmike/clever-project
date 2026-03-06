import { AnimatePresence, motion } from 'motion/react'

export default function DescriptionModal({ open, onClose, title, description }) {
    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="desc-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.button
                        aria-label="Close modal"
                        className="desc-modal-overlay"
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        className="desc-modal-content"
                        initial={{ y: 24, scale: 0.98, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 24, scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="desc-modal-header">
                            <div>
                                <h3>{title}</h3>
                                <p className="desc-modal-subtitle mono">Project details</p>
                            </div>
                            <button onClick={onClose} className="desc-modal-close-btn">Close</button>
                        </div>
                        <div className="desc-modal-body">
                            <p>{description}</p>
                        </div>
                        <div className="desc-modal-footer">
                            <button onClick={onClose} className="desc-modal-done-btn">Done</button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
