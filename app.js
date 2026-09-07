// ========== DATA ==========
const EXERCISES = [
  { id: 'bp', name: 'Barbell Bench Press', muscle: 'chest', equipment: 'gym',
    desc: 'Classic horizontal pressing movement for chest, shoulders and triceps.',
    cues: ['Retract scapula and keep feet planted', 'Lower bar to mid-chest with control', 'Press up explosively without bouncing'] },
  { id: 'dbp', name: 'Dumbbell Bench Press', muscle: 'chest', equipment: 'mixed',
    desc: 'Allows greater range of motion and independent arm work.',
    cues: ['Keep wrists stacked over elbows', 'Lower until slight stretch in chest', 'Press up and slightly inward'] },
  { id: 'pushup', name: 'Push-Up', muscle: 'chest', equipment: 'home',
    desc: 'Bodyweight staple that builds pressing strength anywhere.',
    cues: ['Body in a straight line from head to heels', 'Elbows ~45° from torso', 'Full lockout at the top'] },
  { id: 'ohp', name: 'Overhead Press', muscle: 'shoulders', equipment: 'gym',
    desc: 'Vertical press for shoulder strength and stability.',
    cues: ['Brace core hard', 'Bar path close to face', 'Lock out overhead with head through'] },
  { id: 'db-ohp', name: 'Dumbbell Shoulder Press', muscle: 'shoulders', equipment: 'mixed',
    desc: 'Seated or standing dumbbell press for balanced shoulder development.',
    cues: ['Start with dumbbells at shoulder height', 'Press up without excessive lean', 'Control the descent'] },
  { id: 'latpd', name: 'Lat Pulldown', muscle: 'back', equipment: 'gym',
    desc: 'Vertical pulling for lats and upper back.',
    cues: ['Pull elbows down and back', 'Slight lean back at bottom', 'Control the stretch at the top'] },
  { id: 'pullup', name: 'Pull-Up', muscle: 'back', equipment: 'mixed',
    desc: 'King of bodyweight pulling movements.',
    cues: ['Full hang to start', 'Pull chest to bar', 'Avoid kipping unless training for it'] },
  { id: 'row', name: 'Barbell Row', muscle: 'back', equipment: 'gym',
    desc: 'Horizontal pull for thickness and posture.',
    cues: ['Hinge at hips, flat back', 'Pull bar to lower chest/upper abs', 'Squeeze shoulder blades'] },
  { id: 'db-row', name: 'Dumbbell Row', muscle: 'back', equipment: 'mixed',
    desc: 'Unilateral row that fixes imbalances.',
    cues: ['Support on bench', 'Pull elbow high', 'Keep torso stable'] },
  { id: 'squat', name: 'Barbell Back Squat', muscle: 'legs', equipment: 'gym',
    desc: 'Fundamental lower-body strength builder.',
    cues: ['Brace before unrack', 'Break at hips and knees together', 'Drive through mid-foot'] },
  { id: 'goblet', name: 'Goblet Squat', muscle: 'legs', equipment: 'mixed',
    desc: 'Great teaching tool and home-friendly squat variation.',
    cues: ['Hold weight at chest', 'Elbows inside knees at bottom', 'Upright torso'] },
  { id: 'rdl', name: 'Romanian Deadlift', muscle: 'legs', equipment: 'gym',
    desc: 'Posterior chain focus — hamstrings and glutes.',
    cues: ['Soft knee bend', 'Push hips back', 'Feel stretch in hamstrings'] },
  { id: 'lunges', name: 'Walking Lunges', muscle: 'legs', equipment: 'mixed',
    desc: 'Unilateral leg work for strength and balance.',
    cues: ['Long enough step', 'Front knee tracks over mid-foot', 'Upright torso'] },
  { id: 'legpress', name: 'Leg Press', muscle: 'legs', equipment: 'gym',
    desc: 'Machine-based quad and glute builder.',
    cues: ['Feet mid-platform', 'Lower with control', 'Do not lock knees hard'] },
  { id: 'curl', name: 'Barbell Curl', muscle: 'arms', equipment: 'gym',
    desc: 'Classic biceps builder.',
    cues: ['Elbows pinned to sides', 'No swinging', 'Full stretch at bottom'] },
  { id: 'db-curl', name: 'Dumbbell Curl', muscle: 'arms', equipment: 'mixed',
    desc: 'Allows natural wrist rotation (supination).',
    cues: ['Start neutral or supinated', 'Control the eccentric', 'Squeeze at top'] },
  { id: 'triceps', name: 'Triceps Pushdown', muscle: 'arms', equipment: 'gym',
    desc: 'Isolation for the triceps.',
    cues: ['Elbows fixed at sides', 'Full extension', 'Control the return'] },
  { id: 'oh-ext', name: 'Overhead Triceps Extension', muscle: 'arms', equipment: 'mixed',
    desc: 'Stretches the long head of the triceps.',
    cues: ['Keep elbows pointed up', 'Lower behind head', 'Extend fully'] },
  { id: 'plank', name: 'Plank', muscle: 'core', equipment: 'home',
    desc: 'Isometric core stability.',
    cues: ['Neutral spine', 'Squeeze glutes', 'Breathe steadily'] },
  { id: 'crunch', name: 'Cable Crunch', muscle: 'core', equipment: 'gym',
    desc: 'Loaded spinal flexion for abs.',
    cues: ['Round the spine intentionally', 'Pull with abs not arms', 'Controlled tempo'] },
  { id: 'hanging', name: 'Hanging Knee Raise', muscle: 'core', equipment: 'mixed',
    desc: 'Dynamic core and hip flexor work.',
    cues: ['Avoid swinging', 'Raise knees to chest', 'Control the lower'] },
  { id: 'facepull', name: 'Face Pull', muscle: 'shoulders', equipment: 'gym',
    desc: 'Rear delt and external rotation health movement.',
    cues: ['Pull to face/forehead', 'Externally rotate at end', 'Squeeze rear delts'] },
  { id: 'latraise', name: 'Lateral Raise', muscle: 'shoulders', equipment: 'mixed',
    desc: 'Isolation for the side delts.',
    cues: ['Slight elbow bend', 'Lead with elbows', 'Stop at shoulder height'] },
  { id: 'hipthrust', name: 'Hip Thrust', muscle: 'legs', equipment: 'gym',
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
  'crunch': 'plank', 'facepull': 'latraise'
};

const REST_SECONDS = 90;
const RING_CIRC = 182.2;
const OB_LABELS = ['STEP 01 · GOAL', 'STEP 02 · EXPERIENCE', 'STEP 03 · EQUIPMENT', 'STEP 04 · DAYS'];

// ========== STATE ==========
let state = {
  profile: null,
  plan: null,
  currentDayIndex: 0,
  history: [],
  prs: {},
  activeWorkout: null,
  unit: 'kg',
  restSeconds: REST_SECONDS,
};

let obStep = 0;
let selections = {};
let restTimer = null;
let restLeft = 0;
let elapsedTimer = null;
let lastSessionSummary = null;

function loadState() {
  try {
    const raw = localStorage.getItem('forge_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
      if (!state.unit) state.unit = 'kg';
      if (!state.restSeconds) state.restSeconds = REST_SECONDS;
    }
  } catch (e) {}
}

function saveState() {
  localStorage.setItem('forge_state', JSON.stringify(state));
}

// ========== UNITS ==========
function toDisplay(kg) {
  if (state.unit === 'lb') return Math.round(kg * 2.20462 * 2) / 2;
  return Math.round(kg * 2) / 2;
}
function fromDisplay(val) {
  if (state.unit === 'lb') return Math.round((val / 2.20462) * 2) / 2;
  return val;
}
function unitLabel() { return state.unit === 'lb' ? 'LB' : 'KG'; }
function fmtWeight(kg) {
  const v = toDisplay(kg);
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}
function fmtVol(kgVol) {
  const v = state.unit === 'lb' ? Math.round(kgVol * 2.20462) : Math.round(kgVol);
  return v.toLocaleString();
}
function stepKg() {
  return state.unit === 'lb' ? fromDisplay(5) : 2.5; // ~5 lb or 2.5 kg
}

// ========== PLAN GENERATION ==========
function generatePlan(profile) {
  const days = parseInt(profile.days, 10);
  let template = JSON.parse(JSON.stringify(SPLITS[days] || SPLITS[4]));

  if (profile.equipment === 'home') {
    template.forEach(day => {
      day.exercises = day.exercises.map(id => HOME_SUBS[id] || id);
      day.exercises = [...new Set(day.exercises)];
    });
  }

  const scheme = {
    beginner: { sets: 3, reps: '8-12', startWeight: 20 },
    intermediate: { sets: 3, reps: '6-10', startWeight: 40 },
    advanced: { sets: 4, reps: '5-8', startWeight: 60 },
  }[profile.experience] || { sets: 3, reps: '8-12', startWeight: 30 };

  return template.map((day, i) => ({
    index: i,
    name: day.name,
    focus: day.focus,
    completed: false,
    exercises: day.exercises.map(id => {
      const ex = EXERCISES.find(e => e.id === id) || { id, name: id };
      return {
        id: ex.id,
        name: ex.name,
        muscle: ex.muscle,
        targetSets: scheme.sets,
        targetReps: scheme.reps,
        suggestedWeight: scheme.startWeight,
      };
    }),
  }));
}

// ========== UI HELPERS ==========
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function hatchClass(muscle) { return 'hatch hatch-' + (muscle || 'chest'); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
}

function showView(name) {
  $$('.view').forEach(v => v.classList.remove('active'));
  const el = $(`#view-${name}`);
  if (el) el.classList.add('active');
  $$('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === name);
  });
  if (name === 'progress') renderProgress();
  if (name === 'profile') renderProfile();
  if (name === 'plan') renderDashboard();
  if (name === 'workout') renderActiveWorkout();
  if (name === 'library') {
    const active = document.querySelector('.chip.active');
    renderLibrary(active ? active.dataset.muscle : 'all', $('#library-search').value);
  }
}

function clock(secs) {
  const s = Math.max(0, Math.floor(secs));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ':' + String(r).padStart(2, '0');
}

// ========== ONBOARDING ==========
function renderObStep() {
  $$('.ob-step').forEach(s => s.classList.toggle('active', +s.dataset.step === obStep));
  $$('#ob-progress .ob-seg').forEach((seg, i) => seg.classList.toggle('on', i <= obStep));
  $('#ob-step-label').textContent = OB_LABELS[obStep];
  const isLast = obStep === 3;
  $('#ob-back').style.display = obStep > 0 ? '' : 'none';
  $('#ob-next').style.display = isLast ? 'none' : '';
  $('#generate-btn').style.display = isLast ? '' : 'none';
  updateObButtons();
}

function updateObButtons() {
  const keys = ['goal', 'experience', 'equipment', 'days'];
  const key = keys[obStep];
  const has = !!selections[key];
  if (obStep < 3) {
    $('#ob-next').disabled = !has;
  } else {
    const ready = keys.every(k => selections[k]);
    $('#generate-btn').disabled = !ready;
  }
}

function initOnboarding() {
  $$('.option-grid').forEach(grid => {
    const name = grid.dataset.name;
    grid.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selections[name] = btn.dataset.value;
        updateObButtons();
      });
    });
  });

  $('#ob-next').addEventListener('click', () => {
    if (obStep < 3) { obStep += 1; renderObStep(); }
  });
  $('#ob-back').addEventListener('click', () => {
    if (obStep > 0) { obStep -= 1; renderObStep(); }
  });

  $('#onboarding-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!['goal', 'experience', 'equipment', 'days'].every(k => selections[k])) return;
    state.profile = { ...selections };
    state.plan = generatePlan(state.profile);
    state.currentDayIndex = 0;
    state.activeWorkout = null;
    saveState();
    renderDashboard();
    showScreen('dashboard');
    showView('plan');
  });

  renderObStep();
}

// ========== DASHBOARD / PLAN ==========
function primaryMuscle(day) {
  const counts = {};
  day.exercises.forEach(ex => { counts[ex.muscle] = (counts[ex.muscle] || 0) + 1; });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 'chest';
}

function weekVolumeKg() {
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  return state.history.reduce((sum, h) => {
    const t = Date.parse(h.date);
    if (!isNaN(t) && t >= weekAgo) return sum + (h.volume || 0);
    // if date is YYYY-MM-DD compare as string week roughly: include recent history slice
    return sum;
  }, 0) || state.history.slice(0, state.plan ? state.plan.length : 4).reduce((s, h) => s + (h.volume || 0), 0);
}

function renderDashboard() {
  if (!state.plan) return;
  const p = state.profile;
  $('#plan-kicker').textContent = `${(p.goal || '').toUpperCase()} · ${p.days} DAYS / WEEK`;
  $('#plan-title').textContent = 'Your week';
  $('#plan-meta').textContent = `${capitalize(p.experience)} · ${capitalize(p.equipment)} equipment · Auto-progressing`;

  const done = state.plan.filter(d => d.completed).length;
  $('#stat-week-done').textContent = done;
  $('#stat-week-total').textContent = state.plan.length;
  $('#stat-streak').textContent = done; // simple proxy
  $('#stat-week-vol').textContent = fmtVol(weekVolumeKg());
  $('#stat-week-unit').textContent = unitLabel();

  const grid = $('#week-overview');
  grid.innerHTML = '';
  state.plan.forEach((day, i) => {
    const muscle = primaryMuscle(day);
    const completed = day.completed;
    const active = i === state.currentDayIndex && !completed;
    let status = 'Queued';
    if (completed) status = 'Logged';
    else if (active) status = 'Start';

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'day-card blueprint' + (completed ? ' completed' : '') + (active ? ' active-day' : '');
    card.innerHTML = `
      <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
      <div class="day-hatch ${hatchClass(muscle)}">
        <div class="day-name">${day.name}</div>
      </div>
      <div class="day-foot">
        <span class="day-meta">Day ${String(i + 1).padStart(2, '0')} · ${day.focus} · ${day.exercises.length} lifts</span>
        <span class="day-status">${status}</span>
      </div>
    `;
    card.addEventListener('click', () => startWorkout(i));
    grid.appendChild(card);
  });

  renderProgress();
  renderLibrary();
  renderProfile();
}

// ========== WORKOUT ==========
function getSuggestedWeight(exId, fallback) {
  const pr = state.prs[exId];
  if (pr && pr.weight) return Math.round(pr.weight * 1.025 * 2) / 2;
  return fallback;
}

function findActiveSet() {
  const aw = state.activeWorkout;
  if (!aw) return null;
  for (let ei = 0; ei < aw.exercises.length; ei++) {
    for (let si = 0; si < aw.exercises[ei].sets.length; si++) {
      if (!aw.exercises[ei].sets[si].done) return { ei, si };
    }
  }
  return null;
}

function startElapsed() {
  stopElapsed();
  if (!state.activeWorkout) return;
  if (!state.activeWorkout.startedAt) {
    state.activeWorkout.startedAt = Date.now();
    saveState();
  }
  const tick = () => {
    if (!state.activeWorkout || !state.activeWorkout.startedAt) return;
    const secs = Math.floor((Date.now() - state.activeWorkout.startedAt) / 1000);
    const el = $('#wo-elapsed');
    if (el) el.textContent = clock(secs);
  };
  tick();
  elapsedTimer = setInterval(tick, 1000);
}

function stopElapsed() {
  if (elapsedTimer) { clearInterval(elapsedTimer); elapsedTimer = null; }
}

function startWorkout(dayIndex) {
  const day = state.plan[dayIndex];
  if (!day) return;

  state.currentDayIndex = dayIndex;
  state.activeWorkout = {
    dayIndex,
    name: day.name,
    focus: day.focus,
    startedAt: Date.now(),
    exercises: day.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      muscle: ex.muscle,
      targetSets: ex.targetSets,
      targetReps: ex.targetReps,
      sets: Array.from({ length: ex.targetSets }, () => ({
        weight: getSuggestedWeight(ex.id, ex.suggestedWeight),
        reps: parseInt(ex.targetReps.split('-')[0], 10) || 8,
        done: false,
      })),
    })),
  };
  saveState();
  skipRest();
  renderActiveWorkout();
  showView('workout');
  startElapsed();
}

function setDoneCount() {
  const aw = state.activeWorkout;
  if (!aw) return { done: 0, total: 0 };
  let done = 0, total = 0;
  aw.exercises.forEach(ex => ex.sets.forEach(s => { total++; if (s.done) done++; }));
  return { done, total };
}

function renderActiveWorkout() {
  const aw = state.activeWorkout;
  if (!aw) {
    $('#active-workout').style.display = 'none';
    $('#no-workout').style.display = 'block';
    stopElapsed();
    return;
  }
  $('#active-workout').style.display = 'block';
  $('#no-workout').style.display = 'none';

  $('#workout-kicker').textContent = `DAY ${String(aw.dayIndex + 1).padStart(2, '0')} · IN SESSION`;
  $('#workout-title').textContent = aw.name;
  $('#workout-subtitle').textContent = aw.focus;

  const { done, total } = setDoneCount();
  $('#wo-count').textContent = `${done} / ${total}`;
  $('#wo-bar-fill').style.width = (total ? (done / total) * 100 : 0) + '%';
  startElapsed();

  const active = findActiveSet();
  const list = $('#exercise-list');
  list.innerHTML = '';

  aw.exercises.forEach((ex, ei) => {
    const item = document.createElement('div');
    item.className = 'exercise-item' + (ex.sets.every(s => s.done) ? ' done' : '');
    const rows = ex.sets.map((s, si) => {
      const isActive = active && active.ei === ei && active.si === si;
      const isLogged = s.done;
      const cls = 'set-row' + (isActive ? ' active' : '') + (isLogged ? ' logged' : '');
      if (isActive) {
        return `
          <div class="${cls}" data-ei="${ei}" data-si="${si}">
            <span class="set-idx">${String(si + 1).padStart(2, '0')}</span>
            <div class="stepper">
              <button type="button" data-act="dec" aria-label="Decrease weight">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
              </button>
              <span class="val">${fmtWeight(s.weight)}</span>
              <button type="button" data-act="inc" aria-label="Increase weight">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
            <span class="set-mul">×</span>
            <button type="button" class="rep-btn" data-act="rep">${s.reps}</button>
            <button type="button" class="set-check" data-act="log" aria-label="Log set">
              <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
            </button>
          </div>`;
      }
      return `
        <div class="${cls}" data-ei="${ei}" data-si="${si}">
          <span class="set-idx">${String(si + 1).padStart(2, '0')}</span>
          <span class="set-readonly">${fmtWeight(s.weight)} ${unitLabel()} × ${s.reps}</span>
          <button type="button" class="set-check ${isLogged ? 'on' : ''}" data-act="toggle" aria-label="Toggle set">
            <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
          </button>
        </div>`;
    }).join('');

    item.innerHTML = `
      <div class="exercise-header">
        <div class="exercise-thumb ${hatchClass(ex.muscle)}"></div>
        <div style="flex:1;min-width:0">
          <div class="exercise-name" data-id="${ex.id}">${ex.name}</div>
          <div class="exercise-meta">${ex.muscle} · ${ex.targetSets} × ${ex.targetReps} · ${unitLabel()}</div>
        </div>
      </div>
      ${rows}
    `;
    list.appendChild(item);
  });

  list.querySelectorAll('.exercise-name').forEach(el => {
    el.addEventListener('click', () => openExerciseModal(el.dataset.id));
  });

  list.querySelectorAll('.set-row').forEach(row => {
    const ei = +row.dataset.ei;
    const si = +row.dataset.si;
    row.querySelectorAll('[data-act]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const act = btn.dataset.act;
        const set = state.activeWorkout.exercises[ei].sets[si];
        if (act === 'inc') {
          set.weight = Math.round((set.weight + stepKg()) * 2) / 2;
          saveState(); renderActiveWorkout();
        } else if (act === 'dec') {
          set.weight = Math.max(0, Math.round((set.weight - stepKg()) * 2) / 2);
          saveState(); renderActiveWorkout();
        } else if (act === 'rep') {
          let r = set.reps + 1;
          if (r > 12) r = 5;
          set.reps = r;
          saveState(); renderActiveWorkout();
        } else if (act === 'log') {
          set.done = true;
          saveState();
          openRestTimer(ei, si);
          renderActiveWorkout();
          updateFinishButton();
        } else if (act === 'toggle') {
          set.done = !set.done;
          saveState();
          renderActiveWorkout();
          updateFinishButton();
        }
      });
    });
  });

  updateFinishButton();
}

function updateFinishButton() {
  const aw = state.activeWorkout;
  if (!aw) return;
  const anyDone = aw.exercises.some(ex => ex.sets.some(s => s.done));
  $('#finish-workout').style.display = anyDone ? 'block' : 'none';
}

// ========== REST TIMER ==========
function openRestTimer(ei, si) {
  const aw = state.activeWorkout;
  restLeft = state.restSeconds || REST_SECONDS;
  $('#rest-sheet').classList.add('open');

  let nextLabel = 'ALL SETS LOGGED';
  const next = findActiveSet();
  if (next) {
    const nex = aw.exercises[next.ei];
    nextLabel = `NEXT · ${nex.name.toUpperCase()} · SET ${String(next.si + 1).padStart(2, '0')}`;
  } else {
    // just logged last — still show current
    const cur = aw.exercises[ei];
    nextLabel = `DONE · ${cur.name.toUpperCase()}`;
  }
  $('#rest-next').textContent = nextLabel;
  updateRestUI();

  if (restTimer) clearInterval(restTimer);
  restTimer = setInterval(() => {
    restLeft -= 1;
    if (restLeft <= 0) {
      skipRest();
    } else {
      updateRestUI();
    }
  }, 1000);
}

function updateRestUI() {
  const total = state.restSeconds || REST_SECONDS;
  $('#rest-clock').textContent = clock(restLeft);
  const offset = RING_CIRC * (1 - Math.max(0, restLeft) / total);
  $('#rest-ring-arc').setAttribute('stroke-dashoffset', String(offset));
}

function skipRest() {
  if (restTimer) { clearInterval(restTimer); restTimer = null; }
  restLeft = 0;
  const sheet = $('#rest-sheet');
  if (sheet) sheet.classList.remove('open');
}

// ========== FINISH / COMPLETE ==========
function finishWorkout() {
  const aw = state.activeWorkout;
  if (!aw) return;
  skipRest();
  stopElapsed();

  state.plan[aw.dayIndex].completed = true;

  let volume = 0;
  let setsLogged = 0;
  const date = new Date().toISOString().slice(0, 10);
  const newPRs = [];

  aw.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.done && s.weight && s.reps) {
        volume += s.weight * s.reps;
        setsLogged += 1;
        const current = state.prs[ex.id];
        const isPR = !current || s.weight > current.weight || (s.weight === current.weight && s.reps > current.reps);
        if (isPR) {
          const prev = current ? current.weight : null;
          state.prs[ex.id] = { weight: s.weight, reps: s.reps, date, name: ex.name };
          newPRs.push({
            name: ex.name,
            weight: s.weight,
            reps: s.reps,
            prev,
            delta: prev != null ? (s.weight - prev) : null,
          });
        }
      }
    });
  });

  state.history.unshift({
    date,
    name: aw.name,
    focus: aw.focus,
    volume: Math.round(volume),
    dayIndex: aw.dayIndex,
    sets: setsLogged,
  });

  const next = state.plan.findIndex((d, i) => i > aw.dayIndex && !d.completed);
  state.currentDayIndex = next >= 0 ? next : (aw.dayIndex + 1) % state.plan.length;
  const nextDay = state.plan[state.currentDayIndex];

  lastSessionSummary = {
    date,
    volume: Math.round(volume),
    sets: setsLogged,
    newPRs,
    nextName: nextDay ? nextDay.name : '—',
    nextFocus: nextDay ? nextDay.focus : '',
  };

  state.activeWorkout = null;
  saveState();
  showSessionComplete();
}

function showSessionComplete() {
  const s = lastSessionSummary;
  if (!s) return;
  $('#complete-kicker').textContent = `SESSION LOGGED · ${s.date}`;
  $('#complete-vol').textContent = fmtVol(s.volume);
  $('#complete-vol-unit').textContent = unitLabel();
  $('#complete-sets').textContent = s.sets;

  const prBox = $('#complete-prs');
  if (s.newPRs.length === 0) {
    prBox.innerHTML = '';
  } else {
    prBox.innerHTML = s.newPRs.map(pr => {
      const delta = pr.delta != null ? ` · +${fmtWeight(pr.delta)} ${unitLabel()}` : ' · NEW';
      const prev = pr.prev != null ? ` · PREVIOUS ${fmtWeight(pr.prev)} ${unitLabel()}` : '';
      return `
        <div class="complete-pr blueprint">
          <i class="corner tl invert"></i><i class="corner br invert"></i>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"/><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/></svg>
          <div>
            <div class="name">${pr.name}</div>
            <div class="detail">${fmtWeight(pr.weight)} ${unitLabel()} × ${pr.reps}${prev}${delta}</div>
          </div>
        </div>`;
    }).join('');
  }

  $('#complete-next').textContent = s.nextName;
  $('#session-complete').classList.add('open');
}

function closeSessionComplete(view) {
  $('#session-complete').classList.remove('open');
  renderDashboard();
  showScreen('dashboard');
  showView(view || 'plan');
}

// ========== PROGRESS ==========
function weeklyVolumes() {
  // Build up to 8 week buckets from history (oldest -> newest)
  const buckets = new Array(8).fill(0);
  if (!state.history.length) return buckets;
  const now = new Date();
  state.history.forEach(h => {
    const d = new Date(h.date);
    if (isNaN(d)) return;
    const diffDays = Math.floor((now - d) / (24 * 3600 * 1000));
    const weekIdx = Math.floor(diffDays / 7);
    if (weekIdx >= 0 && weekIdx < 8) {
      buckets[7 - weekIdx] += h.volume || 0;
    }
  });
  // If all zero but history exists, fall back to last N sessions as bars
  if (buckets.every(v => v === 0) && state.history.length) {
    const slice = state.history.slice(0, 8).reverse();
    return new Array(8 - slice.length).fill(0).concat(slice.map(h => h.volume || 0));
  }
  return buckets;
}

function renderProgress() {
  $('#stat-workouts').textContent = state.history.length;
  const totalVol = state.history.reduce((sum, h) => sum + (h.volume || 0), 0);
  $('#stat-volume').textContent = fmtVol(totalVol);
  $('#stat-vol-unit').textContent = unitLabel();
  $('#stat-prs').textContent = Object.keys(state.prs).length;

  const vols = weeklyVolumes();
  const max = Math.max(...vols, 1);
  const chart = $('#volume-chart');
  chart.innerHTML = vols.map((v, i) => {
    const h = Math.max(4, Math.round((v / max) * 100));
    let cls = 'bar';
    if (i === vols.length - 1) cls += ' latest';
    else if (i === vols.length - 2) cls += ' mid';
    return `<div class="${cls}" style="height:${h}%"></div>`;
  }).join('');

  if (vols.length >= 2 && vols[vols.length - 2] > 0) {
    const delta = vols[vols.length - 1] - vols[vols.length - 2];
    const pct = Math.round((delta / vols[vols.length - 2]) * 100);
    $('#vol-trend').textContent = (pct >= 0 ? '+' : '') + pct + '%';
  } else {
    $('#vol-trend').textContent = state.history.length ? 'LIVE' : '—';
  }
  $('#bars-from').textContent = '8 WKS';
  $('#bars-to').textContent = 'NOW';

  const hist = $('#history-list');
  if (state.history.length === 0) {
    hist.innerHTML = '<p class="empty-msg">No workouts yet. Start your first session!</p>';
  } else {
    hist.innerHTML = state.history.slice(0, 10).map(h => `
      <div class="history-item">
        <div style="flex:1;min-width:0">
          <div class="hist-name">${h.name}</div>
          <div class="hist-meta">${h.date} · ${h.focus}</div>
        </div>
        <div class="hist-vol">${fmtVol(h.volume)} ${unitLabel()}</div>
      </div>
    `).join('');
  }

  const prList = $('#pr-list');
  const prEntries = Object.entries(state.prs).map(([id, pr]) => ({ id, ...pr }));
  if (prEntries.length === 0) {
    prList.innerHTML = '<p class="empty-msg">No personal records yet.</p>';
  } else {
    prList.innerHTML = prEntries
      .sort((a, b) => b.weight - a.weight)
      .map(pr => {
        const ex = EXERCISES.find(e => e.id === pr.id);
        const muscle = ex ? ex.muscle : 'chest';
        return `
          <div class="pr-item">
            <div class="pr-thumb ${hatchClass(muscle)}"></div>
            <div style="flex:1;min-width:0">
              <div class="pr-name">${pr.name}</div>
              <div class="pr-meta">${pr.date}</div>
            </div>
            <div class="pr-val">${fmtWeight(pr.weight)} ${unitLabel()} × ${pr.reps}</div>
          </div>`;
      }).join('');
  }
}

// ========== LIBRARY ==========
function renderLibrary(filterMuscle = 'all', search = '') {
  const list = $('#library-list');
  let items = EXERCISES;
  if (filterMuscle !== 'all') items = items.filter(e => e.muscle === filterMuscle);
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(e => e.name.toLowerCase().includes(q) || e.muscle.includes(q) || e.equipment.includes(q));
  }

  $('#lib-count').textContent = items.length + (items.length === 1 ? ' EXERCISE' : ' EXERCISES');

  if (items.length === 0) {
    list.innerHTML = `
      <div style="padding:44px 20px;text-align:center">
        <div class="h2" style="margin-top:8px">No match</div>
        <p class="meta" style="margin-top:6px">Nothing in the catalog matches that filter.</p>
      </div>`;
    return;
  }

  list.innerHTML = items.map(ex => `
    <button type="button" class="lib-row" data-id="${ex.id}">
      <div class="lib-thumb ${hatchClass(ex.muscle)}"></div>
      <div style="flex:1;min-width:0">
        <div class="lib-name">${ex.name}</div>
        <div class="lib-tags">
          <span class="tag-outline">${ex.muscle}</span>
          <span class="tag-outline">${ex.equipment}</span>
        </div>
      </div>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="color-mix(in srgb, var(--color-text) 40%, transparent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  `).join('');

  list.querySelectorAll('.lib-row').forEach(el => {
    el.addEventListener('click', () => openExerciseModal(el.dataset.id));
  });
}

function openExerciseModal(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;
  const hero = $('#modal-hero');
  hero.className = 'modal-hero ' + hatchClass(ex.muscle);
  $('#modal-title').textContent = ex.name;
  $('#modal-muscle').textContent = `${ex.muscle.toUpperCase()} · ${ex.equipment.toUpperCase()}`;
  $('#modal-desc').textContent = ex.desc;
  $('#modal-group').textContent = ex.muscle;
  $('#modal-equip').textContent = ex.equipment;
  const pr = state.prs[ex.id];
  $('#modal-pr').textContent = pr ? `${fmtWeight(pr.weight)} ${unitLabel()}` : '—';
  $('#modal-cues').innerHTML = ex.cues.map((c, i) => `
    <div class="cue-row">
      <span class="cue-n">${String(i + 1).padStart(2, '0')}</span>
      <span class="cue-text">${c}</span>
    </div>
  `).join('');
  $('#modal').classList.add('open');
}

// ========== PROFILE ==========
function renderProfile() {
  const p = state.profile;
  if (!p) return;
  $('#profile-line').textContent = `${(p.goal || '').toUpperCase()} · ${(p.experience || '').toUpperCase()} · ${p.days} DAYS`;
  const rest = state.restSeconds || REST_SECONDS;
  const rows = [
    { label: 'Goal', value: capitalize(p.goal) },
    { label: 'Experience', value: capitalize(p.experience) },
    { label: 'Equipment', value: capitalize(p.equipment) },
    { label: 'Days per week', value: p.days },
    { label: 'Rest between sets', value: clock(rest) },
  ];
  $('#profile-plan-rows').innerHTML = rows.map(r => `
    <div class="setting-row">
      <span class="label">${r.label}</span>
      <span class="value">${r.value}</span>
    </div>
  `).join('');

  $$('#unit-toggle button').forEach(b => {
    b.classList.toggle('on', b.dataset.unit === state.unit);
  });
}

function setUnit(unit) {
  if (unit !== 'kg' && unit !== 'lb') return;
  state.unit = unit;
  saveState();
  renderDashboard();
  if (state.activeWorkout) renderActiveWorkout();
  renderProgress();
  renderProfile();
  const active = document.querySelector('.chip.active');
  renderLibrary(active ? active.dataset.muscle : 'all', $('#library-search')?.value || '');
}

// ========== INIT ==========
function init() {
  loadState();

  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  $('#finish-workout').addEventListener('click', finishWorkout);
  $('#skip-rest').addEventListener('click', skipRest);
  $('#complete-to-progress').addEventListener('click', () => closeSessionComplete('progress'));
  $('#complete-to-plan').addEventListener('click', () => closeSessionComplete('plan'));

  $('#reset-plan').addEventListener('click', () => {
    if (confirm('Start a completely new plan? Current progress will be kept in history.')) {
      state.profile = null;
      state.plan = null;
      state.activeWorkout = null;
      state.currentDayIndex = 0;
      saveState();
      skipRest();
      stopElapsed();
      selections = {};
      obStep = 0;
      $$('.option').forEach(o => o.classList.remove('selected'));
      renderObStep();
      showScreen('onboarding');
    }
  });

  $$('#unit-toggle button').forEach(b => {
    b.addEventListener('click', () => setUnit(b.dataset.unit));
  });

  $('#modal-close').addEventListener('click', () => $('#modal').classList.remove('open'));
  $('#modal').addEventListener('click', (e) => {
    if (e.target === $('#modal')) $('#modal').classList.remove('open');
  });

  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderLibrary(chip.dataset.muscle, $('#library-search').value);
    });
  });
  $('#library-search').addEventListener('input', (e) => {
    const wrap = $('#search-wrap');
    wrap.classList.toggle('focus', !!e.target.value);
    const active = document.querySelector('.chip.active');
    renderLibrary(active ? active.dataset.muscle : 'all', e.target.value);
  });

  initOnboarding();

  if (state.profile && state.plan) {
    renderDashboard();
    showScreen('dashboard');
    showView('plan');
    if (state.activeWorkout) {
      renderActiveWorkout();
    }
  } else {
    showScreen('onboarding');
  }
}

document.addEventListener('DOMContentLoaded', init);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registered', reg.scope))
      .catch((err) => console.log('SW registration failed', err));
  });
}
