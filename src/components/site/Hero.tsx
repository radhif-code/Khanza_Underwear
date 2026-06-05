import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import halonaImg from "@/assets/halona.jpg";
import jiantexImg from "@/assets/jiantex.jpg";
import rikiImg from "@/assets/riki.jpg";

const badges = [
  "Katun Premium",
  "Nyaman Seharian",
  "Ukuran Lengkap",
  "Pengiriman Cepat",
];

export function Hero() {
  return (
    <section id="beranda" className="relative pt-32 lg:pt-36 pb-20 px-4 overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-[oklch(0.85_0.12_350/0.5)] blur-3xl animate-float" />
      <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-[oklch(0.85_0.1_305/0.5)] blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-foreground/80">Nyaman Sepanjang Hari</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-display"
          >
            Celana Dalam{" "}
            <span className="text-gradient-rose italic">Jumbo</span>
            <br />
            Premium untuk{" "}
            <span className="relative">
              Kenyamanan
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10">
                <path d="M0 5 Q 50 0, 100 5 T 200 5" stroke="oklch(0.78 0.16 355)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Maksimal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Temukan koleksi celana dalam wanita dan singlet pria dengan bahan
            katun lembut, adem, nyaman dipakai seharian, dan tersedia hingga
            ukuran <span className="font-semibold text-foreground">7L</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#produk"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.68_0.18_340)] text-primary-foreground px-7 py-3.5 text-sm font-semibold shadow-soft hover:shadow-glow-rose transition-all hover:-translate-y-0.5"
            >
              Belanja Sekarang
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#kategori"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition-all"
            >
              Lihat Koleksi
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-x-5 gap-y-2 pt-2"
          >
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-1.5 text-xs text-foreground/70">
                <div className="grid place-items-center h-5 w-5 rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" />
                </div>
                {b}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[520px] lg:h-[600px]"
        >
          {/* Big rose halo */}
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-[oklch(0.85_0.14_350)] via-[oklch(0.88_0.1_320)] to-[oklch(0.88_0.08_280)] blur-2xl opacity-70" />

          {/* Main product card */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-1/2 -translate-x-1/2 w-[78%] h-[88%] glass-strong rounded-[2.5rem] p-4 overflow-hidden"
          >
            <div className="h-full w-full rounded-3xl overflow-hidden bg-white">
              <img src={halonaImg} alt="Halona" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          {/* Floating card top-left */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-4 left-0 w-40 h-52 glass-strong rounded-3xl p-2 rotate-[-8deg] overflow-hidden"
          >
            <img src={jiantexImg} alt="Jiantex" className="h-full w-full object-cover rounded-2xl" />
          </motion.div>

          {/* Floating card bottom-right */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-8 right-0 w-44 h-56 glass-strong rounded-3xl p-2 rotate-[6deg] overflow-hidden"
          >
            <img src={rikiImg} alt="Riki" className="h-full w-full object-cover rounded-2xl" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-2 glass-strong rounded-2xl px-4 py-3 shadow-soft"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Rating</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-lg font-semibold">4.9</span>
              <span className="text-yellow-500">★★★★★</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">12.480+ ulasan</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-24 right-4 glass-strong rounded-2xl px-4 py-3 shadow-soft"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Mulai</div>
            <div className="text-lg font-semibold text-gradient-rose">Rp49.000</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
