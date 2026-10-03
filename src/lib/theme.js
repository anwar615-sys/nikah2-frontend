// Theme helpers shared by ThemeProvider, ThemeToggle and the inline no-flash script.
export const THEME_KEY = 'nikha2-theme';

export function resolveTheme(stored, systemDark) {
  if (stored === 'light' || stored === 'dark') return stored;
  return systemDark ? 'dark' : 'light';
}

export function nextTheme(current) {
  return current === 'dark' ? 'light' : 'dark';
}

// Runs in <head> before React mounts so a returning dark-mode visitor never sees a light flash.
export const noFlashScript = `(function(){try{var s=null;try{s=localStorage.getItem('${THEME_KEY}')}catch(e){}
var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
var t=(s==='light'||s==='dark')?s:(d?'dark':'light');
document.documentElement.dataset.theme=t}catch(e){}})();`;
