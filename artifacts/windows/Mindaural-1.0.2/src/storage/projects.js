const DB = 'mindaural', STORE = 'projects', VERSION = 3;
function open() { return new Promise((resolve, reject) => { const r = indexedDB.open(DB, VERSION); r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(STORE))
    r.result.createObjectStore(STORE, { keyPath: 'id' }); if (!r.result.objectStoreNames.contains('assets'))
    r.result.createObjectStore('assets', { keyPath: 'id' }); if (!r.result.objectStoreNames.contains('playlists'))
    r.result.createObjectStore('playlists', { keyPath: 'id' }); }; r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); }); }
export async function saveProject(p) { const db = await open(); await new Promise((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(p); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); }); db.close(); }
export async function loadProjects() { const db = await open(); const rows = await new Promise((resolve, reject) => { const r = db.transaction(STORE).objectStore(STORE).getAll(); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); }); db.close(); return rows.sort((a, b) => b.provenance.updatedAt.localeCompare(a.provenance.updatedAt)); }
export async function deleteProject(id) { const db = await open(); await new Promise((resolve, reject) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(id); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); }); db.close(); }
//# sourceMappingURL=projects.js.map