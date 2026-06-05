import { motion } from "framer-motion";
import { Sparkles, Wind, Scissors, Shield } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Katun Premium", desc: "Lembut dan nyaman di kulit" },
  { icon: Shield, title: "Pinggang Elastis", desc: "Tidak ketat dan nyaman digunakan" },
  { icon: Scissors, title: "Jahitan Kuat", desc: "Lebih awet untuk penggunaan harian" },
  { icon: Wind, title: "Adem Dipakai", desc: "Menyerap keringat dan tidak panas" },
];

export function Features() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Keunggulan</p>
          <h2 className="text-4xl md:text-5xl font-display">
            Dibuat dengan{" "}
            <span className="text-gradient-rose italic">cinta</span> untuk
            kenyamananmu
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-3xl p-6 group cursor-default"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.7_0.18_340)] grid place-items-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
