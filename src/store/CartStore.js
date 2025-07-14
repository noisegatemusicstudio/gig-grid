import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: {},
  add(band) {
    set((s) => {
      const existing = s.items[band.id] ?? { ...band, qty: 0, subtotal: 0 };
      const updated = {
        ...existing,
        qty: existing.qty + 1,
        subtotal: (existing.qty + 1) * band.price,
      };
      return { items: { ...s.items, [band.id]: updated } };
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
  count: () => Object.values(get().items).reduce((n, i) => n + i.qty, 0),
}));