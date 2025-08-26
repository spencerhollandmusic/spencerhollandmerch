export function CTA({ data }) {
  if (!data) return null;
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 rounded-2xl border p-10 text-center">
        <h3 className="text-2xl font-semibold">{data.title}</h3>
        <p className="text-gray-600 mt-2">{data.desc}</p>
        {data.ctaLabel && (
          <a href="#contact" className="inline-block mt-6 px-5 py-3 rounded-2xl bg-brand text-white shadow-soft">
            {data.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}