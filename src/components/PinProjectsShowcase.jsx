"use client";

import { useEffect, useRef } from "react";

export default function PinProjectsShowcase({
  introTitle = "Best Projects To Try.",
  introText = "",
  outroTitle = "Let’s Build Yours.",
  outroText = "",
  items = [],
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    let ctx;
    let lenis;
    let rafId;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const LenisMod = await import("lenis");

      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      const Lenis = LenisMod.default;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ✅ LENIS (same as demo)
        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // ✅ GSAP PIN + ROTATE (same as demo)
        const pinCards = gsap.utils.toArray(".pin-card");

        pinCards.forEach((eachCard, index) => {
          if (index < pinCards.length - 1) {
            ScrollTrigger.create({
              trigger: eachCard,
              start: "top top",
              endTrigger: pinCards[pinCards.length - 1],
              end: "top top",
              pin: true,
              pinSpacing: false,
            });

            ScrollTrigger.create({
              trigger: pinCards[index + 1],
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;

                gsap.set(eachCard, {
                  scale: 1 - progress * 0.25,
                  rotation: index % 2 === 0 ? progress * 5 : -progress * 5,
                  rotationX: index % 2 === 0 ? progress * 40 : -progress * 40,
                  transformOrigin: "center top",
                });

                const overlay = eachCard.querySelector(".overlay");
                if (overlay) {
                  gsap.set(overlay, { opacity: progress * 0.4 });
                }
              },
            });
          }
        });

        // ✅ OPTIONAL: keep Outro clean (prevents “last tilted card” showing)
        ScrollTrigger.create({
          trigger: ".pin-outro",
          start: "top bottom",
          onEnter: () => gsap.to(".pin-card", { opacity: 0, duration: 0.15, overwrite: true }),
          onLeaveBack: () => gsap.to(".pin-card", { opacity: 1, duration: 0.15, overwrite: true }),
        });

        // refresh calculations after layout settles
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }, rootRef);
    })();

    return () => {
      try {
        if (rafId) cancelAnimationFrame(rafId);
        if (lenis) lenis.destroy();
        if (ctx) ctx.revert();
      } catch {}
    };
  }, []);

  return (
    <div ref={rootRef} className="w-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Intro */}
      <section className="intro flex h-screen w-screen flex-col items-center justify-center px-[8vw] text-center text-white bg-[#1a1a1a]">
        <h2 className="text-[8vw] md:text-[4vw] font-semibold flex flex-wrap justify-center">
          {introTitle}
        </h2>
        {introText ? (
          <p className="mt-4 max-w-[800px] text-base md:text-lg opacity-80 leading-snug">
            {introText}
          </p>
        ) : null}
      </section>

      {/* Cards */}
      {items.map((it, idx) => (
        <section
          key={it.id ?? idx}
          className="pin-card relative flex w-screen justify-between border-b border-black/20 bg-[#fcfcfc] px-[8vw] py-[10vh] [perspective:1000px] max-md:flex-col max-md:gap-8"
        >
          <div className="overlay pointer-events-none absolute inset-0 bg-black opacity-0" />

          <span className="text-[12vw] md:text-[8vw] font-semibold text-black">
            ({String(idx + 1).padStart(2, "0")})
          </span>

          <div className="pin-card-content flex w-full flex-col items-start md:w-[60%]">
            <h2 className="mb-4 md:mb-8 text-[10vw] md:text-[4vw] font-medium tracking-[-0.08rem] text-black">
              {it.title}
            </h2>

            <img src={it.image} alt={it.title} className="max-w-full rounded-lg" />

            <p className="mt-6 max-w-full md:max-w-[70%] text-black/80 leading-snug">
              {it.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {it.link && (
                <a href={it.link} className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">
                  VIEW PROJECT
                </a>
              )}
              {it.videoUrl && (
                <a
                  href={it.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black"
                >
                  WATCH VIDEO
                </a>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Outro */}
      <section className="pin-outro outro relative z-[50] flex h-screen w-screen flex-col items-center justify-center px-[8vw] text-center text-white bg-[#1a1a1a]">
        <h2 className="text-[8vw] md:text-[4vw] font-semibold flex flex-wrap justify-center">
          {outroTitle}
        </h2>
        {outroText ? (
          <p className="mt-4 max-w-[800px] text-base md:text-lg opacity-80 leading-snug">
            {outroText}
          </p>
        ) : null}
      </section>
    </div>
  );
}