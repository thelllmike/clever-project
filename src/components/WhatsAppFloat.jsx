"use client";

import React, { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useAnimationControls } from "framer-motion";

export default function WhatsAppFloat() {
  const controls = useAnimationControls();

  useEffect(() => {
    const run = async () => {
      // quick attention animation
      await controls.start({
        y: [0, -6, 0],
        rotate: [0, -8, 8, -6, 6, 0],
        transition: { duration: 0.9, ease: "easeInOut" },
      });
    };

    // run once on load (optional)
    run();

    const interval = setInterval(run, 10000); // every 10s
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.a
      href="https://wa.me/94704057137"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg"
      animate={controls}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
{/* 
         return (
    <motion.a
      href="https://wa.me/94704057137"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg"
      animate={controls}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    ></motion.a> */}
      <FaWhatsapp className="text-3xl text-white" />
    </motion.a>
  );
}