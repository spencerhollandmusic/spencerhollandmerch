"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartContext";

export default function ProductModal({ product, onClose }) {
  const { addItem, setOpen } = useCart?.() || {};
  const [color, setColor] = useState(product?.colors?.[0] || "#0E4D64");
  const defaultSizes = product?.sizes && product.sizes.length ? product.sizes : ["S","M","L","XL","XXL"];
  const [size, setSize] = useState(defaultSizes[0]);
  const [qty, setQty] = useState(1);
  const panelRef = useRef(null);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // click outside to close
  function handleBackdrop(e){
    if (panelRef.current && !panelRef.current.contains(e.target)) onClose?.();
  }

  const priceNum =
    typeof product?.price === "number"
      ? product.price
      : Number(String(product?.price || "0").replace(/[^0-9.]/g, "")) || 0;

  function handleAdd() {
    if (!addItem) { onClose?.(); return; }
    addItem({
      id: product?.id || product?.title || "item",
      title: product?.title || "Merch",
      price: priceNum,
      image: product?.image,
      color,
      size,
      qty: Math.max(1, Number(qty) || 1),
      key: `${(product?.id || product?.title || "item")}-${size}-${color}`
    });
    setOpen?.(true);
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      onMouseDown={handleBackdrop}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl"
        onMouseDown={(e)=>e.stopPropagation()}
      >
        {/* left: image */}
        <div className="bg-slate-900/90">
          <div className="aspect-[4/3] w-full grid place-items-center">
            {product?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt={product?.title || "Product image"} className="w-full h-full object-cover" />
            ) : (
              <div className="text-white/70">No image</div>
            )}
          </div>
        </div>

        {/* right: details */}
        <div className="relative p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
            aria-label="Close"
          >
            ?
          </button>

          <h3 className="text-xl font-semibold text-gray-900">
            {product?.title || "Product"}
          </h3>
          {product?.desc && <p className="mt-1 text-gray-600">{product.desc}</p>}
          {!product?.desc && <p className="mt-1 text-gray-600">{product?.subtitle || product?.tagline || ""}</p>}

          {/* Color */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-800">Color</div>
            <div className="mt-2 flex items-center gap-3">
              {(product?.colors?.length ? product.colors : ["#0E4D64", "#1F2937", "#DABF9F"]).map((c, i) => {
                const selected = c === color;
                return (
                  <button
                    key={i}
                    onClick={() => setColor(c)}
                    className={`h-9 w-9 rounded-full border-2 ${
                      selected ? "ring-2 ring-offset-2 ring-[var(--color-accent)] border-white" : "border-gray-300"
                    }`}
                    style={{ background: c }}
                    aria-label={`Color ${c}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-800">Size</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {defaultSizes.map((s) => {
                const selected = s === size;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 px-3 rounded-xl border text-sm font-medium
                      ${selected
                        ? "bg-[var(--color-accent)] text-gray-900 border-transparent"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"}`}
                    aria-pressed={selected}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="qty" className="text-sm font-medium text-gray-800">Quantity</label>
              <input
                id="qty"
                type="number"
                min={1}
                value={qty}
                onChange={(e)=>setQty(Math.max(1, Number(e.target.value) || 1))}
                className="mt-2 h-10 w-32 rounded-xl border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>

            <div className="ml-auto">
              <button
                onClick={handleAdd}
                className="h-11 px-5 rounded-2xl bg-[var(--color-brand,#0E4D64)] text-white hover:opacity-90"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

