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

        {/* Favicon Links */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}
