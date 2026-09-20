$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$PSDefaultParameterValues['Invoke-RestMethod:ContentType'] = 'application/json; charset=utf-8'
$base = 'http://localhost:3001/api'
for ($attempt = 1; $attempt -le 20; $attempt++) { try { Invoke-RestMethod "$base/health" -TimeoutSec 2 | Out-Null; break } catch { if ($attempt -eq 20) { throw }; Start-Sleep -Milliseconds 500 } }
function Assert-Ok($label, $condition) { if (-not $condition) { throw "FAIL: $label" }; Write-Host "PASS: $label" }
$health = Invoke-RestMethod "$base/health"
Assert-Ok 'health endpoint' ($health.ok -eq $true)
$products = Invoke-RestMethod "$base/products"
Assert-Ok 'published products available' ($products.products.Count -gt 0)
$email = "smoke-$([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())@example.com"
$register = Invoke-RestMethod "$base/auth/register" -Method Post -ContentType 'application/json' -Body (@{name='Smoke User';email=$email;password='Test12345!'} | ConvertTo-Json) -SessionVariable session
Assert-Ok 'user registration' ($register.user.role -eq 'user')
$quote = Invoke-RestMethod "$base/quotes" -Method Post -WebSession $session -ContentType 'application/json' -Body (@{name='Smoke User';email=$email;message='Smoke test quote';items=@(@{productId='jwei';quantity=1})} | ConvertTo-Json -Depth 4)
Assert-Ok 'quote creation' ($quote.id -gt 0)
try { Invoke-RestMethod "$base/admin/quotes" -WebSession $session | Out-Null; throw 'user accessed admin endpoint' } catch { Assert-Ok 'user denied admin endpoint' ($_.Exception.Response.StatusCode.value__ -eq 403) }
Write-Host 'Smoke test completed.'
