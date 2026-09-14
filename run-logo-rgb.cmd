@echo off
setlocal
set "APP_DIR=%~dp0"
git -C "%APP_DIR%" pull --ff-only origin main
if errorlevel 1 exit /b 1
start "Mindaural RGB Logo Studio" "http://127.0.0.1:4173/logo-rgb.html"
npm.cmd run serve
