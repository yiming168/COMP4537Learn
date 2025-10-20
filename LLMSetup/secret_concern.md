# Never Ship Hard-Coded API Keys

Never ship a hard-coded API key to untrusted clients. Put secrets behind a server you control, or replace them with short‑lived, verifiable tokens.

## Safe Patterns (Good → Better → Best)

### 1) Good — Keep the secret server‑side (BFF/Proxy injects it)
- Clients call your Synology/Node proxy — no secret needed in the browser.
- The proxy adds `x-api-key` when calling Flask.
- Flask should trust only the proxy’s LAN IP.

Node proxy (concept):
```js
app.post("/chat", async (req, res) => {
  try {
    const r = await axios.post(`${UPSTREAM}/chat`, req.body, {
      headers: {
        "Content-Type": "application/json",
        // Inject secret here only; never expose to browser
        "x-api-key": process.env.INTERNAL_API_KEY
      },
      timeout: 600000
    });
    res.status(r.status).json(r.data);
  } catch (e) {
    res.status(502).json({ ok: false, error: String(e) });
  }
});
```

### 2) Better — Edge auth / IP allowlist
- Enable Basic Auth at DSM reverse proxy or restrict by source IP.
- Even if someone inspects JS, there’s no secret key to steal.

### 3) Best — Short‑lived signed tokens (HMAC/JWT)
- Client calls Node with a signed token (10–15 min TTL).
- Node verifies and forwards to Flask with the internal key.
- No long‑lived secret in any client.

Minimal HMAC idea:
```
Client:  signature = HMAC_SHA256(secret, timestamp + body)
Headers: X-Timestamp, X-Signature
Node:    verify within small skew, then forward
```

## Concrete Hardening Checklist
- Secrets: never ship `x-api-key` in browser/mobile/Postman exports.
- Transport: HTTPS only (Let’s Encrypt on DSM).
- Rate limit: e.g., 60 rpm; ban abusive IPs.
- CORS: lock to your domains only.
- Logging: do not log secrets; scrub sensitive headers.
- Key rotation: support multiple keys; rotate regularly.
- Scopes: per‑endpoint keys/roles if you add endpoints.
- Monitoring: watch 4xx/5xx spikes, geo anomalies, key misuse.
- Network: Flask binds to LAN; firewall 5050/11434 from WAN.
- Incident: be ready to revoke and roll keys quickly.

## Zero‑Client‑Secret Setup (Recommended)
- Clients call only `https://gpt.newbio.net/chat`.
- DSM/Node enforces auth (optional Basic Auth or IP allowlist).
- Node injects internal `x-api-key` to Flask; clients never see it.

