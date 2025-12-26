/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductView = ({ name, img1, img2, img3, description, link, videoUrl }) => {
  
  // Extract YouTube ID
  const getVideoId = (url) => {
    const params = new URLSearchParams(new URL(url).search);
    return params.get("v");
  };

  const videoId = videoUrl ? getVideoId(videoUrl) : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  // If video exists → add as first slide
  const images = videoThumbnail
    ? [{ type: "video", src: videoThumbnail }, { type: "image", src: img1 }, { type: "image", src: img2 }, { type: "image", src: img3 }]
    : [{ type: "image", src: img1 }, { type: "image", src: img2 }, { type: "image", src: img3 }];

  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((index + 1) % images.length);
  };

  const openVideo = () => {
    if (videoId && images[index].type === "video") {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    }
  };

  return (
    <div className="m-1 ">
      <div className="flex flex-col border border-white  rounded-lg w-[450px] h-[450px]">
        <div className="p-2">
        <h2 className="text-lg font-semibold">{name}</h2>
       </div>
        
        <div className="relative w-full flex items-center justify-center">
          <img
            src={images[index].src}
            alt={`${name} image ${index + 1}`}
            className={`w-[450px] h-[240px] ${images[index].type === "video" ? "cursor-pointer" : ""}`}
            onClick={openVideo}
          />

          <button
            onClick={prevImage}
            className="absolute left-2 p-2 rounded-lg"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 p-2 rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>

        
        <p className="mt-2 p-2">{description}</p>

        
        <div className="flex justify-center">
          <a
            href={link}
            className="px-6 py-2 border border-purple-500 rounded-full bg-[#2a2340] text-white text-[20px] hover:bg-purple-500 hover:text-white transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
