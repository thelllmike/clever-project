// pages/Contact/index.jsx (or pages/contact.js)
import { useState } from "react";
import Head from "next/head";
import { motion as m } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/Button";
import { FooterMin } from "@/components/FooterMin";
import MouseFollower from "./../../components/MouseFollower";
import Cover from "@/components/transition";
import WhatsAppFloat from "../../components/WhatsAppFloat";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to send message");

      setOpen(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
  };

  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact page" />
      </Head>

      <Cover>
        <MouseFollower />

        {/* ✅ push content below fixed navbar */}
        <div className="min-h-screen pt-[90px] lg:pt-[160px]">
          <div className="flex flex-col justify-center gap-8 md:gap-12">
            <div className="relative mx-auto flex flex-col items-center gap-6 px-6 text-center sm:max-w-[640px] md:gap-10">
              {/* Heading */}
              <div className="flex flex-col flex-wrap">
                <h1 className="flex flex-wrap items-center justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
                  <m.span
                    className="inline-block w-fit overflow-hidden"
                    variants={textAnim}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    Let&#39;s&nbsp;
                  </m.span>
                  <m.span
                    className="inline-block w-fit overflow-hidden"
                    variants={textAnim}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    Team&nbsp;
                  </m.span>
                  <m.span
                    className="inline-block w-fit overflow-hidden"
                    variants={textAnim}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                  >
                    Up&nbsp;
                  </m.span>
                  <m.span
                    className="inline-block w-fit overflow-hidden"
                    variants={textAnim}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                  >
                    for
                  </m.span>
                </h1>

                <h1 className="flex flex-wrap items-center justify-center overflow-hidden text-[40px] font-bold uppercase leading-none lg:text-[4vw]">
                  <m.span
                    className="inline-block w-fit overflow-hidden text-clever-purple"
                    variants={textAnim}
                    initial="hidden"
                    animate="visible"
                    custom={5}
                  >
                    Digital&nbsp;
                  </m.span>
                  <m.span
                    className="inline-block w-fit overflow-hidden text-clever-purple"
                    variants={textAnim}
                    initial="hidden"
                    animate="visible"
                    custom={6}
                  >
                    Brilliance!
                  </m.span>
                </h1>
              </div>

              {/* Form */}
              <form
                onSubmit={onsubmit}
                className="flex w-full flex-col items-center gap-4"
              >
                <Input
                  type="text"
                  placeholder="Your Name?"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-auto rounded-[8px] border-clever-gray-light bg-clever-purple/15 px-6 py-4 uppercase text-clever-gray-light placeholder:text-clever-gray-light/50 md:text-[18px]"
                />

                <Input
                  type="email"
                  placeholder="Your Email?"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-auto rounded-[8px] border-clever-gray-light bg-clever-purple/15 px-6 py-4 uppercase text-clever-gray-light placeholder:text-clever-gray-light/50 md:text-[18px]"
                />

                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="h-auto rounded-[8px] border-clever-gray-light bg-clever-purple/15 px-6 py-4 uppercase text-clever-gray-light placeholder:text-clever-gray-light/50 md:text-[18px]"
                  rows={6}
                />

                {error && (
                  <p className="w-full text-left text-lg text-red-500">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  text={loading ? "Committing..." : "Commit"}
                  disabled={loading}
                />
              </form>

              {/* Success Dialog */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="gap-6 rounded-lg bg-clever-gray-light p-4 text-clever-black md:p-6">
                  <DialogHeader className="flex flex-col items-start gap-2">
                    <DialogTitle className="text-base font-semibold capitalize md:text-xl">
                      Successful!
                    </DialogTitle>
                    <DialogDescription className="text-left">
                      We truly appreciate your message. We&#39;ll get back to you
                      as soon as possible.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex w-full justify-center">
                    <Button text="Okay" onClick={() => setOpen(false)} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
 <WhatsAppFloat />
            <FooterMin />
          </div>
        </div>
      </Cover>
    </>
  );
};

export default ContactPage;