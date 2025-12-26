"use client";

import React, { useRef } from "react";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function HoverImageLinks() {
  return (
    <section className="bg-clever-black px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1320px]">
        <HoverLink
          heading="About"
          subheading="Learn what we do here"
          imgSrc="/img/hover/i1.png"
          href="/About"
        />
        <HoverLink
          heading="Clients"
          subheading="We work with great people"
          imgSrc="/img/hover/i1.png"
          href="/#clients"
        />
        <HoverLink
          heading="Projects"
          subheading="Our work speaks for itself"
          imgSrc="/img/hover/i1.png"
          href="/Projects"
        />
        <HoverLink
          heading="Careers"
          subheading="We want cool people"
          imgSrc="/img/hover/i2.png"
          href="/Careers"
        />
        <HoverLink
          heading="Contact"
          subheading="Let’s build something together"
          imgSrc="/img/hover/i2.png"
          href="/Contact"
        />
      </div>
    </section>
  );
}

function HoverLink({ heading, imgSrc, subheading, href }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative border-b border-neutral-700 py-6 md:py-10"
    >
      <Link href={href} className="flex items-center justify-between">
        <div>
          <motion.span
            variants={{ initial: { x: 0 }, whileHover: { x: -16 } }}
            transition={{ type: "spring", staggerChildren: 0.04, delayChildren: 0.05 }}
            className="relative z-10 block text-4xl font-bold uppercase text-clever-gray-light/60 transition-colors duration-300 group-hover:text-clever-gray-light md:text-6xl"
          >
            {heading.split("").map((l, i) => (
              <motion.span
                key={i}
                variants={{ initial: { x: 0 }, whileHover: { x: 16 } }}
                transition={{ type: "spring" }}
                className="inline-block"
              >
                {l}
              </motion.span>
            ))}
          </motion.span>

          <span className="relative z-10 mt-2 block text-sm text-clever-gray-light/60 transition-colors duration-300 group-hover:text-clever-gray-light md:text-base">
            {subheading}
          </span>
        </div>

        <motion.div
          variants={{ initial: { x: "25%", opacity: 0 }, whileHover: { x: "0%", opacity: 1 } }}
          transition={{ type: "spring" }}
          className="relative z-10 p-3"
        >
          <FiArrowRight className="text-4xl text-clever-gray-light md:text-5xl" />
        </motion.div>
      </Link>

      {/* hover image */}
      <motion.img
        style={{ top, left, translateX: "-50%", translateY: "-50%" }}
        variants={{ initial: { scale: 0, rotate: "-12deg" }, whileHover: { scale: 1, rotate: "12deg" } }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        src={imgSrc}
        className="pointer-events-none absolute z-0 hidden h-28 w-40 rounded-xl object-cover md:block md:h-48 md:w-72"
        alt={heading}
      />
    </motion.div>
  );
}