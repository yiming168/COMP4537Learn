# Ollama Service Recovery After Power Loss — Quick Checklist

This checklist brings your Mac mini Ollama stack and Synology Node proxy back online after a power outage.

## 1) Mac mini — Ollama daemon (port 11434)

Is the service up?
```bash
brew services list | grep ollama
```

If not running, start it:
```bash
brew services start ollama
```

Version / ping daemon:
```bash
curl -s http://127.0.0.1:11434/api/version
```

Model present?
```bash
ollama list
# If your model isn’t listed, pull it again:
# ollama pull hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M
```

Quick generate test (daemon only):
```bash
curl -s http://127.0.0.1:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model":"hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M","prompt":"hi"}'
```

## 2) Mac mini — Flask + Gunicorn API (port 5050)

Is the launchd job loaded?
```bash
launchctl list | grep com.yiming.ollama-gunicorn
```

(Re)start it:
```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist 2>/dev/null
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.yiming.ollama-gunicorn.plist
launchctl kickstart -k gui/$(id -u)/com.yiming.ollama-gunicorn
```

Health check (Flask):
```bash
curl -i http://127.0.0.1:5050/health
```

Chat test (Flask end-to-end → Ollama):
```bash
curl -s http://127.0.0.1:5050/chat \
  -H "x-api-key: myapikey" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"say hello from mac mini"}'
```

## 3) Synology NAS — Start the Node proxy with local pm2

SSH into Synology from your desktop, then:
```bash
cd ~/node-proxy
npm ci --only=production   # or: npm install --production

# Start with local pm2
./node_modules/.bin/pm2 start index.js --name node-proxy

# Save the process list so it survives restarts
./node_modules/.bin/pm2 save
```

## 4) Desktop — End-to-end test via Synology HTTPS

Windows PowerShell / cmd example:
```powershell
curl.exe -v -4 "https://gpt.newbio.net/chat" ^
  -H "x-api-key: My_api_key" ^
  -H "Content-Type: application/json" ^
  --data "{\"prompt\":\"hi\"}"
```

Expected: HTTP 200 with a JSON response containing a generated message.

