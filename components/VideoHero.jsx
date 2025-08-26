export function VideoHero({ data }) {
  const overlay = typeof data?.overlay === "number" ? data.overlay : 70;
  const fullscreen = data?.fullscreen === true;
  const hasVideo = !!data?.video;

  return (
    <section id="home" className={`relative ${fullscreen ? "min-h-[100svh]" : ""}`}>
      {/* media */}
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={data.video}
          autoPlay
          muted
          loop
          playsInline
          poster={data?.image || undefined}
        />
      ) : data?.image ? (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.image})` }}
          aria-hidden="true"
        />
      ) : null}

      {/* overlay + soft vignette */}
      <div className="absolute inset-0 -z-10" style={{ background: `rgba(0,0,0,${overlay/100})` }} />
      <div className="absolute inset-0 -z-10 pointer-events-none"
           style={{ background: "radial-gradient(120% 70% at 50% 30%, rgba(0,0,0,.15), transparent 60%)" }} />

      {/* content */}
      <div className={`relative mx-auto max-w-6xl px-4 md:px-2 ${fullscreen ? "min-h-[100svh] flex items-center" : "py-24"}`}>
        {/* Right-aligned on md+, centered on mobile */}
        <div className="w-full md:max-w-[34rem] lg:max-w-[32rem] md:ml-auto md:text-right">
          {data?.headline && (
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
              {data.headline}
            </h1>
          )}
          {data?.sub && <p className="mt-4 text-lg text-white/90">{data.sub}</p>}

          {Array.isArray(data?.links) && data.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 md:justify-end">
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


