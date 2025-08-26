import { headers } from "next/headers";
import { getTenantFromHost, getTenantConfig } from "../lib/tenant";
import { Nav } from "../components/Nav";
import { VideoHero } from "../components/VideoHero";
import { Services } from "../components/Services";
import { CTA } from "../components/CTA";
import { Merch } from "../components/Merch";

export default async function Page({ searchParams }) {
  const host = (await headers()).get("host") || "";
  const tenant = getTenantFromHost(host, searchParams?.t || null);
  const cfg = await getTenantConfig(tenant);

  return (
    <main>
      <Nav />             {/* minimal header with cart icon only */}
      <VideoHero data={cfg.hero} />
      {Array.isArray(cfg.services) && cfg.services.length > 0 && (<Services items={cfg.services} />)}
      <CTA data={cfg.cta} />
      <Merch data={cfg.merch} />
    </main>
  );
}
