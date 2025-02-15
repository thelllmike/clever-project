import React from "react";
import Image from "next/image";

import { profile1 } from "../../public/images/profile_image_1.png";
import { fiverr } from "../../public/images/fiverr_logo.png";
// import { usFlags } from "/images/flags/US_flag.png";

const Carousel_card = ({ review }) => {
  return (
    <div className="flex w-full gap-[14px] rounded-lg bg-clever-gray-light p-[14px] md:gap-4 md:p-4">
      <div className="items-align-top flex">
        <div className="relative h-12 w-12 md:h-14 md:w-14">
          {review.profileImg !== "null" ? (
            <Image
              src={review.profileImg}
              layout="responsive"
              height={56}
              width={56}
              alt="profile image"
              className="rounded-full"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-clever-purple">
              <i class="uil uil-user text-4xl"></i>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[14px] md:gap-2">
        <div className="flex w-full flex-col items-start gap-1">
          <div className="relative flex w-full items-center justify-between">
            <h5 className="text-sm font-semibold uppercase text-clever-black lg:text-xl">
              {review.useName}
            </h5>
            <Image
              src="/images/fiverr_logo.png"
              height={24}
              width={24}
              alt="fiverr logo"
              className="h-[14px] w-auto lg:h-6 lg:w-6"
            />
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={review.flag}
              height={46}
              width={20}
              alt="us flag"
              className="w-[14px] lg:w-5"
            />
            <p className="text-sm font-light text-clever-black lg:text-base">
              {review.country}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="line-clamp-2 flex-1 text-sm text-clever-black">
            {review.review}
          </p>
          <div className="flex gap-1">
            <i class="uis uis-star text-base text-clever-purple"></i>
            <i class="uis uis-star text-base text-clever-purple"></i>
            <i class="uis uis-star text-base text-clever-purple"></i>
            <i class="uis uis-star text-base text-clever-purple"></i>
            <i class="uis uis-star text-base text-clever-purple"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel_card;
