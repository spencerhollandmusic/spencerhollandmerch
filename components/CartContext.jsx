"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((product, opts = {}) => {
    const key = `${product.id || product.title}|${opts.color || ""}|${opts.size || ""}`;
    setItems(prev => {
      const idx = prev.findIndex(i => i.key === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 0) + (opts.qty || 1) };
        return next;
      }
      return [
        ...prev,
        {
          key,
          id: product.id || product.title,
          title: product.title,
          price: Number(product.price || 0),
          image: product.image || null,
          color: opts.color || null,
          size: opts.size || null,
          qty: opts.qty || 1
        }
      ];
    });
    setOpen(true);
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems(prev => prev.map(i => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);

  const removeItem = useCallback(key => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeItem,
      clear,
      open,
      setOpen,
      openDrawer: () => setOpen(true),
      closeDrawer: () => setOpen(false),
      count,
      subtotal
    }),
    [items, addItem, updateQty, removeItem, clear, open, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const v = useContext(CartContext);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
