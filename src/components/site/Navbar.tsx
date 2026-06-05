import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart, cart } from "@/lib/cart-store";
import logo from "@/assets/logo.jpg";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Jiantex", href: "#jiantex" },
  { label: "Halona", href: "#halona" },
  { label: "Riki", href: "#riki" },
  { label: "Tentang Kami", href: "#tentang" },
];

export function Navbar() {
  const { totalLusin } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <div className="mx-auto max-w-7xl glass-strong rounded-3xl px-5 py-3 flex items-center justify-between">
        <a href="#beranda" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl overflow-hidden ring-1 ring-white/60 shadow-glass">
            <img src={logo} alt="Khanza Underwear" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg text-foreground">Khanza</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Underwear</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-4 py-2 text-sm rounded-full text-foreground/80 hover:text-foreground hover:bg-white/60 transition-all"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <IconBtn label="Cari"><Search className="h-4 w-4" /></IconBtn>
          <IconBtn label="Akun"><User className="h-4 w-4" /></IconBtn>
          <IconBtn label="Wishlist"><Heart className="h-4 w-4" /></IconBtn>
          <button
            onClick={() => cart.open()}
            aria-label="Keranjang"
            className="relative h-10 w-10 rounded-full grid place-items-center bg-gradient-to-br from-primary to-[oklch(0.7_0.18_340)] text-primary-foreground hover:scale-105 transition-transform shadow-glass"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalLusin > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-[10px] grid place-items-center font-semibold">
                {totalLusin}
              </span>
            )}
          </button>
          <button
            className="lg:hidden h-10 w-10 rounded-full grid place-items-center hover:bg-white/60 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mx-auto max-w-7xl mt-2 glass-strong rounded-3xl p-3"
        >
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-2xl text-sm hover:bg-white/60"
            >
              {n.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-white/60 text-foreground/80 hover:text-foreground transition"
    >
      {children}
    </button>
  );
}
