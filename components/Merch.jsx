"use client";

import { useState } from "react";
import ProductModal from "./ProductModal"; // default export

function MerchComponent({ data }) {
  // ? Call hooks unconditionally at the top
  const [active, setActive] = useState(null);
  const items = data?.items ?? [];

  // You may still render nothing, but do it AFTER hooks are declared
  if (!data || items.length === 0) {
    return null;
  }

  return (
    <section id="merch" className="relative py-20 text-white">
      {/* dark background + subtle radial glow */}
      <div className="absolute inset-0 -z-10 bg-slate-950" />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.06), transparent 60%)"
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold">{data.title || "Merch"}</h2>
        {data.note && <p className="mt-2 text-white/70">{data.note}</p>}

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <article
              key={p.id || i}
              className="group rounded-3xl bg-white/[0.05] backdrop-blur-sm
                         border border-white/10
                         shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                         overflow-hidden transition-transform duration-300
                         hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              {/* image */}
              <div className="relative aspect-[4/3] bg-white/[0.03]">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.alt || p.title || "Merch item"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-white/50">
                    Add product image
                  </div>
                )}

                {/* badge */}
                {p.badge && (
                  <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-brand text-white shadow">
                    {p.badge}
                  </span>
                )}

                {/* price chip */}
                {p.price != null && (
                  <span className="absolute right-3 bottom-3 text-sm px-3 py-1 rounded-full bg-[var(--color-accent)] text-gray-900 shadow">
                    ${
                      typeof p.price === "number"
                        ? p.price.toFixed(2)
                        : String(p.price).replace(/[^0-9.]/g, "")
                    }
                  </span>
                )}
              </div>

              {/* details */}
              <div className="p-5">
                <h3 className="font-semibold text-white">{p.title}</h3>
                {p.desc && <p className="text-sm text-white/70 mt-1">{p.desc}</p>}

                {/* color dots */}
                {Array.isArray(p.colors) && p.colors.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="inline-block w-5 h-5 rounded-full border border-white/20"
                        style={{ background: c }}
                        title={c}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-end">
                  <button
                    onClick={() => setActive(p)}
                    className="px-4 py-2 rounded-2xl bg-brand text-white hover:opacity-90"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {data.storeUrl && (
          <div className="text-center mt-10">
            <a
              href={data.storeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-[var(--color-accent)] text-gray-900 hover:opacity-90"
            >
              Visit full store
            </a>
          </div>
        )}
      </div>

      {active && (
        <ProductModal product={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

export default MerchComponent;
export { MerchComponent as Merch };

