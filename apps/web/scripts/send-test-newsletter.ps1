# PowerShell script to send a test newsletter
# Usage: .\scripts\send-test-newsletter.ps1

# Get admin key from env or use default
$ADMIN_KEY = if ($env:NEWSLETTER_ADMIN_API_KEY) { $env:NEWSLETTER_ADMIN_API_KEY } else { "c740f62b360ec599076181866e5dc4944d22d363e4665a7c4ddfabf947216734" }
$API_URL = if ($env:NEXT_PUBLIC_SITE_URL) { $env:NEXT_PUBLIC_SITE_URL } else { "http://localhost:3000" }

Write-Host "📧 Sending test newsletter..." -ForegroundColor Cyan
Write-Host "API URL: $API_URL" -ForegroundColor Gray
Write-Host ""

$body = @{
    subject = "Test Newsletter - ZephorTech"
    content = "<h2>Hello from ZephorTech!</h2><p>This is a test newsletter to verify the system is working correctly.</p><p>If you received this, everything is set up properly! 🎉</p>"
    previewText = "Testing the newsletter system"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $ADMIN_KEY"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/newsletter/send" -Method Post -Headers $headers -Body $body
    Write-Host "✅ Newsletter sent successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Results:" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error sending newsletter:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host $_.ErrorDetails.Message -ForegroundColor Red
    }
}

