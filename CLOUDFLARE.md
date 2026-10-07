# Running Epping Car Buyer on Cloudflare

This site is set up to run on Cloudflare Workers (using the OpenNext adapter) as well as on Vercel. Nothing changes
for visitors until the domain is pointed at Cloudflare, so Vercel can stay live until you are happy.

## What is in the code

- `wrangler.jsonc`: the Cloudflare settings. The Worker is called **eppingcarbuyer** (the name Cloudflare suggests for
  this repository; it must match the Worker's name in the dashboard); the photo bucket is **epping-car-buyer-photos**.
- `open-next.config.ts`: tells the adapter to serve pre-built pages from the deployed files.
- `lib/photo-storage.ts` and `app/api/photos/[...key]/route.ts`: photo uploads go to the R2 bucket and are served back
  from `/api/photos/...`. When the site runs on Vercel instead, uploads still go to Vercel Blob (nothing to do).
- `lib/stripe.ts`: the Stripe connection is created when first used, and the payment webhook checks its
  signature with the web-standard method that Cloudflare supports.
- Pages that show live stock use `dynamic = "force-dynamic"`, so they are always up to date.

## One-time setup in Cloudflare

1. **Create the photo bucket.** Cloudflare dashboard > R2 > Create bucket, named exactly `epping-car-buyer-photos`.
2. **Connect GitHub.** Workers & Pages > Create application > Import a repository, pick this repository.
   - Worker name: keep `eppingcarbuyer` (it must match `wrangler.jsonc`)
   - Production branch: `main`
   - Build command: `pnpm run cf:build` (Cloudflare pre-fills `pnpm run build`; **change it**)
   - Deploy command: `pnpm run cf:deploy` (Cloudflare pre-fills `npx wrangler deploy`; **change it**)
   - If a build already ran with the pre-filled commands it fails with "Could not find compiled Open Next config".
     Fix the two commands under Settings > Build, then retry the build.
3. **Build variables** (Settings > Build > *Variables and secrets*). These are baked into the pages when it builds
   (only the admin and dealer pages use them, but add them so those work):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   The Node version (22, the one this site was tested on) is set by the `.nvmrc` file, so there is no Node variable to add.
4. **Runtime secrets** (the Worker's Settings > Variables and secrets). Choose the type **Secret** for each one.
   Copy the values from Vercel:
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `DVSA_CLIENT_SECRET`
5. **Turn off preview builds** (Settings > Build > Branch control > untick *Enable Preview Builds*). Otherwise every
   branch push builds a preview that has none of the keys.
6. Push to `main` (or retry the build). Cloudflare builds and gives you an address like
   `https://eppingcarbuyer.<your-account>.workers.dev`.
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

## If a build fails

- **"Could not find compiled Open Next config"**: the Build command is still Cloudflare's pre-filled `pnpm run build`.
  It must be `pnpm run cf:build` (and the Deploy command `pnpm run cf:deploy`).
- **"The project is linked to a repository that no longer exists"** (the build stops straight away): Cloudflare has lost
  its connection to GitHub. Settings > Builds > Disconnect, then Connect and pick the repository again. If the repository
  is not in the list, give the Cloudflare GitHub app access to it (GitHub > Settings > Applications > Cloudflare Workers
  & Pages > Configure > Repository access).
- Connecting an existing Worker to a repository does not start a build by itself. Push a commit to `main` (or retry
  the build) to start the first one.
- To start a build by hand: Deployments > View build history > open the top build > Retry build. It builds the latest
  commit on `main` with the current settings.

## Local preview of the Cloudflare build

```
cp .dev.vars.example .dev.vars   # fill in the values; never commit this file
pnpm run cf:preview
```

## Good to know

- Cloudflare's free plan allows only 10 ms of processing time per request, and rendering a page typically takes 10 to
  20 ms, so use the paid Workers plan (about $5 a month) for the live site. The old 3 MB size limit has been removed
  (it is now 64 MiB uncompressed on every plan); this site is about 2.3 MB compressed, well within it.
- `wrangler.jsonc` sets `keep_vars`, so variables added in the Cloudflare dashboard are kept when Cloudflare deploys.
  Keys should still be added as the **Secret** type.
- Email is sent with Resend. Its DNS records live wherever the domain's DNS is hosted.

## Status after go-live (2026-10-08)

- `eppingcarbuyer.com` and `www.eppingcarbuyer.com` are served by this Worker (custom domains); the bare domain is a
  proxied placeholder record plus a 301 redirect rule to `www`. Email records (Zoho MX/SPF/DKIM, Resend, SES) are untouched.
- The old Vercel CNAMEs are saved in `DNS-ROLLBACK-eppingcarbuyer.com.md` (kept outside git) for rollback.
- Analytics and ad tags (Google Analytics 4, Google Ads, Meta pixel) and the cookie banner run in Cloudflare Zaraz, not in
  the code. Tools, triggers, Ads conversion labels and consent purposes are configured in the dashboard (Web tag management).
  Cloudflare cannot auto-inject Zaraz into Worker-generated pages, so `app/layout.tsx` loads `/cdn-cgi/zaraz/i.js` itself,
  and `components/tracking/cookie-consent-prompt.tsx` opens the banner after hydration (Zaraz's own "show on page load"
  is switched off because React hydration removes it).
- Build variables (Worker > Settings > Build > Variables and secrets) must contain exactly `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public values). Disconnecting and reconnecting the Git repository deletes them, so re-add
  them straight away; do not put real secrets in build variables (runtime secrets live on the Worker itself).
- Deploys: if pushes to `main` do not trigger a Cloudflare build, reconnect GitHub under Worker > Settings > Build > Git
  repository, or start a build by hand (Worker > Deployments).

