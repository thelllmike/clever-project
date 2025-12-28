/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import VideoModal from "./VideoModalYouTube";

const ProductView = ({ name, img1, img2, img3, description, link, videoUrl }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // ✅ robust YouTube id (supports youtu.be + watch?v=)
  const getVideoId = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null;
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        if (id) return id;
        const parts = u.pathname.split("/");
        const embedIndex = parts.indexOf("embed");
        if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
      }
      return null;
    } catch {
      return null;
    }
  };

  const videoId = useMemo(() => getVideoId(videoUrl), [videoUrl]);
  const videoThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  // If video exists → add as first slide
  const images = videoThumbnail
    ? [
        { type: "video", src: videoThumbnail },
        { type: "image", src: img1 },
        { type: "image", src: img2 },
        { type: "image", src: img3 },
      ].filter((x) => x.src)
    : [{ type: "image", src: img1 }, { type: "image", src: img2 }, { type: "image", src: img3 }].filter(
        (x) => x.src
      );

  const prevImage = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setIndex((i) => (i + 1) % images.length);

  const onClickMedia = () => {
    if (images[index]?.type === "video" && videoUrl) setOpen(true);
  };

  return (
    <div className="m-1">
      <div className="flex h-[450px] w-[450px] flex-col rounded-lg border border-white">
        <div className="p-2">
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>

        <div className="relative flex w-full items-center justify-center">
          <img
            src={images[index]?.src}
            alt={`${name} image ${index + 1}`}
            className={`h-[240px] w-[450px] object-cover ${
              images[index]?.type === "video" ? "cursor-pointer" : ""
            }`}
            onClick={onClickMedia}
          />

          {/* play badge */}
          {images[index]?.type === "video" && (
            <button
              onClick={() => setOpen(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
              type="button"
            >
              <div className="rounded-full bg-black/60 px-4 py-3 text-white">
                ▶ Play
              </div>
            </button>
          )}

          <button onClick={prevImage} className="absolute left-2 rounded-lg p-2">
            <FaArrowLeft />
          </button>

          <button onClick={nextImage} className="absolute right-2 rounded-lg p-2">
            <FaArrowRight />
          </button>
        </div>

        <p className="mt-2 p-2">{description}</p>

        <div className="flex justify-center">
          <a
            href={link}
            className="rounded-full border border-purple-500 bg-[#2a2340] px-6 py-2 text-[20px] text-white transition-all duration-300 hover:bg-purple-500 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      </div>

      {/* ✅ Modal plays inside the site */}
      <VideoModal open={open} onClose={() => setOpen(false)} videoUrl={videoUrl} title={name} />
    </div>
  );
};

export default ProductView;