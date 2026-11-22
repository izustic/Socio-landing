import { mkdir, readFile, writeFile } from "node:fs/promises";
// Emit a physical route so refreshes work on ordinary static hosts, and search
// engines see route-specific metadata before React runs.
const description = "Request deletion of your Sociol account and associated personal information online or in the app.";
let html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
html = html.replace(/<title>.*?<\/title>/, "<title>Delete Your Sociol Account | Sociol</title>")
  .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, `$1${description}$2`)
  .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/, "$1Delete Your Sociol Account | Sociol$2")
  .replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/, `$1${description}$2`)
  .replace("</head>", '<link rel="canonical" href="https://sociol.net/delete-account" /><meta property="og:url" content="https://sociol.net/delete-account" /></head>')
  .replace('<div id="root"></div>', '<div id="root"></div><noscript><h1>Delete Your Sociol Account</h1><p>Request deletion of your account and associated personal information by emailing <a href="mailto:hello@sociol.net?subject=Sociol%20account%20deletion%20request">hello@sociol.net</a> from your account email address. Ownership must be verified before deletion. Enable JavaScript for the online form and full data retention details.</p><p>Records needed for security, fraud prevention, disputes, or legal obligations may be retained for as long as those purposes require. See our <a href="/privacy-policy">Privacy Policy</a>.</p></noscript>');
await mkdir(new URL("../dist/delete-account/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/delete-account/index.html", import.meta.url), html);
