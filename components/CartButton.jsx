"use client";
import { useCart } from "./CartContext";

export function CartButton() {
  const { count, openDrawer } = useCart();
  return (
    <button
      onClick={openDrawer}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition"
      aria-label="Open cart"
      title="Cart"
    >
      {/* If /icons/cart.svg exists, show it; otherwise fallback to emoji */}
      <img
        src="/icons/cart.svg"
        alt=""
        className="w-5 h-5"
        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "block"; }}
      />
      <span className="hidden text-xl leading-none select-none">??</span>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[var(--color-accent)] text-gray-900 text-xs flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
