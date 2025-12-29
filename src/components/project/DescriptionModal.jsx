"use client";

import { AnimatePresence, motion as m } from "framer-motion";
import MouseFollower from "@/components/MouseFollower";

export default function DescriptionModal({ open, onClose, title, description }) {
  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <m.button
            aria-label="Close modal"
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <m.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-black/10 p-5">
              <div>
                <h3 className="text-xl font-semibold text-black">{title}</h3>
                <p className="mt-1 text-sm text-black/50">Project details</p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full border border-black/15 px-3 py-1 text-sm font-semibold text-black hover:bg-black/5"
              >
                Close
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto p-5">
              <p className="whitespace-pre-line leading-relaxed text-black/80">
                {description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-black/10 p-4">
              <button
                onClick={onClose}
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-black/85"
              >
                Done
              </button>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}