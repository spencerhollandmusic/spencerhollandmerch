"use client";

import { useState, useMemo } from "react";
import { useCart } from "./CartContext";

export function CartDrawer() {
  const { open, setOpen, items, updateQty, removeItem, subtotal } = useCart();
  const [loading, setLoading] = useState(false);

  const tenant = useMemo(() => {
    if (typeof window === "undefined") return "your-artist";
    const q = new URLSearchParams(window.location.search);
    return q.get("t") || "your-artist";
  }, []);

  async function handleCheckout() {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant,
          items: items.map(i => ({
            id: i.id,
            title: i.title,
            price: i.price,
            image: i.image,
            qty: i.qty,
            color: i.color,
            size: i.size
          }))
        })
      });
      const data = await res.json();
      if (data?.url) window.location = data.url;
    } catch (e) {
      alert("Checkout error. Try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your cart</h3>
          <button onClick={() => setOpen(false)} className="text-sm">Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <div key={it.key} className="flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  {it.image && <img src={it.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-600">
                    {it.size ? `Size ${it.size}` : ""}{it.size && it.color ? " • " : ""}{it.color ? "Color" : ""}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-2 border rounded" onClick={() => updateQty(it.key, Math.max(1, it.qty - 1))}>-</button>
                    <span className="w-8 text-center">{it.qty}</span>
                    <button className="px-2 border rounded" onClick={() => updateQty(it.key, it.qty + 1)}>+</button>
                    <button className="ml-4 text-gray-500 hover:text-red-600 text-sm" onClick={() => removeItem(it.key)}>Remove</button>
                  </div>
                </div>
                <div className="font-medium">${(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-600">Subtotal</div>
            <div className="text-lg font-semibold">${subtotal.toFixed(2)}</div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            className="w-full px-4 py-3 rounded-2xl bg-[var(--color-accent)] text-gray-900 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Processing…" : "Checkout"}
          </button>
        </div>
      </aside>
    </div>
  );
}
