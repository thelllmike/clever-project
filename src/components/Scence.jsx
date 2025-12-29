"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Scroll, ScrollControls, useScroll } from "@react-three/drei";

import { getProject, val } from "@theatre/core";
import { SheetProvider, useCurrentSheet } from "@theatre/r3f";

import Hero from "./home/Hero";
import Feilds from "./home/Feilds";
import About from "./home/About";
import Clients from "./home/Clients";
import Footer from "./Footer";
import MouseFollower from "./MouseFollower";
import HoverImageLinks from "@/components/home/HoverImageLinks";
import WhatsAppFloat from "./WhatsAppFloat";

import brainAnimLG from "../../public/objAnim/brainAnim-lg.json";
import brainAnimSM from "../../public/objAnim/brainAnim-sm.json";

function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-20">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}

export default function Scene() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [sheet, setSheet] = useState(null);

  // ✅ pages must match HTML height
  const contentRef = useRef(null);
  const [pages, setPages] = useState(7);

  useEffect(() => {
    const isMobileView = window.matchMedia("(max-width: 768px)").matches;
    const initialState = isMobileView ? brainAnimSM : brainAnimLG;

    const project = getProject("Brain Project", { state: initialState });
    const s = project.sheet("Scene");
    setSheet(s);
  }, []);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const calcPages = () => {
      const h = contentRef.current.scrollHeight || contentRef.current.getBoundingClientRect().height;
      const vh = window.innerHeight || 1;
      // +1 buffer so last section (Footer) is reachable
      setPages(Math.max(1, Math.ceil(h / vh) + 1));
    };

    calcPages();

    const ro = new ResizeObserver(calcPages);
    ro.observe(contentRef.current);

    window.addEventListener("resize", calcPages);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calcPages);
    };
  }, [sheet]);

  const ScrollAnimation = () => {
    const theatreSheet = useCurrentSheet();
    const scroll = useScroll();

    useFrame(() => {
      const sequenceLength = val(theatreSheet.sequence.pointer.length);
      theatreSheet.sequence.position = scroll.offset * sequenceLength;

      // ⚠️ optional (but heavy): updates React state every frame.
      // keep if you really need it:
      setScrollOffset(scroll.offset);
    });

    return null;
  };

  if (!sheet) return null;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <BackgroundVideo />
      <MouseFollower />

      <Canvas>
        <ScrollControls pages={pages} damping={0.3}>
          <SheetProvider sheet={sheet}>
            <ScrollAnimation />

            <Scroll html>
              <div ref={contentRef} className="relative z-10">
                <Hero />
                <Feilds scrollOffset={scrollOffset} />
                <About />
                <HoverImageLinks />
                <Clients />
                <Footer />
              </div>
            </Scroll>
          </SheetProvider>
        </ScrollControls>
      </Canvas>

      <WhatsAppFloat />
    </div>
  );
}