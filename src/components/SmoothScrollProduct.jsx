import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiMapPin, FiCheck, FiArrowDown } from "react-icons/fi";
import { useRef } from "react";

export default function SmoothScrollProduct({
  brand = "Clever",
  productName = "Project",
  heroImage =
    "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop",
  gallery = [],
  plans = [],
  onCtaClick,
}) {
  return (
    <div className="bg-clever-black text-clever-gray-light">
      <ReactLenis root options={{ lerp: 0.05 }}>
        <Hero heroImage={heroImage} gallery={gallery} />

        <ProductInfo
          brand={brand}
          productName={productName}
          onCtaClick={onCtaClick}
        />

        <Plans plans={plans} />

      </ReactLenis>
    </div>
  );
}

const SECTION_HEIGHT = 1500;

const Hero = ({ heroImage, gallery }) => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage heroImage={heroImage} />
      <ParallaxImages gallery={gallery} />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-clever-black/0 to-clever-black" />
    </div>
  );
};

const CenterImage = ({ heroImage }) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = ({ gallery }) => {
  const imgs =
    gallery?.length >= 4
      ? gallery
      : [
          {
            src: "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop",
            alt: "Product image",
            start: -200,
            end: 200,
            className: "w-1/3",
          },
          {
            src: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop",
            alt: "Product image",
            start: 200,
            end: -250,
            className: "mx-auto w-2/3",
          },
          {
            src: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop",
            alt: "Product image",
            start: -200,
            end: 200,
            className: "ml-auto w-1/3",
          },
          {
            src: "https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop",
            alt: "Product image",
            start: 0,
            end: -500,
            className: "ml-24 w-5/12",
          },
        ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      {imgs.map((img, idx) => (
        <ParallaxImg key={idx} {...img} />
      ))}
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ transform, opacity }}
    />
  );
};

const ProductInfo = ({ brand, productName, onCtaClick }) => {
  const jumpToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-5xl px-4 pb-28 pt-12">
      <motion.h1
        initial={{ y: 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="text-4xl font-black uppercase text-zinc-50 md:text-5xl"
      >
        {brand} <span className="text-purple-500">{productName}</span>
      </motion.h1>

      <motion.p
        initial={{ y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.6, delay: 0.1 }}
        className="mt-5 max-w-2xl text-zinc-300"
      >
        A premium product section built with smooth scrolling + cinematic parallax.
        Replace this text with your real product description.
      </motion.p>

      <div className="mt-8 flex flex-wrap gap-3">
        {["Fast setup", "Responsive", "Modern animations", "SEO friendly"].map(
          (t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-200"
            >
              <FiCheck className="text-purple-500" />
              {t}
            </span>
          )
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={onCtaClick}
          className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-purple-500"
        >
          Get this product
        </button>

        <button
          onClick={jumpToPlans}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-200 hover:bg-zinc-900"
        >
          View plans <FiArrowDown />
        </button>
      </div>
    </section>
  );
};

const Plans = ({ plans }) => {
  const items =
    plans?.length > 0
      ? plans
      : [
          { title: "Starter", date: "2 Days", location: "Landing + Basic CTA" },
          { title: "Business", date: "5 Days", location: "Full sections + CMS" },
          { title: "Pro", date: "10 Days", location: "Animations + Integrations" },
        ];

  return (
    <section id="plans" className="mx-auto max-w-5xl px-4 py-24">
      <motion.h2
        initial={{ y: 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className="mb-14 text-3xl font-black uppercase text-zinc-50"
      >
        Plans
      </motion.h2>

      {items.map((p, i) => (
        <PlanItem key={i} title={p.title} date={p.date} location={p.location} />
      ))}
    </section>
  );
};

const PlanItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
      className="mb-8 flex items-center justify-between border-b border-zinc-800 px-3 pb-6"
    >
      <div>
        <p className="mb-1 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>

      <div className="flex items-center gap-2 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

