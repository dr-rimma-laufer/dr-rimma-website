# Budget & Costs

## Final Plan: $0/month

| Service | Usage | Cost |
|---------|-------|------|
| Cloudflare Pages | Website hosting | $0 |
| Cloudflare Workers | API | $0 |
| Cloudflare D1 | Database | $0 |
| Cloudflare R2 | Image storage | $0 |
| **Total** | | **$0** |

---

## Free Tier Limits

| Service | Limit | Our Usage | Safe? |
|---------|-------|-----------|-------|
| Pages | Unlimited requests | Website | Yes |
| Workers | 100k req/day | API calls | Yes |
| D1 | 5GB storage | Text content | Yes |
| D1 | 5M reads/day | Page loads | Yes |
| R2 | 10GB storage | Images | Yes |

---

## Repository

**Single repo**: `https://github.com/dr-rimma-laufer/dr-rimma-website`

Contains:
- Next.js website (Cloudflare Pages)
- Admin panel (part of Next.js)
- Worker API (Cloudflare Workers)
- Database schema (Cloudflare D1)

---

## If You Need to Scale

| Need | Solution | Cost |
|------|----------|------|
| More API calls | Workers Paid | $5/mo |
| More storage | R2 Paid | $0.015/GB |
| More DB | D1 Paid | Pay per use |

Unlikely to need paid tier for a medical practice website.

---

## One-Time Costs

| Item | Cost | Notes |
|------|------|-------|
| Domain | ~$15/year | If needed |
| SSL | $0 | Included |

---

## Comparison: What We Saved

| Original Plan | New Plan | Savings |
|---------------|----------|---------|
| Strapi $18/mo | Custom CMS $0 | $18/mo |
| Vercel (org) $20/mo | Cloudflare $0 | $20/mo |
| **$38/mo** | **$0/mo** | **$456/year** |
