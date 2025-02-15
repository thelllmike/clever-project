import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import Cover from "@/components/transition";

const Scence = dynamic(() => import("../components/Scence"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Cleaver Projects</title>
        <meta name="description" content="Cleaver Projects Portfolio page" />
      </Head>
      <Cover>
        <main className="relative h-screen w-screen">
          <Scence />
        </main>
      </Cover>
    </>
  );
}
