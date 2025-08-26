export function Hero({ data }) {
  const bg = data.image;
  const overlay = typeof data.overlay === "number" ? data.overlay : 60;
  const fullscreen = data.fullscreen === true;
  const parallax = data.parallax !== false;

  const sectionCls = `relative ${fullscreen ? "min-h-[100svh]" : ""}`;
  const innerCls = `relative mx-auto max-w-6xl px-4 ${
    fullscreen ? "min-h-[100svh] flex items-center" : "py-28"
  }`;

  return (
    <section id="home" className={sectionCls}>
      {bg && (
        <>
          {/* Background image */}
          <div
            className={`absolute inset-0 -z-10 bg-cover bg-center ${
              parallax ? "bg-fixed md:bg-fixed" : ""
            }`}
            style={{ backgroundImage: `url(${bg})` }}
            aria-hidden="true"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0 -z-10"
            style={{ background: `rgba(0,0,0,${overlay / 100})` }}
            aria-hidden="true"
          />
          {/* Subtle vignette to match your photo mood */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(120% 70% at 50% 30%, rgba(0,0,0,.15), transparent 60%)"
            }}
          />
        </>
      )}

      <div className={innerCls}>
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow">
            {data.headline}
          </h1>
          {data.sub && <p className="mt-4 text-lg text-white/90">{data.sub}</p>}

          {Array.isArray(data.links) && data.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {data.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-[var(--color-accent)] text-gray-900 shadow-soft hover:opacity-90"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


