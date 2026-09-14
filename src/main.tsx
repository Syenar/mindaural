import {App} from './ui/App.js';
// Apply the site preference before React paints so the demo never flashes or
// appears to switch away from the theme selected on the marketing site.
const requestedTheme=new URLSearchParams(location.search).get('theme');
if(requestedTheme)localStorage.setItem('bbs.theme',requestedTheme);
document.documentElement.dataset.theme=requestedTheme||localStorage.getItem('bbs.theme')||'system';
const brandStyle=document.createElement('style');
brandStyle.textContent='.brand-image{background:transparent!important;border-radius:0!important;box-shadow:none!important;padding:0!important}';
document.head.append(brandStyle);
// The bundled runtime is intentionally dependency-light and may expose the
// React 17 API. Support both it and React 18 so a clean local build opens.
const element = <App/>;
if (typeof ReactDOM.createRoot === 'function') {
  ReactDOM.createRoot(document.getElementById('root')).render(element);
} else {
  (ReactDOM as any).render(element, document.getElementById('root'));
}
document.documentElement.dataset.appReady='true';
