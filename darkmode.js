(function () {
  const darkTheme = {
    '--background-color': '#242525',
    '--text-color': '#e5e0d8',
    '--link-color': '#4791e6',
    '--border-color': '#776f62',
    '--placeholder-color': '#b2aa9e'
  };
  const lightTheme = {
    '--background-color': '#fff',
    '--text-color': '#232323',
    '--link-color': '#007cba',
    '--border-color': '#dedede',
    '--placeholder-color': '#777'
  };

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const colors = theme === 'dark' ? darkTheme : lightTheme;
    for (const key in colors) {
      root.style.setProperty(key, colors[key]);
    }
    root.setAttribute('data-theme', theme);
  }

  function getSavedTheme() {
    return localStorage.getItem('theme-choice');
  }

  function saveTheme(theme) {
    localStorage.setItem('theme-choice', theme);
  }

  function initTheme() {
    let theme = getSavedTheme();
    if (!theme) {
      theme = getSystemTheme();
    }
    applyTheme(theme);
  }

  function toggleTheme() {
    let current = document.documentElement.getAttribute('data-theme');
    let newTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    saveTheme(newTheme);
    updateToggleIcon(newTheme);
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!getSavedTheme()) {
      const theme = e.matches ? 'dark' : 'light';
      applyTheme(theme);
      updateToggleIcon(theme);
    }
  });

  function updateToggleIcon(theme) {
    const sun = document.getElementById('darkmode-sun');
    const moon = document.getElementById('darkmode-moon');
    if (!sun || !moon) return;
    if (theme === 'dark') {
      sun.style.display = 'block';
      moon.style.display = 'none';
    } else {
      sun.style.display = 'none';
      moon.style.display = 'block';
    }
  }

function createToggle() {
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Сменить тему');
  btn.setAttribute('type', 'button');
  btn.style.cssText = `
    position:fixed;bottom:20px;right:20px;z-index:9999;
    padding:0;border-radius:50%;
    background:#333;
    color:#fff;border:none;
    box-shadow:0 2px 6px #0004;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    width:48px;height:48px;transition:background 0.2s;
    overflow:hidden;
  `;
  btn.innerHTML = `
    <span id="darkmode-moon" style="display:none;width:32px;height:32px;line-height:0;">
      <svg width="32" height="32" viewBox="0 0 30 30" fill="none" style="display:block;margin:auto;">
        <circle cx="15" cy="15" r="15" fill="#333"/>
        <path fill="#e5e0d8" d="M10.8956 0.505198C11.2091 0.818744 11.3023 1.29057 11.1316 1.69979C10.4835 3.25296 10.125 4.95832 10.125 6.75018C10.125 13.9989 16.0013 19.8752 23.25 19.8752C25.0419 19.8752 26.7472 19.5167 28.3004 18.8686C28.7096 18.6979 29.1814 18.7911 29.495 19.1046C29.8085 19.4182 29.9017 19.89 29.731 20.2992C27.4235 25.8291 21.9642 29.7189 15.5938 29.7189C7.13689 29.7189 0.28125 22.8633 0.28125 14.4064C0.28125 8.036 4.17113 2.57666 9.70097 0.269199C10.1102 0.098441 10.582 0.191653 10.8956 0.505198Z"/>
      </svg>
    </span>
    <span id="darkmode-sun" style="display:none;width:32px;height:32px;line-height:0;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="display:block;margin:auto;">
        <circle cx="12" cy="12" r="6" fill="#ffc800"/>
        <g stroke="#ffc800" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="4"/>
          <line x1="12" y1="20" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="4" y2="12"/>
          <line x1="20" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
        </g>
      </svg>
    </span>
  `;
  btn.onclick = toggleTheme;
  document.body.appendChild(btn);

  let theme = getSavedTheme() || getSystemTheme();
  updateToggleIcon(theme);
}


  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    createToggle();
  });

})();
