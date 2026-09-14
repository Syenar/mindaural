import { deserializeSession } from '../core/sessionSchema.js';
import { PRESETS } from '../data/presets.js';
import { cloudConfigured, cloudFromStorage } from '../cloud/supabase.js';
import { PlaylistPanel } from './PlaylistPanel.js';
const collections = ['all', 'research', 'curated', 'community', 'personal'];
function row(p) { const v = p.project.voices[0]; return { type: v?.type || '—', ears: v ? `${v.leftHz.toFixed(2)} / ${v.rightHz.toFixed(2)} Hz` : '—', beat: v ? Math.abs(v.rightHz - v.leftHz).toFixed(2) + ' Hz' : '—', duration: Math.round(p.duration / 60) + ' min', voices: p.project.voices.length, automation: p.project.voices.reduce((n, v) => n + v.automation.length, 0), evidence: p.evidence.state, source: p.project.provenance.source || p.project.provenance.author }; }
export function LibrarySurface({ saved, project, setProject, setSurface, setMessage, onPlayPlaylist }) {
    const [q, setQ] = React.useState(''), [collection, setCollection] = React.useState('all'), [evidence, setEvidence] = React.useState('all'), [compare, setCompare] = React.useState([]), [cloud, setCloud] = React.useState([]), [loading, setLoading] = React.useState(false), [selectedCloud, setSelectedCloud] = React.useState(null), [rating, setRating] = React.useState(5), [review, setReview] = React.useState(''), [rights, setRights] = React.useState(false), [publishDesc, setPublishDesc] = React.useState(project.description || '');
    const refreshCloud = async () => { if (!cloudConfigured()) {
        setMessage?.('Configure Supabase in Settings to load community sessions.');
        return;
    } setLoading(true); try {
        setCloud(await cloudFromStorage().listPublicPresets(100));
        setMessage?.('Community library refreshed.');
    }
    catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
    }
    finally {
        setLoading(false);
    } };
    React.useEffect(() => { if (cloudConfigured())
        refreshCloud(); }, []);
    const built = PRESETS.filter(p => (collection === 'all' || p.collection === collection) && (evidence === 'all' || p.evidence.state === evidence) && (`${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())));
    const local = saved.map((p) => ({ id: `local-${p.id}`, title: p.title, collection: 'personal', description: p.description, duration: p.duration, purpose: 'Personal', evidence: p.evidence, tags: p.tags, project: p }));
    const visibleLocal = (collection === 'all' || collection === 'personal') ? local.filter(p => (`${p.title} ${p.description}`).toLowerCase().includes(q.toLowerCase())) : [];
    const allMap = new Map([...PRESETS, ...local].map(p => [p.id, p]));
    const comparePresets = compare.map(id => allMap.get(id)).filter(Boolean);
    const toggleCompare = (id) => setCompare(x => x.includes(id) ? x.filter(i => i !== id) : x.length < 2 ? [...x, id] : [x[1], id]);
    const open = (p, source) => { const next = structuredClone(p); if (source) {
        next.id = crypto.randomUUID();
        next.provenance = { ...next.provenance, source, lineage: [...(next.provenance.lineage || []), source], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        next.revision = 1;
    } setProject(next); setSurface('Studio'); };
    const publish = async () => { try {
        const res = await cloudFromStorage().publishPreset(project, { title: project.title, description: publishDesc, evidenceLevel: project.evidence.state, rightsDeclared: rights });
        setMessage?.(`Published ${Array.isArray(res) ? res[0]?.title || project.title : project.title}.`);
        setRights(false);
        await refreshCloud();
    }
    catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
    } };
    const submitReview = async () => { if (!selectedCloud)
        return; try {
        await cloudFromStorage().review(selectedCloud.id, rating, review);
        setMessage?.('Review saved.');
        setReview('');
    }
    catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
    } };
    return React.createElement("section", { className: "page" },
        React.createElement("div", { className: "eyebrow" }, "LIBRARY"),
        React.createElement("h1", null, "Research, curated, community, and yours"),
        React.createElement("div", { className: "library-toolbar" },
            React.createElement("input", { className: "search", placeholder: "Search title, tags, description", value: q, onChange: e => setQ(e.target.value) }),
            React.createElement("select", { value: evidence, onChange: e => setEvidence(e.target.value) },
                React.createElement("option", { value: "all" }, "All evidence"),
                Array.from(new Set(PRESETS.map(p => p.evidence.state))).map(x => React.createElement("option", { key: x }, x))),
            React.createElement("button", { onClick: refreshCloud, disabled: loading }, loading ? 'Loading…' : 'Refresh community')),
        React.createElement("div", { className: "tabs" }, collections.map(c => React.createElement("button", { key: c, className: collection === c ? 'active' : '', onClick: () => setCollection(c) }, c[0].toUpperCase() + c.slice(1)))),
        comparePresets.length > 0 && React.createElement("div", { className: "compare-panel" },
            React.createElement("div", { className: "compare-head" },
                React.createElement("h3", null, "Preset comparison"),
                React.createElement("button", { onClick: () => setCompare([]) }, "Clear")),
            React.createElement("table", null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Attribute"),
                        comparePresets.map(p => React.createElement("th", { key: p.id }, p.title)))),
                React.createElement("tbody", null, ['type', 'ears', 'beat', 'duration', 'voices', 'automation', 'evidence', 'source'].map(k => React.createElement("tr", { key: k },
                    React.createElement("th", null, k),
                    comparePresets.map(p => React.createElement("td", { key: p.id }, String(row(p)[k]))))))),
            React.createElement("small", null, "Select a preset and open it to copy individual tracks/envelopes in Studio. Opening a built-in/community item creates an editable local fork.")),
        visibleLocal.length > 0 && React.createElement(React.Fragment, null,
            React.createElement("h2", null, "My Library"),
            React.createElement("div", { className: "card-grid compact" }, visibleLocal.map(p => React.createElement("article", { className: "preset", key: p.id },
                React.createElement("div", null,
                    React.createElement("span", { className: "collection" }, "personal"),
                    React.createElement("h3", null, p.title),
                    React.createElement("p", null, p.description),
                    React.createElement("small", null,
                        "Revision ",
                        p.project.revision)),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: () => toggleCompare(p.id) }, compare.includes(p.id) ? 'Compared ✓' : 'Compare'),
                    React.createElement("button", { className: "primary small", onClick: () => open(p.project) }, "Open")))))),
        (collection === 'all' || collection === 'research' || collection === 'curated') && React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "Built in \u00B7 ",
                built.length),
            React.createElement("div", { className: "card-grid compact" }, built.map(p => React.createElement("article", { className: "preset", key: p.id },
                React.createElement("div", null,
                    React.createElement("div", { className: "preset-meta" },
                        React.createElement("span", { className: "collection" }, p.collection),
                        React.createElement("span", { className: "evidence-tag" }, p.evidence.state)),
                    React.createElement("h3", null, p.title),
                    React.createElement("p", null, p.description),
                    React.createElement("small", null,
                        row(p).ears,
                        " \u00B7 \u0394 ",
                        row(p).beat,
                        " \u00B7 ",
                        row(p).duration)),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: () => toggleCompare(p.id) }, compare.includes(p.id) ? 'Compared ✓' : 'Compare'),
                    React.createElement("button", { className: "primary small", onClick: () => open(p.project, `builtin:${p.id}`) }, "Open fork")))))),
        (collection === 'all' || collection === 'community') && React.createElement(React.Fragment, null,
            React.createElement("div", { className: "section-head" },
                React.createElement("h2", null,
                    "Community \u00B7 ",
                    cloud.length),
                React.createElement("small", null, "Community claims are user-submitted and are not scientific validation.")),
            cloud.length ? React.createElement("div", { className: "card-grid compact" }, cloud.filter(p => (`${p.title} ${p.description}`).toLowerCase().includes(q.toLowerCase())).map(p => React.createElement("article", { className: "preset", key: p.id },
                React.createElement("div", null,
                    React.createElement("div", { className: "preset-meta" },
                        React.createElement("span", { className: "collection" }, "community"),
                        React.createElement("span", { className: "evidence-tag" }, p.evidence_level || 'community-claim')),
                    React.createElement("h3", null, p.title),
                    React.createElement("p", null, p.description)),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { onClick: () => setSelectedCloud(p) }, "Review"),
                    React.createElement("button", { onClick: async () => { try {
                            await cloudFromStorage().favorite(p.id);
                            setMessage?.('Added to favorites.');
                        }
                        catch (e) {
                            setMessage?.(String(e));
                        } } }, "\u2661 Favorite"),
                    React.createElement("button", { className: "primary small", onClick: () => open(deserializeSession(p.session), `community:${p.id}`) }, "Open fork"))))) : React.createElement("div", { className: "empty-state" },
                React.createElement("b", null, cloudConfigured() ? 'No community sessions returned.' : 'Cloud not configured.'),
                React.createElement("p", null, cloudConfigured() ? 'Publish a session or refresh the library.' : 'Local and built-in libraries remain fully functional without an account.'))),
        React.createElement("div", { className: "publish-card" },
            React.createElement("h2", null, "Publish current session"),
            React.createElement("p", null, "Publishing requires a verified account and a rights declaration. Imported commercial audio cannot be redistributed without permission."),
            React.createElement("label", null,
                "Description",
                React.createElement("textarea", { value: publishDesc, onChange: e => setPublishDesc(e.target.value) })),
            React.createElement("label", null,
                React.createElement("input", { type: "checkbox", checked: rights, onChange: e => setRights(e.target.checked) }),
                " I have redistribution rights for every embedded/public asset in this session."),
            React.createElement("button", { className: "primary", disabled: !rights, onClick: publish }, "Publish to community")),
        React.createElement(PlaylistPanel, { current: project, onPlay: onPlayPlaylist, setMessage: setMessage }),
        selectedCloud && React.createElement("div", { className: "modal-backdrop", onClick: () => setSelectedCloud(null) },
            React.createElement("div", { className: "modal-card", onClick: e => e.stopPropagation() },
                React.createElement("h3", null,
                    "Review ",
                    selectedCloud.title),
                React.createElement("label", null,
                    "Rating",
                    React.createElement("select", { value: rating, onChange: e => setRating(Number(e.target.value)) }, [5, 4, 3, 2, 1].map(x => React.createElement("option", { key: x, value: x },
                        x,
                        " / 5")))),
                React.createElement("label", null,
                    "Review",
                    React.createElement("textarea", { value: review, onChange: e => setReview(e.target.value) })),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { className: "primary small", onClick: submitReview }, "Save review"),
                    React.createElement("button", { onClick: async () => { const why = prompt('Why are you reporting this preset?'); if (!why)
                            return; try {
                            await cloudFromStorage().report('preset', selectedCloud.id, why);
                            setMessage?.('Report submitted.');
                            setSelectedCloud(null);
                        }
                        catch (e) {
                            setMessage?.(String(e));
                        } } }, "Report"),
                    React.createElement("button", { onClick: () => setSelectedCloud(null) }, "Close")))));
}
//# sourceMappingURL=LibrarySurface.js.map