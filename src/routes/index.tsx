import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Features } from "@/components/site/Features";
import { ProductSections } from "@/components/site/ProductSections";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khanza Underwear — Celana Dalam Jumbo Premium, Nyaman Sepanjang Hari" },
      { name: "description", content: "Koleksi celana dalam wanita dan singlet pria premium dengan bahan katun lembut, adem, dan tersedia hingga ukuran 7L. Belanja Jiantex, Halona, dan Riki." },
      { property: "og:title", content: "Khanza Underwear — Nyaman Sepanjang Hari" },
      { property: "og:description", content: "Celana dalam jumbo premium dengan bahan katun lembut, adem, dan ukuran lengkap hingga 7L." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Features />
        <ProductSections />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
