# Account deletion page — deployment and review

Implemented route: `https://sociol.net/delete-account` (not deployed by this change).

## What changed

- `src/DeleteAccountPage.tsx`, `src/delete-account.css`: public responsive page, verified in-app navigation, disclosures, accessible email/code form, Cloudflare Turnstile, real loading/error/success handling, email support fallback.
- `src/App.tsx`: route and links in both landing and shared legal footers.
- `src/legal/privacy-policy.md`: web request method and processing providers.
- `scripts/deletion-page.mjs`, `package.json`: emit `dist/delete-account/index.html` with page-specific title, description, Open Graph URL, canonical URL and no-JavaScript support contact. Existing `public/_redirects` remains the SPA fallback.
- `.env.example`, `.gitignore`: public configuration examples; ignore local secrets.
- In `../socio`: migration `202611200001_account_deletion_requests.sql` and function `supabase/functions/request-account-deletion/{index,validation}.ts`.

## Workflow

1. Visitor supplies account email and optional context; no login or installed app needed.
2. Edge Function validates body size, email, field lengths, origin and a single-use Turnstile token (including hostname/action).
3. Atomic database counters limit email sends to three/hour/address and verification attempts to ten/hour/address, with a global ceiling of 100/hour/action. Address buckets use keyed HMAC, not plaintext email. These fixed-hour limits complement CAPTCHA and Supabase Auth limits; tune the global ceiling to traffic and monitor exhaustion.
4. Supabase Auth sends its existing email OTP with `shouldCreateUser: false`. Missing-account and recipient-throttle responses are normalized. SMTP/configuration failures return an unavailable error. The response deliberately does not confirm account existence or actual delivery. A minimum response time reduces straightforward timing differences, but is not a constant-time guarantee.
5. Visitor enters the code and completes a fresh security check. Server verifies ownership with Supabase Auth, then stores a private review record. Auth tokens never reach the browser; the new verification session is revoked locally without signing out mobile sessions.
6. A partial unique index on user ID prevents duplicate open queue records. Administrators review records in the restricted Supabase dashboard. **Nothing automatically deletes an account.** There is no new admin UI or email alert; assign an operator to monitor this queue. A new verified request can be opened after an earlier request is completed or cancelled; duplicate open submissions do not overwrite context.

Unverified optional context stays in browser memory. A verified request contains email, user ID, context and timestamps. No browser storage is used for these details. Rate buckets older than two hours are removed on the next rate-limit call. The queue is service-role-only, with RLS and all public/anon/authenticated grants revoked. Never render optional context as HTML in staff tools.

## Required configuration

Do not enable the frontend before staging verification passes.

1. Review and apply the new migration in the existing Sociol Supabase project. Use the project's normal migration process; don't blindly push unrelated pending migrations.
2. Configure a Turnstile widget for `sociol.net` and `www.sociol.net`. Use separate staging keys/origins. Production keys must not allow local development hosts.
3. Supabase Edge Function secrets:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: supplied by Supabase; server only.
   - `DELETION_TURNSTILE_SECRET_KEY`: private Turnstile secret.
   - `DELETION_RATE_LIMIT_SECRET`: independently generated high-entropy HMAC key, server only.
   - `DELETION_ALLOWED_ORIGINS`: comma-separated HTTPS site origins (defaults to the two production origins above).
   - `DELETION_REQUESTS_ENABLED=true`: set **only** after SMTP, email template, queue ownership and deletion handling are configured.
4. Deploy `supabase functions deploy request-account-deletion --no-verify-jwt` from `../socio`. Public access is intentional; CAPTCHA/rate limits protect initiation and email OTP protects ownership.
5. Verify the existing Supabase Auth SMTP configuration can deliver to external recipients. Its Magic Link template must include `{{ .Token }}` and explain entering the code on the page that requested it. Preserve mobile sign-in behavior: this is a shared Auth template, not a deletion-only email. Verify any project-level Auth CAPTCHA settings are compatible with the server flow; the Turnstile token is already consumed by this function and must not be reused for Auth CAPTCHA.
6. Build-time frontend variables:
   - `VITE_DELETION_FUNCTION_URL=https://<project-ref>.supabase.co/functions/v1/request-account-deletion`
   - `VITE_TURNSTILE_SITE_KEY=<public-widget-site-key>`
   These are public, never put service-role keys or CAPTCHA secrets in Vite variables.
7. Run `npm run build`, publish `dist` through the existing website host, and verify HTTPS and `/delete-account` directly and after refresh. The route is a physical directory plus the existing SPA fallback; configure equivalent rewrites if the host ignores `_redirects`.

## Administrative processing and retention

Restrict dashboard access to authorized privacy staff. Review pending requests, set `status='processing'`, carry out the existing authenticated deletion workflow with the account owner or a separately reviewed privileged operational procedure, then set `status='completed'` and `resolved_at`. Never ask for passwords or forward access tokens. This change does not introduce a service-role account-erasure endpoint.

The existing `delete-account` function removes the Auth account and profile, messages by the sender, polls/votes, pending matches, blocks/reports involving the user, own notifications, hosted Circles and their chat/polls, and membership in other Circles. It tolerates some missing-column/relation/FK errors and is **not transactional**. It does not explicitly remove storage objects, all community-event references, other members' notification references, or every billing/moderation record; it does not guarantee anonymization. Storage ownership can also prevent Auth deletion. The page deliberately does not promise immediate total erasure.

Before launch, the operator must establish and verify media cleanup and remaining-data review, including partial failures/retries. Retain only records necessary for the existing policy's security, fraud prevention, dispute, safety and legal criteria. Record the purpose and applicable obligation for any exception, remove identifying information when no longer necessary, and review completed request records for minimization. No fixed retention deadline or automatic purge of request records is claimed or implemented. Obtain policy-owner review of these criteria; do not describe technical leftovers as justified retention.

Subscriptions require cancellation through the purchase store; the deletion function does not cancel store subscriptions. The website includes Google Play management and the Apple Settings path.

## Release verification checklist

Local source checks do not verify deployed services. Before enabling or supplying the URL to Google Play:

- Confirm production/staging OTP delivery with a controlled existing account, invalid/expired code rejection, successful ownership verification, and a persisted pending-review row. Confirm no automatic deletion and no session leakage.
- Compare responses for controlled existing/nonexistent accounts; never display raw Auth errors. Confirm nonexistent accounts are not created. Test email-only and Google-linked accounts, plus restricted/banned accounts via support fallback.
- Verify same-account resubmission keeps one queue record; concurrent requests cannot evade limits. Exercise third/fourth sends, tenth/eleventh code attempts, global exhaustion and CAPTCHA rejection/replay.
- Confirm anon and normal authenticated clients cannot select/insert/update queue/counter rows or call the rate RPC.
- Test SMTP failure, disabled configuration, queue insertion failure, timeouts and retries. A code consumed before a queue failure requires a fresh code.
- Check real browser keyboard navigation, screen-reader labels/status, 360px/768px/1440px layouts, no overflow, footer links, production direct route/refresh and disabled-JavaScript contact.
- Verify actual media/data deletion, retained-data exceptions and queue monitoring. Confirm the privacy mailbox is monitored and accessible to users without the app.

**Google Play readiness: not yet verified.** Backend deployment/configuration, live email delivery, operator processing and production URL verification are required. Google requires a functional, discoverable web deletion pathway with the app name and retention information; a local build alone is insufficient.

References reviewed:
- https://support.google.com/googleplay/android-developer/answer/13327111
- https://supabase.com/docs/guides/auth/auth-email-passwordless
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

## Verification performed

- Production build, frontend TypeScript checks, Edge Function syntax checks and `git diff --check` passed. Deno typechecking and live SQL execution were not available.
- `npm run test:deletion` passed with mocked Supabase/Turnstile: validation, origin/CAPTCHA rejection, disabled configuration, rate rejection, normalized existing/nonexistent email responses, SMTP/database failures, invalid OTP, queue insertion/deduplication and temporary-session cleanup. Live delivery and concurrent SQL rate limiting remain unverified.
- Local HTTP: `/delete-account` and `/delete-account/` returned 200 with correct metadata. Chrome refresh rendered the page.
- Chrome checks at 360px, 768px and 1440px found no horizontal overflow and confirmed labels, footer link and disabled form when unconfigured. Desktop/mobile screenshots visually inspected. Enabled form/real CAPTCHA, screen-reader behavior and live email verification still require staging QA.
- `npm run lint` could not run: the landing project's installed dependencies lack ESLint, and its existing config references undeclared lint plugins. No unrelated dependency changes were made.
- The default Node binary had a missing Homebrew library; checks used the existing Node 22.22.3 in `~/.nvm/versions/node/` without changing system configuration.
