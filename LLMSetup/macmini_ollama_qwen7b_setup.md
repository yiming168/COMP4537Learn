# Deploying Qwen-7B (Ollama) on a Mac mini + Flask API + Custom Domain via Synology (Node reverse proxy)

## 0) What we’re building

```
Internet  →  https://gpt.newbio.net  (TLS on Synology)
                 ↓
           Synology (Node proxy :3000)  — forwards JSON only
                 ↓
         Mac mini (Flask + Gunicorn :5050)
                 ↓
          Ollama daemon :11434  (Qwen-7B)
```

## 1) Prerequisites
- Mac mini (Apple Silicon works great)
- Ollama installed on the Mac (https://ollama.com)
- Synology NAS with DSM (reverse proxy + Let’s Encrypt)
- Domain DNS pointing to Synology public IP (A record)
- Port 443 open to Synology

## 2) Install & verify Ollama (Mac mini)
```bash
brew services start ollama
ollama pull hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M
ollama list
curl -s http://127.0.0.1:11434/api/version
```

## 3) Flask API + Gunicorn
File: `~/ollama-api/ollama_api.py`
```python
import os, requests
from flask import Flask, request, jsonify

app = Flask(__name__)
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
DEFAULT_MODEL = os.getenv("MODEL", "hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M")
API_KEY = os.getenv("API_KEY", "CHANGE_ME")

@app.get("/health")
def health():
    return jsonify({"model": DEFAULT_MODEL, "ok": True})

@app.post("/chat")
def chat():
    if request.headers.get("x-api-key") != API_KEY:
        return jsonify({"ok": False, "error": "unauthorized"}), 401
    body = request.get_json(force=True)
    prompt = body.get("prompt", "hello")
    r = requests.post(f"{OLLAMA_HOST}/api/generate", json={
        "model": DEFAULT_MODEL,
        "prompt": prompt
    }, timeout=600)
    data = r.json()
    return jsonify({"response": data.get("response", ""), "model": DEFAULT_MODEL, "done": True})
```

Run with Gunicorn:
```bash
cd ~/ollama-api
gunicorn -b 0.0.0.0:5050 ollama_api:app --timeout 600
```

## 4) Launch at boot (launchctl)
Create `~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.yiming.ollama-gunicorn</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/gunicorn</string>
    <string>-b</string>
    <string>0.0.0.0:5050</string>
    <string>ollama_api:app</string>
    <string>--timeout</string>
    <string>600</string>
  </array>
  <key>WorkingDirectory</key><string>/Users/yourname/ollama-api</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>API_KEY</key><string>CHANGE_ME</string>
    <key>MODEL</key><string>hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M</string>
    <key>OLLAMA_HOST</key><string>http://127.0.0.1:11434</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>/tmp/ollama-gunicorn.log</string>
  <key>StandardErrorPath</key><string>/tmp/ollama-gunicorn.err</string>
  </dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist
launchctl start com.yiming.ollama-gunicorn
```

## 5) Synology Reverse Proxy
- Terminate TLS on DSM (Let’s Encrypt)
- Reverse proxy `gpt.newbio.net` → Node server `http://NAS:3000`
- Node forwards `/chat` & `/health` to Flask `http://MACMINI:5050`
- Node injects internal `x-api-key` so clients do not see secrets

## 6) Health check
```bash
curl -vk https://gpt.newbio.net/health
```

Expected:
```json
{"model":"hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M","ok":true}
```

## 7) Notes
- Bind Flask to LAN only (firewall 5050/11434)
- Do not ship API keys in clients
- Add rate limiting & logging at Node/DSM

