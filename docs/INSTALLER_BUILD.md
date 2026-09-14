# Mindaural installer builds

The website and workstation are built into `dist/`. Packaging must always start with a clean `npm.cmd run build`, because the installers copy that directory verbatim.

## Windows

From PowerShell:

```powershell
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\scripts\package-windows.ps1 -Version 1.0.2
```

The output is `artifacts/Mindaural-Windows-1.0.2.exe`. It is a self-extracting installer made with the Windows IExpress component. It extracts the complete offline site and opens the workstation launcher. Change `-Version` for each release.

## Linux

Install `appimagetool` once from its official AppImage release, make the script executable, then run:

```bash
npm run build
chmod +x scripts/package-linux.sh
./scripts/package-linux.sh 1.0.2
```

The output is `artifacts/Mindaural-1.0.2.AppImage`. The script fails deliberately when `appimagetool` is missing; do not rename a tarball or shell script to `.AppImage`.

## Release checklist

1. Update the version in `package.json` and `app.webmanifest`.
2. Run `npm.cmd run typecheck`.
3. Run `npm.cmd run build`.
4. Run the Windows script on Windows and launch the resulting `.exe`.
5. Run the Linux script on Linux and launch the resulting `.AppImage`.
6. Test the public site, demo beats, workstation launch, and legal pages from the packaged output.
7. Keep the generated files in `artifacts/` with checksums and publish only after both launch tests pass.

The current repository does not include `appimagetool`, so a Linux binary cannot be honestly generated on this machine until that external tool is installed.
