/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import VideoModalYouTube from "./VideoModalYouTube";

export default function PinProjectsShowcase({
  introTitle = "Best Projects To Try.",
  introText = "",
  outroTitle = "Let’s Build Yours.",
  outroText = "",
  items = [],
}) {
  const rootRef = useRef(null);

  // ✅ Video modal state
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTitle, setActiveTitle] = useState("");

  const openVideo = (url, title) => {
    setActiveVideo(url);
    setActiveTitle(title || "Video");
    setVideoOpen(true);
  };

  const closeVideo = () => {
    setVideoOpen(false);
    setActiveVideo(null);
    setActiveTitle("");
  };

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
        // ✅ LENIS (smooth scroll)
        lenis = new Lenis({
          lerp: 0.08,
          smoothWheel: true,
          smoothTouch: false,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const pinCards = gsap.utils.toArray(".pin-card");

        pinCards.forEach((eachCard, index) => {
          // Give proper stacking order so buttons are never behind another pinned card
          gsap.set(eachCard, { zIndex: pinCards.length - index });

          // ✅ Pin each card for ONE viewport scroll (no more “scroll twice” feeling)
          ScrollTrigger.create({
            trigger: eachCard,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true, // IMPORTANT: allows normal scroll length & avoids weird overlaps
            anticipatePin: 1,
          });

          // ✅ Scale / rotate while this card is pinned (smooth + consistent)
          ScrollTrigger.create({
            trigger: eachCard,
            start: "top top",
            end: "+=100%",
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;

              gsap.set(eachCard, {
                scale: 1 - p * 0.08,
                rotation: index % 2 === 0 ? p * 2.5 : -p * 2.5,
                rotationX: index % 2 === 0 ? p * 14 : -p * 14,
                transformOrigin: "center top",
              });

              const overlay = eachCard.querySelector(".overlay");
              if (overlay) gsap.set(overlay, { opacity: p * 0.12 });
            },
          });
        });

        // ✅ Fade cards when outro comes
        ScrollTrigger.create({
          trigger: ".pin-outro",
          start: "top 85%",
          onEnter: () =>
            gsap.to(".pin-card", {
              opacity: 0,
              duration: 0.3,
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(".pin-card", {
              opacity: 1,
              duration: 0.2,
              overwrite: true,
            }),
        });

        setTimeout(() => ScrollTrigger.refresh(), 60);
      }, rootRef);
    })();

    return () => {
      try {
        if (rafId) cancelAnimationFrame(rafId);
        if (lenis) lenis.destroy();
        if (ctx) ctx.revert();
      } catch (e) {}
    };
  }, []);

  return (
    <div ref={rootRef} className="w-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* ✅ Video Modal */}
      <VideoModalYouTube
        open={videoOpen}
        onClose={closeVideo}
        videoUrl={activeVideo}
        title={activeTitle}
      />

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
          className="pin-card relative flex w-screen justify-between border-b border-black/20 bg-[#fcfcfc] px-[8vw] py-[8vh] [perspective:1000px] max-md:flex-col max-md:gap-8"
        >
          {/* overlay sits BEHIND content */}
          <div className="overlay pointer-events-none absolute inset-0 bg-black opacity-0 z-0" />

          <span className="text-[12vw] md:text-[8vw] font-semibold text-black z-10">
            ({String(idx + 1).padStart(2, "0")})
          </span>

          {/* ✅ z-10 ensures content always above overlay and above other pinned cards */}
          <div className="pin-card-content relative z-10 flex w-full flex-col items-start md:w-[60%]">
            <h2 className="mb-4 md:mb-6 text-[10vw] md:text-[3.2vw] font-medium tracking-[-0.08rem] text-black">
              {it.title}
            </h2>

            {/* ✅ IMPORTANT: keep image from pushing buttons off-screen */}
            <img
              src={it.image}
              alt={it.title}
              className="w-full max-w-full rounded-xl object-cover border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.10)]"
              style={{ maxHeight: "380px" }} // <— adjust to 340/420 if you want
            />

            {/* ✅ Line breaks visible */}
            <p className="mt-6 w-full text-black/80 leading-relaxed whitespace-pre-line">
              {it.description}
            </p>

            {/* ✅ Buttons always visible now */}
            <div className="mt-6 flex flex-wrap gap-3">
              {it.link && (
                <a
                  href={it.link}
                  target={it.link?.startsWith("http") ? "_blank" : undefined}
                  rel={it.link?.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-black/85 transition"
                >
                  VIEW PROJECT
                </a>
              )}

              {it.videoUrl && (
                <button
                  type="button"
                  onClick={() => openVideo(it.videoUrl, it.title)}
                  className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black hover:bg-black/5 transition"
                >
                  WATCH VIDEO
                </button>
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