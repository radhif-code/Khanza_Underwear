import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sari Mawarni",
    role: "Pelanggan setia",
    text: "Bahannya benar-benar adem dan lembut. Saya pakai Jiantex ukuran 5L dan akhirnya nemu yang pas dan nyaman seharian!",
  },
  {
    name: "Dewi Anggraini",
    role: "Ibu rumah tangga",
    text: "Halona warna pastelnya cantik banget. Jahitannya rapi, awet meski sering dicuci. Recommended!",
  },
  {
    name: "Rina Putri",
    role: "Karyawan",
    text: "Pengirimannya cepat, packaging rapi. Pinggangnya elastis tapi nggak ketat. Pasti repeat order!",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Testimoni</p>
          <h2 className="text-4xl md:text-5xl font-display">
            Dipercaya <span className="text-gradient-rose italic">ribuan</span> pelanggan
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              <div className="flex gap-0.5 text-yellow-500 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[oklch(0.78_0.1_305)] grid place-items-center text-primary-foreground text-sm font-semibold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
