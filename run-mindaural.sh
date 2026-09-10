#!/usr/bin/env bash
set -Eeuo pipefail

# Mindaural Linux launcher with a small optional desktop GUI.
# Run this script from any directory with: bash run-mindaural.sh

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${PORT:-4173}"
URL="http://127.0.0.1:${PORT}/"
LOG_FILE="${TMPDIR:-/tmp}/mindaural-${PORT}.log"

GUI="none"
command -v zenity >/dev/null 2>&1 && GUI="zenity"
[[ "$GUI" == none ]] && command -v kdialog >/dev/null 2>&1 && GUI="kdialog"

info() {
  case "$GUI" in
    zenity) zenity --info --title="Mindaural" --text="$1" >/dev/null 2>&1 || true ;;
    kdialog) kdialog --title "Mindaural" --msgbox "$1" >/dev/null 2>&1 || true ;;
    *) echo "$1" ;;
  esac
}

error() {
  case "$GUI" in
    zenity) zenity --error --title="Mindaural" --text="$1" >/dev/null 2>&1 || true ;;
    kdialog) kdialog --title "Mindaural" --error "$1" >/dev/null 2>&1 || true ;;
    *) echo "Error: $1" >&2 ;;
  esac
  exit 1
}

ask_to_launch() {
  case "$GUI" in
    zenity) zenity --question --title="Mindaural" --text="Build and launch Mindaural?" >/dev/null 2>&1 ;;
    kdialog) kdialog --title "Mindaural" --yesno "Build and launch Mindaural?" >/dev/null 2>&1 ;;
    *) return 0 ;;
  esac
}

if [[ "$GUI" != none ]]; then
  if ! ask_to_launch; then
    exit 0
  fi
fi

command -v node >/dev/null 2>&1 || error "Node.js is required. Install Node.js 18+ and try again."
command -v npm >/dev/null 2>&1 || error "npm is required. Install npm and try again."

if [[ ! -d node_modules ]]; then
  info "Installing Mindaural dependencies..."
  npm install || error "Dependency installation failed. See the terminal output for details."
fi

info "Building Mindaural..."
npm run build || error "The Mindaural build failed. See the terminal output for details."

echo "Starting Mindaural at ${URL}"
npm run serve >"$LOG_FILE" 2>&1 &
SERVER_PID=$!

cleanup() {
  if kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

for _ in {1..50}; do
  if command -v curl >/dev/null 2>&1 && curl --silent --fail "$URL" >/dev/null; then
    break
  fi
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "Error: Mindaural server stopped unexpectedly." >&2
    error "The Mindaural server stopped unexpectedly. Check ${LOG_FILE}."
  fi
  sleep 0.1
done

if command -v firefox >/dev/null 2>&1; then
  firefox "$URL" >/dev/null 2>&1 &
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 &
else
  info "Mindaural is running at ${URL}\nNo Firefox or xdg-open was found; open the URL manually."
fi

info "Mindaural is running at ${URL}\nThe local server will stay open until you close this launcher."
wait "$SERVER_PID"
