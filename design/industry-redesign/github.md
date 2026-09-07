repo: lirabr/forge
branch: main

## Last sync

date: 2026-09-06T18:22:00Z

### Updated in this project

- Recreated the existing five views + modal at 390px from `index.html`, `styles.css` and `app.js`.
- Built a dark-ground design system: accent ramp on the repo's `#5b8def`, Barlow Condensed + Inter, square corners with registration marks, Lucide at 1.5 stroke.
- Added a muscle-group hatch system so the six `EXERCISES` groups read apart without new hues.
- Built an interactive 9-screen prototype including the rest timer, completion/PR moment and profile screens the repo lacks.

## Screen map

| Project screen | Repo source |
| --- | --- |
| Forge Current UI — all five views + modal | `index.html`, `styles.css` |
| Forge Design System — tokens | `styles.css` (`:root`), `manifest.json` theme |
| Forge App — Onboarding | `index.html` `#onboarding`, `app.js` `initOnboarding` |
| Forge App — Plan | `index.html` `#view-plan`, `app.js` `SPLITS`, `generatePlan`, `renderDashboard` |
| Forge App — Workout | `index.html` `#view-workout`, `app.js` `startWorkout`, `renderActiveWorkout`, `getSuggestedWeight` |
| Forge App — Rest timer | new (not in repo) |
| Forge App — Complete / PR | `app.js` `finishWorkout` (replaces the `alert()`) |
| Forge App — Progress | `index.html` `#view-progress`, `app.js` `renderProgress` |
| Forge App — Library + detail | `index.html` `#view-library`, `#modal`, `app.js` `EXERCISES`, `renderLibrary`, `openExerciseModal` |
| Forge App — Profile | new (not in repo); reads `state.profile`, `#reset-plan` |
