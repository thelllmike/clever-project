// components/AnimatedHeading.jsx
import React from "react";
import { motion as m } from "framer-motion";

const textAnim = {
  hidden: (custom) => ({
    y: "110%",
    rotateZ: 10,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.85, 0, 0.15, 1],
      delay: custom * 0.075,
    },
  }),
  visible: (custom) => ({
    y: "0%",
    rotateZ: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.85, 0, 0.15, 1],
      delay: custom * 0.075,
    },
  }),
};

function AnimatedHeading() {
  return (
    <div className="flex flex-col flex-wrap">
      <h1 className="flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
        <m.span
          className="inline-block w-fit overflow-hidden"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Grow&nbsp;
        </m.span>
        <m.span
          className="inline-block w-fit overflow-hidden"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Your&nbsp;
        </m.span>
        <m.span
          className="inline-block w-fit overflow-hidden"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          Career&nbsp;
        </m.span>
        <m.span
          className="inline-block w-fit overflow-hidden"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          with
        </m.span>
      </h1>
      <h1 className="flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
        <m.span
          className="inline-block w-fit overflow-hidden"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          Our&nbsp;
        </m.span>
        <m.span
          className="w-fit overflow-hidden text-clever-purple"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          Digital&nbsp;
        </m.span>
        <m.span
          className="w-fit overflow-hidden text-clever-purple"
          variants={textAnim}
          initial="hidden"
          animate="visible"
          custom={7}
        >
          Wizards!
        </m.span>
      </h1>
    </div>
  );
}

export default AnimatedHeading;
