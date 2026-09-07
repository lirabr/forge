# Forge — Adaptive Strength Training

**UI redesign reference:** see [`design/industry-redesign/`](design/industry-redesign/) (Industry design system handoff).

Client-only progressive web app that builds a weekly strength plan from a short onboarding quiz, logs sets in the browser, and auto-progresses suggested weights from personal records.

**Live files:** `index.html` · `app.js` · `styles.css` · `manifest.json` · `sw.js` · `icon-192.png` · `icon-512.png`

No backend, no build step, no dependencies. Open `index.html` or serve the folder over HTTPS (required for the service worker and “Add to Home Screen”).

```bash
# from the repo root
python3 -m http.server 8080
# then open http://localhost:8080
```

Repo: https://github.com/lirabr/forge

---

## What it does

1. **Onboarding** — goal, experience, equipment, days/week (3–6).
2. **Plan** — generates a split (full body / upper-lower / PPL-style) and swaps gym lifts for home-friendly substitutes when equipment is `home`.
3. **Workout** — tap a day, log weight × reps × done per set, finish to write history + PRs.
4. **Progress** — workout count, total volume (kg), PR list.
5. **Library** — 24 exercises with muscle filter, search, description, and form cues.

State lives in `localStorage` under the key `forge_state`. Clearing site data resets the plan.

---

## Architecture

```
index.html     screens + views (onboarding, plan, workout, progress, library) + modal
app.js         exercise catalog, splits, plan generator, persistence, UI
styles.css     dark theme, mobile-first, CSS variables
manifest.json  PWA name, standalone display, theme #5b8def
sw.js          cache-first service worker (forge-v1)
```

### Screens and views

Two top-level screens (`#onboarding`, `#dashboard`). Dashboard has four views toggled by the top nav:

| View | DOM id | Role |
| --- | --- | --- |
| Plan | `#view-plan` | Week cards; start a session; reset plan |
| Workout | `#view-workout` | Active session set logger |
| Progress | `#view-progress` | Stats, last 10 sessions, PRs |
| Library | `#view-library` | Catalog + modal |

`showScreen()` / `showView()` flip `.active` classes. Init on `DOMContentLoaded` restores a saved profile or shows onboarding.

### Data model (`app.js`)

**`EXERCISES`** — 24 movements. Each has `id`, `name`, `muscle` (`chest|back|legs|shoulders|arms|core`), `equipment` (`gym|home|mixed`), `desc`, `cues[]`.

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
  history: [{ date, name, focus, volume, dayIndex }],
  prs: { [exerciseId]: { weight, reps, date, name } },
  activeWorkout: { dayIndex, name, focus, exercises: [{ sets: [{ weight, reps, done }] }] } | null
}
```

`loadState()` / `saveState()` JSON-serialize the whole object.

---

## Plan generation

`generatePlan(profile)`:

1. Clone `SPLITS[days]` (fallback: 4-day).
2. If home, remap exercise ids through `HOME_SUBS` and dedupe.
3. Apply set/rep/start-weight scheme from experience:

| Experience | Sets | Target reps | Seed weight |
| --- | --- | --- | --- |
| Beginner | 3 | 8–12 | 20 kg |
| Intermediate | 3 | 6–10 | 40 kg |
| Advanced | 4 | 5–8 | 60 kg |

Goal (`muscle`, `strength`, `fitness`, `fatloss`) is stored on the profile and shown in the plan title. It does **not** currently change exercise selection or volume — that is the main product gap if you want the plan to feel “adaptive” to the goal.

---

## Workout loop and progression

- `startWorkout(dayIndex)` builds `activeWorkout` with one row per target set.
- Suggested weight = last PR × **1.025** (~2.5%), else the seed weight from the scheme. Same seed is used for every lift of that experience level (bench and squat start at the same number).
- Finish is enabled as soon as **any** set is checked.
- `finishWorkout()`:
  - marks the day `completed`
  - volume = Σ (weight × reps) for checked sets with weight and reps
  - PR if heavier, or same weight with more reps
  - prepends history
  - advances `currentDayIndex` to the next incomplete day, or wraps the week
  - clears `activeWorkout`

Reset plan (`#reset-plan`) clears profile/plan/active workout but **keeps** `history` and `prs`.

---

## PWA

- Manifest: standalone, portrait, dark background `#0f1115`, theme `#5b8def`.
- Service worker caches the seven local assets on install, deletes old caches on activate, cache-first on fetch with a fallback to `index.html`.
- Registered from `app.js` on `window.load`.
- Bump `CACHE_NAME` in `sw.js` (`forge-v1` → `forge-v2`) after shipping asset changes, or users will keep stale JS/CSS.

Install: Chrome/Edge → Install app, or iOS Safari → Share → Add to Home Screen.

---

## Limitations (useful if you are extending it)

- Single-user, device-local. No account, sync, or export.
- Goal does not change programming; only experience + equipment + days do.
- Starting weights are not lift-specific and ignore bodyweight movements (push-ups still get a kg field).
- No rest timer, RPE, warmup sets, or deload logic.
- Week completion does not reset `day.completed` flags — after a full cycle the next wrap still works via modulo, but cards stay marked complete.
- `mixed` equipment uses the gym template as-is (no hybrid substitution).
- Volume unit is labeled kg with no unit toggle.
- Service worker is cache-first; stale-client bugs are expected until the cache name changes.

---

## Suggested next work

If you are collaborating on this repo, high-leverage follow-ups:

1. Use `profile.goal` in `generatePlan` (hypertrophy volume vs strength intensity vs fat-loss density).
2. Per-exercise default loads and a bodyweight path (reps-only, no kg).
3. Reset `completed` when wrapping a new week; keep a week counter.
4. Export / import `forge_state` JSON.
5. Bump SW cache on release; consider network-first for `app.js`.

---

## License

Not specified in the repo. Confirm with `@lirabr` before redistributing.
