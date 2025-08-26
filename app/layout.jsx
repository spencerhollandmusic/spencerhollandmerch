import "./globals.css";
import { headers } from "next/headers";
import { getTenantFromHost, getTenantConfig } from "../lib/tenant";
import { Footer } from "../components/Footer";
import { CartProvider } from "../components/CartContext";
import { CartDrawer } from "../components/CartDrawer";

export const metadata = {
  title: "Website-as-a-Service",
  description: "Multi-tenant website starter"
};

export default async function RootLayout({ children }) {
  const host = (await headers()).get("host") || "";
  const tenant = getTenantFromHost(host);
  const cfg = await getTenantConfig(tenant);

  const styleVars = {
    "--color-brand":  cfg?.theme?.primary || "#2563eb",
    "--color-accent": cfg?.theme?.accent  || "#14b8a6",
    "--color-muted":  cfg?.theme?.muted   || "#f3f4f6"
  };

  return (
    <html lang="en">
      <body className="bg-[var(--color-muted)] text-gray-800 antialiased" style={styleVars}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            {children}
            <Footer brand={cfg.brand} />
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}


