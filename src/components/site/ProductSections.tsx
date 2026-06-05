import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ProductSections() {
  return (
    <section id="produk" className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Produk</p>
          <h2 className="text-4xl md:text-5xl font-display">
            Koleksi <span className="text-gradient-rose italic">Premium</span> Kami
          </h2>
          <p className="mt-4 text-muted-foreground">
            Harga per lusin (12 pcs). Minimal order 10 lusin — boleh campur semua produk.
          </p>
        </div>

        <div id="jiantex"><ProductCard product={products[0]} /></div>
        <div id="halona"><ProductCard product={products[1]} reverse /></div>
        <div id="riki"><ProductCard product={products[2]} /></div>
      </div>
    </section>
  );
}
