import React from "react";
import Image from "next/image";

import Head from "next/head";
import { FooterMin } from "@/components/FooterMin";
import python from "../../../public/images/languages/python-original.svg";
// Note: avoid wrapping this page with the client-only `Cover` component
// to prevent server/client hydration mismatches.
import ProductView from "@/components/ProductView";

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Contact page" />
      </Head>
        <div className="mt-[115px] flex h-full flex-col items-center justify-center gap-8 md:gap-12 lg:mt-[150px]">
          <div className="flex w-full max-w-[1320px] flex-col items-center justify-center gap-6 px-6 sm:mx-auto md:gap-10 lg:p-0">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/1UJp7SipkNE?si=BZiCPmpIbbKE4uCF"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <div className="flex w-full flex-col items-center gap-8">
              <h1 className="text-2xl text-clever-gray-light lg:text-4xl">
                Projects
              </h1>
              <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
                {/* <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard /> */}
                
                <ProductView name="Product 1" img1="/img/i1.png" img2="/img/i2.png" img3="/img/i3.png" description="Description for Product 1" link="/products/product-1" videoUrl="https://youtu.be/nfibyKEB6io" />
                <ProductView name="Product 1" img1="/img/i1.png" img2="/img/i2.png" img3="/img/i3.png" description="Description for Product 1" link="/products/product-1" videoUrl="https://www.youtube.com/watch?v=McluqmRIvjs" />
                <ProductView name="Product 1" img1="/img/i1.png" img2="/img/i2.png" img3="/img/i3.png" description="Description for Product 1" link="/products/product-1" videoUrl="https://youtu.be/nfibyKEB6io" />
              </div>
            </div>
          </div>
        </div>
        <FooterMin />
    </>
  );
};

export default ProjectsPage;

export const ProjectsCard = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-clever-gray-light px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold uppercase text-clever-gray-light md:text-2xl">
              project 1
            </h4>
            <div className="flex items-center gap-2">
              <Image src={python} alt="project1" className="h-4 w-4" />
              <p className="text-sm md:text-base">Python</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Gravida blandit leo cras
            commodo sem neque feugiat nam. Vitae eu consequat imperdiet sem.
          </p>
        </div>
        <button className="w-fit rounded-full border border-clever-purple bg-clever-purple bg-opacity-15 px-4 py-2 text-xl text-clever-gray-light duration-300 ease-in-out hover:bg-opacity-100 hover:text-clever-black">
          View Project
        </button>
      </div>
    </>
  );
};
