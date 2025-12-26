"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { Scroll, ScrollControls, useScroll } from "@react-three/drei";

import { getProject, val } from "@theatre/core";
import { SheetProvider, useCurrentSheet } from "@theatre/r3f";

import Hero from "./Hero";
import Feilds from "./Feilds";
import About from "./About";
import Clients from "./Clients";
import Footer from "./Footer";
import MouseFollower from "./MouseFollower";
import HoverImageLinks from "@/components/HoverImageLinks";
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
        {/* IMPORTANT: this must be a REAL mp4 file in /public/videos */}
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}

export default function Scene() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    const isMobileView = window.matchMedia("(max-width: 768px)").matches;
    const initialState = isMobileView ? brainAnimSM : brainAnimLG;

    const project = getProject("Brain Project", { state: initialState });
    const s = project.sheet("Scene");
    setSheet(s);
  }, []);

  const ScrollAnimation = () => {
    const theatreSheet = useCurrentSheet();
    const scroll = useScroll();

    useFrame(() => {
      const sequenceLength = val(theatreSheet.sequence.pointer.length);
      theatreSheet.sequence.position = scroll.offset * sequenceLength;
      setScrollOffset(scroll.offset);
    });

    return null;
  };

  if (!sheet) return null;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* ✅ Background video behind everything */}
      <BackgroundVideo />

      {/* ✅ Cursor / extras above video */}
      <MouseFollower />

      <Canvas>
        <ScrollControls pages={7} damping={0.3}>
          <SheetProvider sheet={sheet}>
            <ScrollAnimation />

            <Scroll html>
              {/* ✅ This wrapper forces ALL html content above the video */}
              <div className="relative z-10">
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