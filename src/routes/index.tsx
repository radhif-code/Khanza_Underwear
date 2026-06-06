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
