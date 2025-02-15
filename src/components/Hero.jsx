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
  exit: (custom) => ({
    y: "-110%",
    rotateZ: -10,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.85, 0, 0.15, 1],
      delay: (links.length - custom) * 0.05,
    },
  }),
};

const parentVariants = {
  hide: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4, // Stagger delay between each child
    },
  },
};

const Hero = () => {
  return (
    <>
      <div className="mt-[80px] flex h-[calc(100vh-80px)] w-screen justify-center lg:mt-[150px] lg:h-[calc(100vh-150px)]">
        <div className="relative mx-auto mt-6 flex h-fit flex-col px-7 text-center lg:mt-0 lg:p-0">
          <m.h1
            className="inline-flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]"
            initial="hide"
            animate="show"
            variants={parentVariants}
          >
            <span className="absolute -top-4 left-9 -rotate-[30deg] font-zeyada text-3xl font-normal normal-case text-clever-purple md:left-4 md:top-5 lg:text-[2vw]">
              We are
            </span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              tech-savvy&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              pals,
            </m.span>
          </m.h1>
          <m.h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              always&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              ready to&nbsp;
            </m.span>
          </m.h1>
          <m.h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
            <m.span
              className="inline-block w-fit overflow-hidden text-clever-purple"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              sprinkle&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              a bit of&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden text-clever-purple"
              variants={textAnim}
              initial="hidden"
              animate="visible"
              custom={7}
            >
              magic
            </m.span>
          </m.h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
