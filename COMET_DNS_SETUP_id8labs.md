# COMET Instructions: Configure DNS for id8labs.app

## Objective
Configure DNS records for id8labs.app to point to Vercel hosting.

## Background
- Domain: id8labs.app
- Current nameservers: dns1.registrar-servers.com, dns2.registrar-servers.com
- Target: Vercel hosting
- Required A record: 76.76.21.21

## Step-by-Step Instructions

### Step 1: Identify Domain Registrar
1. Go to https://lookup.icann.org/en/lookup
2. Search for "id8labs.app"
3. Note the registrar name (likely where domain was purchased)
4. Common registrars: Namecheap, GoDaddy, Google Domains, Cloudflare

**Report back:** "The registrar for id8labs.app is [REGISTRAR NAME]"

### Step 2: Access DNS Management
1. Go to the registrar's website
2. Log in to the account
3. Navigate to domain management or DNS settings
4. Find id8labs.app in the domain list
5. Look for "DNS Settings", "DNS Management", or "Advanced DNS"

**Report back:** "I'm at the DNS management page for id8labs.app"

### Step 3: Check Current DNS Records
1. Look for existing A records, CNAME records, or other records for id8labs.app
2. Take note of what exists

**Report back:** "Current DNS records: [LIST ALL RECORDS]"

### Step 4: Add Vercel A Record
1. Look for "Add Record" or "Add New Record" button
2. Create a new A record with these exact values:
   - **Type:** A
   - **Host/Name:** @ (or leave blank, or "id8labs.app" depending on interface)
   - **Value/Points to:** 76.76.21.21
   - **TTL:** Auto or 3600 (1 hour)

**Report back:** "A record added: @ -> 76.76.21.21"

### Step 5: Add www Subdomain (Optional but Recommended)
1. Add another A record for www subdomain:
   - **Type:** A
   - **Host/Name:** www
   - **Value/Points to:** 76.76.21.21
   - **TTL:** Auto or 3600

**Report back:** "www A record added: www -> 76.76.21.21"

### Step 6: Remove Conflicting Records
1. Check if there are any conflicting records:
   - Other A records pointing to different IPs
   - CNAME records for @ (root domain)
2. If found, delete or disable them

**Report back:** "Removed conflicting records: [DETAILS or 'None found']"

### Step 7: Save Changes
1. Look for "Save", "Save Changes", or "Update" button
2. Click to save the DNS configuration
3. Some registrars require confirmation - confirm if prompted

**Report back:** "DNS changes saved successfully"

### Step 8: Verify DNS Propagation
1. Go to https://dnschecker.org
2. Enter "id8labs.app" in the search box
3. Select "A" record type
4. Click "Search"
5. Check if 76.76.21.21 appears in results (may take a few minutes)

**Report back:** "DNS propagation status: [describe what you see - how many locations show 76.76.21.21]"

### Step 9: Test Domain
1. Wait 2-3 minutes after saving
2. Open a new tab
3. Go to https://id8labs.app
4. Check if the site loads

**Report back:** "Site test: [Success - site loads] OR [Still propagating - shows error]"

## Important Notes
- DNS changes can take 5 minutes to 48 hours to propagate fully
- Most changes are visible within 15-30 minutes
- Don't worry if it doesn't work immediately
- Vercel will automatically issue an SSL certificate once DNS is configured

## Expected Result
After completing these steps, id8labs.app should:
1. Point to Vercel's servers (76.76.21.21)
2. Load the id8Labs website with the refined design
3. Show signature orange "id8" branding
4. Display all pages including essays section

## Troubleshooting

### If the domain doesn't resolve after 30 minutes:
1. Double-check the A record is exactly: 76.76.21.21
2. Make sure Host/Name is @ or blank (for root domain)
3. Check there are no CNAME records conflicting with A records
4. Clear your browser cache and try incognito/private mode

### If you see SSL/certificate warnings:
- This is normal initially
- Vercel needs to detect the DNS change first
- Wait 10-15 minutes and refresh

## Summary for Human
After COMET completes these steps, tell the human:
"DNS configuration complete for id8labs.app. The domain is now pointing to Vercel (76.76.21.21). DNS propagation typically takes 15-30 minutes. The site should be live at https://id8labs.app shortly with automatic SSL."
