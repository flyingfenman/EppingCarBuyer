# Running Epping Car Buyer on Cloudflare

This site is set up to run on Cloudflare Workers (using the OpenNext adapter) as well as on Vercel. Nothing changes
for visitors until the domain is pointed at Cloudflare, so Vercel can stay live until you are happy.

## What is in the code

- `wrangler.jsonc`: the Cloudflare settings. The Worker is called **epping-car-buyer**; the photo bucket is **epping-car-buyer-photos**.
- `open-next.config.ts`: tells the adapter to serve pre-built pages from the deployed files.
- `lib/photo-storage.ts` and `app/api/photos/[...key]/route.ts`: photo uploads go to the R2 bucket and are served back
  from `/api/photos/...`. When the site runs on Vercel instead, uploads still go to Vercel Blob (nothing to do).
- `lib/stripe.ts`: the Stripe connection is created when first used, and the payment webhook checks its
  signature with the web-standard method that Cloudflare supports.
- Pages that show live stock use `dynamic = "force-dynamic"`, so they are always up to date.

## One-time setup in Cloudflare

1. **Create the photo bucket.** Cloudflare dashboard > R2 > Create bucket, named exactly `epping-car-buyer-photos`.
2. **Connect GitHub.** Workers & Pages > Create > Import a repository, pick this repository.
   - Worker name: `epping-car-buyer` (it must match `wrangler.jsonc`)
   - Production branch: `main`
   - Build command: `pnpm run cf:build`
   - Deploy command: `pnpm run cf:deploy`
3. **Build variables** (the build settings page, *Variables and secrets*). These are baked into the pages when it builds:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Runtime secrets** (the Worker's Settings > Variables and secrets). Copy the values from Vercel:
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `DVSA_CLIENT_SECRET`
5. Push to the branch. Cloudflare builds and gives you an address like `https://epping-car-buyer.<your-account>.workers.dev`.
   Open it and try: the home page, a booking all the way to the Stripe test page (use Stripe test mode first),
   the contact form, and (admin) a photo upload.

## Going live

1. The domain's DNS must be on Cloudflare. If it is not, add the domain in Cloudflare and change the nameservers at the
   registrar. **Before doing that, copy every existing DNS record across**, especially the email ones (the Resend
   SPF/DKIM/DMARC records and any MX records) or email will stop.
2. Worker > Settings > Domains & Routes > Add custom domain (`www.` address, and redirect the bare domain to it).
   The Stripe webhook address (`/api/webhooks/stripe`) stays the same because the domain stays the same. After going
   live, send a test event from the Stripe dashboard and check the confirmation email arrives.
3. Keep Vercel running for a few days. To go back, point the DNS records back at Vercel.
4. When you are happy: remove the project from Vercel. Photos already uploaded to Vercel Blob keep working by their
   address until the Blob store is deleted, so copy them to R2 first (ask Claude to write the copy script).

## Local preview of the Cloudflare build

```
cp .dev.vars.example .dev.vars   # fill in the values; never commit this file
pnpm run cf:preview
```

## Good to know

- Cloudflare's free plan allows a 3 MB (compressed) site. This one is about 2.2 MB, so it fits, but check the current
  limits and CPU allowance when you pick a plan; the paid Workers plan is about $5 a month.
- Email is sent with Resend. Its DNS records live wherever the domain's DNS is hosted.
