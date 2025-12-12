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
                
               <ProductView 
  name="Handmade Soap Online Store – WordPress WooCommerce"
  description="I designed and developed a fully functional Handmade Soap Ecommerce Store using WordPress and WooCommerce. The project included custom theme styling, product page optimization, mobile-responsive layouts, and a complete checkout flow with secure payment integration. I focused on a clean natural brand look while improving UX, speed, and conversions."
  link="#"
  videoUrl="https://youtu.be/nfibyKEB6io"
/>

<ProductView 
  name="XCP-ng Virtualization Platform Deployment on VMware Workstation"
  description="I deployed a full virtualization environment by installing XCP-ng as a nested hypervisor inside VMware Workstation Pro. Includes configuration, XOA setup, storage repositories, ISO imports, VM creation, networking validation, and snapshots. Demonstrates enterprise-grade virtualization and documentation skills."
  link="#"
  videoUrl="https://www.youtube.com/watch?v=qaWzAVCt0W0"
/>

<ProductView 
  name="tvOS Game Prototype Development (SwiftUI | Apple TV Game)"
  description="A mini-game built with clean SwiftUI architecture including Apple TV remote support, smooth animations, game logic, timer, score, winner screen, and celebration effects. Ready for TestFlight and ideal for prototypes, university projects, and entertainment apps."
  link="#"
  videoUrl="https://freelancerprofilenuxt.mesh.prod.platform.usw2.upwork/freelancers/~01a953c0b6e3acd5b5?p=1991087789414068224"
/>

<ProductView 
  name="RaveUp – Data-Driven Race Predictions Platform"
  description="RaveUp predicts race outcomes using historical pace data. Includes driver profiles, race registration, live-updating predictions, organizer dashboards, and event management. Platform becomes smarter with every lap."
  link="#"
  videoUrl="https://freelancerprofilenuxt.mesh.prod.platform.usw2.upwork/freelancers/~01a953c0b6e3acd5b5?p=1988548906391855104"
/>

<ProductView 
  name="GlowMatch – Smart Salon App"
  description="GlowMatch recommends salons using real reviews. Features selfie-based shade matching, beauty profile recommendations, instant bookings, routines, deals, and photo reviews for makeup and non-medical skincare."
  link="#"
  videoUrl="https://www.youtube.com/watch?v=Yp8ikaL80qU"
/>

<ProductView 
  name="IntelliHire Analyst – AI Skill Matching System"
  description="AI system that compares CV skills to job descriptions, generates custom interview questions, evaluates answers, highlights strengths/weaknesses, and gives a fit score. Helps candidates prepare smartly and employers hire better."
  link="#"
  videoUrl="https://freelancerprofilenuxt.mesh.prod.platform.usw2.upwork/freelancers/~01a953c0b6e3acd5b5?p=1987870625403158528"
/>

<ProductView 
  name="Smart Security & Facility Management Platform"
  description="Smart system for visitor management, QR check-ins, vehicle and parking control, incident reporting with photos, assignment workflows, and real-time monitoring. Supports security teams with automation and tracking."
  link="#"
  videoUrl="https://youtu.be/EamTnw6tv6s?si=rE6c0Xd5Iu85tGhn"
/>

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
