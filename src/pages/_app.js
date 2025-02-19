import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import "@/styles/globals.css";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }, [pathname]);

  return (
    <>
      <Head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="4QlFs4MXSaMUGu461bl5U01tLvnfKJWi5yOwh0ha2ew" />

        {/* Zoho Site Verification */}
        <meta name="zoho-verification" content="zb97515608.zmverify.zoho.com" />

        {/* Website Title and Description */}
        <title>Clever Projects | AI & Blockchain Solutions</title>
        <meta name="description" content="Clever Project provides cutting-edge AI, blockchain, and software development solutions for businesses worldwide." />
        <meta name="keywords" content="Clever Projects, AI development, blockchain solutions, software development, Next.js, portfolio" />
        <meta name="author" content="Clever Projects Team" />
        <meta name="robots" content="index, follow" />

        {/* Favicon Links */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Open Graph Meta for Social Media Sharing */}
        <meta property="og:title" content="Clever Projects | AI & Blockchain Solutions" />
        <meta property="og:description" content="Clever Project provides AI, blockchain, and software solutions for businesses worldwide." />
        <meta property="og:image" content="https://www.cleverproject.lk/logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:url" content="https://www.cleverproject.lk" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for Sharing */}
        <meta name="twitter:title" content="Clever Projects | AI & Blockchain Solutions" />
        <meta name="twitter:description" content="We provide AI, blockchain, and software solutions for businesses worldwide." />
        <meta name="twitter:image" content="https://www.cleverproject.lk/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data (Schema.org) for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Clever Project",
              "url": "https://www.cleverproject.lk",
              "logo": "https://www.cleverproject.lk/logo.png",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+94704057137",
                  "contactType": "customer service",
                  "areaServed": "LK",
                  "availableLanguage": ["English", "Sinhala"]
                }
              ],
              "sameAs": [
                "https://www.facebook.com/cleverprojects",
                "https://www.linkedin.com/company/cleverprojects",
                "https://twitter.com/cleverProjectlk"
              ]
            }),
          }}
        />
      </Head>

      <Nav />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}
