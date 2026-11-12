PETER GAME SHOP — Website bundle

Included:
- index.html: responsive customer-facing shop page styled to the supplied reference.
- server.js: small Node.js backend that proxies Player ID / Server ID lookup to a supplier API.
- .env.example: settings to fill in from your supplier.

Run locally:
1. Install Node.js 18 or newer.
2. Put all files in one folder.
3. Copy .env.example to .env and fill in the supplier lookup URL and API key.
4. In server.js, adjust the request payload, auth header, and nickname response mapping to match the supplier's official API documentation.
5. Run: node server.js
6. Open http://localhost:3000

Important limitations:
- This is a ready-to-customize starter, not a live production top-up service.
- No real supplier was specified, so nickname lookup cannot work until its official API details are configured.
- Telegram button uses Telegram's share flow; set a direct shop username/link in index.html when you have one.
- Payment receiving details, screenshot upload storage, real order creation, order tracking, admin dashboard,
  and automatic diamond delivery are not active yet. They require payment/provider credentials and secure backend work.
- Never put supplier API keys or payment secrets in index.html.
