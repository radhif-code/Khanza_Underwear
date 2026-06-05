import jiantexImg from "@/assets/jiantex.jpg";
import halonaImg from "@/assets/halona.jpg";
import halona2Img from "@/assets/halona-2.jpg";
import rikiImg from "@/assets/riki.jpg";

export type Variant = {
  size: string;
  price: number;
  color?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  colorVariants?: { name: string; label: string; hex: string }[];
  sizes: { size: string; price: number }[];
  badge?: string;
};

// Semua harga = harga per LUSIN (12 pcs)
// Minimal order 10 lusin total (boleh campur produk)
export const products: Product[] = [
  {
    id: "jiantex",
    slug: "jiantex",
    name: "Jiantex",
    subtitle: "Celana Dalam Wanita Jumbo",
    description:
      "Katun pilihan yang lembut, adem, dan nyaman di kulit. Pinggang elastis tidak ketat, cocok untuk pemakaian sehari-hari hingga ukuran 7L.",
    image: jiantexImg,
    badge: "Best Seller",
    colorVariants: [
      { name: "terang", label: "Warna Terang", hex: "#f4c2d4" },
      { name: "gelap", label: "Warna Gelap", hex: "#3a2a4e" },
    ],
    sizes: [
      { size: "M", price: 49000 * 12 },
      { size: "L", price: 51000 * 12 },
      { size: "XL", price: 53000 * 12 },
      { size: "3L", price: 59000 * 12 },
      { size: "4L", price: 69000 * 12 },
      { size: "5L", price: 62000 * 12 },
      { size: "6L", price: 67000 * 12 },
      { size: "7L", price: 69000 * 12 },
    ],
  },
  {
    id: "halona",
    slug: "halona",
    name: "Halona",
    subtitle: "Celana Dalam Wanita",
    description:
      "Bahan katun premium full cut yang menutup sempurna. Tersedia pilihan warna terang (pastel) dan warna gelap (bold) untuk gaya yang sesuai seleramu.",
    image: halonaImg,
    badge: "Premium",
    colorVariants: [
      { name: "terang", label: "Warna Terang", hex: "#f4b8c8" },
      { name: "gelap", label: "Warna Gelap", hex: "#1a1a1a" },
    ],
    sizes: [
      { size: "L", price: 49000 * 12 },
      { size: "XL", price: 52000 * 12 },
      { size: "3L", price: 55000 * 12 },
      { size: "4L", price: 58000 * 12 },
      { size: "5L", price: 63000 * 12 },
      { size: "6L", price: 68000 * 12 },
      { size: "7L", price: 75000 * 12 },
    ],
  },
  {
    id: "riki",
    slug: "riki",
    name: "Kaos Singlet Pria",
    subtitle: "Singlet Pria Katun Premium",
    description:
      "Singlet pria katun klasik. Menyerap keringat, sejuk dipakai sepanjang hari, dan jahitan rapi yang tahan lama.",
    image: rikiImg,
    badge: "For Him",
    sizes: [
      { size: "M", price: 80000 * 12 },
      { size: "L", price: 84000 * 12 },
      { size: "XL", price: 86000 * 12 },
      { size: "3L", price: 93000 * 12 },
    ],
  },
];

export const MIN_LUSIN = 10;

export const formatIDR = (n: number) =>
  "Rp" + n.toLocaleString("id-ID");

export const WA_NUMBER = "6281235053914";

export function buildWhatsAppLink(opts: {
  product: string;
  size?: string;
  color?: string;
  qty?: number;
  total?: number;
}) {
  const msg =
    `Halo Khanza Underwear,\nSaya ingin memesan:\n` +
    `Produk: ${opts.product}\n` +
    `Ukuran: ${opts.size ?? "-"}\n` +
    `Warna: ${opts.color ?? "-"}\n` +
    `Jumlah: ${opts.qty ?? 1} lusin\n` +
    `Total Harga: ${opts.total ? formatIDR(opts.total) : "-"}\n` +
    `Mohon informasi lebih lanjut.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
