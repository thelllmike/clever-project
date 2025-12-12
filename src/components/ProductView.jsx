import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductView = ({ name, img1, img2, img3, description, link, videoUrl }) => {
  
  // Extract YouTube ID from various URL formats
  const getVideoId = (url) => {
    if (!url) return null;
    
    try {
      // Handle youtu.be short links
      if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1]?.split("?")[0] || null;
      }
      
      // Handle youtube.com full links
      if (url.includes("youtube.com")) {
        const params = new URLSearchParams(new URL(url).search);
        return params.get("v");
      }
      
      // Handle direct video IDs (11 character alphanumeric strings)
      if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
        return url;
      }
      
      return null;
    } catch (error) {
      console.warn("Invalid YouTube URL:", url, error);
      return null;
    }
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
    <div className="m-1">
      <div className="flex flex-col border border-white rounded-lg w-[450px] h-[500px] bg-gradient-to-b from-transparent to-black/60 overflow-hidden relative group">
        {/* Image/Video with Carousel Controls */}
        <div className="relative w-full h-[350px] flex items-center justify-center bg-black/40">
          <img
            src={images[index].src}
            alt={`${name} image ${index + 1}`}
            className={`w-full h-full object-cover ${images[index].type === "video" ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
            onClick={openVideo}
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 p-2 rounded-lg bg-white/20 hover:bg-white/40 transition-colors"
            aria-label="Previous image"
          >
            <FaArrowLeft className="text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 p-2 rounded-lg bg-white/20 hover:bg-white/40 transition-colors"
            aria-label="Next image"
          >
            <FaArrowRight className="text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {index + 1}/{images.length}
          </div>
        </div>

        {/* Card Content Overlay */}
        <div className="flex flex-col justify-between flex-1 p-4 text-white">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold mb-2 line-clamp-2">{name}</h2>

            {/* Description */}
            <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
          </div>

          {/* View Project Button */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 border border-purple-500 rounded-full bg-purple-600/30 text-white font-semibold hover:bg-purple-600 hover:border-purple-400 transition-all duration-300 text-center text-sm"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
