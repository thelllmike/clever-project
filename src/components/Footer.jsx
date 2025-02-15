import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion";

import facebook from "../../public/images/social/Facebook.png";
import insta from "../../public/images/social/Instagram.png";
import linkedin from "../../public/images/social/LinkedIn.png";
import youtube from "../../public/images/social/Youtube.png";
import x from "../../public/images/social/x.png";
import Button from "./Button";

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

const Footer = () => {
  return (
    <div className="mt-[80px] flex h-[calc(100vh-80px)] w-screen flex-col items-center justify-between lg:mt-[150px] lg:h-[calc(100vh-150px)]">
      <div className="flex flex-col items-center justify-start gap-[10vh]">
        <div className="relative mx-auto h-fit px-6 text-center lg:max-w-[1080px] lg:px-0">
          <h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[10vw] font-bold uppercase leading-none lg:text-[4vw]">
            <m.span
              className="w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={1}
            >
              Locked&nbsp;
            </m.span>
            <m.span
              className="w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={2}
            >
              and&nbsp;
            </m.span>
            <m.span
              className="w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={3}
            >
              loaded&nbsp;
            </m.span>
            <m.span
              className="w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={4}
            >
              for&nbsp;
            </m.span>
          </h1>
          <h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[10vw] font-bold uppercase leading-none lg:text-[4vw]">
            <m.span
              className="inline-block w-fit overflow-hidden break-all text-clever-purple"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={5}
            >
              collaboration?&nbsp;
            </m.span>
          </h1>
          <h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[10vw] font-bold uppercase leading-none lg:text-[4vw]">
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={6}
            >
              Let&#39;s&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={7}
            >
              deploy&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={8}
            >
              some&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={9}
            >
              tech&nbsp;
            </m.span>
          </h1>
          <h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[10vw] font-bold uppercase leading-none lg:text-[4vw]">
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={10}
            >
              magic&nbsp;
            </m.span>
            <m.span
              className="inline-block w-fit overflow-hidden"
              variants={textAnim}
              initial="hidden"
              whileInView="visible"
              custom={11}
            >
              together!
            </m.span>
          </h1>
        </div>
        <Button text="Deploy" />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-2 px-6 pb-4 lg:flex-nowrap lg:gap-8 lg:px-0">
        <Link
          target="_blank"
          href={"https://www.facebook.com/cleverprojects"}
          className="flex w-fit items-center gap-2 text-[16px] uppercase text-clever-gray-light underline-offset-4 hover:underline lg:w-auto lg:gap-4 lg:text-2xl"
        >
          <Image
            src={facebook}
            alt="Facebook"
            className="h-4 w-4 lg:h-8 lg:w-8"
            height={32}
            width={32}
          />
          cleverprojects
        </Link>
        <Link
          target="_blank"
          href={"https://www.instagram.com/clever.project"}
          className="lg: flex w-fit items-center gap-2 text-[16px] uppercase text-clever-gray-light underline-offset-4 hover:underline lg:w-auto lg:gap-4 lg:text-2xl"
        >
          <Image
            src={insta}
            alt="Instagram"
            className="h-4 w-4 lg:h-8 lg:w-8"
            height={32}
            width={32}
          />
          @clever.project
        </Link>
        <Link
          target="_blank"
          href={"http://www.youtube.com/@Clever.Project"}
          className="flex w-fit items-center gap-2 text-[16px] uppercase text-clever-gray-light underline-offset-4 hover:underline lg:w-auto lg:gap-4 lg:text-2xl"
        >
          <Image
            src={youtube}
            alt="YouTube"
            className="h-4 w-4 lg:h-8 lg:w-8"
            height={32}
            width={32}
          />
          @Clever.Project
        </Link>
        <Link
          target="_blank"
          href={"https://www.linkedin.com/company/cleverprojects/"}
          className="flex w-fit items-center gap-2 text-[16px] uppercase text-clever-gray-light underline-offset-4 hover:underline lg:w-auto lg:gap-4 lg:text-2xl"
        >
          <Image
            src={linkedin}
            alt="LinkedIn"
            className="h-4 w-4 lg:h-8 lg:w-8"
            height={32}
            width={32}
          />
          @cleverprojects
        </Link>
        <Link
          target="_blank"
          href={"https://x.com/cleverprojectlk"}
          className="flex w-fit items-center gap-2 text-[16px] uppercase text-clever-gray-light underline-offset-4 hover:underline lg:w-auto lg:gap-4 lg:text-2xl"
        >
          <Image
            src={x}
            alt="x"
            className="h-4 w-4 lg:h-8 lg:w-8"
            height={32}
            width={32}
          />
          @cleverprojects
        </Link>
      </div>
    </div>
  );
};

export default Footer;
