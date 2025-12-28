"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
    }

    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

      // youtube.com/embed/<id>
      if (u.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${u.pathname}?autoplay=1&rel=0`;
      }
    }
  } catch (e) {}

  return null;
}

export default function VideoModalYouTube({ open, onClose, videoUrl, title }) {
  const embed = getYouTubeEmbedUrl(videoUrl);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4"
          onMouseDown={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <m.div
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white">
              <p className="text-sm font-semibold">{title || "Video"}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-1 text-sm hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              {embed ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={embed}
                  title={title || "YouTube video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/70">
                  Invalid YouTube URL
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}