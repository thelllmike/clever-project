import { React, useState, useEffect } from "react";
import Head from "next/head";
import { motion as m } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import { Skeleton } from "@/components/ui/skeleton";

import { useDropzone } from "react-dropzone";

import { collection, getDocs } from "firebase/firestore";
import { fire_db } from "../../lib/firestore";

import { FooterMin } from "@/components/FooterMin";
import Cover from "@/components/transition";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [Loading, setLoading] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(fire_db, "jobs"));

      setJobs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false); // Hide loader after fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTimeDifference = (createdTime) => {
    const now = new Date();
    let jobDate;

    // Handle Firestore Timestamp or string
    if (createdTime?.toDate) {
      jobDate = createdTime.toDate(); // Firestore Timestamp
    } else {
      jobDate = new Date(createdTime); // String or Date
    }

    // Validate date parsing
    if (isNaN(jobDate.getTime())) {
      console.error("Invalid date:", createdTime);
      return "Invalid date";
    }

    const diffInSeconds = Math.floor((now - jobDate) / 1000);
    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    if (minutes > 0) return `${minutes} minute(s) ago`;
    return `${seconds} second(s) ago`;
  };

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
      <Head>
        <title>Careers</title>
        <meta name="description" content="Careers page" />
      </Head>
      <Cover>
        <div className="flex-col justify-center gap-8 md:gap-12">
          <div className="relative mx-auto flex flex-col items-center gap-6 px-6 text-center md:gap-10 xl:max-w-[1320px] xl:p-0">
            <div className="flex flex-col flex-wrap">
              <h1 className="flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
                <m.span
                  className="inline-block w-fit overflow-hidden"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  Grow&nbsp;
                </m.span>
                <m.span
                  className="inline-block w-fit overflow-hidden"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  Your&nbsp;
                </m.span>
                <m.span
                  className="inline-block w-fit overflow-hidden"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  Career&nbsp;
                </m.span>
                <m.span
                  className="inline-block w-fit overflow-hidden"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  with
                </m.span>
              </h1>
              <h1 className="flex flex-wrap justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
                <m.span
                  className="inline-block w-fit overflow-hidden"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  Our&nbsp;
                </m.span>
                <m.span
                  className="w-fit overflow-hidden text-clever-purple"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                >
                  Digital&nbsp;
                </m.span>
                <m.span
                  className="w-fit overflow-hidden text-clever-purple"
                  variants={textAnim}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                >
                  Wizards!
                </m.span>
              </h1>
            </div>

            {jobs
              .sort((a, b) => b.created_time - a.created_time)
              .map((job) => (
                <CareerCard
                  key={job.id}
                  jobTitle={`${job.job_title}`}
                  workType={`${job.full_time ? "Full Time" : "Part Time"}`}
                  workLocation={`${job.remote ? "Remote" : "Onsite"}`}
                  description={`${job.description}`}
                  created={getTimeDifference(job.created_time)}
                  Loading={Loading}
                />
              ))}
          </div>
          <FooterMin />
        </div>
      </Cover>
    </>
  );
};

export default Careers;

export const CareerCard = ({
  jobTitle,
  workType,
  workLocation,
  description,
  Loading,
  created,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <div className="flex items-center gap-2" key={file.path}>
      <i class="uil uil-file-alt text-lg"></i>
      <h6 className="mt-1 leading-none">
        {file.name} {(file.size / 1000000).toFixed(2)} MB
      </h6>
    </div>
  ));

  if (Loading) {
    return (
      <div className="flex w-full flex-col items-start gap-6">
        <Skeleton className="h-[200px] w-full rounded-lg bg-[hsl(240,3.7%,15.9%)]" />
      </div>
    );
  }
  return (
    <>
      <Dialog>
        <div className="flex w-full flex-col items-start gap-6 rounded-lg border bg-clever-gray-light px-6 py-4 text-clever-black">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <h6 className="text-base font-semibold capitalize text-clever-black md:text-xl">
                {jobTitle}
              </h6>
              <div className="flex items-center gap-2">
                <CleaverBadge>{workType}</CleaverBadge>
                <CleaverBadge>{workLocation}</CleaverBadge>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-6">
              <button className="flex items-center gap-2">
                <p className="text-sm md:text-base">Share</p>
                <i class="uil uil-share-alt"></i>
              </button>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2">
                  <p className="text-sm md:text-base">Apply</p>
                  <i class="uil uil-arrow-right"></i>
                </button>
              </DialogTrigger>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-left">{description}</p>
            <p className="text-right text-xs text-clever-black opacity-50">
              {created}
            </p>
          </div>
        </div>

        <DialogContent
          className="max-h-[90vh] max-w-[90vw] gap-6 overflow-y-auto rounded-lg bg-clever-gray-light p-4 text-clever-black md:max-h-[60vh] md:p-6 xl:max-w-[1320px]"
          hideCloseButton={true}
        >
          <DialogHeader className="flex flex-col items-start gap-2">
            <DialogTitle className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start gap-2">
                <h6 className="text-base font-semibold capitalize text-clever-black md:text-xl">
                  {jobTitle}
                </h6>
                <div className="flex items-center gap-2">
                  <CleaverBadge>{workType}</CleaverBadge>
                  <CleaverBadge>{workLocation}</CleaverBadge>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2">
                  <p className="text-sm md:text-base">Share</p>
                  <i class="uil uil-share-alt"></i>
                </button>
              </div>
            </DialogTitle>
            <DialogDescription>
              <p className="text-left">{description}</p>
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex w-full flex-col items-center gap-4">
              <Input
                type="text"
                placeholder="First Name"
                className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
              />
              <Input
                type="text"
                placeholder="Last Name"
                className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
              />
              <Input
                type="email"
                placeholder="Email"
                className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
              />
              <div className="flex w-full flex-col gap-2">
                <div
                  {...getRootProps({
                    className:
                      "dropzone flex cursor-pointer flex-col gap-2 items-center justify-center w-full border border-clever-black rounded-lg px-6 py-4",
                  })}
                >
                  <input {...getInputProps()} />
                  <i class="uil uil-file-upload text-3xl"></i>
                  <p className="w-fit">Drag or Click here to add your CV</p>
                </div>
                <div className={files.length ? "block" : "hidden"}>{files}</div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex w-full flex-row justify-center sm:justify-center">
            <Button
              text="Apply"
              className="px-6 py-4 text-base md:px-8 md:py-4 md:text-base"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export function CleaverBadge({ children }) {
  return (
    <div className="flex items-center rounded-md border border-clever-black px-2 py-1 text-clever-black">
      <p className="text-[12px] leading-none">{children}</p>
    </div>
  );
}
