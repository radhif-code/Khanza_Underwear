import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { type Product, formatIDR, MIN_LUSIN } from "@/lib/products";
import { cart } from "@/lib/cart-store";

export function ProductCard({ product, reverse = false }: { product: Product; reverse?: boolean }) {
  const [size, setSize] = useState(product.sizes[0].size);
  const [colorVariant, setColorVariant] = useState(product.colorVariants?.[0]?.name ?? "");
  const [qty, setQty] = useState(1); // qty dalam lusin

  const price = useMemo(
    () => product.sizes.find((s) => s.size === size)?.price ?? product.sizes[0].price,
    [size, product],
  );
  const total = price * qty;

  const colorLabel = product.colorVariants?.find((c) => c.name === colorVariant)?.label ?? colorVariant;

  const handleAdd = () => {
    cart.add({
      productId: product.id,
      name: product.name,
      image: product.image,
      size,
      color: colorLabel,
      price,
      qty,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`glass-strong rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 gap-0 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square lg:aspect-auto bg-gradient-to-br from-[oklch(0.95_0.05_350)] to-[oklch(0.95_0.04_305)] p-6">
        <div className="absolute top-6 left-6 z-10 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-wider">
          {product.badge}
        </div>
        <div className="h-full w-full rounded-3xl overflow-hidden bg-white">
          <img
            src={
              product.id === "halona" && colorVariant === "gelap"
                ? (product as any)._darkImage ?? product.image
                : product.image
            }
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Details */}
      <div className="p-8 lg:p-10 flex flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{product.subtitle}</p>
        <h3 className="font-display text-4xl lg:text-5xl mt-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

        <div className="mt-7 flex items-baseline gap-3">
          <span className="text-4xl font-display text-gradient-rose">{formatIDR(price)}</span>
          <span className="text-xs text-muted-foreground">/ lusin (12 pcs)</span>
        </div>

        {/* Color Variant Toggle */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Pilihan Warna: <span className="text-foreground font-medium normal-case">{colorLabel}</span>
            </div>
            <div className="flex gap-3">
              {product.colorVariants.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColorVariant(c.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition ${
                    colorVariant === c.name
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border glass hover:bg-white/60 text-foreground"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-white/60 shrink-0"
                    style={{ background: c.hex }}
                  />
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Ukuran: <span className="text-foreground font-medium normal-case">{size}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                onClick={() => setSize(s.size)}
                className={`min-w-12 h-10 px-3 rounded-2xl text-sm font-medium transition ${
                  size === s.size
                    ? "bg-foreground text-background"
                    : "glass hover:bg-white/80"
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* Qty in Lusin */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Jumlah (lusin)
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center glass rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 grid place-items-center text-lg">−</button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 grid place-items-center text-lg">+</button>
            </div>
            <div className="text-sm text-muted-foreground">
              = {qty * 12} pcs · <span className="text-foreground font-semibold">{formatIDR(total)}</span>
            </div>
          </div>
        </div>

        {/* Min order info */}
        <div className="mt-4 rounded-2xl bg-primary/5 border border-primary/10 px-4 py-2.5 text-xs text-muted-foreground">
          ℹ️ Minimal pemesanan <span className="font-semibold text-primary">{MIN_LUSIN} lusin</span> total (boleh campur semua produk)
        </div>

        <div className="mt-6">
          <button
            onClick={handleAdd}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-semibold hover:bg-white transition"
          >
            <ShoppingBag className="h-4 w-4" />
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </motion.article>
  );
}
