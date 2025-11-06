// Basic SPA loader for Markdown docs (English UI)

const $ = (sel) => document.querySelector(sel);
const navEl = $("#nav");
const docEl = $("#doc");
const searchEl = $("#search");
const breadcrumbEl = $("#breadcrumb");
const copyLinkBtn = $("#copy-link");
const toggleThemeBtn = $("#toggle-theme");
const menuBtn = $("#menu-button");
const maskEl = $("#sidebar-mask");

// Optional: Google Drive integration for dynamic diary posts
// Provide these via inline script in index.html
const DRIVE_API_KEY = window.DRIVE_API_KEY || ""; // e.g., 'AIza...'
const DRIVE_FOLDER_ID = window.DRIVE_FOLDER_ID || ""; // e.g., '1wDy_...'

const state = {
  config: null,
  flat: [],
  activePath: null,
  drive: { files: [], sectionName: "Drive Articles" },
};

function saveTheme(theme) {
  try { localStorage.setItem("site:theme", theme); } catch {}
}
function loadTheme() {
  try { return localStorage.getItem("site:theme"); } catch { return null; }
}
function applyTheme(theme) {
  if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
}

function pathToHash(path) { return "#/" + encodeURI(path); }
function hashToPath(hash) {
  if (!hash || !hash.startsWith("#/")) return null;
  return decodeURI(hash.slice(2));
}

function openNav() {
  document.body.classList.add('nav-open');
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.setAttribute('aria-hidden', 'false');
  if (maskEl) maskEl.hidden = false;
}
function closeNav() {
  document.body.classList.remove('nav-open');
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.setAttribute('aria-hidden', 'true');
  if (maskEl) maskEl.hidden = true;
}

async function loadConfig() {
  const res = await fetch("site/config.json?" + Date.now());
  if (!res.ok) throw new Error("Failed to load config: " + res.status);
  const cfg = await res.json();
  state.config = cfg;
  state.flat = cfg.sections.flatMap(section => section.items.map(it => ({...it, section: section.name})));
}

function buildNav() {
  const { sections } = state.config;
  const frag = document.createDocumentFragment();
  sections.forEach(sec => {
    const secEl = document.createElement("div");
    secEl.className = "section";
    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = sec.name;
    secEl.appendChild(title);

    sec.items.forEach(item => {
      const a = document.createElement("a");
      a.className = "link";
      a.textContent = item.title;
      a.href = pathToHash(item.path);
      a.dataset.path = item.path;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(item.path);
      });
      secEl.appendChild(a);
    });

    frag.appendChild(secEl);
  });
  navEl.innerHTML = "";
  navEl.appendChild(frag);
}

function setActiveLink(path) {
  navEl.querySelectorAll(".link").forEach(a => {
    a.classList.toggle("active", a.dataset.path === path);
  });
}

function updateBreadcrumb(item) {
  if (!item) { breadcrumbEl.textContent = ""; return; }
  breadcrumbEl.textContent = `${item.section} / ${item.title}`;
}

async function renderMarkdown(md) {
  marked.setOptions({ breaks: true, gfm: true });
  const html = marked.parse(md);
  docEl.innerHTML = html;
  document.querySelectorAll('pre code').forEach(block => {
    try { window.hljs.highlightElement(block); } catch {}
  });
}

async function loadDoc(path) {
  state.activePath = path;
  setActiveLink(path);
  // Drive-backed virtual paths use the scheme: drive:<fileId>
  if (path && path.startsWith("drive:")) {
    const fileId = path.slice("drive:".length);
    const file = state.drive.files.find(f => f.id === fileId);
    updateBreadcrumb({ section: state.drive.sectionName, title: file?.name || fileId });
    await loadDriveFile(fileId, file?.name);
    return;
  }
  const item = state.flat.find(it => it.path === path);
  updateBreadcrumb(item);
  docEl.innerHTML = `<p>Loading: ${path}</p>`;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Load failed: " + res.status);
    const md = await res.text();
    await renderMarkdown(md);
    const wanted = pathToHash(path);
    if (location.hash !== wanted) history.replaceState(null, "", wanted);
    closeNav();
  } catch (e) {
    docEl.innerHTML = `<p style="color:#d33">Failed to load document: ${path}<br>${String(e)}</p>`;
  }
}

function navigateTo(path) { loadDoc(path); }

function onHashChange() {
  const p = hashToPath(location.hash);
  const valid = state.flat.some(it => it.path === p);
  if (p && valid) { loadDoc(p); return; }
  renderHome();
}

function setupSearch() {
  const doFilter = () => {
    const q = searchEl.value.trim().toLowerCase();
    navEl.querySelectorAll(".link").forEach(a => {
      const text = a.textContent.toLowerCase();
      a.style.display = text.includes(q) ? "block" : "none";
    });
  };
  searchEl.addEventListener("input", doFilter);
}

function setupCopyLink() {
  copyLinkBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyLinkBtn.textContent = "Copied";
      setTimeout(() => (copyLinkBtn.textContent = "Copy Link"), 1200);
    } catch {}
  });
}

function setupTheme() {
  const saved = loadTheme();
  if (saved) applyTheme(saved);
  toggleThemeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
  });
}

function renderHome() {
  breadcrumbEl.textContent = '';
  const sections = state.config?.sections || [];
  const makeCard = (title, path) => `<a class="home-card" href="${pathToHash(path)}">${title}</a>`;
  const cards = sections.map(sec => {
    const first = (sec.items && sec.items[0]) ? sec.items[0].path : null;
    if (!first) return '';
    return makeCard(sec.name, first);
  }).join('\n');
  docEl.innerHTML = `<div class="home"><h1>Study Notes</h1><div class="home-grid">${cards}</div></div>`;
}

// ----------------------
// Google Drive integration
// ----------------------
async function loadDriveIndex() {
  if (!DRIVE_API_KEY || !DRIVE_FOLDER_ID) return null;
  const q = `'${DRIVE_FOLDER_ID}' in parents and trashed=false and name contains '.md'`;
  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.set('key', DRIVE_API_KEY);
  url.searchParams.set('q', q);
  url.searchParams.set('orderBy', 'modifiedTime desc');
  url.searchParams.set('pageSize', '50');
  url.searchParams.set('fields', 'files(id,name,modifiedTime)');
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Drive list failed: ' + res.status);
  const data = await res.json();
  const files = (data.files || []).map(f => ({ id: f.id, name: f.name, modifiedTime: f.modifiedTime }));
  state.drive.files = files;
  return files;
}

async function loadDriveFile(fileId, displayName) {
  if (!DRIVE_API_KEY) {
    docEl.innerHTML = `<p style="color:#d33">Drive API key not configured.</p>`;
    return;
  }
  docEl.innerHTML = `<p>Loading: ${displayName || fileId}</p>`;
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&key=${encodeURIComponent(DRIVE_API_KEY)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Drive fetch failed: ' + res.status);
    const md = await res.text();
    await renderMarkdown(md);
    const wanted = pathToHash(`drive:${fileId}`);
    if (location.hash !== wanted) history.replaceState(null, '', wanted);
    closeNav();
  } catch (e) {
    docEl.innerHTML = `<p style="color:#d33">Failed to load Drive file: ${displayName || fileId}<br>${String(e)}</p>`;
  }
}

function injectDriveSectionIntoConfig() {
  if (!state.drive.files.length) return;
  const section = {
    name: state.drive.sectionName,
    items: state.drive.files.map(f => ({ title: f.name.replace(/\.[^./]+$/, ''), path: `drive:${f.id}` }))
  };
  // Append or replace existing Drive section
  const existingIdx = state.config.sections.findIndex(s => s.name === state.drive.sectionName);
  if (existingIdx >= 0) state.config.sections.splice(existingIdx, 1, section);
  else state.config.sections.push(section);
}

async function main() {
  setupTheme();
  setupSearch();
  setupCopyLink();
  await loadConfig();
  buildNav();
  // Optionally load Drive posts and append to the nav
  try {
    const files = await loadDriveIndex();
    if (files && files.length) {
      injectDriveSectionIntoConfig();
      buildNav();
    }
  } catch (e) {
    // Non-fatal; continue without Drive integration
    console.warn('Drive integration skipped:', e);
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = document.body.classList.contains('nav-open');
      if (open) closeNav(); else openNav();
    });
  }
  if (maskEl) maskEl.addEventListener('click', closeNav);
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
}

main().catch(err => {
  docEl.innerHTML = `<p style="color:#d33">Initialization failed: ${String(err)}</p>`;
});
