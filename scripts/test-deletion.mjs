import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const root = new URL('../../socio/supabase/functions/request-account-deletion/', import.meta.url);
const validationSource = await readFile(new URL('validation.ts', root), 'utf8');
const compiled = ts.transpileModule(validationSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { validateInput } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const valid = { action: 'request', email: ' TEST@example.com ', captchaToken: 'captcha', information: 'Context' };
assert.equal(validateInput(valid).email, 'test@example.com');
for (const invalid of [null, [], {}, {...valid, email:'bad'}, {...valid, email:'a\n@b.com'}, {...valid, information:'x'.repeat(2001)}, {...valid, captchaToken:''}, {...valid, action:'delete'}, {...valid, action:'verify', code:'123'}, {...valid, information:42}]) assert.equal(validateInput(invalid), null);
assert.equal(validateInput({...valid, action:'verify', code:'123456'}).code, '123456');

let handler;
let mode = '';
let inserts = 0;
let sends = 0;
let signouts = 0;
const env = { SUPABASE_URL:'https://example.supabase.co', SUPABASE_SERVICE_ROLE_KEY:'test-server-only', DELETION_TURNSTILE_SECRET_KEY:'test', DELETION_RATE_LIMIT_SECRET:'test', DELETION_REQUESTS_ENABLED:'true' };
globalThis.Deno = { env: { get: key => env[key] }, serve: callback => { handler = callback; } };
globalThis.deletionValidation = validateInput;
globalThis.deletionClient = () => ({
  rpc: async () => ({ data: mode !== 'limited', error: mode === 'db-down' ? {} : null }),
  from: () => ({ insert: async () => { inserts++; return { error: mode === 'duplicate' ? {code:'23505'} : mode === 'queue-failed' ? {code:'other'} : null }; } }),
  auth: {
    signInWithOtp: async options => { assert.equal(options.options.shouldCreateUser, false); sends++; return {error: mode === 'missing' ? {code:'otp_disabled'} : mode === 'smtp-down' ? {code:'unexpected_failure'} : null}; },
    verifyOtp: async () => mode === 'bad-code' ? {data:{},error:{}} : {data:{user:{id:'user',email:'test@example.com'}},error:null},
    signOut: async options => { assert.equal(options.scope, 'local'); signouts++; return {error:null}; },
  },
});
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => new Response(JSON.stringify({success: mode !== 'bad-captcha', action:'account-deletion', hostname: mode === 'bad-host' ? 'evil.example' : 'sociol.net'}));
let source = await readFile(new URL('index.ts', root), 'utf8');
source = source.replace(/import .*?;\n/g, '').replace('Deno.serve', 'const createClient = globalThis.deletionClient; const validateInput = globalThis.deletionValidation; Deno.serve');
const handlerJs = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
await import(`data:text/javascript;base64,${Buffer.from(handlerJs).toString('base64')}`);
const request = (body = valid, origin = 'https://sociol.net') => handler(new Request('https://example.test', {method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)}));
assert.equal((await request(valid, 'https://evil.example')).status, 403);
assert.equal((await request({...valid,email:'bad'})).status, 400);
env.DELETION_REQUESTS_ENABLED='false'; assert.equal((await request()).status, 503); env.DELETION_REQUESTS_ENABLED='true';
for (const m of ['bad-captcha','bad-host']) { mode=m; assert.equal((await request()).status,400); }
mode='limited'; assert.equal((await request()).status,429); assert.equal(sends,0);
mode=''; const exists = await (await request()).json();
mode='missing'; assert.deepEqual(await (await request()).json(), exists);
assert.equal(inserts,0, 'Request initiation must never queue or delete accounts');
mode='smtp-down'; assert.equal((await request()).status,503);
mode='db-down'; assert.equal((await request()).status,503);
mode='bad-code'; assert.equal((await request({...valid,action:'verify',code:'123456'})).status,400); assert.equal(inserts,0);
for (const m of ['', 'duplicate']) { mode=m; assert.deepEqual(await (await request({...valid,action:'verify',code:'123456'})).json(),{status:'queued'}); }
mode='queue-failed'; assert.equal((await request({...valid,action:'verify',code:'123456'})).status,503); assert.equal(signouts,3);
globalThis.fetch = originalFetch;
console.log('Passed: validation, origin/CAPTCHA rejection, disabled config, mocked rate limits, non-enumerating initiation, SMTP/database failure, OTP rejection, queue success/idempotency, temporary-session cleanup. Live providers and SQL execution are not tested.');
