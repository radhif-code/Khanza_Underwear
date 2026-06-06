import jiantexImg from "@/assets/jiantex.jpg";
import halonaImg from "@/assets/halona.jpg";
import rikiImg from "@/assets/riki.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  colorVariants?: { name: string; label: string; colors: string[] }[];
  sizes: { size: string; price: number }[];
  badge?: string;
  fixedColor?: string; // untuk Riki yang warnanya fixed
};

// Semua harga = harga per LUSIN (12 pcs)
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
      {
        name: "muda",
        label: "Warna Muda",
        colors: ["Pink", "Ungu Muda", "Biru Muda", "Cream", "Peach", "Mint"],
      },
      {
        name: "tua",
        label: "Warna Tua",
        colors: ["Hitam", "Ungu Tua", "Navy", "Maroon", "Coklat", "Abu Abu"],
      },
    ],
    sizes: [
      { size: "M",  price: 49000 },
      { size: "L",  price: 51000 },
      { size: "XL", price: 53000 },
      { size: "3L", price: 59000 },
      { size: "4L", price: 69000 },
      { size: "5L", price: 62000 },
      { size: "6L", price: 67000 },
      { size: "7L", price: 69000 },
    ],
  },
  {
    id: "halona",
    slug: "halona",
    name: "Halona",
    subtitle: "Celana Dalam Wanita",
    description:
      "Bahan katun premium full cut yang menutup sempurna. Pilih kategori warna muda (pastel) atau warna tua (bold) — warna dikirim sesuai stok dalam kategori yang dipilih.",
    image: halonaImg,
    badge: "Premium",
    colorVariants: [
      {
        name: "muda",
        label: "Warna Muda",
        colors: ["Pink", "Ungu Muda", "Biru Muda", "Cream", "Peach", "Mint"],
      },
      {
        name: "tua",
        label: "Warna Tua",
        colors: ["Hitam", "Ungu Tua", "Navy", "Maroon", "Coklat", "Abu Abu"],
      },
    ],
    sizes: [
      { size: "L",  price: 49000 },
      { size: "XL", price: 52000 },
      { size: "3L", price: 55000 },
      { size: "4L", price: 58000 },
      { size: "5L", price: 63000 },
      { size: "6L", price: 68000 },
      { size: "7L", price: 75000 },
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
    fixedColor: "Putih",
    sizes: [
      { size: "M",  price: 80000 },
      { size: "L",  price: 84000 },
      { size: "XL", price: 86000 },
      { size: "3L", price: 93000 },
    ],
  },
];

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
    `Mohon informasi lebih lanjut. Terima kasih 🙏`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
