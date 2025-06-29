export type TenantConfig = {
  id: string;
  name: string;
  logo: string;
  themeColor: string;
  title: string;
  chatwoot: {
    websiteToken: string;
    baseUrl: string;
    widgetColor: string;
  };
};

let tenantConfigs: TenantConfig[] = [];

export async function fetchTenantConfigs(): Promise<TenantConfig[]> {
  if (tenantConfigs.length) return tenantConfigs;
  const url = process.env.TENANT_CONFIG_URL || 'http://localhost:4000/tenants';
  const res = await fetch(url);
  tenantConfigs = await res.json();
  return tenantConfigs;
}

export function extractTenant(): string | null {
  const params = new URLSearchParams(window.location.search);
  if (params.has('tenant')) return params.get('tenant');
  const host = window.location.hostname;
  const match = host.match(/^([a-z0-9-]+)\./i);
  if (match) return match[1];
  return null;
}

export async function getTenantConfig(): Promise<TenantConfig | null> {
  const tenantId = extractTenant();
  const configs = await fetchTenantConfigs();
  return configs.find(t => t.id === tenantId) || null;
} 