import Head from "next/head";
import Script from "next/script";
import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import "@/styles/globals.css";
import Lenis from "lenis";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/") {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
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

        <meta property="og:title" content="Clever Projects | AI & Blockchain Solutions" />
        <meta
          property="og:description"
          content="Clever Project provides AI, blockchain, and software solutions for businesses worldwide."
        />
        <meta property="og:image" content="https://www.cleverproject.lk/logo.png" />
        <meta property="og:url" content="https://www.cleverproject.lk" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Clever Projects | AI & Blockchain Solutions" />
        <meta
          name="twitter:description"
          content="We provide AI, blockchain, and software solutions for businesses worldwide."
        />
        <meta name="twitter:image" content="https://www.cleverproject.lk/logo.png" />
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

      {/* Google Ads tag */}
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
<Nav overlay />
      
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}
