param([string]$Version="1.0.2")
$ErrorActionPreference='Stop'
$root=Resolve-Path (Join-Path $PSScriptRoot '..'); $stage=Join-Path $root "artifacts\windows\Mindaural-$Version"; $out=Join-Path $root "artifacts\Mindaural-Windows-$Version.exe"
if(Test-Path $stage){Remove-Item $stage -Recurse -Force}; New-Item $stage -ItemType Directory -Force | Out-Null
Copy-Item (Join-Path $root 'dist\*') $stage -Recurse -Force
$launcher=Join-Path $stage 'Mindaural.cmd'; Set-Content $launcher '@echo off`r`nstart "" "%~dp0app.html"'
$sed=Join-Path $env:TEMP "mindaural-iexpress-$Version.sed"
@"
[Version]
Class=IEXPRESS
SEDVersion=3
[Options]
PackagePurpose=InstallApp
ShowInstallProgramWindow=0
HideExtractAnimation=1
UseLongFileName=1
InsideCompressed=1
TargetName=$out
FriendlyName=Mindaural $Version
AppLaunched=Mindaural.cmd
SourceFiles=SourceFiles
[SourceFiles]
SourceFiles0=$stage
[SourceFiles0]
"@ | Set-Content $sed
& "$env:WINDIR\System32\iexpress.exe" /N /Q $sed
Write-Host "Created $out"
