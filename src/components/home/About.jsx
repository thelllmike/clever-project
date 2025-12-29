import React from "react";
import Image from "next/image";
import { motion as m } from "framer-motion";

import hero from "../../public/images/hero.png";

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

const About = () => {
  return (
    <div className="relative mt-[80px] flex h-[calc(100vh-80px)] flex-col lg:mt-[140px] lg:h-[calc(100vh-140px)]">
      <div className="static flex h-1/2 w-auto justify-center overflow-clip lg:absolute lg:left-0 lg:top-0 lg:ml-[3vw] lg:h-[calc(100vh-150px)] lg:items-end lg:justify-end">
        <Image className="h-full w-auto bg-cover" src={hero} alt="hero" />
      </div>
      {/* TODO : image animation to mouse hover  */}
      <div className="flex h-1/4 justify-center px-6 lg:h-1/2 lg:px-0">
        <div className="flex items-end justify-center p-0 lg:w-[1320px] lg:items-end lg:justify-end">
          <div className="lg:w-[35vw]">
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[95%] text-clever-gray-light lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={1}
              >
                To&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={2}
              >
                curate&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={3}
              >
                the&nbsp;
              </m.span>
            </h1>
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[95%] text-clever-gray-light lg:w-[35vw] lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={4}
              >
                above&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={5}
              >
                list,
              </m.span>
            </h1>
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[95%] text-clever-gray-light lg:w-[35vw] lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={6}
              >
                we&apos;ve
              </m.span>
            </h1>
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[95%] text-clever-gray-light lg:w-[35vw] lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={7}
              >
                assembled&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={8}
              >
                a
              </m.span>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex h-1/4 justify-center bg-clever-gray-light px-6 lg:h-1/2 lg:px-0">
        <div className="flex items-start justify-center p-0 lg:w-[1320px] lg:items-start lg:justify-end">
          <div className="lg:w-[35vw]">
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[101%] text-clever-black lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={1}
              >
                team&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={2}
              >
                of
              </m.span>
            </h1>
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[101%] text-clever-black lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={3}
              >
                exceptionally
              </m.span>
            </h1>
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[101%] text-clever-black lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={4}
              >
                skilled
              </m.span>
            </h1>
            <h1 className="overflow-hidden text-center font-jost text-[10vw] font-bold uppercase leading-[101%] text-clever-black lg:text-end lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={5}
              >
                individuals.
              </m.span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
