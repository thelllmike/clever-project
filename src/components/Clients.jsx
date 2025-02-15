import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion as m } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import CarouselCard from "./CarouselCard";

import spotify from "../../public/images/spotify.png";
import google from "../../public/images/Google.png";
import airbnb from "../../public/images/airbnb.png";

const Clients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Import the JSON file
    const loadData = async () => {
      try {
        // Assuming your JSON file is in the public directory
        const response = await import("../data/reviews.json");
        setData(response.default);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };

    loadData();
  }, []);

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

  return (
    <>
      <div className="mt-[80px] flex h-[calc(100vh-80px)] w-screen flex-col items-center justify-start gap-16 lg:mt-[150px] lg:h-[calc(100vh-150px)] lg:gap-[16vh]">
        <div className="flex flex-col items-center justify-start gap-14 lg:gap-14">
          <div className="relative mx-auto h-fit px-6 text-center lg:w-[720px] lg:px-0">
            <p className="absolute left-16 top-4 -translate-y-[90%] -rotate-[60deg] font-zeyada text-3xl text-clever-purple smallest:left-4 sm:left-4 md:left-6 lg:top-[40%] lg:text-[40px] xl:left-2">
              Our
            </p>
            <h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={1}
              >
                Clients&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden text-clever-purple"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={2}
              >
                smiles&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={3}
              >
                and&nbsp;
              </m.span>
            </h1>
            <h1 className="inline-flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
              <m.span
                className="inline-block w-fit overflow-hidden"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={4}
              >
                partners&nbsp;
              </m.span>
              <m.span
                className="inline-block w-fit overflow-hidden text-clever-purple"
                variants={textAnim}
                initial="hidden"
                whileInView="visible"
                custom={5}
              >
                nods
                <span className="text-clever-gray-light">!</span>
              </m.span>
            </h1>
          </div>
          <div className="relative flex w-screen items-center justify-center px-6 lg:px-0">
            <div className="absolute left-0 top-0 z-[2] hidden h-full w-[20vw] bg-gradient-to-r from-clever-black from-0% via-clever-black to-transparent to-80% md:block"></div>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={4}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1440: {
                  slidesPerView: 4,
                },
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
            >
              {data.map((review, index) => (
                <SwiperSlide key={index}>
                  <CarouselCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute right-0 top-0 z-[2] hidden h-full w-[20vw] bg-gradient-to-l from-clever-black from-0% via-clever-black to-transparent to-80% md:block"></div>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <Image
            src={spotify}
            className="h-14 w-auto"
            alt="Spotify"
            height={56}
            width={175}
          />
          <Image
            src={google}
            className="h-14 w-auto"
            alt="Google"
            height={56}
            width={175}
          />
          <Image
            src={airbnb}
            className="h-14 w-auto"
            alt="AirBnb"
            height={56}
            width={175}
          />
        </div>
      </div>
    </>
  );
};

export default Clients;
