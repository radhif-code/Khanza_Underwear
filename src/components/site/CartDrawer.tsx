import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle, AlertCircle } from "lucide-react";
import { useCart, cart } from "@/lib/cart-store";
import { formatIDR, WA_NUMBER, MIN_LUSIN } from "@/lib/products";

export function CartDrawer() {
  const { items, isOpen, totalLusin, totalPrice } = useCart();

  const canCheckout = totalLusin >= MIN_LUSIN;
  const remaining = MIN_LUSIN - totalLusin;

  const handleCheckout = () => {
    if (!canCheckout) return;

    const lines = items
      .map(
        (i) =>
          `- ${i.name}${i.color ? ` (${i.color})` : ""} Ukuran ${i.size} — ${i.qty} lusin (${i.qty * 12} pcs) = ${formatIDR(i.price * i.qty)}`
      )
      .join("\n");

    const msg =
      `Halo Khanza Underwear,\n` +
      `Saya ingin memesan:\n\n` +
      `${lines}\n\n` +
      `Total: ${totalLusin} lusin (${totalLusin * 12} pcs)\n` +
      `Total Harga: ${formatIDR(totalPrice)}\n\n` +
      `Mohon informasi lebih lanjut. Terima kasih 🙏`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cart.close()}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] p-3"
          >
            <div className="h-full glass-strong rounded-3xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/40">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">Keranjang</div>
                  <div className="font-display text-2xl">Belanjaan Saya</div>
                </div>
                <button onClick={() => cart.close()} className="h-10 w-10 grid place-items-center rounded-full hover:bg-white/60">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full grid place-items-center text-center text-sm text-muted-foreground py-20">
                    <div>
                      <div className="text-5xl mb-3">🛍️</div>
                      Keranjangmu masih kosong.
                      <br />
                      Yuk pilih produk favoritmu!
                    </div>
                  </div>
                ) : (
                  items.map((i) => (
                    <div key={i.id} className="glass rounded-2xl p-3 flex gap-3">
                      <div className="h-20 w-20 rounded-xl overflow-hidden bg-white shrink-0">
                        <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div className="font-semibold text-sm truncate">{i.name}</div>
                          <button onClick={() => cart.remove(i.id)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i.size}{i.color ? ` · ${i.color}` : ""}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="inline-flex items-center gap-1 glass rounded-full">
                            <button onClick={() => cart.setQty(i.id, i.qty - 1)} className="h-7 w-7 grid place-items-center">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold">{i.qty} lsn</span>
                            <button onClick={() => cart.setQty(i.id, i.qty + 1)} className="h-7 w-7 grid place-items-center">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-sm font-semibold text-gradient-rose">{formatIDR(i.price * i.qty)}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-white/40 p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Lusin</span>
                    <span className="font-semibold">{totalLusin} lusin ({totalLusin * 12} pcs)</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Total Harga</span>
                    <span className="text-2xl font-display text-gradient-rose">{formatIDR(totalPrice)}</span>
                  </div>

                  {/* Min order warning */}
                  {!canCheckout && (
                    <div className="flex items-start gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-xs text-amber-700">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>
                        Belum bisa checkout. Tambahkan{" "}
                        <span className="font-semibold">{remaining} lusin lagi</span> untuk memenuhi minimum order {MIN_LUSIN} lusin.
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition ${
                      canCheckout
                        ? "bg-gradient-to-r from-primary to-[oklch(0.68_0.18_340)] text-primary-foreground shadow-soft hover:shadow-glow-rose cursor-pointer"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                    }`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {canCheckout ? "Pesan via WhatsApp" : `Kurang ${remaining} lusin lagi`}
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
