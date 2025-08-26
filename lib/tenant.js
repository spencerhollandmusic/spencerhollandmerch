export function getTenantFromHost(host, fallback) {
  if (fallback) return fallback;
  if (!host) return "acme";
  const clean = host.replace(/^www\./, "");
  const parts = clean.split(":")[0].split(".");
  if (parts.length >= 3) return parts[0];
  return "acme";
}
export async function getTenantConfig(tenant) {
  try { return (await import(`../data/clients/${tenant}/content.json`)).default; }
  catch { return (await import(`../data/clients/acme/content.json`)).default; }
}

