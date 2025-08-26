export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Checkout canceled</h1>
      <p className="mt-3 text-gray-600">No worries—your cart is saved if you want to try again.</p>
      <a href="/?t=your-artist#merch" className="inline-block mt-6 px-5 py-3 rounded-2xl bg-brand text-white">Return to merch</a>
    </main>
  );
}
