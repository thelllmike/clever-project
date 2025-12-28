"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { easeInOut, motion as m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import menuIconAnim from "../../public/anims/hamburgurIocn.json";
import { FooterMin } from "./FooterMin";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Nav({ overlay = false }) {
  const pathname = usePathname();

  const [currentPath, setCurrentPath] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ detect mobile so overlay won't be transparent
  const [isMobile, setIsMobile] = useState(false);

  const menuIconRef = useRef(null);

  useEffect(() => setCurrentPath(pathname), [pathname]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // scroll glass effect (desktop overlay only)
  useEffect(() => {
    if (!overlay || isMobile) return;

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay, isMobile]);

  const handleMenu = () => {
    if (!menuIconRef.current) return;

    if (!menuOpen) menuIconRef.current.playSegments([0, 80], true);
    else menuIconRef.current.playSegments([80, 0], true);

    setMenuOpen((v) => !v);
  };

  const RotatingWord = ({
    words = [
      { text: "Project", className: "text-white" },
      { text: "People", className: "text-clever-purple" },
      { text: "Inovation", className: "text-clever-purple" },
    ],
    interval = 2200,
  }) => {
    const [i, setI] = useState(0);

    useEffect(() => {
      const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
      return () => clearInterval(t);
    }, [interval, words.length]);

    const current = words[i];
    const maxLen = Math.max(...words.map((w) => w.text.length));

    // ✅ fixed line-height + fixed width so it doesn't jump
    return (
      <span
        className="relative inline-flex h-[1em] overflow-hidden leading-none"
        style={{ width: `${maxLen}ch` }}
      >
        <AnimatePresence mode="wait">
          <m.span
            key={current.text}
            initial={{ rotateX: 90, y: "0.55em", opacity: 0 }}
            animate={{ rotateX: 0, y: "0em", opacity: 1 }}
            exit={{ rotateX: -90, y: "-0.55em", opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 50%", display: "inline-block" }}
            className={`inline-block leading-none ${current.className}`}
          >
            {current.text}
          </m.span>
        </AnimatePresence>
      </span>
    );
  };

  const links = [
    { href: "/Contact", label: "Contact" },
    { href: "/Projects", label: "Projects" },
    { href: "/Products", label: "PRODUCTS" },
    { href: "/Careers", label: "CAREERS" },
  ];

  // ✅ NAV BACKGROUND RULES
  // - Mobile: always black
  // - Desktop overlay: transparent at top, glass on scroll
  // - Non-overlay pages: normal clever black
  const navBgClass = overlay
    ? isMobile
      ? "bg-clever-black"
      : scrolled
      ? "backdrop-blur-md bg-clever-black/60"
      : "bg-transparent"
    : "bg-clever-black";

  return (
    <div
      className={clsx(
        "left-0 top-0 w-screen transition-colors duration-300",
        overlay ? "fixed z-50" : clsx("z-10", { absolute: currentPath === "/" }, { sticky: currentPath !== "/" }),
        navBgClass,
        overlay && menuOpen && "bg-clever-black"
      )}
    >
      <div className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 text-[24px] font-medium uppercase leading-6 lg:px-3 lg:py-8">
        {/* Desktop links */}
        <m.ul layout className="hidden list-none gap-16 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx("flex items-center gap-2 text-clever-gray-light", {
                "text-clever-purple": currentPath === link.href,
              })}
            >
              {currentPath === link.href && (
                <m.span layoutId="dot" className="h-2 w-2 rounded-full bg-clever-purple" />
              )}
              {link.label}
            </Link>
          ))}
        </m.ul>

        {/* Mobile menu button */}
        <button title="Mobile Menu" className="block lg:hidden" onClick={handleMenu}>
          <Lottie lottieRef={menuIconRef} animationData={menuIconAnim} autoplay={false} loop={false} />
        </button>

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-base font-bold uppercase leading-none lg:text-xl">
            <span className="text-white leading-none">Clever</span>
            <RotatingWord />
          </div>
        </Link>
      </div>

      {/* Mobile menu */}
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
}

export const MobileMenu = ({ navLinks, currentPath, menuHandler, handleMenuTrigger }) => {
  const links = navLinks;
  const delay = 250; // ✅ faster on mobile (was 1200)
  const [animationState, setAnimationState] = useState("hidden");

  const slideInOutAnim = {
    hidden: (custom) => ({
      y: "-130%",
      transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: custom === 1 ? 0.05 : 0.15 },
    }),
    visible: (custom) => ({
      y: 0,
      transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1], delay: custom === 2 ? 0.05 : 0.15 },
    }),
  };

  const textAnim = {
    hidden: (custom) => ({
      y: "110%",
      rotateZ: 10,
      opacity: 0,
      transition: { duration: 0.45, ease: [0.85, 0, 0.15, 1], delay: custom * 0.06 },
    }),
    visible: (custom) => ({
      y: "0%",
      rotateZ: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.85, 0, 0.15, 1], delay: custom * 0.06 },
    }),
    exit: (custom) => ({
      y: "-110%",
      rotateZ: -10,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.85, 0, 0.15, 1], delay: (links.length - custom) * 0.03 },
    }),
  };

  useEffect(() => {
    if (menuHandler) {
      const timer = setTimeout(() => setAnimationState("visible"), delay);
      return () => clearTimeout(timer);
    }
    setAnimationState("hidden");
  }, [menuHandler]);

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
        <div className="flex flex-col items-center justify-start gap-10">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 overflow-hidden text-2xl font-medium uppercase text-clever-gray-light",
                { "text-clever-purple": currentPath === link.href }
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
          initial={{ y: "100%", opacity: 0, transition: { duration: 0.6, delay: 0.7, ease: easeInOut } }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.7, ease: easeInOut } }}
          exit={{ y: "100%", opacity: 0, transition: { duration: 0.35, ease: easeInOut } }}
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
        className="fixed left-0 top-[calc(100vh-80px)] h-screen w-screen bg-clever-purple p-6"
      />
    </>
  );
};