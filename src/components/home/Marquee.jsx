"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Marquee({
  isReversed = false,
  className = "",
  iconSize = 66,     // ✅ bigger icons
  noMask = false,    // ✅ remove black fade
}) {
  const movingRef = useRef(null);
  const tlRef = useRef(null);
  const tweenRef = useRef(null);

  const ICONS = useMemo(
    () => [
      "/images/technologies/gsap.svg",
      "/images/technologies/next.svg",
      "/images/technologies/webgl.svg",
      "/images/technologies/react.svg",
      "/images/technologies/tailwind.svg",
      "/images/technologies/three.svg",
      "/images/technologies/typescript.svg",
    ],
    []
  );

  const ELEMENTS = useMemo(() => [...ICONS, ...ICONS], [ICONS]);

  useEffect(() => {
    if (!movingRef.current) return;

    tlRef.current?.kill();

    gsap.set(movingRef.current, { xPercent: isReversed ? -50 : 0 });

    tlRef.current = gsap
      .timeline({ defaults: { ease: "none" }, repeat: -1 })
      .to(movingRef.current, {
        xPercent: isReversed ? 0 : -50,
        duration: 18,
      })
      .set(movingRef.current, { xPercent: 0 });

    return () => {
      tweenRef.current?.kill();
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [isReversed]);

  const onEnter = () => {
    if (!tlRef.current) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(tlRef.current, { timeScale: 0.25, duration: 0.35 });
  };

  const onLeave = () => {
    if (!tlRef.current) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(tlRef.current, { timeScale: 1, duration: 0.2 });
  };

  const list = (
    <div className="flex w-fit items-center gap-12 pr-12">
      {ELEMENTS.map((src, idx) => (
        <div
          key={idx}
          className="relative shrink-0"
          style={{ width: iconSize, height: iconSize }}
        >
          <Image src={src} alt="tech" fill className="object-contain" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`max-w-full select-none overflow-hidden ${className}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={
        noMask
          ? undefined
          : {
              maskImage:
                "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            }
      }
    >
      <div ref={movingRef} className="flex w-fit">
        {list}
        {list}
      </div>
    </div>
  );
}