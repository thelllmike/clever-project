import Head from "next/head";
import Script from "next/script";
import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import "@/styles/globals.css";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Preloader from "../components/Preloader";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  // ✅ show preloader only once per tab session
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const already = sessionStorage.getItem("cp_preloaded");
    if (!already) {
      setShowPreloader(true);
    }
  }, []);

  const finishPreloader = () => {
    try {
      sessionStorage.setItem("cp_preloaded", "1");
    } catch {}
    setShowPreloader(false);
  };

  // 🔓 Hard unlock scroll
  useEffect(() => {
    const unlockScroll = () => {
      const html = document.documentElement;
      const body = document.body;

      body.style.overflow = "";
      body.style.position = "";
      body.style.height = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.bottom = "";
      html.style.overflow = "";

      body.removeAttribute("data-scroll-locked");
      html.removeAttribute("data-scroll-locked");
      body.classList.remove("overflow-hidden");
      html.classList.remove("overflow-hidden");
    };

    unlockScroll();
    router.events.on("routeChangeStart", unlockScroll);
    router.events.on("routeChangeComplete", unlockScroll);
    router.events.on("routeChangeError", unlockScroll);

    return () => {
      router.events.off("routeChangeStart", unlockScroll);
      router.events.off("routeChangeComplete", unlockScroll);
      router.events.off("routeChangeError", unlockScroll);
    };
  }, [router.events]);

  // ✅ Lenis lifecycle
  useEffect(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = null;

    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (router.pathname === "/") return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // refresh GSAP ScrollTrigger if used
    (async () => {
      try {
        const stMod = await import("gsap/ScrollTrigger");
        stMod.ScrollTrigger?.refresh?.();
      } catch {}
    })();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="4QlFs4MXSaMUGu461bl5U01tLvnfKJWi5yOwh0ha2ew"
        />
        <meta name="zoho-verification" content="zb97515608.zmverify.zoho.com" />

        <title>Clever Projects | AI & Blockchain Solutions</title>
        <meta
          name="description"
          content="Clever Project provides cutting-edge AI, blockchain, and software development solutions for businesses worldwide."
        />
        <meta
          name="keywords"
          content="Clever Projects, AI development, blockchain solutions, software development, Next.js, portfolio"
        />
        <meta name="author" content="Clever Projects Team" />
        <meta name="robots" content="index, follow" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content="Clever Projects | AI & Blockchain Solutions"
        />
        <meta
          property="og:description"
          content="Clever Project provides AI, blockchain, and software solutions for businesses worldwide."
        />
        <meta
          property="og:image"
          content="https://www.cleverproject.lk/logo.png"
        />
        <meta property="og:url" content="https://www.cleverproject.lk" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content="Clever Projects | AI & Blockchain Solutions"
        />
        <meta
          name="twitter:description"
          content="We provide AI, blockchain, and software solutions for businesses worldwide."
        />
        <meta
          name="twitter:image"
          content="https://www.cleverproject.lk/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clever Project",
              url: "https://www.cleverproject.lk",
              logo: "https://www.cleverproject.lk/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+94704057137",
                  contactType: "customer service",
                  areaServed: "LK",
                  availableLanguage: ["English", "Sinhala"],
                },
              ],
              sameAs: [
                "https://www.facebook.com/cleverprojects",
                "https://www.linkedin.com/company/cleverprojects",
                "https://twitter.com/cleverProjectlk",
              ],
            }),
          }}
        />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17827951804"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17827951804');
        `}
      </Script>

      {/* ✅ Preloader overlays everything */}
      {showPreloader && <Preloader onDone={finishPreloader} />}

      <Nav overlay />

      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}