# Forge — Adaptive Strength Training

**UI redesign reference:** see [`design/industry-redesign/`](design/industry-redesign/) (Industry design system handoff).

Client-only progressive web app that builds a weekly strength plan from a short onboarding quiz, logs sets in the browser, and fills the next session from the last logged set of each lift.

**Live files:** `index.html` · `logic.js` · `app.js` · `styles.css` · `manifest.json` · `sw.js` · `icon-192.png` · `icon-512.png`

No backend, no build step, no dependencies. Open `index.html` or serve the folder over HTTPS (required for the service worker and “Add to Home Screen”).

```bash
# from the repo root
python3 -m http.server 8080
# then open http://localhost:8080
```

Unit tests (Node 18+):

```bash
node --test tests/iteration1.test.cjs
```

Repo: https://github.com/lirabr/forge

---

## What it does

1. **Onboarding** — goal, experience, equipment, days/week (3–6). Goal changes sets, rep ranges and rest (muscle / strength / fitness / fat-loss).
2. **Plan** — generates a split (full body / upper-lower / PPL-style) and swaps gym lifts for home-friendly substitutes when equipment is `home`. Week number advances when every day is logged.
3. **Workout** — tap a day, log weight × reps (or reps-only / seconds for bodyweight and timed work). Suggested load is the last logged set of that lift, else a per-lift seed.
4. **Progress** — workout count, weighted volume (kg), PR list, 8-week volume bars. Day streak is consecutive calendar days with a session.
5. **Library** — 24 exercises with muscle filter, search, description, and form cues.
6. **Profile** — kg/lb, JSON export/import of `forge_state`, rebuild plan (keeps history, PRs, last-session loads).

State lives in `localStorage` under the key `forge_state`. Clearing site data resets the plan unless you imported a backup.

---

## Architecture

```
index.html     screens + views (onboarding, plan, workout, progress, library, profile) + modal
logic.js       catalog, splits, goal schemes, last-session fill, streak, week wrap, backup parse
app.js         persistence and UI
styles.css     Industry (light) theme, mobile-first, CSS variables
manifest.json  PWA name, standalone display, theme #5980a6
sw.js          cache-first service worker (forge-v3)
```

### Screens and views

Two top-level screens (`#onboarding`, `#dashboard`). Dashboard has five views toggled by the bottom nav:

| View | DOM id | Role |
| --- | --- | --- |
| Plan | `#view-plan` | Week cards; start a session |
| Workout | `#view-workout` | Active session set logger + rest timer |
| Progress | `#view-progress` | Stats, last 10 sessions, PRs |
| Library | `#view-library` | Catalog + modal |
| Profile | `#view-profile` | Units, backup, rebuild plan |

`showScreen()` / `showView()` flip `.active` classes. Init on `DOMContentLoaded` restores a saved profile or shows onboarding.

### Data model (`logic.js`)

**`EXERCISES`** — 24 movements. Each has `id`, `name`, `muscle` (`chest|back|legs|shoulders|arms|core`), `equipment` (`gym|home|mixed`), `kind` (`weight|reps|timed`), `desc`, `cues[]`.

**`SPLITS`** — keyed by days per week:

| Days | Split |
| --- | --- |
| 3 | Full Body A / B / C |
| 4 | Upper A, Lower A, Upper B, Lower B |
| 5 | Push, Pull, Legs, Upper, Lower + Core |
| 6 | Push A, Pull A, Legs A, Push B, Pull B, Legs B |

**`HOME_SUBS`** — maps barbell/machine ids to bodyweight or dumbbell variants (`bp` → `pushup`, `squat` → `goblet`, …). Applied only when `profile.equipment === 'home'`. Duplicates after substitution are removed with `Set`.

**`state`**

```js
{
  profile: { goal, experience, equipment, days } | null,
  plan: [{ index, name, focus, completed, exercises: [...] }] | null,
  currentDayIndex: 0,
  weekNumber: 1,
  history: [{ date, name, focus, volume, dayIndex, sets, exercises }],
  prs: { [exerciseId]: { kind, weight, reps, seconds, date, name } },
  lastSets: { [exerciseId]: { kind, weight, reps, seconds, date } },
  activeWorkout: { dayIndex, name, focus, exercises: [{ sets: [{ weight, reps, seconds, done }] }] } | null,
  unit: 'kg' | 'lb',
  restSeconds: 45 | 90 | 150
}
```

`loadState()` / `saveState()` JSON-serialize the whole object. Profile → Export backup / Import backup.

---

## Plan generation

`generatePlan(profile)` in `logic.js`:

1. Clone `SPLITS[days]` (fallback: 4-day).
2. If home, remap exercise ids through `HOME_SUBS` and dedupe.
3. Apply set/rep/rest from **goal × experience**. Seeds are **per lift**, not a single start weight.

| Goal | Rest | Intermediate scheme |
| --- | --- | --- |
| Muscle | 90s | 4 × 8–12 |
| Strength | 150s | 4 × 4–6 (advanced: 5 × 3–5) |
| Fat loss | 45s | 3 × 10–12 |
| Fitness | 90s | 3 × 6–10 |

Bodyweight lifts (`pushup`, `pullup`, `hanging`) log reps only. Planks log seconds.

---

## Workout loop and last-session fill

- `startWorkout(dayIndex)` builds `activeWorkout` with one row per target set. Re-tapping the same day resumes.
- Suggested load = last logged working set of that lift (`state.lastSets`). Else the per-lift seed for experience.
- Finish is enabled as soon as **any** set is checked.
- `finishWorkout()`:
  - volume = Σ (weight × reps) for **weighted** checked sets only
  - PR if heavier / more reps / longer hold depending on kind
  - prepends history (including per-set payloads)
  - if this finish completes every remaining day: reset `completed` flags, increment `weekNumber`, start at day 0
  - otherwise advance to the next incomplete day
  - writes `lastSets` for next time

Reset plan (`#reset-plan`) clears profile/plan/active workout but **keeps** `history`, `prs`, and `lastSets`.

---

## PWA

- Manifest: standalone, portrait, paper background `#f2f2f3`, theme `#5980a6`.
- Service worker caches local assets on install, deletes old caches on activate, cache-first on fetch with a fallback to `index.html`.
- Registered from `app.js` on `window.load`.
- Bump `CACHE_NAME` in `sw.js` (`forge-v3` → `forge-v4`) after shipping asset changes, or users will keep stale JS/CSS.

Install: Chrome/Edge → Install app, or iOS Safari → Share → Add to Home Screen.

---

## Limitations (useful if you are extending it)

- Single-user, device-local. Backup is JSON export/import, not cloud sync.
- Mixed equipment still uses the gym template as-is (no hybrid substitution).
- No double-progression / deload yet — last session is copied, not auto-incremented.
- No set tags (warmup / drop / fail), RPE, or plate calculator.
- Service worker is cache-first; stale-client bugs are expected until the cache name changes.

---

## Suggested next work

1. Gym-floor logger: last-session ghost numbers, set tags, rest picker, plate math.
2. Double progression with a “why this weight” line (hit top of range → +2.5 kg; miss twice → deload).
3. Per-exercise charts + weekly sets/muscle heatmap.
4. Shareable session recap card.

---

## License

Not specified in the repo. Confirm with `@lirabr` before redistributing.
