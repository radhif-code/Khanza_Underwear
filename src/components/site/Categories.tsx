import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";

export function Categories() {
  return (
    <section id="kategori" className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Koleksi</p>
            <h2 className="text-4xl md:text-5xl font-display max-w-xl">
              Pilih Produk{" "}
              <span className="text-gradient-rose italic">Favoritmu</span>
            </h2>
          </div>
          <a href="#produk" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition">
            Lihat semua koleksi
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <motion.a
              key={p.id}
              href={`#${p.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative block glass-strong rounded-[2rem] overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-white">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-wider">
                {p.badge}
              </div>
              <div className="p-5 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-display">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.subtitle}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-foreground text-background grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
