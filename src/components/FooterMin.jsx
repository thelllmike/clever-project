import React from "react";
import Image from "next/image";
import Link from "next/link";

import facebook from "../../public/images/social/Facebook.png";
import insta from "../../public/images/social/Instagram.png";
import linkedin from "../../public/images/social/LinkedIn.png";
import youtube from "../../public/images/social/Youtube.png";
import x from "../../public/images/social/x.png";

export const FooterMin = () => {
  return (
    <>
      <footer className="relative bottom-0 mx-auto mt-12 flex w-full max-w-[1320px] flex-col-reverse items-center gap-2 p-6 pb-3 sm:flex-row sm:justify-between">
        <p className="text-base font-light uppercase">
          &#169; clever projects 2025
        </p>
        <div className="flex items-center justify-center gap-8">
          <Link target="_blank" href="https://www.facebook.com/cleverprojects">
            <Image
              src={facebook}
              alt="Facebook"
              height={32}
              width={32}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/clever.project">
            <Image
              src={insta}
              alt="Instagram"
              height={32}
              width={32}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          </Link>
          <Link target="_blank" href="http://www.youtube.com/@Clever.Project">
            <Image
              src={youtube}
              alt="YouTube"
              height={32}
              width={32}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/company/cleverprojects/"
          >
            <Image
              src={linkedin}
              alt="LinkedIn"
              height={32}
              width={32}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          </Link>
          <Link target="_blank" href="https://x.com/cleverprojectlk">
            <Image
              src={x}
              alt="x"
              height={32}
              width={32}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          </Link>
        </div>
      </footer>
    </>
  );
};
