/* Forge programming + log helpers. No DOM.
   Loaded as a classic script (sets global ForgeLogic) and as a Node module. */
(function (root) {
  const REST_SECONDS = 90;

  const EXERCISES = [
    { id: 'bp', name: 'Barbell Bench Press', muscle: 'chest', equipment: 'gym', kind: 'weight',
      desc: 'Classic horizontal pressing movement for chest, shoulders and triceps.',
      cues: ['Retract scapula and keep feet planted', 'Lower bar to mid-chest with control', 'Press up explosively without bouncing'] },
    { id: 'dbp', name: 'Dumbbell Bench Press', muscle: 'chest', equipment: 'mixed', kind: 'weight',
      desc: 'Allows greater range of motion and independent arm work.',
      cues: ['Keep wrists stacked over elbows', 'Lower until slight stretch in chest', 'Press up and slightly inward'] },
    { id: 'pushup', name: 'Push-Up', muscle: 'chest', equipment: 'home', kind: 'reps',
      desc: 'Bodyweight staple that builds pressing strength anywhere.',
      cues: ['Body in a straight line from head to heels', 'Elbows ~45° from torso', 'Full lockout at the top'] },
    { id: 'ohp', name: 'Overhead Press', muscle: 'shoulders', equipment: 'gym', kind: 'weight',
      desc: 'Vertical press for shoulder strength and stability.',
      cues: ['Brace core hard', 'Bar path close to face', 'Lock out overhead with head through'] },
    { id: 'db-ohp', name: 'Dumbbell Shoulder Press', muscle: 'shoulders', equipment: 'mixed', kind: 'weight',
      desc: 'Seated or standing dumbbell press for balanced shoulder development.',
      cues: ['Start with dumbbells at shoulder height', 'Press up without excessive lean', 'Control the descent'] },
    { id: 'latpd', name: 'Lat Pulldown', muscle: 'back', equipment: 'gym', kind: 'weight',
      desc: 'Vertical pulling for lats and upper back.',
      cues: ['Pull elbows down and back', 'Slight lean back at bottom', 'Control the stretch at the top'] },
    { id: 'pullup', name: 'Pull-Up', muscle: 'back', equipment: 'mixed', kind: 'reps',
      desc: 'King of bodyweight pulling movements.',
      cues: ['Full hang to start', 'Pull chest to bar', 'Avoid kipping unless training for it'] },
    { id: 'row', name: 'Barbell Row', muscle: 'back', equipment: 'gym', kind: 'weight',
      desc: 'Horizontal pull for thickness and posture.',
      cues: ['Hinge at hips, flat back', 'Pull bar to lower chest/upper abs', 'Squeeze shoulder blades'] },
    { id: 'db-row', name: 'Dumbbell Row', muscle: 'back', equipment: 'mixed', kind: 'weight',
      desc: 'Unilateral row that fixes imbalances.',
      cues: ['Support on bench', 'Pull elbow high', 'Keep torso stable'] },
    { id: 'squat', name: 'Barbell Back Squat', muscle: 'legs', equipment: 'gym', kind: 'weight',
      desc: 'Fundamental lower-body strength builder.',
      cues: ['Brace before unrack', 'Break at hips and knees together', 'Drive through mid-foot'] },
    { id: 'goblet', name: 'Goblet Squat', muscle: 'legs', equipment: 'mixed', kind: 'weight',
      desc: 'Great teaching tool and home-friendly squat variation.',
      cues: ['Hold weight at chest', 'Elbows inside knees at bottom', 'Upright torso'] },
    { id: 'rdl', name: 'Romanian Deadlift', muscle: 'legs', equipment: 'gym', kind: 'weight',
      desc: 'Posterior chain focus — hamstrings and glutes.',
      cues: ['Soft knee bend', 'Push hips back', 'Feel stretch in hamstrings'] },
    { id: 'lunges', name: 'Walking Lunges', muscle: 'legs', equipment: 'mixed', kind: 'weight',
      desc: 'Unilateral leg work for strength and balance.',
      cues: ['Long enough step', 'Front knee tracks over mid-foot', 'Upright torso'] },
    { id: 'legpress', name: 'Leg Press', muscle: 'legs', equipment: 'gym', kind: 'weight',
      desc: 'Machine-based quad and glute builder.',
      cues: ['Feet mid-platform', 'Lower with control', 'Do not lock knees hard'] },
    { id: 'curl', name: 'Barbell Curl', muscle: 'arms', equipment: 'gym', kind: 'weight',
      desc: 'Classic biceps builder.',
      cues: ['Elbows pinned to sides', 'No swinging', 'Full stretch at bottom'] },
    { id: 'db-curl', name: 'Dumbbell Curl', muscle: 'arms', equipment: 'mixed', kind: 'weight',
      desc: 'Allows natural wrist rotation (supination).',
      cues: ['Start neutral or supinated', 'Control the eccentric', 'Squeeze at top'] },
    { id: 'triceps', name: 'Triceps Pushdown', muscle: 'arms', equipment: 'gym', kind: 'weight',
      desc: 'Isolation for the triceps.',
      cues: ['Elbows fixed at sides', 'Full extension', 'Control the return'] },
    { id: 'oh-ext', name: 'Overhead Triceps Extension', muscle: 'arms', equipment: 'mixed', kind: 'weight',
      desc: 'Stretches the long head of the triceps.',
      cues: ['Keep elbows pointed up', 'Lower behind head', 'Extend fully'] },
    { id: 'plank', name: 'Plank', muscle: 'core', equipment: 'home', kind: 'timed',
      desc: 'Isometric core stability.',
      cues: ['Neutral spine', 'Squeeze glutes', 'Breathe steadily'] },
    { id: 'crunch', name: 'Cable Crunch', muscle: 'core', equipment: 'gym', kind: 'weight',
      desc: 'Loaded spinal flexion for abs.',
      cues: ['Round the spine intentionally', 'Pull with abs not arms', 'Controlled tempo'] },
    { id: 'hanging', name: 'Hanging Knee Raise', muscle: 'core', equipment: 'mixed', kind: 'reps',
      desc: 'Dynamic core and hip flexor work.',
      cues: ['Avoid swinging', 'Raise knees to chest', 'Control the lower'] },
    { id: 'facepull', name: 'Face Pull', muscle: 'shoulders', equipment: 'gym', kind: 'weight',
      desc: 'Rear delt and external rotation health movement.',
      cues: ['Pull to face/forehead', 'Externally rotate at end', 'Squeeze rear delts'] },
    { id: 'latraise', name: 'Lateral Raise', muscle: 'shoulders', equipment: 'mixed', kind: 'weight',
      desc: 'Isolation for the side delts.',
      cues: ['Slight elbow bend', 'Lead with elbows', 'Stop at shoulder height'] },
    { id: 'hipthrust', name: 'Hip Thrust', muscle: 'legs', equipment: 'gym', kind: 'weight',
      desc: 'Glute-focused hip extension.',
      cues: ['Chin tucked', 'Drive through heels', 'Full hip extension and squeeze'] },
  ];

  const SPLITS = {
    3: [
      { name: 'Full Body A', focus: 'Full Body', exercises: ['squat', 'bp', 'row', 'ohp', 'curl', 'plank'] },
      { name: 'Full Body B', focus: 'Full Body', exercises: ['rdl', 'dbp', 'latpd', 'db-ohp', 'triceps', 'hanging'] },
      { name: 'Full Body C', focus: 'Full Body', exercises: ['goblet', 'pushup', 'db-row', 'latraise', 'db-curl', 'plank'] },
    ],
    4: [
      { name: 'Upper A', focus: 'Upper Body', exercises: ['bp', 'row', 'ohp', 'latpd', 'curl', 'triceps'] },
      { name: 'Lower A', focus: 'Lower Body', exercises: ['squat', 'rdl', 'legpress', 'lunges', 'plank'] },
      { name: 'Upper B', focus: 'Upper Body', exercises: ['dbp', 'db-row', 'db-ohp', 'facepull', 'db-curl', 'oh-ext'] },
      { name: 'Lower B', focus: 'Lower Body', exercises: ['goblet', 'hipthrust', 'lunges', 'rdl', 'hanging'] },
    ],
    5: [
      { name: 'Push', focus: 'Chest / Shoulders / Triceps', exercises: ['bp', 'ohp', 'dbp', 'latraise', 'triceps'] },
      { name: 'Pull', focus: 'Back / Biceps', exercises: ['latpd', 'row', 'facepull', 'curl', 'db-curl'] },
      { name: 'Legs', focus: 'Quads / Hamstrings / Glutes', exercises: ['squat', 'rdl', 'legpress', 'lunges', 'plank'] },
      { name: 'Upper', focus: 'Upper Body', exercises: ['dbp', 'db-row', 'db-ohp', 'latpd', 'oh-ext'] },
      { name: 'Lower + Core', focus: 'Legs + Core', exercises: ['goblet', 'hipthrust', 'rdl', 'hanging', 'crunch'] },
    ],
    6: [
      { name: 'Push A', focus: 'Chest / Shoulders / Triceps', exercises: ['bp', 'ohp', 'latraise', 'triceps'] },
      { name: 'Pull A', focus: 'Back / Biceps', exercises: ['latpd', 'row', 'facepull', 'curl'] },
      { name: 'Legs A', focus: 'Quads / Glutes', exercises: ['squat', 'legpress', 'lunges', 'plank'] },
      { name: 'Push B', focus: 'Chest / Shoulders / Triceps', exercises: ['dbp', 'db-ohp', 'latraise', 'oh-ext'] },
      { name: 'Pull B', focus: 'Back / Biceps', exercises: ['pullup', 'db-row', 'facepull', 'db-curl'] },
      { name: 'Legs B', focus: 'Hamstrings / Glutes', exercises: ['rdl', 'hipthrust', 'goblet', 'hanging'] },
    ],
  };

  const HOME_SUBS = {
    'bp': 'pushup', 'dbp': 'pushup', 'ohp': 'db-ohp', 'latpd': 'pullup',
    'row': 'db-row', 'squat': 'goblet', 'legpress': 'goblet', 'triceps': 'oh-ext',
    'crunch': 'plank', 'facepull': 'latraise',
  };

  // Per-lift seeds. Weight = kg; reps kind = reps; timed = seconds.
  const SEED = {
    bp: { beginner: 40, intermediate: 60, advanced: 85 },
    dbp: { beginner: 14, intermediate: 22, advanced: 32 },
    ohp: { beginner: 20, intermediate: 35, advanced: 50 },
    'db-ohp': { beginner: 10, intermediate: 16, advanced: 24 },
    latpd: { beginner: 30, intermediate: 50, advanced: 70 },
    row: { beginner: 40, intermediate: 60, advanced: 85 },
    'db-row': { beginner: 14, intermediate: 22, advanced: 32 },
    squat: { beginner: 40, intermediate: 70, advanced: 100 },
    goblet: { beginner: 12, intermediate: 20, advanced: 32 },
    rdl: { beginner: 50, intermediate: 80, advanced: 110 },
    lunges: { beginner: 10, intermediate: 16, advanced: 24 },
    legpress: { beginner: 60, intermediate: 100, advanced: 160 },
    curl: { beginner: 20, intermediate: 30, advanced: 40 },
    'db-curl': { beginner: 8, intermediate: 12, advanced: 16 },
    triceps: { beginner: 15, intermediate: 25, advanced: 35 },
    'oh-ext': { beginner: 10, intermediate: 16, advanced: 24 },
    crunch: { beginner: 20, intermediate: 30, advanced: 45 },
    facepull: { beginner: 10, intermediate: 16, advanced: 22 },
    latraise: { beginner: 6, intermediate: 10, advanced: 14 },
    hipthrust: { beginner: 40, intermediate: 70, advanced: 100 },
    pushup: { beginner: 8, intermediate: 12, advanced: 15 },
    pullup: { beginner: 3, intermediate: 6, advanced: 10 },
    hanging: { beginner: 8, intermediate: 12, advanced: 15 },
    plank: { beginner: 30, intermediate: 45, advanced: 60 },
  };

  const GOAL_SCHEME = {
    muscle: {
      rest: 90,
      beginner: { sets: 3, reps: '8-12' },
      intermediate: { sets: 4, reps: '8-12' },
      advanced: { sets: 4, reps: '8-10' },
    },
    strength: {
      rest: 150,
      beginner: { sets: 3, reps: '5-8' },
      intermediate: { sets: 4, reps: '4-6' },
      advanced: { sets: 5, reps: '3-5' },
    },
    fatloss: {
      rest: 45,
      beginner: { sets: 3, reps: '10-15' },
      intermediate: { sets: 3, reps: '10-12' },
      advanced: { sets: 3, reps: '8-12' },
    },
    fitness: {
      rest: 90,
      beginner: { sets: 3, reps: '8-12' },
      intermediate: { sets: 3, reps: '6-10' },
      advanced: { sets: 4, reps: '5-8' },
    },
  };

  const TIMED_RANGE = {
    beginner: '20-40',
    intermediate: '30-60',
    advanced: '45-90',
  };

  const STATE_DEFAULTS = {
    profile: null,
    plan: null,
    currentDayIndex: 0,
    history: [],
    prs: {},
    activeWorkout: null,
    unit: 'kg',
    restSeconds: REST_SECONDS,
    weekNumber: 1,
    lastSets: {},
  };

  function findExercise(id) {
    return EXERCISES.find((e) => e.id === id) || { id, name: id, muscle: 'chest', kind: 'weight' };
  }

  function restForGoal(goal) {
    return (GOAL_SCHEME[goal] && GOAL_SCHEME[goal].rest) || REST_SECONDS;
  }

  function schemeFor(profile) {
    const goal = (profile && profile.goal) || 'fitness';
    const experience = (profile && profile.experience) || 'beginner';
    const g = GOAL_SCHEME[goal] || GOAL_SCHEME.fitness;
    const row = g[experience] || g.beginner;
    return { sets: row.sets, reps: row.reps, rest: g.rest };
  }

  function seedValue(id, experience) {
    const row = SEED[id];
    const exp = experience || 'beginner';
    if (!row) return exp === 'advanced' ? 60 : exp === 'intermediate' ? 40 : 20;
    if (row[exp] != null) return row[exp];
    return row.intermediate;
  }

  function parseRepRange(targetReps) {
    const m = String(targetReps || '').match(/(\d+)\s*-\s*(\d+)/);
    if (m) return { lo: +m[1], hi: +m[2] };
    const n = parseInt(targetReps, 10);
    if (!isNaN(n)) return { lo: n, hi: n };
    return { lo: 8, hi: 12 };
  }

  function cycleInRange(current, targetReps) {
    const { lo, hi } = parseRepRange(targetReps);
    let r = (current || lo) + 1;
    if (r > hi) r = lo;
    if (r < lo) r = lo;
    return r;
  }

  function generatePlan(profile) {
    const days = parseInt(profile && profile.days, 10);
    const experience = (profile && profile.experience) || 'beginner';
    const scheme = schemeFor(profile);
    let template = JSON.parse(JSON.stringify(SPLITS[days] || SPLITS[4]));

    if (profile && profile.equipment === 'home') {
      template.forEach((day) => {
        day.exercises = day.exercises.map((id) => HOME_SUBS[id] || id);
        day.exercises = [...new Set(day.exercises)];
      });
    }

    return template.map((day, i) => ({
      index: i,
      name: day.name,
      focus: day.focus,
      completed: false,
      exercises: day.exercises.map((id) => {
        const ex = findExercise(id);
        const kind = ex.kind || 'weight';
        const targetReps = kind === 'timed' ? (TIMED_RANGE[experience] || TIMED_RANGE.beginner) : scheme.reps;
        return {
          id: ex.id,
          name: ex.name,
          muscle: ex.muscle,
          kind,
          targetSets: scheme.sets,
          targetReps,
          suggestedWeight: kind === 'weight' ? seedValue(ex.id, experience) : 0,
        };
      }),
    }));
  }

  function suggestedLoad(ex, lastSets, experience) {
    const kind = (ex && ex.kind) || (findExercise(ex && ex.id).kind) || 'weight';
    const range = parseRepRange(ex && ex.targetReps);
    const last = lastSets && ex && lastSets[ex.id];
    if (last && (last.kind || kind) === kind) {
      if (kind === 'weight') {
        return { kind, weight: Number(last.weight) || 0, reps: Number(last.reps) || range.lo, seconds: 0 };
      }
      if (kind === 'timed') {
        return { kind, weight: 0, reps: 0, seconds: Number(last.seconds) || seedValue(ex.id, experience) };
      }
      return { kind, weight: 0, reps: Number(last.reps) || seedValue(ex.id, experience), seconds: 0 };
    }
    const seed = seedValue(ex && ex.id, experience);
    if (kind === 'weight') return { kind, weight: seed, reps: range.lo, seconds: 0 };
    if (kind === 'timed') return { kind, weight: 0, reps: 0, seconds: seed };
    return { kind, weight: 0, reps: seed, seconds: 0 };
  }

  function localDateKey(d) {
    const dt = d instanceof Date ? d : new Date(d);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function parseLocalDate(key) {
    const parts = String(key || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => !n && n !== 0)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function computeDayStreak(history, todayKey) {
    const dates = [...new Set((history || []).map((h) => h.date).filter(Boolean))].sort();
    if (!dates.length) return 0;
    const set = new Set(dates);
    const today = parseLocalDate(todayKey);
    if (!today) return 0;
    const latest = dates[dates.length - 1];
    const latestD = parseLocalDate(latest);
    const diff = Math.round((today - latestD) / 86400000);
    if (diff > 1) return 0;
    let cursor = diff === 1 ? latestD : new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let streak = 0;
    while (set.has(localDateKey(cursor))) {
      streak += 1;
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1);
    }
    return streak;
  }

  function weekVolume(history, todayKey, days) {
    const window = days || 7;
    const today = parseLocalDate(todayKey);
    if (!today) return 0;
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (window - 1));
    return (history || []).reduce((sum, h) => {
      const d = parseLocalDate(h.date);
      if (!d) return sum;
      if (d >= start && d <= today) return sum + (h.volume || 0);
      return sum;
    }, 0);
  }

  function nextIncompleteDay(plan, afterIndex) {
    const later = plan.findIndex((d, i) => i > afterIndex && !d.completed);
    if (later >= 0) return later;
    const earlier = plan.findIndex((d) => !d.completed);
    return earlier >= 0 ? earlier : 0;
  }

  function applySessionCompletion(plan, dayIndex, weekNumber) {
    const wasComplete = !!(plan[dayIndex] && plan[dayIndex].completed);
    const nextPlan = plan.map((d, i) => (i === dayIndex ? Object.assign({}, d, { completed: true }) : d));
    if (!wasComplete && nextPlan.length && nextPlan.every((d) => d.completed)) {
      return {
        plan: nextPlan.map((d) => Object.assign({}, d, { completed: false })),
        weekNumber: (weekNumber || 1) + 1,
        wrapped: true,
        currentDayIndex: 0,
      };
    }
    return {
      plan: nextPlan,
      weekNumber: weekNumber || 1,
      wrapped: false,
      currentDayIndex: nextIncompleteDay(nextPlan, dayIndex),
    };
  }

  function bestSet(kind, sets) {
    if (!sets || !sets.length) return null;
    if (kind === 'timed') {
      return sets.reduce((a, b) => ((b.seconds || 0) > (a.seconds || 0) ? b : a));
    }
    if (kind === 'reps') {
      return sets.reduce((a, b) => ((b.reps || 0) > (a.reps || 0) ? b : a));
    }
    return sets.reduce((a, b) => {
      if ((b.weight || 0) > (a.weight || 0)) return b;
      if (b.weight === a.weight && (b.reps || 0) > (a.reps || 0)) return b;
      return a;
    });
  }

  function isNewPR(current, candidate) {
    if (!candidate) return false;
    if (!current) return true;
    const kind = candidate.kind || current.kind || 'weight';
    if (kind === 'timed') return (candidate.seconds || 0) > (current.seconds || 0);
    if (kind === 'reps') return (candidate.reps || 0) > (current.reps || 0);
    return (
      candidate.weight > current.weight ||
      (candidate.weight === current.weight && candidate.reps > current.reps)
    );
  }

  function sessionStats(exercises) {
    let volume = 0;
    let setsLogged = 0;
    const lastSets = {};
    const prCandidates = [];
    (exercises || []).forEach((ex) => {
      const kind = ex.kind || 'weight';
      const done = (ex.sets || []).filter((s) => s.done);
      done.forEach((s) => {
        setsLogged += 1;
        if (kind === 'weight' && s.weight && s.reps) volume += s.weight * s.reps;
      });
      if (!done.length) return;
      const last = done[done.length - 1];
      lastSets[ex.id] = {
        kind,
        weight: last.weight || 0,
        reps: last.reps || 0,
        seconds: last.seconds || 0,
      };
      const best = bestSet(kind, done);
      prCandidates.push({
        id: ex.id,
        name: ex.name,
        kind,
        weight: best.weight || 0,
        reps: best.reps || 0,
        seconds: best.seconds || 0,
      });
    });
    return { volume, setsLogged, lastSets, prCandidates };
  }

  function parseBackup(raw) {
    const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      throw new Error('Not a Forge backup');
    }
    const looksLike =
      'profile' in obj ||
      'plan' in obj ||
      'history' in obj ||
      'prs' in obj ||
      'lastSets' in obj;
    if (!looksLike) throw new Error('Not a Forge backup');
    return {
      profile: obj.profile || null,
      plan: obj.plan || null,
      currentDayIndex: Number(obj.currentDayIndex) >= 0 ? Number(obj.currentDayIndex) : 0,
      history: Array.isArray(obj.history) ? obj.history : [],
      prs: obj.prs && typeof obj.prs === 'object' && !Array.isArray(obj.prs) ? obj.prs : {},
      activeWorkout: obj.activeWorkout || null,
      unit: obj.unit === 'lb' ? 'lb' : 'kg',
      restSeconds: Number(obj.restSeconds) > 0 ? Number(obj.restSeconds) : REST_SECONDS,
      weekNumber: Number(obj.weekNumber) > 0 ? Number(obj.weekNumber) : 1,
      lastSets: obj.lastSets && typeof obj.lastSets === 'object' && !Array.isArray(obj.lastSets) ? obj.lastSets : {},
    };
  }

  function fmtPR(pr, unitLabel) {
    if (!pr) return '—';
    const kind = pr.kind || (pr.seconds && !pr.weight ? 'timed' : !pr.weight && pr.reps ? 'reps' : 'weight');
    if (kind === 'timed') return (pr.seconds || 0) + 's';
    if (kind === 'reps') return (pr.reps || 0) + ' reps';
    const w = pr.weight;
    const shown = w == null ? '—' : String(w);
    return shown + ' ' + (unitLabel || 'KG') + ' × ' + (pr.reps || 0);
  }

  const api = {
    REST_SECONDS,
    EXERCISES,
    SPLITS,
    HOME_SUBS,
    SEED,
    GOAL_SCHEME,
    STATE_DEFAULTS,
    findExercise,
    restForGoal,
    schemeFor,
    seedValue,
    parseRepRange,
    cycleInRange,
    generatePlan,
    suggestedLoad,
    localDateKey,
    parseLocalDate,
    computeDayStreak,
    weekVolume,
    applySessionCompletion,
    sessionStats,
    isNewPR,
    parseBackup,
    fmtPR,
  };

  root.ForgeLogic = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
