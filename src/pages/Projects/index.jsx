// pages/projects/index.jsx (or wherever your ProjectsPage lives)

import Head from "next/head";
import { FooterMin } from "@/components/FooterMin";
import MouseFollower from "../../components/MouseFollower";
import PinProjectsShowcase from "@/components/project/PinProjectsShowcase";
import WhatsAppFloat from "../../components/WhatsAppFloat";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Security Management App",
      image: "/img/app1.jpeg",
      description: `A complete security operations app designed to keep daily management fast, organized, and reliable—built for real teams doing real work.

Key Features (explained):
• Role-based access control (RBAC) — Each staff member sees only what they’re allowed to see (Admin, Officer, Supervisor, etc.).
• Incident reporting — Log incidents with structured details so nothing gets missed and everything is traceable.
• Visitor management — Track visitors with time, purpose, and status updates for better accountability.
• Vehicle & parking tracking — Record check-ins/outs, manage spots, and reduce confusion at the gate.
• Search & history — Quickly find past records when you need answers (by date, type, or keyword).
• Clean mobile workflow — Built to reduce taps and speed up actions in the field.

✨ Tech Stack:
Flutter (Mobile App) • REST API Integration • Secure Auth & Permission Handling`,
      link: "/products/product-1",
      videoUrl: "https://youtu.be/EamTnw6tv6s?si=lS-WYTXsEut2r8WT",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      image: "/img/ecom1.jpeg",
      description: `A modern e-commerce website built to look premium, load fast, and convert visitors into customers—optimized for mobile shopping.

Key Features (explained):
• Product catalog — Organized product listing with clear visuals so customers can browse comfortably.
• Category structure — Clean categories/collections to guide users to the right items faster.
• Product pages that sell — Strong layout for price, benefits, photos, and “Add to Cart” actions.
• Cart & checkout flow — Simple steps to reduce drop-offs and make buying easy.
• Payment options — Supports online payments (gateway setup) and cash-on-delivery (if needed).
• Delivery/shipping setup — Delivery rules, locations, and shipping costs configured for smooth fulfillment.
• Order management — Easy admin view for new orders, processing, and customer details.
• SEO foundation — Proper headings, meta setup, and structure to help rank on Google.

✨ Tech Stack:
WordPress • WooCommerce • Elementor • SEO Setup • Performance Optimization`,
      link: "http://purekosma.com/",
      videoUrl: "https://youtu.be/nfibyKEB6io?si=p0PKhsljPfbhypIv",
    },
    {
      id: 3,
      title: "Real State Listing",
      image: "/img/ecom2.jpeg",
      description: `A real estate listing website designed to showcase properties beautifully and generate high-quality leads—built to be clean, fast, and SEO-ready.

Key Features (explained):
• Property listings — Easy-to-browse listing cards that highlight key details at a glance.
• Property detail pages — Dedicated pages for photos, pricing, features, and location information.
• Search & filters — Helps users find properties by category, location, price range, and key features.
• Lead capture forms — Inquiry forms that collect the right info so agents can respond faster.
• Call/WhatsApp actions — One-tap contact options to increase inquiries from mobile users.
• Admin listing management — Add/edit/remove properties without touching code.
• SEO-ready structure — Built to help listings appear on search results and attract organic traffic.

✨ Tech Stack:
WordPress • Elementor • Listing Setup (Custom Pages/Sections) • SEO Setup • Speed Optimization`,
      link: "/products/product-3",
      videoUrl: "https://youtu.be/T5Q4KnC8VJg?si=MrSMmVMVA39cE1He",
    },
    {
      id: 4,
      title: "Eye Wear Online Store",
      image: "/img/ecom4.jpeg",
      description: `An eyewear online store built for clarity, speed, and easy ordering—so customers can browse frames confidently and purchase without friction.

Key Features (explained):
• Modern product layout — Clean grid and product pages that feel premium and trustworthy.
• Frame categories — Organize by type, brand, or style so browsing stays simple.
• Product details that matter — Clear info for size, material, price, and style highlights.
• Quick contact actions — WhatsApp/call buttons for customers who prefer to confirm before buying.
• Smooth checkout — Simple ordering steps to reduce drop-offs.
• Mobile-first design — Optimized for the way customers actually shop today.
• SEO-friendly pages — Built to help the store rank and bring in organic buyers.

✨ Tech Stack:
WordPress • WooCommerce • Elementor • SEO Setup • Performance Optimization`,
      link: "/products/product-4",
      videoUrl: "https://youtu.be/hJNWuVMgMoc?si=DvFCe6imt563VSR_",
    },
  ];

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <MouseFollower />

      <div className="mt-[115px] lg:mt-[150px]">
        <PinProjectsShowcase
          introTitle="Best Projects To Try."
          introText="Here are a few of the most memorable builds we’ve shipped."
          outroTitle="Let’s Build Yours."
          outroText="Want a project like this? We can design + develop it."
          items={projects}
        />
      </div>

      <WhatsAppFloat />
      <FooterMin />
    </>
  );
}