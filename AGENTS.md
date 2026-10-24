# Project rules
- Keep the XML sitemap aligned with explicit public routes in App.tsx; omit lastmod unless a page-specific significant-change timestamp is authoritative, so crawlers receive accurate discovery metadata.
- Keep leadership content on the About page with linked Person and Article structured data; biography must remain grounded in supplied portfolio material, not unverified performance claims.
- Internal staff tools live under /manager/*, are noindex and excluded from the sitemap, and are gated server-side by the MANAGER_ACCESS_CODE secret, since the site has no staff accounts.
- AI calls (e.g. draft-reply) run only in edge functions via Lovable AI Gateway; the browser never holds the AI key.
