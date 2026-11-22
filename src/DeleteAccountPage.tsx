import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import logo from "../assets/logo.png";
import "./delete-account.css";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }
const endpoint = import.meta.env.VITE_DELETION_FUNCTION_URL || "";
const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const configured = /^https:\/\//.test(endpoint) && Boolean(sitekey);
const genericMessage = "If an account is associated with this email address, you'll receive instructions for verifying your deletion request.";

function Challenge({ onToken, onError }: { onToken: (token: string) => void; onError: (message: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widget: string | undefined;
    let cancelled = false;
    const render = () => {
      if (cancelled || !container.current || !window.turnstile || widget !== undefined) return;
      widget = window.turnstile.render(container.current, {
        sitekey, action: "account-deletion", size: "flexible",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => { onToken(""); onError("The security check could not load. Please refresh or contact hello@sociol.net."); },
      });
    };
    let script = document.querySelector<HTMLScriptElement>("script[data-deletion-challenge]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.deletionChallenge = "true";
      document.head.appendChild(script);
    }
    const failed = () => onError("The security check could not load. Please refresh or contact hello@sociol.net.");
    script.addEventListener("load", render);
    script.addEventListener("error", failed);
    render();
    return () => { cancelled = true; script.removeEventListener("load", render); script.removeEventListener("error", failed); if (widget !== undefined) window.turnstile?.remove(widget); };
  }, [onToken, onError]);
  return <div ref={container} className="deletion-challenge" />;
}

function DeletionForm() {
  const [email, setEmail] = useState("");
  const [information, setInformation] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState<"request" | "verify" | "done">("request");
  const [busy, setBusy] = useState(false);
  const [challengeKey, setChallengeKey] = useState(0);
  const inFlight = useRef(false);
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => { if (stage !== "request") status.current?.focus(); }, [stage]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !configured || !token) return;
    inFlight.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: stage, email: email.trim().toLowerCase(), information: information.trim(), code, captchaToken: token }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 429) throw new Error("Too many attempts. Please wait an hour before trying again, or contact hello@sociol.net.");
        if (response.status === 400 && stage === "verify") throw new Error("We couldn't verify that code. Check it or request a new one.");
        throw new Error("We couldn't process your request. Please try again or email hello@sociol.net.");
      }
      if (data.status !== (stage === "request" ? "verification_sent" : "queued")) throw new Error("Unexpected response. Please try again or contact hello@sociol.net.");
      setStage(stage === "request" ? "verify" : "done");
      setCode("");
      if (stage === "verify") { setEmail(""); setInformation(""); }
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Something went wrong. Please try again.");
    } finally {
      setToken(""); setChallengeKey((value) => value + 1); setBusy(false); inFlight.current = false;
    }
  }

  return <div className="deletion-form-card">
    <span className="deletion-eyebrow">YOUR ACCOUNT, YOUR CHOICE</span>
    <h2 id="request-title">Request Account Deletion</h2>
    <p>You can request deletion here even if you no longer have the Sociol app installed.</p>
    {!configured && <p className="deletion-notice" role="status">The online form is not available yet. Email <a href="mailto:hello@sociol.net?subject=Sociol%20account%20deletion%20request">hello@sociol.net</a> from your account email address to request deletion. Account ownership must be verified before deletion.</p>}
    {stage !== "request" && <div className="deletion-notice" role="status" tabIndex={-1} ref={status}>
      {stage === "verify" ? genericMessage : "Your email has been verified and your deletion request is queued for review. Your account has not been deleted yet. Contact hello@sociol.net if you need help with your request."}
    </div>}
    {stage !== "done" && <form onSubmit={submit} aria-labelledby="request-title" aria-busy={busy}>
      <fieldset disabled={!configured || busy}>
        <label htmlFor="deletion-email">Account email address <span>(required)</span></label>
        <input id="deletion-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} readOnly={stage === "verify"} onChange={(event) => setEmail(event.target.value)} />
        {stage === "request" ? <>
          <label htmlFor="deletion-information">Additional information <span>(optional)</span></label>
          <textarea id="deletion-information" name="information" rows={4} maxLength={2000} value={information} onChange={(event) => setInformation(event.target.value)} aria-describedby="deletion-information-help" />
          <p id="deletion-information-help" className="deletion-help">Please do not include passwords, payment details, or identity documents.</p>
        </> : <>
          <label htmlFor="deletion-code">Email verification code</label>
          <input id="deletion-code" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,10}" minLength={6} maxLength={10} required value={code} onChange={(event) => setCode(event.target.value)} aria-describedby="deletion-code-help" />
          <p id="deletion-code-help" className="deletion-help">Enter the code from your Sociol email. Check your spam folder. This verifies your request; it does not delete your account immediately.</p>
        </>}
        {configured && <Challenge key={challengeKey} onToken={setToken} onError={setError} />}
        <p className="deletion-help">We use this information only to verify and process your deletion request and protect this form from abuse. See our <a href="/privacy-policy">Privacy Policy</a>.</p>
        <button className="pill-cta deletion-submit" type="submit" disabled={!token || busy}>{busy ? "Please wait…" : stage === "request" ? "Request Account Deletion" : "Verify Deletion Request"}</button>
        {stage === "verify" && <button className="deletion-restart" type="button" onClick={() => { setStage("request"); setCode(""); setError(""); setToken(""); setChallengeKey((value) => value + 1); }}>Change email or request a new code</button>}
      </fieldset>
      {error && <p className="deletion-error" role="alert">{error}</p>}
    </form>}
  </div>;
}

export default function DeleteAccountPage({ footer }: { footer: ReactNode }) {
  useEffect(() => {
    document.title = "Delete Your Sociol Account | Sociol";
    const description = "Request permanent deletion of your Sociol account and associated personal information. Verify your email online or follow the in-app deletion steps.";
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) document.querySelector(selector)?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  }, []);
  return <div className="scrapbook-page legal-scrap-page deletion-page">
    <a href="#deletion-main" className="deletion-skip">Skip to account deletion</a>
    <div className="scrap-nav-spacer" aria-hidden="true" />
    <header className="scrap-nav">
      <a href="/" className="scrap-brand" aria-label="Sociol home"><img src={logo} alt="" /><span>sociol<span className="brand-dot">.</span></span></a>
      <nav aria-label="Main navigation"><a href="/privacy-policy">Privacy Policy</a><a className="pill-cta" href="/">Back to Sociol</a></nav>
    </header>
    <main id="deletion-main">
      <section className="legal-hero scrap-legal-hero deletion-hero"><div className="legal-wrap">
        <div className="legal-kicker">PRIVACY & ACCOUNT SUPPORT</div>
        <div className="legal-headline-row"><h1>Delete Your<br />Sociol Account</h1><aside>We understand that you may decide to leave Sociol. You can request permanent deletion of your account and associated personal information at any time.</aside></div>
      </div></section>
      <div className="deletion-layout scrap-wrap">
        <div className="deletion-details">
          <section aria-labelledby="app-title"><span className="deletion-eyebrow">IN THE APP</span><h2 id="app-title">Delete through the Sociol app</h2>
            <ol><li>Open Sociol and sign in to your account.</li><li>Open the <strong>Profile</strong> tab.</li><li>Scroll to the <strong>Legal</strong> section and select <strong>Delete Account</strong>.</li><li>Follow the confirmation prompts and type <strong>DELETE</strong> to confirm.</li></ol>
          </section>
          <section aria-labelledby="data-title"><h2 id="data-title">What Happens to Your Data?</h2>
            <p>Your request covers your account and associated personal information, including your profile, biography, interests, preferences, photos, uploaded media, Circle activity, and messages.</p>
            <ul><li><strong>Deleted:</strong> the current account deletion process removes your authentication account and profile record, your messages, polls and votes, pending Circle matches, and your notifications.</li><li><strong>Circle memberships:</strong> you are removed from Circles you joined. Circles you host are closed and their chat records are removed.</li><li><strong>Media and shared content:</strong> removing a profile or message does not guarantee its uploaded files are removed immediately. Uploaded media and any remaining associated data need review as part of your request. Copies saved by other people may remain.</li><li><strong>Retained records:</strong> some safety, moderation, transaction, or shared records may remain when needed for security, fraud prevention, disputes, or legal obligations. These are retained for as long as that purpose or obligation requires, as explained in our Privacy Policy. We do not promise a fixed deletion period.</li></ul>
            <p>There is no guaranteed automatic anonymization of all remaining records. Ask <a href="mailto:hello@sociol.net">hello@sociol.net</a> about data retained in your case.</p>
          </section>
          <section aria-labelledby="subscription-title"><h2 id="subscription-title">What If I Have an Active Sociol+ Subscription?</h2>
            <p>Deleting your Sociol account does not automatically cancel your subscription. Cancel through the store where you subscribed to prevent future renewals.</p>
            <ul><li><a href="https://play.google.com/store/account/subscriptions" target="_blank" rel="noopener noreferrer">Manage Google Play subscriptions (opens a new tab)</a>.</li><li>On iPhone, open <strong>Settings → your name → Subscriptions → Sociol+</strong>, then select <strong>Cancel Subscription</strong>.</li></ul>
          </section>
        </div>
        <aside className="deletion-request" aria-label="Online deletion request"><DeletionForm /><p className="deletion-contact">Need a hand? <a href="mailto:hello@sociol.net?subject=Sociol%20account%20deletion%20request">Contact our privacy team</a>.</p></aside>
      </div>
    </main>
    {footer}
  </div>;
}
