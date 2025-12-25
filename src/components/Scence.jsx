"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useState } from "react";
import WhatsAppFloat from "./WhatsAppFloat";
import HoverImageLinks from "@/components/HoverImageLinks";
import { Scroll, ScrollControls, useScroll } from "@react-three/drei";

import { getProject, val } from "@theatre/core";
import { SheetProvider, useCurrentSheet } from "@theatre/r3f";

import Hero from "./Hero";
import Feilds from "./Feilds";
import About from "./About";
import Clients from "./Clients";
import Footer from "./Footer";
import MouseFollower from "./MouseFollower";

import brainAnimLG from "../../public/objAnim/brainAnim-lg.json";
import brainAnimSM from "../../public/objAnim/brainAnim-sm.json";

export default function Scene() {
  const [scrollOffset, setScrollOffset] = useState(0);

  // ✅ Create sheet only on client after we know mobile/desktop
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

      // NOTE: this re-renders every frame. If it feels heavy, I’ll show you a lighter way.
      setScrollOffset(scroll.offset);
    });

    return null;
  };

  // ✅ Don’t render until sheet exists
  if (!sheet) return null;

  return (
    <div className="relative h-screen w-screen">
      <MouseFollower />

      <Canvas>
        <ScrollControls pages={7} damping={0.3}>
          <SheetProvider sheet={sheet}>
            <ScrollAnimation />

            <Scroll html>
              <Hero />
              <Feilds scrollOffset={scrollOffset} />
              <About />
              <HoverImageLinks />
              <Clients />
              <Footer />
            </Scroll>
          </SheetProvider>
        </ScrollControls>
      </Canvas>

      <WhatsAppFloat />
    </div>
  );
}