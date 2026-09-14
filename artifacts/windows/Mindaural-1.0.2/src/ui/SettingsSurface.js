import { calibrationComplete, loadCalibration, playCalibrationCue, saveCalibration } from '../audio/calibration.js';
import { clearCloudSession, cloudFromStorage, storeCloudSession } from '../cloud/supabase.js';
import { createAndStoreSigningKey, exportEncryptedSigningKey, importEncryptedSigningKey, lockSigningKey, removeSigningKey, signingStatus, unlockSigningKey } from '../security/keyStore.js';
export function ImportScopeControl({ setMessage }) { const [scope, setScope] = React.useState(sessionStorage.getItem('mindaural.importScope') || 'all-tabs'); return React.createElement("div", { className: "settings-card" },
    React.createElement("h3", null, "Audio import scope"),
    React.createElement("label", null,
        "When audio is dropped",
        React.createElement("select", { value: scope, onChange: e => { const v = e.target.value; setScope(v); sessionStorage.setItem('mindaural.importScope', v); window.dispatchEvent(new Event('mindaural-import-scope')); setMessage?.(v === 'all-tabs' ? 'Dropped audio will populate all open Mindaural tabs.' : 'Dropped audio will stay in this browser tab.'); } },
            React.createElement("option", { value: "all-tabs" }, "Populate all open tabs (default)"),
            React.createElement("option", { value: "this-tab" }, "Populate this tab only"))),
    React.createElement("p", null, "Analyzer drops remain analysis-only.")); }
function saveText(name, text) { const u = URL.createObjectURL(new Blob([text], { type: 'application/json' })), a = document.createElement('a'); a.href = u; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); }
export function SettingsSurface({ setMessage }) {
    const [theme, setTheme] = React.useState(localStorage.getItem('bbs.theme') || 'system');
    const [cal, setCal] = React.useState(() => loadCalibration());
    const [url, setUrl] = React.useState(localStorage.getItem('bbs.supabase.url') || '');
    const [key, setKey] = React.useState(localStorage.getItem('bbs.supabase.key') || '');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user, setUser] = React.useState(null);
    const [passphrase, setPassphrase] = React.useState('');
    const [signState, setSignState] = React.useState(() => signingStatus());
    const keyFile = React.useRef(null);
    const mark = (k, v) => setCal(saveCalibration({ ...cal, [k]: v }));
    const cue = async (mode) => { try {
        await playCalibrationCue(mode);
        setMessage?.(`Played ${mode} channel cue.`);
    }
    catch (e) {
        setMessage?.(String(e));
    } };
    const saveCloud = () => { localStorage.setItem('bbs.supabase.url', url.trim().replace(/\/$/, '')); localStorage.setItem('bbs.supabase.key', key.trim()); setMessage?.('Cloud configuration saved locally.'); };
    const signin = async (kind) => { try {
        saveCloud();
        const api = cloudFromStorage(), s = kind === 'in' ? await api.signIn(email, password) : await api.signUp(email, password);
        if (s?.access_token)
            storeCloudSession(s);
        setUser(s?.user || await api.me().catch(() => null));
        setMessage?.(kind === 'in' ? 'Signed in.' : 'Account created; verify email if required by your Supabase project.');
    }
    catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
    } };
    return React.createElement("section", { className: "page" },
        React.createElement("div", { className: "eyebrow" }, "SETTINGS"),
        React.createElement("h1", null, "Device, identity & cloud"),
        React.createElement("div", { className: "settings-grid" },
            React.createElement("div", { className: "settings-card" },
                React.createElement("h3", null, "Headphone & channel calibration"),
                React.createElement("p", null, "The browser cannot detect headphones or physical sound pressure. Complete these listening checks yourself."),
                React.createElement("div", { className: "cal-steps" },
                    React.createElement("button", { onClick: () => cue('left') }, "\u25B6 Left-only cue"),
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: cal.leftConfirmed, onChange: e => mark('leftConfirmed', e.target.checked) }),
                        " I heard it only on the left"),
                    React.createElement("button", { onClick: () => cue('right') }, "\u25B6 Right-only cue"),
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: cal.rightConfirmed, onChange: e => mark('rightConfirmed', e.target.checked) }),
                        " I heard it only on the right"),
                    React.createElement("button", { onClick: () => cue('alternating') }, "\u25B6 Alternating L/R cue"),
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: cal.alternatingConfirmed, onChange: e => mark('alternatingConfirmed', e.target.checked) }),
                        " Alternation was correct"),
                    React.createElement("button", { onClick: () => cue('center') }, "\u25B6 Center cue"),
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: cal.centerConfirmed, onChange: e => mark('centerConfirmed', e.target.checked) }),
                        " Center appeared centered"),
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: cal.headphonesConfirmed, onChange: e => mark('headphonesConfirmed', e.target.checked) }),
                        " I confirm I am using stereo headphones/earbuds"),
                    React.createElement("label", null,
                        React.createElement("input", { type: "checkbox", checked: cal.spatialAudioWarningAcknowledged, onChange: e => mark('spatialAudioWarningAcknowledged', e.target.checked) }),
                        " I checked that mono/spatial/crossfeed processing is disabled when reproducibility matters")),
                React.createElement("b", { className: calibrationComplete(cal) ? 'pass' : 'warn' }, calibrationComplete(cal) ? `Calibration completed ${new Date(cal.completedAt).toLocaleString()}` : 'Calibration incomplete')),
            React.createElement("div", { className: "settings-card" },
                React.createElement("h3", null, "Project signing key"),
                React.createElement("p", null, "Ed25519 signatures authenticate package integrity/key control. The private key is stored only as PBKDF2 + AES-256-GCM encrypted data."),
                React.createElement("label", null,
                    "Key passphrase",
                    React.createElement("input", { type: "password", value: passphrase, onChange: e => setPassphrase(e.target.value), minLength: 10 })),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: async () => { try {
                            setSignState(await createAndStoreSigningKey(passphrase));
                            setMessage?.('New encrypted signing key created and unlocked.');
                        }
                        catch (e) {
                            setMessage?.(String(e));
                        } } }, "Create/replace key"),
                    React.createElement("button", { disabled: !signState.exists, onClick: async () => { try {
                            setSignState(await unlockSigningKey(passphrase));
                            setMessage?.('Signing key unlocked for this app session.');
                        }
                        catch (e) {
                            setMessage?.(e instanceof Error ? e.message : String(e));
                        } } }, "Unlock"),
                    React.createElement("button", { disabled: !signState.unlocked, onClick: () => setSignState(lockSigningKey()) }, "Lock")),
                React.createElement("small", null, signState.exists ? `${signState.unlocked ? 'Unlocked' : 'Locked'} · public key ${signState.publicKey?.slice(0, 24)}…` : 'No local signing key'),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { disabled: !signState.exists, onClick: () => saveText('mindaural-signing-key.json', exportEncryptedSigningKey()) }, "Back up encrypted key"),
                    React.createElement("button", { onClick: () => keyFile.current?.click() }, "Import encrypted key"),
                    React.createElement("input", { hidden: true, ref: keyFile, type: "file", accept: ".json,application/json", onChange: async (e) => { const f = e.target.files?.[0]; if (!f)
                            return; try {
                            setSignState(importEncryptedSigningKey(await f.text()));
                            setMessage?.('Encrypted signing key imported; unlock it with its passphrase.');
                        }
                        catch (err) {
                            setMessage?.(String(err));
                        } } }),
                    React.createElement("button", { className: "danger", disabled: !signState.exists, onClick: () => { if (confirm('Remove the encrypted signing key from this browser?')) {
                            removeSigningKey();
                            setSignState(signingStatus());
                        } } }, "Remove key"))),
            React.createElement("div", { className: "settings-card" },
                React.createElement("h3", null, "Supabase community backend"),
                React.createElement("label", null,
                    "Project URL",
                    React.createElement("input", { value: url, onChange: e => setUrl(e.target.value), placeholder: "https://\u2026supabase.co" })),
                React.createElement("label", null,
                    "Anonymous public key",
                    React.createElement("input", { type: "password", value: key, onChange: e => setKey(e.target.value) })),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: saveCloud }, "Save endpoint"),
                    React.createElement("button", { onClick: async () => { try {
                            saveCloud();
                            const u = await cloudFromStorage().me();
                            setUser(u);
                            setMessage?.('Cloud connection authenticated.');
                        }
                        catch (e) {
                            setMessage?.(e instanceof Error ? e.message : String(e));
                        } } }, "Test session")),
                React.createElement("hr", null),
                React.createElement("label", null,
                    "Email",
                    React.createElement("input", { type: "email", autoComplete: "email", value: email, onChange: e => setEmail(e.target.value) })),
                React.createElement("label", null,
                    "Password",
                    React.createElement("input", { type: "password", autoComplete: "current-password", value: password, onChange: e => setPassword(e.target.value) })),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: () => signin('in') }, "Sign in"),
                    React.createElement("button", { onClick: () => signin('up') }, "Create account"),
                    React.createElement("button", { onClick: async () => { try {
                            await cloudFromStorage().signOut();
                        }
                        catch { } clearCloudSession(); setUser(null); setMessage?.('Signed out locally.'); } }, "Sign out")),
                user && React.createElement("small", null,
                    "Signed in: ",
                    user.email || user.id)),
            React.createElement("div", { className: "settings-card" },
                React.createElement("h3", null, "Appearance & accessibility"),
                React.createElement("label", null,
                    "Theme",
                    React.createElement("select", { value: theme, onChange: e => { const v = e.target.value; setTheme(v); localStorage.setItem('bbs.theme', v); document.documentElement.dataset.theme = v; } },
                        React.createElement("option", { value: "system" }, "System"),
                        React.createElement("option", { value: "light" }, "Light"),
                        React.createElement("option", { value: "dark" }, "Dark"),
                        React.createElement("option", { value: "ocean" }, "Ocean"),
                        React.createElement("option", { value: "forest" }, "Forest"),
                        React.createElement("option", { value: "ember" }, "Ember"),
                        React.createElement("option", { value: "plum" }, "Plum"),
                        React.createElement("option", { value: "graphite" }, "Graphite"))),
                React.createElement("p", null, "Keyboard focus is always visible; reduced-motion preferences disable nonessential animation.")),
            React.createElement("div", { className: "settings-card" },
                React.createElement("h3", null, "Format policy"),
                React.createElement("p", null, "Bundled targets: WAV \u00B7 AIFF \u00B7 FLAC \u00B7 MP3 \u00B7 Ogg Vorbis \u00B7 Ogg Opus \u00B7 WebM Opus."),
                React.createElement("p", null,
                    React.createElement("b", null, "AAC/M4A:"),
                    " intentionally unsupported. ",
                    React.createElement("b", null, "FFmpeg:"),
                    " prohibited throughout the project."))));
}
//# sourceMappingURL=SettingsSurface.js.map