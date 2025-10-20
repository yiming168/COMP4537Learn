# Ollama on macOS — Install and Verify

This guide sets up the Ollama daemon on macOS and verifies it locally.

## 1) Install

Option A — Download the official app from https://ollama.com and install.

Option B — Homebrew service:
```bash
brew install ollama
brew services start ollama    # launch at login
```

## 2) Verify the daemon
```bash
ps aux | grep ollama
curl -s http://127.0.0.1:11434/api/version
```
You should see a JSON version response from the local daemon.

## 3) Pull a model
```bash
ollama pull hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M
ollama list
```

## 4) Quick local generation
```bash
curl http://127.0.0.1:11434/api/generate \
  -H 'Content-Type: application/json' \
  -d '{"model":"hf.co/bartowski/Qwen2.5-7B-Instruct-GGUF:Q4_K_M","prompt":"Say hello"}'
```

## 5) Troubleshooting
- If the daemon is not running: `brew services restart ollama`
- If curl fails, confirm nothing else is bound to `11434`
- Check logs in Console.app for `ai.ollama.ollama`

## 6) Uninstall (optional)
```bash
brew services stop ollama
brew uninstall ollama
```

