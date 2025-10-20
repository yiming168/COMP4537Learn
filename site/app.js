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

const state = {
  config: null,
  flat: [],
  activePath: null,
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

async function main() {
  setupTheme();
  setupSearch();
  setupCopyLink();
  await loadConfig();
  buildNav();
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
