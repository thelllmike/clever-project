// pages/careers.js
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
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
import { AnimatePresence, motion as m } from "framer-motion";

const AnimatedHeading = dynamic(() => import("@/components/home/AnimatedHeading"), {
  ssr: false,
});

const jobs = [
  {
    id: "1",
    job_title: "UI/UX Design Internship",
    full_time: false,
    remote: true,
    description:
      "We’re looking for a UI/UX Intern who can design clean, modern interfaces and turn ideas into usable screens. You should be comfortable with Figma, wireframes, and basic design systems. Bonus if you have worked on real app/web UI, understand mobile-first layouts, and can share a portfolio (Dribbble/Behance/Figma link).",
  },
  {
    id: "2",
    job_title: "Flutter Developer Internship",
    full_time: false,
    remote: true,
    description:
      "We’re hiring a Flutter Intern to help build mobile features and UI components for real projects. You should know Flutter widgets, state management basics (Provider/GetX is a plus), API integration, and responsive layouts. Bonus if you have a GitHub repo with at least 1–2 Flutter apps (even small ones).",
  },
  {
    id: "3",
    job_title: "MERN Stack Developer Internship",
    full_time: false,
    remote: true,
    description:
      "We’re looking for a MERN Stack Intern who can work with React + Node.js + Express + MongoDB. You should understand REST APIs, authentication basics (JWT), CRUD, and clean component structure. Bonus if you have built a small full-stack app (admin panel, dashboard, POS, e-commerce, etc.) and can share GitHub links.",
  },
  {
    id: "4",
    job_title: "Project Manager Internship",
    full_time: false,
    remote: true,
    description:
      "We’re looking for a Project Manager Intern to help manage tasks, timelines, and communication between design + development. You should be organized, good at follow-ups, and able to write clear task descriptions. Bonus if you’ve used tools like Trello/Jira/Notion, understand Agile basics, and can run simple daily/weekly updates.",
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

        {/* push content below fixed navbar */}
        <div className="min-h-screen pt-[90px] lg:pt-[160px]">
          <div className="flex flex-col justify-center gap-8 md:gap-12">
            <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-6 px-6 text-center md:gap-10">
              <AnimatedHeading />

              {jobs.map((job) => (
                <CareerCard
                  key={job.id}
                  jobId={job.id}
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

/** --- Share Modal --- **/
function ShareModal({ open, onClose, title, url }) {
  const shareText = `Clever Project — ${title}\nApply here: ${url}`;

  const openPopup = (shareUrl) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("Link copied!");
    }
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Clever Project — ${title}`
  )}&url=${encodeURIComponent(url)}`;

  // Instagram: no direct-share URL. Best option: copy link + open Instagram.
  const openInstagram = async () => {
    await copyLink();
    openPopup("https://www.instagram.com/");
  };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close share modal"
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          <m.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-black/10 p-5">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-black">Share</h3>
                <p className="mt-1 text-sm text-black/60">{title}</p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full border border-black/15 px-3 py-1 text-sm font-semibold text-black hover:bg-black/5"
              >
                Close
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openPopup(facebookUrl)}
                  className="rounded-lg border border-black/10 px-4 py-3 text-sm font-semibold text-black hover:bg-black/5"
                >
                  Facebook
                </button>

                <button
                  onClick={() => openPopup(whatsappUrl)}
                  className="rounded-lg border border-black/10 px-4 py-3 text-sm font-semibold text-black hover:bg-black/5"
                >
                  WhatsApp
                </button>

                <button
                  onClick={() => openPopup(xUrl)}
                  className="rounded-lg border border-black/10 px-4 py-3 text-sm font-semibold text-black hover:bg-black/5"
                >
                  X (Twitter)
                </button>

                <button
                  onClick={openInstagram}
                  className="rounded-lg border border-black/10 px-4 py-3 text-sm font-semibold text-black hover:bg-black/5"
                >
                  Instagram
                </button>
              </div>

              <div className="mt-4 rounded-lg border border-black/10 bg-black/5 p-3">
                <p className="break-all text-xs text-black/70">{url}</p>
              </div>

              <button
                onClick={copyLink}
                className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/85"
              >
                Copy Link
              </button>

              <p className="mt-3 text-xs text-black/50">
                Note: Instagram doesn’t allow direct web sharing. We copy the link and open Instagram.
              </p>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

export const CareerCard = ({ jobId, jobTitle, workType, workLocation, description }) => {
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

  // Share state
  const [shareOpen, setShareOpen] = useState(false);

  const shareUrl = useMemo(() => {
    if (!isMounted) return "";
    const base = window.location.origin;
    return `${base}/careers?job=${encodeURIComponent(jobId)}#${encodeURIComponent(
      jobTitle.toLowerCase().replace(/\s+/g, "-")
    )}`;
  }, [isMounted, jobId, jobTitle]);

  const handleShare = async () => {
    if (!isMounted) return;

    const text = `Clever Project — ${jobTitle} (${workType}, ${workLocation})`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: jobTitle,
          text,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // ignore -> fallback modal
    }
    setShareOpen(true);
  };

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
    <>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={jobTitle} url={shareUrl} />

      <Dialog>
        {/* ✅ HOVER ZOOM CARD (desktop only), plus nicer lift shadow */}
        <div
          className="
            group flex w-full flex-col items-start gap-6 rounded-lg border
            bg-clever-gray-light px-6 py-4 text-clever-black
            transition-transform duration-300 ease-out
            hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            hover:-translate-y-1
            md:hover:scale-[1.02]
            active:scale-[0.99]
          "
          id={jobTitle.toLowerCase().replace(/\s+/g, "-")}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              {/* ✅ zoom the TITLE slightly on hover */}
              <h6
                className="
                  text-base font-semibold capitalize md:text-xl
                  transition-transform duration-300 ease-out
                  group-hover:scale-[1.03]
                  origin-left
                "
              >
                {jobTitle}
              </h6>

              <div className="flex items-center gap-2">
                <CleaverBadge>{workType}</CleaverBadge>
                <CleaverBadge>{workLocation}</CleaverBadge>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-6">
              <button onClick={handleShare} className="flex items-center gap-2">
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