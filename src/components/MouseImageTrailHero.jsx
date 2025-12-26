"use client";

import React, { useRef } from "react";
import { useAnimate } from "framer-motion";

export default function MouseImageTrailHero({
  images = [],
  renderImageBuffer = 35,
  rotationRange = 18,
  className = "",
}) {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = String(1000 + imageRenderCount.current);

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.6) ${
            imageIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 16, stiffness: 220 }
    );

    animate(
      selector,
      { opacity: [1, 0] },
      { ease: "linear", duration: 0.45, delay: 2.2 }
    );

    imageRenderCount.current += 1;
  };

  const handleMouseMove = (e) => {
    if (!images?.length) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dist = calculateDistance(
      x,
      y,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (dist >= renderImageBuffer) {
      lastRenderPosition.current = { x, y };
      renderNextImage();
    }
  };

  return (
    <div
      ref={scope}
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
    >
      {/* image layer */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          data-mouse-move-index={index}
          className="pointer-events-none absolute left-0 top-0 h-28 w-40 rounded-xl border border-white/20 bg-black/40 object-cover opacity-0 md:h-40 md:w-56"
        />
      ))}
    </div>
  );
}