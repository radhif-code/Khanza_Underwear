## Masalah

Halaman crash dengan error "Maximum update depth exceeded" di `Navbar`. Akar masalah ada di `src/lib/cart-store.ts`:

```ts
return useSyncExternalStore(
  subscribe,
  () => ({ items: state.items, isOpen: state.isOpen, count: state.count, total: state.total }),
  () => ({ items: [], isOpen: false, count: 0, total: 0 }),
);
```

`getSnapshot` membuat **object literal baru setiap dipanggil**. `useSyncExternalStore` membandingkan dengan `Object.is`, jadi reference selalu berbeda → React menjadwalkan re-render → snapshot baru lagi → loop tanpa henti.

## Perbaikan

Edit `src/lib/cart-store.ts`:

1. Simpan satu variabel module-level `snapshot` berisi `{ items, isOpen, count, total }`.
2. Buat helper `computeSnapshot()` yang dipanggil di `emit()` — hanya saat ada mutasi (add/remove/setQty/open/close).
3. `getSnapshot` di hook mengembalikan reference `snapshot` yang sama selama tidak berubah.
4. `getServerSnapshot` memakai object konstanta module-scope (`EMPTY_SNAPSHOT`), bukan literal inline.
5. Inisialisasi `snapshot` sekali di module load.

## Verifikasi

Setelah fix:
- Buka preview, pastikan tidak lagi muncul "This page didn't load".
- Klik tombol cart di navbar → drawer terbuka tanpa error.
- Tambah produk ke cart → counter di icon naik, drawer ter-update.
