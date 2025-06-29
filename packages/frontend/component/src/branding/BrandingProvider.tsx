import React, { useEffect, useState, ReactNode } from 'react';
import type { TenantConfig } from './tenant';
import { getTenantConfig } from './tenant';

export const BrandingContext = React.createContext<TenantConfig | null>(null);

export const BrandingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);

  useEffect(() => {
    getTenantConfig().then(setTenant);
  }, []);

  useEffect(() => {
    if (tenant) {
      document.title = tenant.title;
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) {
        themeMeta.setAttribute('content', tenant.themeColor);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = tenant.themeColor;
        document.head.appendChild(meta);
      }
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = tenant.logo;
      }
    }
  }, [tenant]);

  useEffect(() => {
    if (tenant && tenant.chatwoot && tenant.chatwoot.websiteToken) {
      if ((window as any).$chatwoot) return;
      (function(d,t) {
        var BASE_URL=tenant.chatwoot.baseUrl;
        var g = d.createElement(t) as HTMLScriptElement, s = d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.async=true;
        g.onload = function() {
          (window as any).$chatwoot.run({
            websiteToken: tenant.chatwoot.websiteToken,
            baseUrl: BASE_URL,
            widgetColor: tenant.chatwoot.widgetColor,
          });
        };
        s.parentNode!.insertBefore(g,s);
      })(document,"script");
    }
  }, [tenant]);

  return (
    <BrandingContext.Provider value={tenant}>
      {children}
    </BrandingContext.Provider>
  );
}; 