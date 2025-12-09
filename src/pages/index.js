import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
// Cover transition removed from Home to avoid hydration mismatch

const Scence = dynamic(() => import("../components/Scence"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <title>Cleaver Projects | AI & Blockchain Solutions</title>
        <meta name="description" content="Cleaver Project provides cutting-edge AI, blockchain, and software development solutions for businesses worldwide." />
        <meta name="keywords" content="Cleaver Project, AI development, blockchain solutions, software development, Next.js, portfolio" />
        <meta name="author" content="Cleaver Project Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Cleaver Project | AI & Blockchain Solutions" />
        <meta property="og:description" content="Discover Cleaver Projects - your trusted partner in AI, blockchain, and software innovation." />
        <meta property="og:image" content="https://www.cleverproject.lk/og-image.jpg" />
        <meta property="og:url" content="https://www.cleverproject.lk" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Cleaver Projects | AI & Blockchain Solutions" />
        <meta name="twitter:description" content="We provide AI, blockchain, and software solutions for businesses worldwide." />
        <meta name="twitter:image" content="https://www.cleverproject.lk/twitter-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" /> */}
      </Head>

      <main className="relative h-screen w-screen">
        <Scence />
      </main>
    </>
  );
}
