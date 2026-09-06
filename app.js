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

// Home-friendly substitutes
const HOME_SUBS = {
  'bp': 'pushup', 'dbp': 'pushup', 'ohp': 'db-ohp', 'latpd': 'pullup',
  'row': 'db-row', 'squat': 'goblet', 'legpress': 'goblet', 'triceps': 'oh-ext',
  'crunch': 'plank', 'facepull': 'latraise'
};

// ========== STATE ==========
let state = {
  profile: null,
  plan: null,          // array of day objects
  currentDayIndex: 0,
  history: [],
  prs: {},             // exerciseId -> { weight, reps, date }
  activeWorkout: null, // { dayIndex, exercises: [{id, sets: [{weight, reps, done}]}] }
};

function loadState() {
  try {
    const raw = localStorage.getItem('forge_state');
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    }
  } catch (e) {}
}

function saveState() {
  localStorage.setItem('forge_state', JSON.stringify(state));
}

// ========== PLAN GENERATION ==========
function generatePlan(profile) {
  const days = parseInt(profile.days, 10);
  let template = JSON.parse(JSON.stringify(SPLITS[days] || SPLITS[4]));

  // Adapt for home equipment
  if (profile.equipment === 'home') {
    template.forEach(day => {
      day.exercises = day.exercises.map(id => HOME_SUBS[id] || id);
      // dedupe
      day.exercises = [...new Set(day.exercises)];
    });
  }

  // Base sets/reps by experience
  const scheme = {
    beginner: { sets: 3, reps: '8-12', startWeight: 20 },
    intermediate: { sets: 3, reps: '6-10', startWeight: 40 },
    advanced: { sets: 4, reps: '5-8', startWeight: 60 },
  }[profile.experience] || { sets: 3, reps: '8-12', startWeight: 30 };

  const plan = template.map((day, i) => ({
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

  return plan;
}

// ========== UI HELPERS ==========
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
}

function showView(name) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`#view-${name}`).classList.add('active');
  $$('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === name);
  });
}

// ========== ONBOARDING ==========
function initOnboarding() {
  const form = $('#onboarding-form');
  const selections = {};

  $$('.option-grid').forEach(grid => {
    const name = grid.dataset.name;
    grid.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selections[name] = btn.dataset.value;
        checkFormReady();
      });
    });
  });

  function checkFormReady() {
    const ready = ['goal', 'experience', 'equipment', 'days'].every(k => selections[k]);
    $('#generate-btn').disabled = !ready;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.profile = { ...selections };
    state.plan = generatePlan(state.profile);
    state.currentDayIndex = 0;
    state.activeWorkout = null;
    saveState();
    renderDashboard();
    showScreen('dashboard');
    showView('plan');
  });
}

// ========== DASHBOARD ==========
function renderDashboard() {
  if (!state.plan) return;

  const p = state.profile;
  $('#plan-title').textContent = `${capitalize(p.goal)} • ${p.days} days/week`;
  $('#plan-meta').textContent = `${capitalize(p.experience)} • ${capitalize(p.equipment)} equipment`;

  const grid = $('#week-overview');
  grid.innerHTML = '';
  state.plan.forEach((day, i) => {
    const card = document.createElement('div');
    card.className = 'day-card' + (day.completed ? ' completed' : '') + (i === state.currentDayIndex ? ' active-day' : '');
    card.innerHTML = `
      <div class="day-name">Day ${i + 1}: ${day.name}</div>
      <div class="day-focus">${day.focus} • ${day.exercises.length} exercises</div>
      ${day.completed ? '<div class="day-status">✓ Completed</div>' : ''}
    `;
    card.addEventListener('click', () => startWorkout(i));
    grid.appendChild(card);
  });

  renderProgress();
  renderLibrary();
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

// ========== WORKOUT ==========
function startWorkout(dayIndex) {
  const day = state.plan[dayIndex];
  if (!day) return;

  state.currentDayIndex = dayIndex;
  state.activeWorkout = {
    dayIndex,
    name: day.name,
    focus: day.focus,
    exercises: day.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      muscle: ex.muscle,
      targetSets: ex.targetSets,
      targetReps: ex.targetReps,
      sets: Array.from({ length: ex.targetSets }, (_, i) => ({
        weight: getSuggestedWeight(ex.id, ex.suggestedWeight),
        reps: parseInt(ex.targetReps.split('-')[0], 10) || 8,
        done: false,
      })),
    })),
  };
  saveState();
  renderActiveWorkout();
  showView('workout');
}

function getSuggestedWeight(exId, fallback) {
  // If we have a PR, suggest a small increase
  const pr = state.prs[exId];
  if (pr && pr.weight) {
    return Math.round(pr.weight * 1.025); // ~2.5% progression
  }
  return fallback;
}

function renderActiveWorkout() {
  const aw = state.activeWorkout;
  if (!aw) {
    $('#active-workout').style.display = 'none';
    $('#no-workout').style.display = 'block';
    return;
  }
  $('#active-workout').style.display = 'block';
  $('#no-workout').style.display = 'none';

  $('#workout-title').textContent = aw.name;
  $('#workout-subtitle').textContent = aw.focus;

  const list = $('#exercise-list');
  list.innerHTML = '';

  aw.exercises.forEach((ex, ei) => {
    const item = document.createElement('div');
    item.className = 'exercise-item' + (ex.sets.every(s => s.done) ? ' done' : '');
    item.innerHTML = `
      <div class="exercise-header">
        <div>
          <div class="exercise-name" data-id="${ex.id}">${ex.name}</div>
          <div class="exercise-meta">${ex.muscle} • ${ex.targetSets} sets × ${ex.targetReps} reps</div>
        </div>
      </div>
      <table class="sets-table">
        <thead><tr><th>Set</th><th>Weight</th><th>Reps</th><th>✓</th></tr></thead>
        <tbody>
          ${ex.sets.map((s, si) => `
            <tr>
              <td>${si + 1}</td>
              <td><input type="number" min="0" step="0.5" value="${s.weight}" data-ei="${ei}" data-si="${si}" data-field="weight"></td>
              <td><input type="number" min="0" value="${s.reps}" data-ei="${ei}" data-si="${si}" data-field="reps"></td>
              <td><input type="checkbox" class="set-check" ${s.done ? 'checked' : ''} data-ei="${ei}" data-si="${si}" data-field="done"></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    list.appendChild(item);
  });

  // Event listeners for inputs
  list.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', (e) => {
      const ei = +e.target.dataset.ei;
      const si = +e.target.dataset.si;
      const field = e.target.dataset.field;
      if (field === 'done') {
        state.activeWorkout.exercises[ei].sets[si].done = e.target.checked;
      } else {
        state.activeWorkout.exercises[ei].sets[si][field] = parseFloat(e.target.value) || 0;
      }
      saveState();
      // Re-render only status styling
      const allDone = state.activeWorkout.exercises[ei].sets.every(s => s.done);
      e.target.closest('.exercise-item').classList.toggle('done', allDone);
      updateFinishButton();
    });
  });

  // Click exercise name → modal
  list.querySelectorAll('.exercise-name').forEach(el => {
    el.addEventListener('click', () => openExerciseModal(el.dataset.id));
  });

  updateFinishButton();
}

function updateFinishButton() {
  const aw = state.activeWorkout;
  if (!aw) return;
  const anyDone = aw.exercises.some(ex => ex.sets.some(s => s.done));
  const btn = $('#finish-workout');
  btn.style.display = anyDone ? 'block' : 'none';
}

function finishWorkout() {
  const aw = state.activeWorkout;
  if (!aw) return;

  // Mark day completed
  state.plan[aw.dayIndex].completed = true;

  // Calculate volume & update PRs
  let volume = 0;
  const date = new Date().toISOString().slice(0, 10);

  aw.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.done && s.weight && s.reps) {
        volume += s.weight * s.reps;
        // PR check (simple: highest weight for now)
        const current = state.prs[ex.id];
        if (!current || s.weight > current.weight || (s.weight === current.weight && s.reps > current.reps)) {
          state.prs[ex.id] = { weight: s.weight, reps: s.reps, date, name: ex.name };
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
  });

  // Advance current day
  const next = state.plan.findIndex((d, i) => i > aw.dayIndex && !d.completed);
  state.currentDayIndex = next >= 0 ? next : (aw.dayIndex + 1) % state.plan.length;

  state.activeWorkout = null;
  saveState();
  renderDashboard();
  showView('plan');
  alert('Workout logged! Great work. Weights will progress automatically next time.');
}

// ========== PROGRESS ==========
function renderProgress() {
  $('#stat-workouts').textContent = state.history.length;
  const totalVol = state.history.reduce((sum, h) => sum + (h.volume || 0), 0);
  $('#stat-volume').textContent = totalVol.toLocaleString();
  $('#stat-prs').textContent = Object.keys(state.prs).length;

  const hist = $('#history-list');
  if (state.history.length === 0) {
    hist.innerHTML = '<p class="empty-msg">No workouts yet. Start your first session!</p>';
  } else {
    hist.innerHTML = state.history.slice(0, 10).map(h => `
      <div class="history-item">
        <div>
          <strong>${h.name}</strong>
          <div class="meta">${h.date} • ${h.focus}</div>
        </div>
        <div>${h.volume} kg</div>
      </div>
    `).join('');
  }

  const prList = $('#pr-list');
  const prEntries = Object.values(state.prs);
  if (prEntries.length === 0) {
    prList.innerHTML = '<p class="empty-msg">No personal records yet.</p>';
  } else {
    prList.innerHTML = prEntries
      .sort((a, b) => b.weight - a.weight)
      .map(pr => `
        <div class="pr-item">
          <div>
            <strong>${pr.name}</strong>
            <div class="meta">${pr.date}</div>
          </div>
          <div>${pr.weight} kg × ${pr.reps}</div>
        </div>
      `).join('');
  }
}

// ========== LIBRARY ==========
function renderLibrary(filterMuscle = 'all', search = '') {
  const list = $('#library-list');
  let items = EXERCISES;
  if (filterMuscle !== 'all') {
    items = items.filter(e => e.muscle === filterMuscle);
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(e => e.name.toLowerCase().includes(q) || e.muscle.includes(q));
  }

  list.innerHTML = items.map(ex => `
    <div class="library-item" data-id="${ex.id}">
      <div class="name">${ex.name}</div>
      <div class="muscle">${capitalize(ex.muscle)} • ${ex.equipment}</div>
    </div>
  `).join('');

  list.querySelectorAll('.library-item').forEach(el => {
    el.addEventListener('click', () => openExerciseModal(el.dataset.id));
  });
}

function openExerciseModal(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;
  $('#modal-title').textContent = ex.name;
  $('#modal-muscle').textContent = `${capitalize(ex.muscle)} • ${ex.equipment}`;
  $('#modal-desc').textContent = ex.desc;
  $('#modal-cues').innerHTML = ex.cues.map(c => `<li>${c}</li>`).join('');
  $('#modal').classList.add('open');
}

// ========== INIT ==========
function init() {
  loadState();

  // Navigation
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  $('#finish-workout').addEventListener('click', finishWorkout);
  $('#reset-plan').addEventListener('click', () => {
    if (confirm('Start a completely new plan? Current progress will be kept in history.')) {
      state.profile = null;
      state.plan = null;
      state.activeWorkout = null;
      state.currentDayIndex = 0;
      saveState();
      showScreen('onboarding');
    }
  });

  $('#modal-close').addEventListener('click', () => $('#modal').classList.remove('open'));
  $('#modal').addEventListener('click', (e) => {
    if (e.target === $('#modal')) $('#modal').classList.remove('open');
  });

  // Library filters
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderLibrary(chip.dataset.muscle, $('#library-search').value);
    });
  });
  $('#library-search').addEventListener('input', (e) => {
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

// Register service worker for PWA / home screen install
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registered', reg.scope))
      .catch((err) => console.log('SW registration failed', err));
  });
}
