// ── Line reveal ──
const arrows = document.querySelectorAll('.arrow');
const lines = document.querySelectorAll('.text-line');
let currentLine = 0;

function revealNextLine() {
  const nextLine = lines[currentLine + 1];
  if (nextLine) {
    nextLine.style.display = 'flex';
    currentLine++;
  }
}

arrows.forEach((arrow) => {
  arrow.addEventListener('click', revealNextLine);
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    revealNextLine();
  }
});

// ── Theme picker ──
const THEMES = ['light', 'dark', 'vaporwave', 'nouveau'];

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function initThemePicker() {
  const picker = document.createElement('div');
  picker.className = 'theme-picker';

  const label = document.createElement('span');
  label.className = 'theme-picker-label';
  label.textContent = 'theme:';
  picker.appendChild(label);

  const icons = { light: '☀️', dark: '🌙', vaporwave: '🌸', nouveau: '🌿' };

  THEMES.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.dataset.theme = theme;
    btn.title = theme;
    btn.textContent = icons[theme];
    btn.addEventListener('click', () => setTheme(theme));
    picker.appendChild(btn);
  });

  document.body.appendChild(picker);
}

initThemePicker();

// Apply saved or system-preferred theme on load
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (prefersDark ? 'dark' : 'light'));