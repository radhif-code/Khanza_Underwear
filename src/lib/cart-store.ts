import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  color?: string;
  price: number; // harga per lusin
  qty: number;   // qty dalam lusin
};

type Snapshot = {
  items: CartItem[];
  isOpen: boolean;
  totalLusin: number;
  totalPrice: number;
};

const EMPTY_SNAPSHOT: Snapshot = { items: [], isOpen: false, totalLusin: 0, totalPrice: 0 };

let items: CartItem[] = [];
let isOpen = false;
const listeners = new Set<() => void>();
let snapshot: Snapshot = computeSnapshot();

function computeSnapshot(): Snapshot {
  let totalLusin = 0;
  let totalPrice = 0;
  for (const i of items) {
    totalLusin += i.qty;
    totalPrice += i.qty * i.price;
  }
  return { items, isOpen, totalLusin, totalPrice };
}

const emit = () => { snapshot = computeSnapshot(); listeners.forEach((l) => l()); };
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY_SNAPSHOT;

export const cart = {
  add(item: Omit<CartItem, "id">) {
    const id = `${item.productId}-${item.size}-${item.color ?? ""}`;
    const existing = items.find((i) => i.id === id);
    if (existing) {
      items = items.map((i) => (i.id === id ? { ...i, qty: i.qty + item.qty } : i));
    } else {
      items = [...items, { ...item, id }];
    }
    isOpen = true;
    emit();
  },
  remove(id: string) { items = items.filter((i) => i.id !== id); emit(); },
  setQty(id: string, qty: number) { items = items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)); emit(); },
  open() { if (isOpen) return; isOpen = true; emit(); },
  close() { if (!isOpen) return; isOpen = false; emit(); },
  toggle() { isOpen = !isOpen; emit(); },
};

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
