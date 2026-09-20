$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$assetDir = Join-Path $root 'public\assets'
if (-not (Test-Path -LiteralPath $assetDir)) { New-Item -ItemType Directory -Path $assetDir | Out-Null }
$assets = @{
  'hero-banner.png' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/banner-1-1400x609.png'
  'hero-banner-2.png' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/banner-2-2.png'
  'logo.png' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/logo-Dg9SOwi6.png'
  'jwei.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/10/jwei.jpg'
  'ckun.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/1.jpg'
  'emma.png' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/image-1752464916687-796864111-IMG_202406178_101930369.png'
  'cnc-blade.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/image-1752493017788-633936787-IMG_20240422_123933.jpg'
  'aoke.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/aoke.jpg'
  'head.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/2.jpg'
  'felt.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/tham1.jpg'
  'blade-v.jpg' = 'https://chinhthucmayktscnc.com/wp-content/uploads/2025/09/dao-phay.jpg'
}
foreach ($asset in $assets.GetEnumerator()) {
  $target = Join-Path $assetDir $asset.Key
  Write-Host "Downloading $($asset.Key)..."
  Invoke-WebRequest -Uri $asset.Value -OutFile $target -UseBasicParsing
}
Write-Host "Downloaded $($assets.Count) assets to $assetDir"
