// Extracts quiz HTML files in quiz/ into Markdown files in quizzes/
// No external deps; simplistic parser for known structure.

const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'quiz');
const outDir = path.join(process.cwd(), 'quizzes');

function decodeHtml(str) {
  if (!str) return '';
  // Basic named entities
  let s = str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // Numeric (decimal)
  s = s.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)));
  // Numeric (hex)
  s = s.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  // Strip tags used for inline code; we handle backticks separately
  s = s.replace(/<\/?code>/g, '');
  // Normalize a few common mojibake artifacts
  s = s.replace(/\uFFFD/g, ''); // replacement char
  s = s.replace(/\sA-\s/g, ' x '); // decode failure for multiplication sign (variant)
  s = s.replace(/A-/g, 'x'); // fallback
  s = s.replace(/â†’/g, '->'); // arrow decode fix
  return s;
}

function textFrom(html, re) {
  const m = html.match(re);
  return m ? decodeHtml(m[1].trim()) : '';
}

function allMatches(html, re) {
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push(decodeHtml(m[1].trim()));
  }
  return out;
}

function needsBackticks(s) {
  return /[<>]/.test(s) || /\s\{.*\}/.test(s);
}

function toMarkdown({ title, questions }) {
  let md = `# ${title}\n\n`;
  questions.forEach((q, idx) => {
    const qn = idx + 1;
    md += `## Q${qn}. ${q.text}\n\n`;
    if (q.code) {
      md += '```\n' + q.code + '\n```\n\n';
    }
    if (q.options && q.options.length) {
      q.options.forEach(opt => {
        const t = opt.replace(/^[-•\s]+/, '').replace(/^\p{So}+\s*/u, '');
        const content = needsBackticks(t) ? '`' + t + '`' : t;
        md += `- ${content}\n`;
      });
      md += '\n';
    }
    if (q.answer) {
      md += `- Answer: **${q.answer}**\n`;
    }
    if (q.expl) {
      md += `- Explanation: ${q.expl}\n`;
    }
    md += '\n';
  });
  return md;
}

function extractFromHtml(html) {
  const title = textFrom(html, /<h1[^>]*class=\"quiz-title\"[^>]*>([\s\S]*?)<\/h1>/i) ||
                textFrom(html, /<title>([\s\S]*?)<\/title>/i).replace(/\s*-.*$/, '') ||
                'Quiz';

  // Split into question blocks
  const parts = html.split('<div class="question">');
  parts.shift();
  const questions = parts.map(seg => {
    // Stop at next question marker
    const block = seg.split('<div class="question">')[0];
    const text = textFrom(block, /<div class=\"question-text\">([\s\S]*?)<\/div>/i);
    const code = textFrom(block, /<div class=\"code-block\">([\s\S]*?)<\/div>/i);
    const options = allMatches(block, /<div class=\"option\">([\s\S]*?)<\/div>/gi)
      .map(s => s.replace(/<\/?strong[^>]*>/gi, ''))
      .map(s => s.trim()).filter(Boolean);
    // Answer in <div class="answer"> ... <strong>...</strong>
    const answer = textFrom(block, /<div class=\"answer\">[\s\S]*?<strong>([\s\S]*?)<\/strong>/i);
    const expl = textFrom(block, /<div class=\"explanation\">[\s\S]*?<p>([\s\S]*?)<\/p>/i)
              || textFrom(block, /<div class=\"explanation\">\s*([\s\S]*?)<\/div>/i);
    return { text, code, options, answer, expl };
  }).filter(q => q.text);

  return { title, questions };
}

function main() {
  if (!fs.existsSync(srcDir)) {
    console.error('quiz/ folder not found.');
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const files = Array.from({ length: 9 }, (_, i) => `quiz${i+1}.html`);
  files.forEach((fname, idx) => {
    const fpath = path.join(srcDir, fname);
    if (!fs.existsSync(fpath)) {
      console.warn('Missing', fpath);
      return;
    }
    const html = fs.readFileSync(fpath, 'utf8');
    const data = extractFromHtml(html);
    const outName = `quiz${idx+1}.md`;
    const outPath = path.join(outDir, outName);
    fs.writeFileSync(outPath, toMarkdown(data), 'utf8');
    console.log('Wrote', outPath);
  });
}

main();
