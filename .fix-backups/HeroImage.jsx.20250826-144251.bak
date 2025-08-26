"use client";

export default function HeroImage({ hero = {}, brand = {} }) {
  const src = hero.image || "/artist.png";
  const overlay = Math.min(100, Math.max(0, hero.overlay ?? 60));
  const parallax = !!hero.parallax;
  const title = hero.headline || brand.name || "";

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundAttachment: parallax ? "fixed" : "scroll",
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: `rgba(0,0,0,${overlay / 100})` }}
        aria-hidden="true"
      />
      {/* Right-aligned content */}
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40 flex justify-end">
        <div className="max-w-xl text-white">
          {title && <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>}
          {hero.sub && <p className="mt-4 text-white/80">{hero.sub}</p>}
          {Array.isArray(hero.links) && hero.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {hero.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-brand text-white hover:opacity-90"
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
