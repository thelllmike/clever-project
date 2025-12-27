import dynamic from "next/dynamic";
import MouseFollower from "@/components/MouseFollower";
import { FooterMin } from "@/components/FooterMin";
import WhatsAppFloat from "../../components/WhatsAppFloat";

const SmoothScrollProduct = dynamic(
  () => import("@/components/SmoothScrollProduct"),
  { ssr: false }
);

export default function ProductsPage() {
  return (
    <div className="relative">
      <MouseFollower />

      <SmoothScrollProduct
        brand="Clever"
        productName="Project"
        onCtaClick={() => {}}
      />
        <WhatsAppFloat />
      <FooterMin />
    </div>
  );
}