import { React, useState } from "react";
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
import { useDropzone } from "react-dropzone";
import { FooterMin } from "@/components/FooterMin";
import Cover from "@/components/transition";

// --- Hard-coded jobs for demonstration ---
const jobs = [
  {
    id: "1",
    job_title: "Backend Engineer Internship",
    full_time: false,
    remote: true,
    description:
      "We are looking for a Backend Engineer Intern with knowledge in machine learning, computer vision, and backend development.",
  },
  {
    id: "2",
    job_title: "Frontend Engineer Internship",
    full_time: false,
    remote: true,
    description:
      "We are seeking a Frontend Engineer Intern who has completed self projects using Flutter or React Native.",
  },
  {
    id: "3",
    job_title: "Designer Internship",
    full_time: false,
    remote: false,
    description:
      "We need a Designer Intern who has independently worked on several projects and demonstrates a strong design portfolio.",
  },
];

const Careers = () => {
  // Simple framer-motion text animation config
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
  };

  return (
    <>
      <Head>
        <title>Careers</title>
        <meta name="description" content="Careers page" />
      </Head>
      <Cover>
        <div className="flex-col justify-center gap-8 md:gap-12">
          {/* Page Header */}
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

            {/* Render each job card */}
            {jobs.map((job) => (
              <CareerCard
                key={job.id}
                jobTitle={job.job_title}
                workType={job.full_time ? "Full Time" : "Part Time"}
                workLocation={job.remote ? "Remote" : "Onsite"}
                description={job.description}
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

// Individual Card
export const CareerCard = ({
  jobTitle,
  workType,
  workLocation,
  description,
}) => {
  // Resume dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // We keep track of user input for the form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  // For showing submission status & messages
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // On input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // On form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // If user didn't upload a resume, show an error
    if (acceptedFiles.length === 0) {
      setMessage("Please upload your resume before applying.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("jobTitle", jobTitle);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("resume", acceptedFiles[0]); // The first (and only) file

      // POST to /api/apply
      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        setMessage("Application submitted successfully!");
        // Optionally clear form
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      } else {
        setMessage(result.msg || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while submitting.");
    }
    setSubmitting(false);
  };

  // Display the uploaded file info (if any)
  const files = acceptedFiles.map((file) => (
    <div className="flex items-center gap-2" key={file.path}>
      <i className="uil uil-file-alt text-lg"></i>
      <h6 className="mt-1 leading-none">
        {file.name} {(file.size / 1000000).toFixed(2)} MB
      </h6>
    </div>
  ));

  return (
    <Dialog>
      {/* Card Summary */}
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
              <i className="uil uil-share-alt"></i>
            </button>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2">
                <p className="text-sm md:text-base">Apply</p>
                <i className="uil uil-arrow-right"></i>
              </button>
            </DialogTrigger>
          </div>
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-left">{description}</p>
        </div>
      </div>

      {/* Dialog with the Form */}
      <DialogContent
        className="max-h-[80vh] max-w-[90vw] gap-6 overflow-y-auto rounded-lg bg-clever-gray-light p-4 text-clever-black md:max-h-[80vh] md:p-6 xl:max-w-[900px]"
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
                <i className="uil uil-share-alt"></i>
              </button>
            </div>
          </DialogTitle>
          <DialogDescription>
            <p className="text-left">{description}</p>
          </DialogDescription>
        </DialogHeader>

        {/* The application form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />

          {/* Resume Upload Section */}
          <div className="flex w-full flex-col gap-2">
            {/* If NO file uploaded yet, show the dropzone */}
            {acceptedFiles.length === 0 && (
              <div
                {...getRootProps({
                  className:
                    "dropzone flex cursor-pointer flex-col gap-2 items-center justify-center w-full border border-clever-black rounded-lg px-6 py-4",
                })}
              >
                <input {...getInputProps()} />
                <i className="uil uil-file-upload text-3xl"></i>
                <p className="w-fit">Drag or Click here to add your CV</p>
              </div>
            )}

            {/* If file IS uploaded, hide dropzone and show file info */}
            {acceptedFiles.length > 0 && (
              <div className="flex flex-col items-center gap-2 border border-clever-black rounded-lg px-6 py-4">
                {files}
                <p className="text-green-600">Resume Uploaded Successfully!</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex w-full flex-row justify-center sm:justify-center mt-2">
            <Button
              type="submit"
              text={submitting ? "Submitting..." : "Apply"}
              className="px-6 py-4 text-base md:px-8 md:py-4 md:text-base"
            />
          </DialogFooter>
          {message && <p className="text-center mt-2">{message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

// A small reusable Badge component for Full-Time/Part-Time & Remote/Onsite
export function CleaverBadge({ children }) {
  return (
    <div className="flex items-center rounded-md border border-clever-black px-2 py-1 text-clever-black">
      <p className="text-[12px] leading-none">{children}</p>
    </div>
  );
}
