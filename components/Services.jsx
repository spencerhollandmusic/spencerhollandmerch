export function Services({ items }) {
  return (
    <section id="services" className="py-16 bg-[var(--color-muted)]">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold">Our Services</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items?.map((s,i)=>(
            <div key={i} className="rounded-2xl bg-white p-6 border shadow-soft">
              <div className="text-brand font-semibold">{s.title}</div>
              <p className="text-gray-600 mt-2">{s.desc}</p>
              {s.price && <p className="mt-4 text-sm text-gray-500">Starting at {s.price}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}