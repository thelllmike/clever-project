"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { easeInOut, motion as m } from "framer-motion";
import dynamic from "next/dynamic";
// import Lottie from "lottie-react";
import { AnimatePresence } from "framer-motion";

import logo from "../../public/images/logo.png";
import menuIconAnim from "../../public/anims/hamburgurIocn.json";
import { FooterMin } from "./FooterMin";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Nav = () => {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuIconRef = useRef(null);

  useEffect(() => {
    setCurrentPath(pathname); // Ensure consistency between client and server
  }, [pathname]);

  const handleMenu = () => {
    if (menuIconRef.current) {
      if (!menuOpen) {
        menuIconRef.current.playSegments([0, 80], true);
      } else {
        menuIconRef.current.playSegments([80, 0], true);
      }
      setMenuOpen(!menuOpen);
    }
  };

  const links = [
    { href: "/Contact", label: "Contact" },
    { href: "/Projects", label: "Projects" },
    { href: "/Products", label: "PRODUCTS" },
    { href: "/Careers", label: "CAREERS" },
  ];

  return (
    <div
      className={clsx(
        "left-0 top-0 z-10 w-screen bg-clever-black",
        { absolute: currentPath === "/" },
        { sticky: currentPath !== "/" },
      )}
    >
      <div className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 text-[24px] font-medium uppercase leading-6 lg:px-3 lg:py-8">
        <m.ul layout className="hidden list-none gap-16 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 text-clever-gray-light",
                {
                  "text-clever-purple": currentPath === link.href,
                },
              )}
            >
              {currentPath === link.href && (
                <m.span
                  layoutId="dot"
                  className="h-2 w-2 rounded-full bg-clever-purple"
                ></m.span>
              )}
              {link.label}
            </Link>
          ))}
        </m.ul>
        <button
          title="Mobile Menu"
          className="block lg:hidden"
          onClick={handleMenu}
        >
          <Lottie
            lottieRef={menuIconRef}
            animationData={menuIconAnim}
            autoplay={false}
            loop={false}
          />
        </button>
        <div className="bg-clever-gray-light p-1 lg:p-[10px]">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              height={64}
              width={64}
              className="h-10 w-10 lg:h-16 lg:w-16"
            />
          </Link>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {menuOpen ? (
          <MobileMenu
            navLinks={links}
            currentPath={currentPath}
            menuHandler={menuOpen}
            handleMenuTrigger={handleMenu}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Nav;

export const MobileMenu = ({
  navLinks,
  currentPath,
  menuHandler,
  handleMenuTrigger,
}) => {
  const links = navLinks;
  const delay = 1200;

  const [animationState, setAnimationState] = useState("hidden");

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
    hidden: (custom) => ({
      y: "110%",
      rotateZ: 10,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.85, 0, 0.15, 1],
        delay: custom * 0.1,
      },
    }),
    visible: (custom) => ({
      y: "0%",
      rotateZ: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.85, 0, 0.15, 1],
        delay: custom * 0.1,
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

  useEffect(() => {
    if (menuHandler) {
      const timer = setTimeout(() => {
        setAnimationState("visible");
      }, delay);
      return () => clearTimeout(timer); // Clean up timeout on unmount or change
    } else {
      setAnimationState("hidden");
    }
  }, [menuHandler, delay]);

  return (
    <>
      <m.div
        custom={1}
        variants={slideInOutAnim}
        initial="hidden"
        animate={menuHandler ? "visible" : "hidden"}
        exit="hidden"
        className="fixed left-0 z-10 flex h-[calc(100%-80px)] w-screen flex-col justify-between bg-clever-black p-6"
      >
        <div className="flex flex-col items-center justify-start gap-16">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 overflow-hidden text-2xl font-medium uppercase text-clever-gray-light",
                {
                  "text-clever-purple": currentPath === link.href,
                },
              )}
              onClick={handleMenuTrigger}
            >
              <m.span
                custom={index}
                variants={textAnim}
                initial="hidden"
                animate={animationState === "visible" ? "visible" : "hidden"}
                exit="exit"
                className="origin-top-left"
              >
                {link.label}
              </m.span>
            </Link>
          ))}
        </div>
        <m.div
          initial={{
            y: "100%",
            opacity: 0,
            transition: { duration: 1, delay: 2, easeInOut },
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 1, delay: 2, easeInOut },
          }}
          exit={{
            y: "100%",
            opacity: 0,
            transition: { duration: 1, easeInOut },
          }}
        >
          <FooterMin />
        </m.div>
      </m.div>
      <m.div
        custom={2}
        variants={slideInOutAnim}
        initial="hidden"
        animate={menuHandler ? "visible" : "hidden"}
        exit="hidden"
        className="top-[calc(100vh - 80px)] fixed left-0 h-screen w-screen bg-clever-purple p-6"
      ></m.div>
    </>
  );
};
