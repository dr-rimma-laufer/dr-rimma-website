# Working Protocols

> These protocols ensure project continuity even if AI sessions are interrupted.

## File Structure (Designed to Stay Small)

```
.project/
├── STATUS.md           # TINY - Current state only (~30 lines max)
├── ARCHITECTURE.md     # Medium - System design (read once)
├── PROTOCOLS.md        # Medium - This file (read once)
├── BUDGET.md           # Small - Costs (read when needed)
├── logs/
│   ├── phase-0.md      # Detailed log for Phase 0
│   ├── phase-1.md      # Detailed log for Phase 1
│   └── ...             # One file per phase
└── archive/
    └── old-logs.md     # Archived old content (rarely read)
```

### Why This Structure?
- **STATUS.md** = Always small, AI reads this first
- **Phase logs** = Details stay in separate files
- **Archive** = Old stuff moved here, not deleted
- **AI only reads what's needed** for current task

---

## Golden Rules

1. **STATUS.md stays under 40 lines** - Current state ONLY
2. **Detailed logs go in logs/phase-X.md**
3. **Archive old phases** when complete
4. **Commit often** - Small, atomic commits

---

## For AI Assistants

### On Session Start (2 minutes max)
```
1. Read STATUS.md (tiny file)
2. Note the current phase number
3. Read logs/phase-{current}.md
4. Run: git status
5. Start working
```

### During Work
```
1. Update logs/phase-X.md with details
2. Update STATUS.md only if state changes:
   - Phase changed
   - Task changed
   - Blocker changed
3. Commit after each task
```

### On Phase Completion
```
1. Mark phase complete in logs/phase-X.md
2. Move to archive/ if needed
3. Create logs/phase-{X+1}.md
4. Update STATUS.md with new phase
5. Git tag: phase-X-complete
```

---

## File Size Limits

| File | Max Lines | Action if Exceeded |
|------|-----------|-------------------|
| STATUS.md | 40 | Trim old sprint tasks |
| logs/phase-X.md | 200 | Split or summarize |
| ARCHITECTURE.md | 300 | Move details to separate docs |

### How to Trim STATUS.md
Keep only:
- Current phase
- Current task (1 line)
- Current blocker (if any)
- Current sprint tasks (max 5)
- Git state
- Quick links

Remove:
- Completed tasks (move to phase log)
- Old notes
- Explanations

---

## Commit Message Format (Short)
```
[P0] Created orchestration system
[P1] Setup Next.js project
[P2] Add HeroSection component
[P6] Migrate About page
```

Format: `[P{phase}] {action}`

---

## Resumption Protocol

### For a New AI Session
```
1. Read STATUS.md (30 seconds)
2. Read current phase log (1 minute)
3. Check git status
4. Continue from STATUS.md "Next Action"
```

### If Confused
1. Stop
2. Read STATUS.md again
3. Ask user one clear question
4. Document answer in phase log

---

## Archive Protocol

When a phase is complete:
```
1. Summarize phase in 10 lines at top of log
2. Create new phase log
3. Update STATUS.md
4. Old detailed logs stay in logs/ (don't delete)
5. Only move to archive/ if logs/ gets cluttered (10+ files)
```

---

## Quick Reference

| I need to... | Read this file |
|--------------|----------------|
| Know current state | STATUS.md |
| Understand the system | ARCHITECTURE.md |
| Know how to work | PROTOCOLS.md (this) |
| See detailed history | logs/phase-X.md |
| Check costs | BUDGET.md |
