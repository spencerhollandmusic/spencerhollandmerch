"use client";
import { CartButton } from "./CartButton";

/** Fixed cart in the top-right. Safe-area aware for mobile notches. */
export function Nav() {
  return (
    <div
      className="fixed z-50"
      style={{
        top: "max(env(safe-area-inset-top, 0px), 16px)",
        right: "max(env(safe-area-inset-right, 0px), 16px)"
      }}
    >
      <CartButton />
    </div>
  );
}

