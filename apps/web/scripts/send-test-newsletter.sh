#!/bin/bash
# Quick script to send a test newsletter
# Usage: ./scripts/send-test-newsletter.sh

# Get admin key from env or use default
ADMIN_KEY="${NEWSLETTER_ADMIN_API_KEY:-c740f62b360ec599076181866e5dc4944d22d363e4665a7c4ddfabf947216734}"
API_URL="${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}"

echo "📧 Sending test newsletter..."
echo "API URL: $API_URL"
echo ""

curl -X POST "$API_URL/api/newsletter/send" \
  -H "Authorization: Bearer $ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Test Newsletter - ZephorTech",
    "content": "<h2>Hello from ZephorTech!</h2><p>This is a test newsletter to verify the system is working correctly.</p><p>If you received this, everything is set up properly! 🎉</p>",
    "previewText": "Testing the newsletter system"
  }' | jq '.'

echo ""
echo "✅ Done! Check the response above."

