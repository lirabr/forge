# Handoff: Forge — Industry Design System Redesign

## Overview
Forge is a workout-logging app: plan a week, log sets during a session, run rest timers, track progress and PRs, browse an exercise library. This handoff moves the visual system from the earlier dark/blue "Forge" theme to the Industry design system — a light, wireframe, blueprint-style system (steel-blue mono accent, square corners, registration-mark corners on cards, Barlow Condensed + Barlow type).

## About the design files
The files bundled here are design references built as interactive HTML prototypes (a Design Component format) — not production code to copy directly. They demonstrate layout, states, and interaction down to the pixel. The task is to recreate these screens in the Forge repo's actual stack (plain HTML/CSS/JS — repo: lirabr/forge), applying the Industry tokens below, not to ship the HTML files as-is.

## Fidelity
High-fidelity. Every screen is a live, stateful prototype (React-backed) with exact colors, type, spacing and interaction — pick onboarding options, log sets, run the rest timer, filter the library, switch kg/lb. Recreate pixel-for-pixel using the target codebase's own JS.

## What changed vs. the previous version
- Ground flipped from dark (#0f1419-family) to light (Industry --color-bg: #f2f2f3).
- Single accent: steel-blue #5980a6 (Industry --color-accent) replaces the old #5b8def blue — this is a mono palette, no second hue.
- Cards, day tiles, PR rows, and the profile card now carry the Industry "blueprint" treatment: 1px hairline border, square corners (no radius), + registration-cross marks at each corner.
- Status/success color (set logged, PR, done) now reads through accent depth (--color-accent-700) and icon/label, not a separate green — staying inside the mono scheme.
- Muscle-group hatches (chest/back/legs/shoulders/arms/core) keep their angle/density differentiation but are now rendered in accent tints on --color-surface, instead of six different hues.
- The PR/session-complete screen fills edge-to-edge with the deep accent field (--color-accent-900), type reversed to paper — this is the system's one sanctioned exception to "no full-color fields," normally reserved for section dividers.
- Buttons/tags/nav use the Industry component classes (.btn-primary, .btn-secondary, .btn-ghost, .tag, .tag-outline) instead of hand-rolled dark buttons.
- Headings: Barlow Condensed (unchanged). Body: Barlow (was Inter).

## Screens / Views
1. Onboarding (4 steps) — goal, experience, equipment, days/week. Progress bar of 4 segments; option cards get accent border + registration marks when selected; "Generate plan" disabled (45% opacity) until all 4 answered.
2. Plan / Week overview — 3-stat band (days done, streak, weekly volume), 4 day-tiles (hatch header + name + status: Queued/Start/Logged), auto-progression note card.
3. Active workout logger — header with elapsed timer + progress bar, exercises with per-set rows; only the current set is editable (weight stepper +/-2.5, tap-to-cycle rep count); logging a set opens the rest timer and advances to the next set.
4. Rest timer — bottom sheet overlay, circular SVG countdown ring in accent, "next up" label, Skip button.
5. Session complete / PR — full accent-900 field, reversed type, volume + sets stats, new-PR cards, next-session preview.
6. Progress — sessions/volume/PR-count stat band, 8-week volume bar chart, PR list, session history list.
7. Exercise library — search field, muscle-group filter chips (horizontal scroll), list of 24 exercises with muscle/equipment tags; empty state when filtered to zero.
8. Exercise detail (modal/sheet) — 16:9 image slot (placeholder, marked for a real photo drop), PR/group/setup stat row, numbered form-cue list.
9. Profile / Settings — plan summary rows, kg/lb segmented toggle, data section, "Build a new plan" destructive-style secondary action.

## Design tokens (Industry system)
- Background: #f2f2f3, Surface (tinted rows/hovers): #e9e9ea, Text: #1d1f20
- Accent (single hue, mono scheme): #5980a6 — ramp 100-900: #eef6ff, #d6ebff, #b5d9fd, #94bce3, #749dc4, #597ea3, #416180, #2c455d, #1d2d3d
- Divider: color-mix(in srgb, #1d1f20 16%, transparent)
- Heading font: Barlow Condensed 600, uppercase for most headings/labels
- Body font: Barlow (400/500)
- Monospace (kickers, meta, stat labels): ui-monospace, Menlo, monospace, letterspaced ~0.06-0.12em, uppercase
- Radius: 0 everywhere (square corners) — the one exception in the base system is pill-shaped filter chips/tags, which the app keeps
- Corner marks: 4x <i class="corner tl/tr/bl/br"> children inside a position:relative wireframe container, drawn by the system's .blueprint CSS — used on cards, day tiles, option cards, the profile card, and (reversed color) the PR cards on the complete screen
- Icons: Lucide, 1.5 stroke weight, no fills
- Elevation: none — the system prefers flat hairline structure over shadows

## Interactions & behavior
- Bottom-bar nav (default) or top tab-bar — tweakable via the navPattern prop.
- Rest length tweakable 30-180s (default 90s) via the restSeconds prop.
- Set logging: tapping the check on the active set logs it, opens the rest timer, and reveals the next set as active; tapping a logged check un-logs it.
- Weight stepper: +/-2.5 per tap; rep count cycles 5 to 12 on tap.
- Unit toggle (kg/lb) converts all displayed weights and stat volumes live.
- Library search and muscle filter chips combine (AND) to filter the 24-exercise catalog; empty state renders when nothing matches.
- Nothing persists between reloads — state resets to the seeded starting scenario (Week 07, Day 3 completed) on refresh.

## State management
Single component state object holding: current screen, onboarding step/answers, profile (goal/experience/equipment/days), active day index, completed days, per-set logged records (weight+reps), rest timer running/seconds-left, workout elapsed seconds, open exercise-detail id, library muscle filter + search text, and weight unit (kg/lb). All derived values (progress %, totals, PR deltas, filtered library) are computed at render time from this state plus the static exercise/day/PR seed data below.

## Static content / seed data
- 24 exercises across 6 muscle groups (chest, back, legs, shoulders, arms, core), each with name, muscle, equipment (gym/home/mixed), description, and 3 form cues.
- 4 training days (Upper A, Lower A, Upper B, Lower B) with fixed exercise lists.
- 5 seeded PRs, 5 seeded history entries, 8 weeks of seeded weekly-volume data for the progress chart.

## Assets
No photography is used. Every exercise thumbnail and the exercise-detail hero fall back to a muscle-group hatch pattern (angle/density coded, single accent hue) — these are marked as placeholders (the detail hero literally labels itself "EXERCISE HERO - 16:9 - DROP IMAGE") and are meant to be swapped for real exercise photography, duotoned in the accent per the Industry .duotone treatment, when available.

## Files in this bundle
- Forge App (Industry).dc.html — the redesigned 9-screen interactive prototype (this is the primary reference — open it in a browser to click through every screen and state).
- Forge App (previous dark theme).dc.html — the prior version, kept for diff/comparison only. Do not build from this one.
- Forge Design System.dc.html — component/token documentation for the previous dark theme (set row, stat tile, timer, chart, nav bars). Superseded by the Industry tokens above for anything color/type-related; still useful for component behavior notes (e.g. set-row states, timer ring math).
- Forge Current UI.dc.html — the existing shipped repo UI recreated at 390px, for comparison against both the old and new designs.
- github.md — records the source repo (lirabr/forge, branch main) and a screen-to-repo-file map for where each screen's current implementation lives.

## Suggested repo location
Add these as a new folder in the repo, e.g. design/industry-redesign/, and open a PR from a branch (e.g. design/industry-system) against main with:
- Title: "Adopt Industry design system for Forge UI"
- Description: summarize the "What changed" section above, link back to this README, and note it's a design reference — implementation in index.html/styles.css/app.js is a separate follow-up PR.
