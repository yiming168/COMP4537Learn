# Connecting to the Hosted LLM API

Base domain (example): `https://gpt.newbio.net`

Note: Replace `YOUR_API_KEY` with a valid key, or (recommended) call your Node proxy without any client secret and let the proxy inject the internal key.

## 1) Health check
```bash
curl -vk https://gpt.newbio.net/health
```
Expected:
```json
{"model":"hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M","ok":true}
```

## 2) Chat endpoint
- Method: POST
- URL: `https://gpt.newbio.net/chat`
- Headers:
  - `Content-Type: application/json`
  - `x-api-key: YOUR_API_KEY` (only if your proxy requires it from clients)
- Body:
```json
{ "prompt": "Tell me a short story about a dragon and a child." }
```

### curl
```bash
curl -vk https://gpt.newbio.net/chat \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  --data '{"prompt":"hi"}'
```

### Node.js (fetch)
```js
const res = await fetch("https://gpt.newbio.net/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({ prompt: "Tell me a joke." })
});
const data = await res.json();
console.log(data.response);
```

### Python (requests)
```python
import requests

url = "https://gpt.newbio.net/chat"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
}
payload = {"prompt": "Write a haiku about the ocean"}

r = requests.post(url, headers=headers, json=payload, timeout=600)
print(r.json())
```

## 3) Security recommendations
- Prefer a zero-client-secret setup: client → Node proxy → Flask → Ollama
- Bind Flask/Ollama to LAN only; expose only the proxy via TLS
- Add rate limiting and logging at the proxy

