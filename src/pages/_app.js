import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import "@/styles/globals.css";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname != "/") {
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
      <Nav />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}
