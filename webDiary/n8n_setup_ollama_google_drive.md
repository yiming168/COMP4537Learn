# Automate Articles with n8n, Ollama, and Google Drive (Markdown)

<img src="assets/n8n_workflow_yiming.jpg" alt="n8n workflow overview"
     style="display:block;margin:12px auto 24px;max-width:760px;width:100%;height:auto;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.08);"/>

This guide shows beginners how to set up n8n locally and build a workflow that:

- Reads a health news RSS feed
- Uses a local LLM (Ollama) to write a short explainer article
- Saves the article as a new `.md` file in a Google Drive folder
- Optionally lists those MD posts in this web diary (see Optional section)

You can import the ready‑made n8n workflow JSON at the end of this page.

---

## Prerequisites

- Windows 10/11 (PowerShell), macOS, or Linux
- One of:
  - Docker Desktop installed, or
  - Node.js 18+ (if you prefer `npx n8n`)
- Google account (to create Drive API OAuth credentials)
- Optional but recommended: Ollama for local LLM inference

---

## 1) Install and Run n8n locally

Pick ONE method.

- Docker (Windows/macOS/Linux):
  - Windows PowerShell (persist credentials to your profile):
    ```powershell
    docker run -it --name n8n --restart unless-stopped ^
      -p 5678:5678 ^
      -v %USERPROFILE%\.n8n:/home/node/.n8n ^
      n8nio/n8n:latest
    ```
  - macOS/Linux (bash/zsh):
    ```bash
    docker run -it --name n8n --restart unless-stopped \
      -p 5678:5678 \
      -v ~/.n8n:/home/node/.n8n \
      n8nio/n8n:latest
    ```

- Node (no Docker):
  ```bash
  npx n8n
  ```

Open n8n at http://localhost:5678 and finish the initial setup.

---

## 2) Install Ollama and a model

Ollama runs LLMs locally so the workflow can write articles without cloud costs.

- Windows (PowerShell):
  ```powershell
  winget install -e --id Ollama.Ollama
  # After install, start Ollama Desktop or `ollama serve`
  ollama pull llama3.1:8b
  ```

- macOS (Homebrew):
  ```bash
  brew install --cask ollama
  ollama pull llama3.1:8b
  ```

The Ollama API runs at http://localhost:11434 by default.

In n8n, go to Credentials → Create Credential → “Ollama API”.

- Host: `http://localhost:11434`
- Name it e.g. “Local Ollama”

---

## 3) Create Google OAuth credentials (Drive API)

We’ll upload a `.md` file to a Drive folder you control.

1. Go to Google Cloud Console → Create a Project
2. Enable “Google Drive API”
3. OAuth consent screen → External (or Internal) → publish (testing is fine)
4. Credentials → Create Credentials → OAuth client ID → Web application
5. Authorized redirect URI (exact):
   - `http://localhost:5678/rest/oauth2-credential/callback`
6. Save client ID/secret

In n8n:

- Credentials → Create Credential → “Google Drive OAuth2 API”
- Enter Client ID and Client Secret
- Click Connect, then approve in the browser

Make or choose a Drive folder for your posts. Copy its Folder ID from the URL. Example:

- URL: `https://drive.google.com/drive/folders/1AbCDEfGhIjK...`
- Folder ID is `1AbCDEfGhIjK...`

Tip: If you want to display posts publicly from the browser, set the folder sharing to “Anyone with the link — Viewer”.

---

## 4) Build the workflow (visual steps)

In n8n canvas, create these nodes and connect them in order:

1) Schedule Trigger
- Rule: every day, e.g., 19:00 local time

2) RSS Feed Read
- URL: `https://www.sciencedaily.com/rss/health_medicine.xml`

3) Code: Pick Top N
- Name: Pick Top N
- Code (JavaScript):
  ```js
  // Keep top 5–10 recent items
  const items = $input.all().map(i => i.json);
  const max = 8;
  return items.slice(0, max).map(item => ({ json: item }));
  ```

4) Split In Batches
- Batch size: 1 (process one article at a time)

5) LangChain → Agent (Generate Article)
- Prompt Type: Define
- Prompt Text:
  ```
  Title: {{ $json.title }}
  Source summary: {{ $json.content || $json.description || $json.contentSnippet || '' }}
  Source link: {{ $json.link }}
  ```
- Has Output Parser: Enabled
- Options → System Message (English):
  ```
  # Role: Health explainer writer

  You write clear, trustworthy health explainers based on news or studies.
  Style: calm, evidence-based, helpful. Avoid hype or absolute claims.

  Writing rules:
  - Start with a relatable, everyday hook.
  - Explain in plain language, then describe key research (source, sample, result),
    then what it means for everyday choices.
  - When a technical term appears the first time, give a short parentheses gloss,
    e.g. “IL-10 (an anti-inflammatory signaling molecule)”.
  - Keep paragraphs short (max ~3 sentences each).
  - If citing research, mention the institution and year.
  - Add a brief, practical takeaway at the end.
  - Title under 20 words; body ~600–800 words.
  
  Output JSON structure (no extra text):
  {
    "title": "...",
    "content": "..."
  }
  ```

6) LangChain → Structured Output Parser
- Example JSON:
  ```json
  {
    "title": "Can Morning Walks Lower Blood Pressure?",
    "content": "...article body..."
  }
  ```

7) Code: Build Markdown
- Name: Build Markdown
- Code:
  ```js
  const item = $input.item.json;
  const title = item.output?.title || item.title || 'Untitled';
  const content = item.output?.content || '';
  const link = item.link || '';
  const date = new Date().toISOString();

  function slugify(s) {
    return (s || 'note')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
  }

  const slug = slugify(title);
  const filename = `${date.slice(0,10)}-${slug}.md`;

  const md = `---\n` +
    `title: ${title}\n` +
    `source: ${link}\n` +
    `date: ${date}\n` +
    `tags: [health, rss]\n` +
    `---\n\n` +
    `${content}\n`;

  return [{ json: { filename, md } }];
  ```

8) Google Drive → File: Upload
- Credential: your Google Drive OAuth credential
- Use Binary Data: false
- File Name: `={{ $json.filename }}`
- File Content: `={{ $json.md }}`
- Parents: `["YOUR_DRIVE_FOLDER_ID"]`
- MIME Type: `text/markdown`

9) Loop: connect Upload → Split In Batches (2nd output) → back to Agent to continue until done.

Run once manually to test.

---

## 5) Importable n8n workflow (English prompts, Drive MD upload)

You can import this JSON into n8n (top-right menu → Import from file) and then set your credentials and folder ID.

```json
{
  "nodes": [
    {
      "parameters": {
        "rule": { "interval": [{ "triggerAtHour": 19 }] }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [-760, -160],
      "name": "Schedule Trigger",
      "id": "schedule-1"
    },
    {
      "parameters": {
        "url": "https://www.sciencedaily.com/rss/health_medicine.xml",
        "options": {}
      },
      "type": "n8n-nodes-base.rssFeedRead",
      "typeVersion": 1.2,
      "position": [-560, -160],
      "name": "RSS Read",
      "id": "rss-1"
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all().map(i => i.json);\nconst max = 8;\nreturn items.slice(0, max).map(item => ({ json: item }));\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [-360, -160],
      "name": "Pick Top N",
      "id": "code-top-n"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [-160, -160],
      "name": "Loop Over Items",
      "id": "loop-1"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=Title: {{ $json.title }}\nSource summary: {{ $json.content || $json.description || $json.contentSnippet || '' }}\nSource link: {{ $json.link }}",
        "hasOutputParser": true,
        "options": {
          "systemMessage": "=# Role: Health explainer writer\n\nYou write clear, trustworthy health explainers based on news or studies. Style: calm, evidence-based, helpful. Avoid hype or absolute claims.\n\nWriting rules:\n- Start with a relatable, everyday hook.\n- Explain in plain language, then describe key research (source, sample, result), then what it means for everyday choices.\n- When a technical term appears the first time, give a short parentheses gloss, e.g. \"IL-10 (an anti-inflammatory signaling molecule)\".\n- Keep paragraphs short (max ~3 sentences each).\n- If citing research, mention the institution and year.\n- Add a brief, practical takeaway at the end.\n- Title under 20 words; body ~600–800 words.\n\nOutput JSON structure (no extra text):\n{\n  \"title\": \"...\",\n  \"content\": \"...\"\n}"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2.2,
      "position": [80, -360],
      "name": "Generate Article",
      "id": "agent-1"
    },
    {
      "parameters": {
        "model": "llama3.1:8b",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOllama",
      "typeVersion": 1,
      "position": [-40, -360],
      "name": "Ollama Chat Model",
      "id": "ollama-1",
      "credentials": {
        "ollamaApi": {
          "id": "REPLACE_WITH_YOUR_CRED_ID",
          "name": "Local Ollama"
        }
      }
    },
    {
      "parameters": {
        "jsonSchemaExample": "{\n  \"title\": \"Example Health Title\",\n  \"content\": \"Short explainer body...\"\n}",
        "autoFix": true
      },
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.3,
      "position": [200, -360],
      "name": "Structured Output Parser",
      "id": "parser-1"
    },
    {
      "parameters": {
        "jsCode": "const item = $input.item.json;\nconst title = item.output?.title || item.title || 'Untitled';\nconst content = item.output?.content || '';\nconst link = item.link || '';\nconst date = new Date().toISOString();\nfunction slugify(s){return (s||'note').toLowerCase().replace(/[^a-z0-9\\s-]/g,'').trim().replace(/\\s+/g,'-').slice(0,60);}\nconst slug = slugify(title);\nconst filename = `${date.slice(0,10)}-${slug}.md`;\nconst md = `---\\n`+`title: ${title}\\n`+`source: ${link}\\n`+`date: ${date}\\n`+`tags: [health, rss]\\n`+`---\\n\\n`+`${content}\\n`;\nreturn [{ json: { filename, md } }];\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [400, -160],
      "name": "Build Markdown",
      "id": "code-md-1"
    },
    {
      "parameters": {
        "operation": "upload",
        "binaryData": false,
        "fileName": "={{ $json.filename }}",
        "fileContent": "={{ $json.md }}",
        "mimeType": "text/markdown",
        "parents": [
          "YOUR_DRIVE_FOLDER_ID"
        ]
      },
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 3,
      "position": [600, -160],
      "name": "Upload to Drive",
      "id": "gdrive-1",
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "REPLACE_WITH_YOUR_CRED_ID",
          "name": "Google Drive"
        }
      }
    }
  ],
  "connections": {
    "Schedule Trigger": { "main": [[{ "node": "RSS Read", "type": "main", "index": 0 }]] },
    "RSS Read": { "main": [[{ "node": "Pick Top N", "type": "main", "index": 0 }]] },
    "Pick Top N": { "main": [[{ "node": "Loop Over Items", "type": "main", "index": 0 }]] },
    "Loop Over Items": { "main": [[], [{ "node": "Generate Article", "type": "main", "index": 0 }]] },
    "Ollama Chat Model": {
      "ai_languageModel": [[
        { "node": "Structured Output Parser", "type": "ai_languageModel", "index": 0 },
        { "node": "Generate Article", "type": "ai_languageModel", "index": 0 }
      ]]
    },
    "Structured Output Parser": {
      "ai_outputParser": [[{ "node": "Generate Article", "type": "ai_outputParser", "index": 0 }]]
    },
    "Generate Article": { "main": [[{ "node": "Build Markdown", "type": "main", "index": 0 }]] },
    "Build Markdown": { "main": [[{ "node": "Upload to Drive", "type": "main", "index": 0 }]] },
    "Upload to Drive": { "main": [[{ "node": "Loop Over Items", "type": "main", "index": 1 }]] }
  }
}
```

After import:

- Edit the “Ollama Chat Model” credential reference to your Ollama credential
- Edit the “Upload to Drive” node:
  - Parents → replace `YOUR_DRIVE_FOLDER_ID` with your folder ID

Run once and verify a new `.md` file appears in your Drive folder.

---

## 6) Optional: show Drive posts in this web diary

This site can list Markdown files from a Drive folder. In `index.html`, set:

```html
<script>
  window.DRIVE_API_KEY = "YOUR_GOOGLE_API_KEY";
  window.DRIVE_FOLDER_ID = "YOUR_DRIVE_FOLDER_ID";
  // Share folder: Anyone with the link → Viewer
  // The site will add a “Drive Articles” section with your files.
</script>
```

Note: This uses the public Google Drive v3 API with an API key. The folder (not files) must allow “Anyone with the link: Viewer” so the site can fetch file contents.

---

## Troubleshooting

- If Ollama timeouts: ensure `ollama serve` is running and a model is pulled.
- If Drive upload fails: re-connect the Google Drive credential; confirm redirect URI exactly matches.
- If files don’t appear on this site: open devtools console for errors; check API key and folder sharing.
