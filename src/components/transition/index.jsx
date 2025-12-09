"use client";

import React from "react";
import { motion as m } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

export default function Cover({ children }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const slideInOutAnim = {
    hidden: (custom) => ({
      y: "-130%",
      transition: {
        duration: 2,
        ease: [0.85, 0, 0.15, 1],
        delay: custom === 1 ? 0.1 : 0.3,
      },
    }),
    visible: (custom) => ({
      y: 0,
      transition: {
        duration: 2,
        ease: [0.85, 0, 0.15, 1],
        delay: custom === 2 ? 0.1 : 0.3,
      },
    }),
  };

  const textAnim = {
    hidden: {
      y: "-110%",
      rotateZ: -10,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.85, 0, 0.15, 1],
      },
    },
    visible: {
      y: "0%",
      rotateZ: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.85, 0, 0.15, 1],
      },
    },
    exit: {
      y: "-110%",
      rotateZ: -10,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.85, 0, 0.15, 1],
      },
    },
  };

  const pathname = usePathname();

  const links = {
    "/": "Home",
    "/Contact": "Contact",
    "/Projects": "Projects",
    "/Products": "PRODUCTS",
    "/Careers": "CAREERS",
  };
  return (
    <div>
      {!isMobile && (
        <>
          <m.div
            custom={1}
            initial="visible"
            animate="hidden"
            exit="visible"
            variants={slideInOutAnim}
            className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-clever-black"
          >
            <div className="w-fit overflow-hidden">
              <m.h1
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={textAnim}
                className="text-[8vw] font-semibold uppercase text-clever-gray-light"
              >
                {links[pathname]}
              </m.h1>
            </div>
          </m.div>
          <m.div
            custom={2}
            initial="visible"
            animate="hidden"
            exit="visible"
            variants={slideInOutAnim}
            className="absolute left-0 top-0 z-40 h-screen w-screen bg-clever-purple"
          ></m.div>
        </>
      )}
      {children}
    </div>
  );
}
