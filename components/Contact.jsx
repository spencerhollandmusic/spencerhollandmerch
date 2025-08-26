'use client';
import { useState } from "react";
export function Contact({ data }) {
  const [status, setStatus] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (data.formspreeId) {
      const resp = await fetch(`https://formspree.io/f/${data.formspreeId}`, { method:'POST', headers:{'Accept':'application/json'}, body: fd });
      setStatus(resp.ok ? "Thanks! We'll be in touch." : "Something went wrong. Try again?");
    } else {
      setTimeout(()=>setStatus("Thanks! We'll be in touch."), 500);
    }
    form.reset();
  }
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-semibold">Contact Us</h3>
          <p className="text-gray-600 mt-2">We usually respond within one business day.</p>
          <ul className="mt-6 space-y-2 text-gray-700">
            {data.phone && <li><strong>Phone:</strong> {data.phone}</li>}
            {data.email && <li><strong>Email:</strong> {data.email}</li>}
            {data.address && <li><strong>Address:</strong> {data.address}</li>}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border p-6 bg-[var(--color-muted)]">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Your name" className="p-3 rounded-xl border" />
            <input name="email" type="email" required placeholder="Email address" className="p-3 rounded-xl border" />
          </div>
          <input name="phone" placeholder="Phone" className="p-3 rounded-xl border w-full mt-4" />
          <textarea name="message" required placeholder="How can we help?" className="p-3 rounded-xl border w-full mt-4 h-32" />
          <button className="mt-4 px-5 py-3 rounded-2xl bg-brand text-white shadow-soft">Send</button>
          {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
        </form>
      </div>
    </section>
  );
}
