# How to Change the Ollama Model on Mac Mini

This guide explains how to remove an old Ollama model (e.g., Qwen 7B) and replace it with a new one (e.g., Mistral 7B), while keeping my Flask API and Synology reverse proxy setup working.

---

## 1. Remove the Old Model
Open Terminal on my Mac Mini:

```bash
ollama list  # see installed models
ollama rm hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M
```

Verify it's gone:
```bash
ollama list
```

---

## 2. Pull the New Model
For Mistral 7B:

```bash
ollama pull mistral:7b-instruct
```

Test it locally:
```bash
ollama run mistral:7b-instruct
```
Type a quick prompt (e.g., `hi`) to ensure it responds.

---

## 3. Verify Local Ollama API
Test the Ollama local endpoint:

```bash
curl -s http://127.0.0.1:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model":"mistral:7b-instruct","prompt":"Say hi in one sentence."}'
```
Should get a valid JSON response.

---

## 4. Update Flask API (ollama-api)
The Flask app is in `~/ollama-api/ollama_api.py`. I don't need to modify the code if `/health` reads from an environment variable.

### Option 1: Use Environment Variable (Recommended)
Set the model name in my environment so `/health` and `/chat` show the correct model:

#### Edit the LaunchAgent plist
```bash
vim ~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist
```

Find or add this section:
```xml
<key>EnvironmentVariables</key>
<dict>
  <key>DEFAULT_MODEL</key>
  <string>mistral:7b-instruct</string>
  <key>OLLAMA_URL</key>
  <string>http://127.0.0.1:11434</string>
</dict>
```

Then reload the agent:
```bash
launchctl bootout gui/$UID ~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist 2>/dev/null || true
launchctl bootstrap gui/$UID ~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist
launchctl kickstart -k gui/$UID/com.yiming.ollama-gunicorn
```

### Option 2: Temporary Change
Stop the current Gunicorn and run it manually with the new model:

```bash
pkill -f 'gunicorn.*5050' || true
DEFAULT_MODEL="mistral:7b-instruct" OLLAMA_URL="http://127.0.0.1:11434" \
gunicorn -b 0.0.0.0:5050 --timeout 600 ollama_api:app
```

---

## 5. Confirm the Update
Check locally:
```bash
curl -s http://127.0.0.1:5050/health
```
I should see:
```json
{"model":"mistral:7b-instruct","ok":true}
```

---

## 6. Test from Synology and External Clients
### From Synology
```bash
curl -i -m 5 http://192.168.50.243:5050/health
```

### From the Internet
Windows example:
```bat
curl.exe -v -4 "https://gpt.newbio.net/chat" ^
  -H "x-api-key: YOUR_API_KEY" ^
  -H "Content-Type: application/json" ^
  --data "{\"prompt\":\"hi\"}"
```

If I get a `403 Forbidden`, check that the API key matches between my Synology Node proxy and Mac Flask API.

---

## 7. Optional — Make `/health` Detect Automatically
I can make `/health` query Ollama directly:
```python
@app.get("/health")
@limiter.exempt
def health():
    try:
        r = requests.get(f"{OLLAMA_URL}/api/tags", timeout=3)
        models = r.json().get("models", [])
        model = models[0].get("name") if models else os.getenv("DEFAULT_MODEL", "unknown")
    except Exception:
        model = os.getenv("DEFAULT_MODEL", "unknown")
    return {"ok": True, "model": model}
```

---

## 8. Summary of Files to Touch
| File | Purpose |
|------|----------|
| `~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist` | Where I set `DEFAULT_MODEL` permanently |
| `~/ollama-api/ollama_api.py` | Flask API routes (optional dynamic health check) |
| Synology `node-proxy/.env` | Points to Mac IP (no need to change when swapping model) |

---

✅ **After following these steps:**  
My Mac Mini will serve the new model (e.g., Mistral 7B) to both LAN and public users via Synology reverse proxy without needing any reconfiguration on Synology or clients.

