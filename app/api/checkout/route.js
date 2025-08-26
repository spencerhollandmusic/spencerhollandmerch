import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const success_url = body.success_url || `${origin}/success`;
    const cancel_url  = body.cancel_url  || `${origin}/cancel`;

    const line_items = (body.items || []).map((it) => ({
      quantity: it.qty || 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(Number(it.price) * 100),
        product_data: {
          name: it.title,
          images: it.image ? [new URL(it.image, origin).toString()] : undefined,
          metadata: {
            id: it.id || it.title || "",
            color: it.color || "",
            size:  it.size  || "",
            tenant: body.tenant || ""
          }
        }
      }
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: ["US","CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "usd" },
            display_name: "Standard (3–5 days)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 }
            }
          }
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1500, currency: "usd" },
            display_name: "Express (1–2 days)"
          }
        }
      ],
      // Turn this on only if you've enabled Stripe Tax in your account:
      automatic_tax: { enabled: false },
      success_url,
      cancel_url,
      metadata: { tenant: body.tenant || "" }
    });

    return Response.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "checkout_error" }), { status: 500 });
  }
}
