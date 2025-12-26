import Head from "next/head";
import { FooterMin } from "@/components/FooterMin";
import MouseFollower from "../../components/MouseFollower";
import PinProjectsShowcase from "@/components/PinProjectsShowcase";

export default function ProjectsPage() {
  const projects = [
    { id: 1, title: "Product 1", image: "/img/i1.png", description: "Description for Product 1", link: "/products/product-1", videoUrl: "https://youtu.be/nfibyKEB6io" },
    { id: 2, title: "Product 2", image: "/img/i2.png", description: "Description for Product 2", link: "/products/product-2", videoUrl: "https://www.youtube.com/watch?v=McluqmRIvjs" },
    { id: 3, title: "Product 3", image: "/img/i3.png", description: "Description for Product 3", link: "/products/product-3", videoUrl: "https://youtu.be/nfibyKEB6io" },
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

      <FooterMin />
    </>
  );
}