'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const L = require('../logic.js');

test('goal changes sets, reps and rest', () => {
  const muscle = L.generatePlan({ goal: 'muscle', experience: 'intermediate', equipment: 'gym', days: '4' });
  const strength = L.generatePlan({ goal: 'strength', experience: 'advanced', equipment: 'gym', days: '4' });
  const fatloss = L.generatePlan({ goal: 'fatloss', experience: 'beginner', equipment: 'gym', days: '4' });
  const fitness = L.generatePlan({ goal: 'fitness', experience: 'intermediate', equipment: 'gym', days: '4' });

  assert.equal(muscle[0].exercises[0].targetSets, 4);
  assert.equal(muscle[0].exercises[0].targetReps, '8-12');
  assert.equal(L.restForGoal('muscle'), 90);

  assert.equal(strength[0].exercises[0].targetSets, 5);
  assert.equal(strength[0].exercises[0].targetReps, '3-5');
  assert.equal(L.restForGoal('strength'), 150);

  assert.equal(fatloss[0].exercises[0].targetSets, 3);
  assert.equal(fatloss[0].exercises[0].targetReps, '10-15');
  assert.equal(L.restForGoal('fatloss'), 45);

  assert.equal(fitness[0].exercises[0].targetSets, 3);
  assert.equal(fitness[0].exercises[0].targetReps, '6-10');
});

test('per-lift seeds differ and bodyweight lifts have no kg', () => {
  const plan = L.generatePlan({ goal: 'muscle', experience: 'intermediate', equipment: 'gym', days: '4' });
  const squat = plan[1].exercises.find((e) => e.id === 'squat');
  const curl = plan[0].exercises.find((e) => e.id === 'curl');
  const plank = plan[1].exercises.find((e) => e.id === 'plank');
  assert.ok(squat.suggestedWeight > curl.suggestedWeight);
  assert.equal(squat.kind, 'weight');
  assert.equal(plank.kind, 'timed');
  assert.equal(plank.suggestedWeight, 0);
  assert.match(plank.targetReps, /\d+-\d+/);

  const home = L.generatePlan({ goal: 'muscle', experience: 'beginner', equipment: 'home', days: '3' });
  const push = home.flatMap((d) => d.exercises).find((e) => e.id === 'pushup');
  assert.ok(push);
  assert.equal(push.kind, 'reps');
  assert.equal(push.suggestedWeight, 0);
});

test('last session fill beats seed', () => {
  const ex = { id: 'bp', kind: 'weight', targetReps: '8-12' };
  const seed = L.suggestedLoad(ex, {}, 'intermediate');
  assert.equal(seed.weight, 60);
  assert.equal(seed.reps, 8);
  const last = L.suggestedLoad(ex, { bp: { kind: 'weight', weight: 72.5, reps: 9 } }, 'intermediate');
  assert.equal(last.weight, 72.5);
  assert.equal(last.reps, 9);

  const push = L.suggestedLoad(
    { id: 'pushup', kind: 'reps', targetReps: '8-12' },
    { pushup: { kind: 'reps', reps: 18 } },
    'beginner'
  );
  assert.equal(push.weight, 0);
  assert.equal(push.reps, 18);

  const plank = L.suggestedLoad(
    { id: 'plank', kind: 'timed', targetReps: '30-60' },
    { plank: { kind: 'timed', seconds: 50 } },
    'intermediate'
  );
  assert.equal(plank.seconds, 50);
});

test('week wrap resets tiles and increments week number', () => {
  const plan = L.generatePlan({ goal: 'fitness', experience: 'beginner', equipment: 'gym', days: '3' });
  plan[0].completed = true;
  plan[1].completed = true;
  const wrap = L.applySessionCompletion(plan, 2, 1);
  assert.equal(wrap.wrapped, true);
  assert.equal(wrap.weekNumber, 2);
  assert.equal(wrap.currentDayIndex, 0);
  assert.ok(wrap.plan.every((d) => d.completed === false));

  const redo = L.applySessionCompletion(wrap.plan.map((d, i) => (i === 0 ? { ...d, completed: true } : d)), 0, 2);
  assert.equal(redo.wrapped, false);
  assert.equal(redo.weekNumber, 2);
});

test('day streak is consecutive calendar days with a 1-day grace', () => {
  assert.equal(L.computeDayStreak([], '2026-09-07'), 0);
  assert.equal(
    L.computeDayStreak([{ date: '2026-09-07' }, { date: '2026-09-06' }], '2026-09-07'),
    2
  );
  assert.equal(
    L.computeDayStreak([{ date: '2026-09-06' }], '2026-09-07'),
    1
  );
  assert.equal(
    L.computeDayStreak([{ date: '2026-09-04' }], '2026-09-07'),
    0
  );
  assert.equal(
    L.computeDayStreak(
      [{ date: '2026-09-07' }, { date: '2026-09-07' }, { date: '2026-09-06' }, { date: '2026-09-05' }],
      '2026-09-07'
    ),
    3
  );
});

test('export / import round-trips and rejects junk', () => {
  const raw = {
    profile: { goal: 'muscle', experience: 'intermediate', equipment: 'gym', days: '4' },
    history: [{ date: '2026-09-07', volume: 1000 }],
    prs: { bp: { weight: 60, reps: 8, kind: 'weight' } },
    lastSets: { bp: { kind: 'weight', weight: 60, reps: 8 } },
    weekNumber: 3,
    unit: 'lb',
  };
  const parsed = L.parseBackup(JSON.stringify(raw));
  assert.equal(parsed.weekNumber, 3);
  assert.equal(parsed.unit, 'lb');
  assert.equal(parsed.history[0].volume, 1000);
  assert.equal(parsed.lastSets.bp.weight, 60);
  assert.equal(parsed.plan, null);
  assert.throws(() => L.parseBackup('{"hello":1}'), /Not a Forge backup/);
  assert.throws(() => L.parseBackup('[]'), /Not a Forge backup/);
});

test('volume ignores bodyweight and timed sets', () => {
  const stats = L.sessionStats([
    {
      id: 'bp', name: 'Bench', kind: 'weight',
      sets: [
        { weight: 60, reps: 8, done: true },
        { weight: 60, reps: 8, done: false },
      ],
    },
    {
      id: 'pushup', name: 'Push-Up', kind: 'reps',
      sets: [{ weight: 0, reps: 12, done: true }],
    },
    {
      id: 'plank', name: 'Plank', kind: 'timed',
      sets: [{ seconds: 45, done: true }],
    },
  ]);
  assert.equal(stats.volume, 480);
  assert.equal(stats.setsLogged, 3);
  assert.equal(stats.lastSets.bp.weight, 60);
  assert.equal(stats.lastSets.pushup.reps, 12);
  assert.equal(stats.lastSets.plank.seconds, 45);
  assert.equal(stats.prCandidates.length, 3);
});

test('week volume uses local dates, not a history slice fallback', () => {
  const hist = [
    { date: '2026-09-07', volume: 100 },
    { date: '2026-08-01', volume: 9999 },
  ];
  assert.equal(L.weekVolume(hist, '2026-09-07', 7), 100);
});

test('home substitutions still swap gym lifts', () => {
  const home = L.generatePlan({ goal: 'muscle', experience: 'beginner', equipment: 'home', days: '4' });
  const ids = home.flatMap((d) => d.exercises.map((e) => e.id));
  assert.ok(!ids.includes('bp'));
  assert.ok(ids.includes('pushup'));
});
