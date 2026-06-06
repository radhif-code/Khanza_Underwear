import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ShoppingBag, MessageCircle, Check, ChevronDown } from "lucide-react";
import { type Product, formatIDR, buildWhatsAppLink } from "@/lib/products";
import { cart } from "@/lib/cart-store";

const COLOR_HEX: Record<string, string> = {
  "Pink": "#f4b8c8",
  "Ungu Muda": "#d4c1e8",
  "Biru Muda": "#bfd9ec",
  "Cream": "#f3e8d3",
  "Peach": "#f8c9b0",
  "Mint": "#c4e4d0",
  "Hitam": "#1a1a1a",
  "Ungu Tua": "#4a2a5e",
  "Navy": "#1e2a4a",
  "Maroon": "#5c1f2a",
  "Coklat": "#4a3022",
  "Abu Abu": "#5a5a5a",
  "Putih": "#fafafa",
};

export function ProductCard({ product, reverse = false }: { product: Product; reverse?: boolean }) {
  const [size, setSize] = useState(product.sizes[0].size);
  const [colorVariant, setColorVariant] = useState(product.colorVariants?.[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  const price = useMemo(
    () => product.sizes.find((s) => s.size === size)?.price ?? product.sizes[0].price,
    [size, product],
  );
  const total = price * qty;

  const selectedVariant = product.colorVariants?.find((c) => c.name === colorVariant);
  const colorLabel = selectedVariant?.label ?? product.fixedColor ?? "-";

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

  const waLink = buildWhatsAppLink({
    product: product.name,
    size,
    color: colorLabel,
    qty,
    total,
  });

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
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Details */}
      <div className="p-8 lg:p-10 flex flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{product.subtitle}</p>
        <h3 className="font-display text-4xl lg:text-5xl mt-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-4xl font-display text-gradient-rose">{formatIDR(price)}</span>
          <span className="text-xs text-muted-foreground">/ lusin</span>
        </div>

        {/* Perks */}
        <div className="mt-4 flex flex-wrap gap-3">
          {["Grosir 1 Lusin (12 pcs)", "Katun Adem", ...(product.id === "jiantex" ? ["Pinggang Elastis"] : product.id === "riki" ? ["Serap Keringat"] : ["Full Cut"])].map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 text-xs text-primary font-medium">
              <Check className="h-3.5 w-3.5" />
              {f}
            </span>
          ))}
        </div>

        {/* Color variant dropdown — Jiantex & Halona */}
        {product.colorVariants && (
          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Pilihan Warna</div>
            <div className="relative w-full max-w-xs">
              <select
                value={colorVariant}
                onChange={(e) => setColorVariant(e.target.value)}
                className="w-full appearance-none glass border border-white/50 rounded-2xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                {product.colorVariants.map((c) => (
                  <option key={c.name} value={c.name}>{c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Color swatches preview */}
            {selectedVariant && (
              <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                {selectedVariant.colors.map((c) => (
                  <span
                    key={c}
                    title={c}
                    className="h-5 w-5 rounded-full ring-1 ring-white/60 shadow-sm"
                    style={{ background: COLOR_HEX[c] ?? "#ccc" }}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  Dikirim sesuai stok tersedia
                </span>
              </div>
            )}

            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              Warna akan dikirim sesuai kategori yang dipilih dan ketersediaan stok. Tidak dapat memilih warna satuan.
            </p>
          </div>
        )}

        {/* Fixed color — Riki */}
        {product.fixedColor && (
          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Warna</div>
            <div className="inline-flex items-center gap-2 glass rounded-2xl px-4 py-2.5 text-sm font-medium">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-white/60"
                style={{ background: COLOR_HEX[product.fixedColor] ?? "#fafafa" }}
              />
              {product.fixedColor}
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

        {/* Qty */}
        <div className="mt-6 flex items-center gap-3">
          <div className="inline-flex items-center glass rounded-full">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 grid place-items-center text-lg">−</button>
            <span className="w-12 text-center text-sm font-semibold">{qty} lsn</span>
            <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 grid place-items-center text-lg">+</button>
          </div>
          <div className="text-sm text-muted-foreground">
            = {qty * 12} pcs · <span className="text-foreground font-semibold">{formatIDR(total)}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-semibold hover:bg-white transition"
          >
            <ShoppingBag className="h-4 w-4" />
            Tambah ke Keranjang
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.68_0.18_340)] text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-soft hover:shadow-glow-rose transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            Beli Sekarang
          </a>
        </div>
      </div>
    </motion.article>
  );
}
