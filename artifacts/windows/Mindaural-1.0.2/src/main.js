import { App } from './ui/App.js';
// The bundled runtime is intentionally dependency-light and may expose the
// React 17 API. Support both it and React 18 so a clean local build opens.
const element = React.createElement(App, null);
if (typeof ReactDOM.createRoot === 'function') {
    ReactDOM.createRoot(document.getElementById('root')).render(element);
}
else {
    ReactDOM.render(element, document.getElementById('root'));
}
document.documentElement.dataset.appReady = 'true';
//# sourceMappingURL=main.js.map