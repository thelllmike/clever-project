import React from "react";
import Image from "next/image";

import Head from "next/head";
import { FooterMin } from "@/components/FooterMin";
import python from "../../../public/images/languages/python-original.svg";
import Cover from "@/components/transition";

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Contact page" />
      </Head>
      <Cover>
        <div className="mt-[115px] flex h-full flex-col items-center justify-center gap-8 md:gap-12 lg:mt-[150px]">
          <div className="flex w-full max-w-[1320px] flex-col items-center justify-center gap-6 px-6 sm:mx-auto md:gap-10 lg:p-0">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/1UJp7SipkNE?si=BZiCPmpIbbKE4uCF"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div className="flex w-full flex-col items-center gap-8">
              <h1 className="text-2xl text-clever-gray-light lg:text-4xl">
                Projects
              </h1>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
                <ProjectsCard />
              </div>
            </div>
          </div>
        </div>
        <FooterMin />
      </Cover>
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
