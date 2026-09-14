#!/usr/bin/env bash
set -euo pipefail
VERSION="${1:-1.0.2}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/artifacts/Mindaural-$VERSION.AppImage"
if ! command -v appimagetool >/dev/null 2>&1; then echo "appimagetool is required. Install it from https://github.com/AppImage/appimagetool/releases and rerun." >&2; exit 2; fi
STAGE="$ROOT/artifacts/linux/AppDir"
rm -rf "$STAGE" "$OUT"
mkdir -p "$STAGE/usr/share/mindaural" "$STAGE/usr/bin"
cp -R "$ROOT/dist/." "$STAGE/usr/share/mindaural/"
cat > "$STAGE/usr/bin/mindaural" <<'EOF'
#!/usr/bin/env bash
ROOT="$(cd "$(dirname "$0")/../share/mindaural" && pwd)"
exec xdg-open "$ROOT/app.html"
EOF
chmod +x "$STAGE/usr/bin/mindaural"
cat > "$STAGE/mindaural.desktop" <<EOF
[Desktop Entry]
Name=Mindaural
Exec=mindaural
Type=Application
Categories=AudioVideo;Audio;
EOF
appimagetool "$STAGE" "$OUT"
echo "Created $OUT"
