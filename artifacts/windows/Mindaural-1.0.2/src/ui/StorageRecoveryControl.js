import { loadProjects, saveProject } from '../storage/projects.js';
import { storageFailureMessage } from '../storage/errors.js';
export function StorageRecoveryControl({ setMessage }) {
    const file = React.useRef(null);
    const exportBackup = async () => { const projects = await loadProjects(); const blob = new Blob([JSON.stringify({ format: 'mindaural-local-backup', version: 1, exportedAt: new Date().toISOString(), projects }, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mindaural-local-backup.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); setMessage?.(`Local backup exported (${projects.length} projects).`); };
    const restore = async (e) => { try {
        const f = e.target.files?.[0];
        if (!f)
            return;
        const x = JSON.parse(await f.text());
        if (x?.format !== 'mindaural-local-backup' || x.version !== 1 || !Array.isArray(x.projects))
            throw new Error('Unsupported local backup format');
        let count = 0;
        for (const p of x.projects) {
            if (!p || typeof p.id !== 'string' || typeof p.title !== 'string' || !Array.isArray(p.voices))
                throw new Error('Backup contains an invalid project');
            await saveProject(p);
            count++;
        }
        setMessage?.(`Recovered ${count} local projects. Reload Library to refresh.`);
    }
    catch (err) {
        setMessage?.(err instanceof SyntaxError ? 'Local recovery refused: backup JSON is invalid.' : storageFailureMessage(err, 'restore local projects'));
    }
    finally {
        e.target.value = '';
    } };
    return React.createElement("div", { className: "settings-card" },
        React.createElement("h3", null, "Local storage recovery"),
        React.createElement("p", null, "Export a portable local backup or restore one after browser storage loss. Existing projects with the same id are replaced only after validation."),
        React.createElement("div", { className: "actions" },
            React.createElement("button", { onClick: exportBackup }, "Export local backup"),
            React.createElement("button", { onClick: () => file.current?.click() }, "Restore local backup")),
        React.createElement("input", { ref: file, hidden: true, type: "file", accept: "application/json,.json", onChange: restore }));
}
//# sourceMappingURL=StorageRecoveryControl.js.map