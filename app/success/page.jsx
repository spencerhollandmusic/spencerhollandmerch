export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Thank you!</h1>
      <p className="mt-3 text-gray-600">Your order was placed successfully. A receipt has been emailed to you.</p>
      <a href="/?t=your-artist" className="inline-block mt-6 px-5 py-3 rounded-2xl bg-brand text-white">Back to site</a>
    </main>
  );
}
