import {
  motion as m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import React, { useEffect } from "react";

const Feilds = ({ scrollOffset }) => {
  // Create a motion value to track the scroll offset
  const scrollOffsetValue = useMotionValue(scrollOffset);

  // Get the velocity of the scroll motion
  const scrollVelocity = useVelocity(scrollOffsetValue);

  // Continuously update scrollOffsetValue whenever scrollOffset changes
  useEffect(() => {
    scrollOffsetValue.set(scrollOffset);
  }, [scrollOffset, scrollOffsetValue]);

  const clampedValue = useTransform(scrollVelocity, (v) => {
    const sign = Math.sign(v); // Get the direction of the velocity (-1, 0, 1)
    return sign * 20; // Snap to -10, 0, or 10
  });
  // Apply spring for smooth transitions between clamped values
  const skewValue = useSpring(clampedValue, { stiffness: 10, damping: 10 });

  const feilds = [
    "SOFTWARE DEVELOPMENT",
    "e-commerce solutions",
    "DevOps",
    "IAM",
    "Machine Learning",
    "mobile app development",
    "UI/UX Design",
    "Research and Development",
    "Blockchain Technology",
    "Network and Security Solutions",
  ];

  // Log the velocity changes using useMotionValueEvent
  // useMotionValueEvent(skewValue, "change", (latest) => {
  //   console.log("Scroll velocity:", latest);
  // });

  // style={{ transform: `skewX(${skewValue}deg)` }}  this is not skewing text

  return (
    <div className="relative flex h-[200vh] w-screen justify-center overflow-hidden">
      <div className="z-[2] mx-auto h-full px-6 lg:h-fit lg:w-[1320px]">
        <div className="w-full max-w-none lg:max-w-[40vw]">
          <ul className="flex flex-col items-center gap-8 lg:items-start lg:gap-[6vh]">
            {feilds.map((feild, index) => (
              <m.li
                key={index}
                style={{ skewX: skewValue }}
                className="text-center text-5xl font-bold uppercase leading-[8vh] text-clever-gray-light lg:text-start lg:text-[4vw]"
              >
                {feild}
              </m.li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute block h-[200vh] w-screen bg-gradient-to-b from-transparent from-0% via-[#191919c0] to-transparent to-95% lg:hidden"></div>
    </div>
  );
};

export default Feilds;
