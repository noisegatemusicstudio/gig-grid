import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: {},
  add(item) {
    set((s) => {
      const existing = s.items[item.id] ?? { ...item, qty: 0, subtotal: 0 };
      const updated = {
        ...existing,
        qty: existing.qty + 1,
        subtotal: (existing.qty + 1) * item.price,
      };
      return { items: { ...s.items, [item.id]: updated } };
    });
  },
  remove(id) {
    set((s) => {
      const { [id]: _, ...rest } = s.items;
      return { items: rest };
    });
  },
  clear() {
    set({ items: {} });
  },
}));
