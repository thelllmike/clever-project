import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import "@/styles/globals.css";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Head from "next/head";  // <-- Import Head for SEO meta tags

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
      {/* Google Site Verification Meta Tag */}
      <Head>
        <meta name="google-site-verification" content="4QlFs4MXSaMUGu461bl5U01tLvnfKJWi5yOwh0ha2ew" />
      </Head>

      <Nav />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}
