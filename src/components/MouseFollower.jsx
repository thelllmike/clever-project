"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices / no-hover pointers
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Respect reduced motion
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start hidden until first move
    gsap.set([dot, ring], { opacity: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let shown = false;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2, ease: "power2.out" });
      }

      xToDot(x);
      yToDot(y);

      xToRing(x);
      yToRing(y);
    };

    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      shown = false;
    };

    // Hover effects on interactive elements
    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const handleEnter = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.25, duration: 0.2, ease: "power2.out" });
      gsap.to(dot, { scale: 0.2, duration: 0.2, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.9, duration: 0.2, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const attachHoverListeners = () => {
      const nodes = document.querySelectorAll(interactiveSelector);
      nodes.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
      return () => {
        nodes.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    };

    const detach = attachHoverListeners();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", (e) => {
      // when leaving the window
      if (!e.relatedTarget && !e.toElement) onLeaveWindow();
    });

    return () => {
      detach?.();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 opacity-90 mix-blend-difference"
      />
    </>
  );
}