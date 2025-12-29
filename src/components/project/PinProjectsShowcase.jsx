/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import VideoModalYouTube from "./VideoModalYouTube";
import DescriptionModal from "./DescriptionModal";

function RightScrollHint({ hide = false }) {
  if (hide) return null;

  return (
    <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:flex flex-col items-center gap-2">
      <span className="relative inline-block h-[28px] w-[18px] rounded-full border border-black/35 bg-white/70 backdrop-blur">
        <span className="absolute left-1/2 top-[5px] h-[6px] w-[2px] -translate-x-1/2 rounded bg-black/40 animate-[wheel_1.1s_infinite]" />
      </span>
      <span className="text-[11px] font-semibold text-black/50">scroll</span>

      <style jsx>{`
        @keyframes wheel {
          0% {
            transform: translate(-50%, 0);
            opacity: 0.2;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 10px);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}

function ScrollMouseHint() {
  return (
    <span className="ml-3 inline-flex items-center gap-2 text-xs font-semibold text-black/55">
      <span className="relative inline-block h-[18px] w-[12px] rounded-full border border-black/40">
        <span className="absolute left-1/2 top-[3px] h-[4px] w-[2px] -translate-x-1/2 rounded bg-black/40 animate-[wheel_1.1s_infinite]" />
      </span>
      <span>scroll</span>

      <style jsx>{`
        @keyframes wheel {
          0% {
            transform: translate(-50%, 0);
            opacity: 0.2;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 7px);
            opacity: 0.1;
          }
        }
      `}</style>
    </span>
  );
}

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

  // ✅ Description modal state
  const [descOpen, setDescOpen] = useState(false);
  const [descTitle, setDescTitle] = useState("");
  const [descText, setDescText] = useState("");

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

  const openDesc = (title, description) => {
    setDescTitle(title || "Details");
    setDescText(description || "");
    setDescOpen(true);
  };

  const closeDesc = () => {
    setDescOpen(false);
    setDescTitle("");
    setDescText("");
  };

  useEffect(() => {
    let ctx;
    let lenis;
    let rafId;
    let mm;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const LenisMod = await import("lenis");

      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      const Lenis = LenisMod.default;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();

        // ✅ Desktop: pin + lenis + animation
        mm.add("(min-width: 1024px)", () => {
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
            gsap.set(eachCard, { zIndex: pinCards.length - index });

            ScrollTrigger.create({
              trigger: eachCard,
              start: "top top",
              end: "+=100%",
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            });

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

          setTimeout(() => ScrollTrigger.refresh(), 80);

          return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
          };
        });

        // ✅ Mobile/tablet: keep animation, NO pin
        mm.add("(max-width: 1023px)", () => {
          const cards = gsap.utils.toArray(".pin-card");

          cards.forEach((eachCard, index) => {
            ScrollTrigger.create({
              trigger: eachCard,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
              onUpdate: (self) => {
                const p = self.progress;
                gsap.set(eachCard, {
                  scale: 1 - p * 0.04,
                  rotation: index % 2 === 0 ? p * 1.2 : -p * 1.2,
                  rotationX: index % 2 === 0 ? p * 6 : -p * 6,
                  transformOrigin: "center top",
                });

                const overlay = eachCard.querySelector(".overlay");
                if (overlay) gsap.set(overlay, { opacity: p * 0.1 });
              },
            });
          });

          setTimeout(() => ScrollTrigger.refresh(), 40);

          return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
          };
        });
      }, rootRef);
    })();

    return () => {
      try {
        if (rafId) cancelAnimationFrame(rafId);
        if (lenis) lenis.destroy();
        if (mm) mm.revert();
        if (ctx) ctx.revert();
      } catch {}
    };
  }, []);

  return (
    // ✅ Behind-area BLACK
    <div ref={rootRef} className="w-full overflow-x-hidden bg-clever-black">
      {/* Modals */}
      <VideoModalYouTube
        open={videoOpen}
        onClose={closeVideo}
        videoUrl={activeVideo}
        title={activeTitle}
      />
      <DescriptionModal
        open={descOpen}
        onClose={closeDesc}
        title={descTitle}
        description={descText}
      />

      {/* ✅ Intro (BLACK) */}
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-clever-black px-6 text-center text-white md:px-[8vw]">
        <h2 className="text-[10vw] font-semibold leading-tight md:text-[4vw]">
          {introTitle}
        </h2>
        {introText ? (
          <p className="mt-4 max-w-[800px] text-base text-white/70 md:text-lg">
            {introText}
          </p>
        ) : null}
      </section>

      {/* Cards */}
      {items.map((it, idx) => {
        const id = it.id ?? idx;

        return (
          <section
            key={id}
            className="pin-card relative w-full min-h-screen border-b border-black/10 bg-[#fcfcfc]"
          >
             <RightScrollHint hide={idx === items.length - 1} />
            <div className="overlay pointer-events-none absolute inset-0 z-0 bg-black opacity-0" />

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1320px] flex-col gap-6 px-6 py-10 md:flex-row md:gap-10 md:px-[6vw] md:py-[10vh]">
              {/* Number */}
              <span className="text-[18vw] font-semibold leading-none text-black md:text-[8vw]">
                ({String(idx + 1).padStart(2, "0")})
              </span>

              {/* Content */}
              <div className="flex w-full flex-col md:w-[60%]">
                <h2 className="mb-4 text-[9vw] font-medium leading-tight text-black md:mb-6 md:text-[3.2vw]">
                  {it.title}
                </h2>

                {/* Image */}
                <div className="w-full overflow-hidden rounded-xl border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="block w-full object-cover"
                    style={{ maxHeight: "min(420px, 46vh)" }}
                    loading="lazy"
                  />
                </div>

                {/* Description + Read more + mouse */}
                <div className="mt-5 w-full">
                  <p className="text-base leading-relaxed text-black/80 md:text-[16px] line-clamp-5">
                    {it.description}
                  </p>

                  <div className="mt-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => openDesc(it.title, it.description)}
                      className="text-sm font-semibold text-black underline underline-offset-4 hover:opacity-70"
                    >
                      Read more
                    </button>

                    <ScrollMouseHint />
                  </div>
                </div>

                {/* Buttons pinned at bottom of card */}
                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-3">
                    {it.link && (
                      <a
                        href={it.link}
                        target={it.link?.startsWith("http") ? "_blank" : undefined}
                        rel={it.link?.startsWith("http") ? "noreferrer" : undefined}
                        className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/85"
                      >
                        VIEW PROJECT
                      </a>
                    )}

                    {it.videoUrl && (
                      <button
                        type="button"
                        onClick={() => openVideo(it.videoUrl, it.title)}
                        className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black transition hover:bg-black/5"
                      >
                        WATCH VIDEO
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ✅ Outro (BLACK) */}
      <section className="pin-outro relative z-[50] flex min-h-screen w-full flex-col items-center justify-center bg-clever-black px-6 text-center text-white md:px-[8vw]">
        <h2 className="text-[10vw] font-semibold leading-tight md:text-[4vw]">
          {outroTitle}
        </h2>
        {outroText ? (
          <p className="mt-4 max-w-[800px] text-base text-white/70 md:text-lg">
            {outroText}
          </p>
        ) : null}
      </section>
    </div>
  );
}