# README.md

## Affine + Chatwoot White-Labelled Monorepo

This project demonstrates a multi-tenant, white-labelled Affine workspace with Chatwoot integration, using Docker Compose.

---

### Features

- **Tenant-based branding** (logo, color, title) via query string or subdomain.
- **Dynamic Chatwoot widget** per tenant.
- **Easy tenant config** via `tenants.json` or backend.
- **All services run locally via Docker Compose.**

---

## Quick Start

1. **Clone this repo** (or copy all files as shown).
2. **Add your tenant logos** to `affine/public/branding/` (e.g., `acme-logo.png`).
3. **Start all services:**

   ```bash
   docker-compose up --build
   ```

4. **Access Affine:**

   - By query string: [http://localhost:3000/?tenant=acme](http://localhost:3000/?tenant=acme)
   - By subdomain (requires DNS or hosts file): [http://acme.localhost:3000](http://acme.localhost:3000)

5. **Chatwoot dashboard:** [http://localhost:3001](http://localhost:3001)

---

## Adding a New Tenant

1. **Edit `tenants.json`:**

   ```json
   {
   	"id": "newtenant",
   	"name": "New Tenant",
   	"logo": "/branding/newtenant-logo.png",
   	"themeColor": "#123456",
   	"title": "New Tenant Workspace",
   	"chatwoot": {
   		"websiteToken": "your-chatwoot-token",
   		"baseUrl": "http://localhost:3001",
   		"widgetColor": "#123456"
   	}
   }
   ```

2. **Add the logo** to `affine/public/branding/newtenant-logo.png`.

3. **Restart backend (if running):**

   ```bash
   docker-compose restart backend
   ```

---

## How Branding & Tenant Switching Works

- **Tenant is detected** from the URL:
  - `?tenant=acme` (query string)
  - `acme.localhost` (subdomain)
- **Branding config** is fetched from the backend (`tenants.json`).
- **UI updates** logo, color, title, and Chatwoot widget dynamically.

---

## Customizing Chatwoot Widget

- Each tenant can have a unique Chatwoot website token and color.
- User info can be prefilled via the Chatwoot JS SDK in `BrandingProvider.tsx`.

---

## Development Notes

- **Affine** is built from source and customized for white-labelling.
- **Chatwoot** runs in a separate container.
- **Backend** serves tenant config for easy extensibility.

---

## Troubleshooting

- If logos or branding don't appear, check the browser console for errors.
- Ensure all services are running (`docker-compose ps`).
- For subdomain routing, you may need to edit your `/etc/hosts` file:

  ```
  127.0.0.1 acme.localhost globex.localhost
  ```

---

## License

MIT (for this integration). Affine and Chatwoot are under their respective licenses.
