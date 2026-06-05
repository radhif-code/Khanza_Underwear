import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Footer() {
  return (
    <footer id="tentang" className="relative px-4 pt-20 pb-8">
      <div className="mx-auto max-w-7xl glass-strong rounded-[2.5rem] p-10 lg:p-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl overflow-hidden ring-1 ring-white/60">
                <img src={logo} alt="Khanza" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-display text-xl">Khanza Underwear</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Nyaman Sepanjang Hari</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Brand celana dalam dan singlet premium dengan bahan katun pilihan,
              jahitan rapi, dan tersedia hingga ukuran jumbo. Dibuat dengan
              cinta untuk kenyamananmu setiap hari.
            </p>
            <div className="flex gap-2 pt-2">
              <SocialBtn href="https://wa.me/6281235053914" label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialBtn>
              <SocialBtn href="#" label="Instagram"><Instagram className="h-4 w-4" /></SocialBtn>
              <SocialBtn href="#" label="TikTok">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.85a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.28Z"/></svg>
              </SocialBtn>
            </div>
          </div>
          <FooterCol title="Belanja" links={["Jiantex", "Halona Pastel", "Halona Noir", "Riki Singlet"]} />
          <FooterCol title="Bantuan" links={["Tentang Kami", "Cara Belanja", "Kebijakan Privasi", "Syarat & Ketentuan", "Hubungi Kami"]} />
        </div>
        <div className="mt-10 pt-6 border-t border-white/40 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Khanza Underwear. Semua hak dilindungi.</div>
          <div>Dibuat dengan ♥ untuk kenyamananmu</div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-full glass hover:bg-white transition">
      {children}
    </a>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-foreground/80 hover:text-primary transition">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
