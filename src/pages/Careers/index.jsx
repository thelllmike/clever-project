// pages/careers.js
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Head from "next/head";
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

// Dynamically import the animated heading so it renders only on the client.
const AnimatedHeading = dynamic(() => import("@/components/AnimatedHeading"), {
  ssr: false,
});

// Hard-coded jobs for demonstration
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
  return (
    <>
      <Head>
        <title>Careers</title>
        <meta name="description" content="Careers page" />
      </Head>
      <Cover>
        <div className="flex-col justify-center gap-8 md:gap-12">
          <div className="relative mx-auto flex flex-col items-center gap-6 px-6 text-center md:gap-10 xl:max-w-[1320px] xl:p-0">
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
}) => {
  // This flag ensures we render client-only parts after mount.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use react-dropzone only on client
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // Form state
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

  // Converts a File to base64 (without the data:... prefix)
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // gives "data:application/pdf;base64,AAAA..."
      reader.onload = () => {
        const result = reader.result || "";
        const base64 = result.split(",")[1]; // remove "data:...;base64,"
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (acceptedFiles.length === 0) {
      setMessage("Please upload your resume before applying.");
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const resumeFile = acceptedFiles[0];

      // convert file to base64
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
          content: resumeBase64, // base64 string
        },
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Application submitted & emailed successfully!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
        // Optional: reset dropzone (may need to implement with useDropzone callback)
      } else {
        setMessage(result.msg || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  const files = acceptedFiles.map((file) => (
    <div className="flex items-center gap-2" key={file.path}>
      <i className="uil uil-file-alt text-lg" />
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
        <div className="flex w-full flex-col gap-1">
          <p className="text-left">{description}</p>
        </div>
      </div>

      {/* Application Dialog */}
      <DialogContent
        className="h-[95vh] w-[95vw] overflow-y-auto rounded-lg bg-clever-gray-light p-4 text-clever-black md:h-auto md:max-h-[90vh] md:max-w-[1000px] md:p-6"
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
                <i className="uil uil-share-alt" />
              </button>
            </div>
          </DialogTitle>
          <DialogDescription>
            <p className="text-left">{description}</p>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 pb-4">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full h-auto rounded-[8px] border-clever-black bg-clever-gray-light px-6 py-4 uppercase text-clever-black placeholder:text-clever-black placeholder:text-opacity-50 md:text-[18px]"
          />

          {/* Resume Upload Section */}
          {isMounted && (
            <div className="flex w-full flex-col gap-2">
              {acceptedFiles.length === 0 ? (
                <div
                  {...getRootProps({
                    className:
                      "dropzone flex cursor-pointer flex-col gap-2 items-center justify-center w-full border border-clever-black rounded-lg px-6 py-4",
                  })}
                >
                  <input {...getInputProps()} />
                  <i className="uil uil-file-upload text-3xl" />
                  <p className="w-fit">Drag or Click here to add your CV</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 border border-clever-black rounded-lg px-6 py-4">
                  {files}
                  <p className="text-green-600">Resume Uploaded Successfully!</p>
                </div>
              )}
            </div>
          )}

          {/* Mobile Responsive Apply Button */}
          <DialogFooter className="flex w-full flex-row justify-center sm:justify-center mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-6 py-4 text-base md:px-8 md:py-4 md:text-base text-white bg-clever-purple hover:bg-clever-purple/90 transition-colors rounded-md font-semibold"
            >
              {submitting ? "Submitting..." : "Apply"}
            </button>
          </DialogFooter>
          {message && <p className="text-center mt-2">{message}</p>}
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
