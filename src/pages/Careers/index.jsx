// pages/careers.js
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Head from "next/head";
import MouseFollower from "./../../components/MouseFollower";
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
import { useDropzone } from "react-dropzone";
import { FooterMin } from "@/components/FooterMin";
import Cover from "@/components/transition";

const AnimatedHeading = dynamic(() => import("@/components/AnimatedHeading"), {
  ssr: false,
});

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

export default function Careers() {
  return (
    <>
      <Head>
        <title>Careers</title>
        <meta name="description" content="Careers page" />
      </Head>

      <Cover>
        <MouseFollower />

        {/* ✅ IMPORTANT: push content below fixed navbar */}
        <div className="min-h-screen pt-[90px] lg:pt-[160px]">
          <div className="flex flex-col justify-center gap-8 md:gap-12">
            <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-6 px-6 text-center md:gap-10">
              <AnimatedHeading />

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
        </div>
      </Cover>
    </>
  );
}

export const CareerCard = ({ jobTitle, workType, workLocation, description }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result || "";
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (acceptedFiles.length === 0) return setMessage("Please upload your resume before applying.");
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim())
      return setMessage("Please fill in all required fields.");

    setSubmitting(true);

    try {
      const resumeFile = acceptedFiles[0];
      const resumeBase64 = await fileToBase64(resumeFile);

      const payload = {
        jobTitle,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        resume: {
          name: resumeFile.name,
          type: resumeFile.type,
          size: resumeFile.size,
          content: resumeBase64,
        },
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Application submitted & emailed successfully!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      } else {
        setMessage(result.msg || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <div className="flex w-full flex-col items-start gap-6 rounded-lg border bg-clever-gray-light px-6 py-4 text-clever-black">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            <h6 className="text-base font-semibold capitalize md:text-xl">
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
              <i className="uil uil-share-alt" />
            </button>

            <DialogTrigger asChild>
              <button className="flex items-center gap-2">
                <p className="text-sm md:text-base">Apply</p>
                <i className="uil uil-arrow-right" />
              </button>
            </DialogTrigger>
          </div>
        </div>

        <p className="text-left">{description}</p>
      </div>

      <DialogContent className="h-[95vh] w-[95vw] overflow-y-auto rounded-lg bg-clever-gray-light p-4 text-clever-black md:max-h-[90vh] md:max-w-[1000px] md:p-6">
        <DialogHeader className="flex flex-col items-start gap-2">
          <DialogTitle>{jobTitle}</DialogTitle>
          <DialogDescription>
            <p className="text-left">{description}</p>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 pb-4">
          <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
          <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />

          {isMounted && (
            <div className="flex w-full flex-col gap-2">
              {acceptedFiles.length === 0 ? (
                <div
                  {...getRootProps({
                    className:
                      "flex cursor-pointer flex-col items-center justify-center gap-2 w-full border border-clever-black rounded-lg px-6 py-4",
                  })}
                >
                  <input {...getInputProps()} />
                  <i className="uil uil-file-upload text-3xl" />
                  <p>Drag or Click here to add your CV</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 border border-clever-black rounded-lg px-6 py-4">
                  <p>{acceptedFiles[0].name}</p>
                  <p className="text-green-600">Resume Uploaded Successfully!</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-2 flex w-full justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto rounded-md bg-clever-purple px-6 py-4 font-semibold text-white hover:bg-clever-purple/90"
            >
              {submitting ? "Submitting..." : "Apply"}
            </button>
          </DialogFooter>

          {message && <p className="mt-2 text-center">{message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export function CleaverBadge({ children }) {
  return (
    <div className="flex items-center rounded-md border border-clever-black px-2 py-1 text-clever-black">
      <p className="text-[12px] leading-none">{children}</p>
    </div>
  );
}
  