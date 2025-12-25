"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppFloat from "./WhatsAppFloat";
import HoverImageLinks from "@/components/HoverImageLinks";
import {
  Environment,
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";

import { useMediaQuery } from "react-responsive";
import Brain from "./Brain";
// import studio from "@theatre/studio";
// import extension from "@theatre/r3f/dist/extension";
import { getProject, val } from "@theatre/core";
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
  refreshSnapshot,
} from "@theatre/r3f";
import Hero from "./Hero";
import Feilds from "./Feilds";
import About from "./About";
import Clients from "./Clients";
import Footer from "./Footer";
import MouseFollower from "./MouseFollower";

import brainAnimLG from "../../public/objAnim/brainAnim-lg.json";
import brainAnimSM from "../../public/objAnim/brainAnim-sm.json";

// Initialize Theatre.js studio
// studio.initialize();
// studio.extend(extension);

const isMobileView = window.matchMedia("(max-width: 768px)").matches;
const initialState = isMobileView ? brainAnimSM : brainAnimLG;

// Initialize project once
const project = getProject("Brain Project", { state: initialState });
const sheet = project.sheet("Scene");

const Scene = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // useEffect(() => {
  //   // console.log("Responsive view changed:", isMobile ? "Mobile" : "Desktop");
  //   // Optionally log or adjust other responsive behaviors here
  // }, [isMobile]);

  useEffect(() => {
    // studio.ui.restore(); // Ensure Theatre.js UI is visible
    // refreshSnapshot(); // Refresh snapshot to ensure snapshot editor visibility
    // studio.ui.hide();
  }, []);

  // New component to handle scroll and animation
  const ScrollAnimation = () => {
    const sheet = useCurrentSheet();
    const scroll = useScroll();

    useFrame(() => {
      // Get the length of the sequence
      const sequenceLength = val(sheet.sequence.pointer.length);
      // Update the "position" of the playhead in the sequence
      sheet.sequence.position = scroll.offset * sequenceLength;

      setScrollOffset(scroll.offset);
    });

    return null; // This component does not render anything visually
  };

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
};

export default Scene;
