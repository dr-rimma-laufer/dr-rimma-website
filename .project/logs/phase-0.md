# Phase 0: Planning & Architecture

## Summary
Setting up project orchestration, architecture decisions, and getting user approval.

## Timeline
- Started: 2026-01-12
- Completed: Pending

## Decisions Made
1. **Backend**: Strapi Cloud (free tier) - chosen because staff will edit content
2. **Frontend**: Next.js on Vercel (free tier)
3. **Design approach**: Fix inconsistencies during migration

## Tasks Log

### 2026-01-12

#### Session 1 (Claude)
- [x] Analyzed current Vite project structure
- [x] Fixed base64 images → converted to binary JPG (61 files)
- [x] Updated all component imports
- [x] Created orchestration system:
  - STATUS.md (small, current state only)
  - ARCHITECTURE.md (system design)
  - PROTOCOLS.md (how to work)
  - BUDGET.md (costs)
  - logs/phase-X.md (detailed logs per phase)
- [ ] User approval of architecture
- [ ] User creates Strapi Cloud account

## Files Changed
```
src/assets/*.jpg                    - Converted from base64
src/components/**/*.tsx             - Updated imports
.project/STATUS.md                  - Created
.project/ARCHITECTURE.md            - Created
.project/PROTOCOLS.md               - Created
.project/BUDGET.md                  - Created
.project/logs/phase-0.md            - Created (this file)
```

## Notes
- Current Vite site has 166MB of images
- Figma Make created inconsistent hero heights
- Need global component system in Next.js
