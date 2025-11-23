# Trigger Use Case Seeding

The bootstrap has been updated to automatically seed use cases if none exist.

## Option 1: Restart Strapi (Recommended)
Simply restart Strapi and it will automatically seed use cases on startup if none exist.

## Option 2: Set Environment Variable
Add to `apps/cms/.env`:
```
SEED_USE_CASES=true
```
Then restart Strapi.

## Option 3: Run via Strapi Console
If Strapi is running, you can trigger seeding via the console:
1. Open Strapi admin
2. Go to Settings → Custom Scripts (if available)
3. Or restart Strapi to trigger auto-seeding

The bootstrap code will now automatically seed use cases if:
- No use cases exist in the database
- The use-cases-data.json file is available

