// KBC Quiz App — Name & Age start, 50Q pool -> 10 per game, shuffled options per question,
// timer, one-time Pause, 2x 50-50, Leaderboard with trophies, Back to Menu (preserves leaderboard)

// ====== Questions Pool (50) ======
const QUESTIONS_POOL = [
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { q: "Who wrote the national anthem of India, 'Jana Gana Mana'?", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Subramania Bharati"], answer: 1 },
  { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
  { q: "In computing, what does 'CPU' stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Control Process Utility", "Central Print Unit"], answer: 0 },
  { q: "The chemical symbol 'Na' stands for which element?", options: ["Nitrogen", "Sodium", "Nickel", "Neon"], answer: 1 },
  { q: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"], answer: 1 },
  { q: "Which language runs in a web browser?", options: ["C", "Java", "Python", "JavaScript"], answer: 3 },
  { q: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
  { q: "What is 15 × 6?", options: ["80", "85", "90", "95"], answer: 2 },
  { q: "Which Indian state is known as the 'Land of Five Rivers'?", options: ["Punjab", "Haryana", "Gujarat", "Rajasthan"], answer: 0 },
  { q: "The tallest mountain in the world is?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], answer: 2 },
  { q: "H2O is the chemical formula for?", options: ["Oxygen", "Hydrogen", "Salt", "Water"], answer: 3 },
  { q: "Who discovered gravity?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], answer: 1 },
  { q: "What is the largest mammal?", options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: 1 },
  { q: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
  { q: "Which country hosted the 2016 Summer Olympics?", options: ["China", "Brazil", "UK", "Russia"], answer: 1 },
  { q: "HTML stands for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "High Text Markup Language"], answer: 1 },
  { q: "Which organ pumps blood in the body?", options: ["Lungs", "Brain", "Heart", "Liver"], answer: 2 },
  { q: "Largest desert in the world?", options: ["Sahara", "Gobi", "Arctic", "Kalahari"], answer: 0 },
  { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "Which instrument measures temperature?", options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"], answer: 1 },
  { q: "Which planet has rings?", options: ["Mars", "Saturn", "Venus", "Mercury"], answer: 1 },
  { q: "Which day is celebrated as World Environment Day?", options: ["June 5", "April 22", "March 8", "May 1"], answer: 0 },
  { q: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
  { q: "Who is known as the Father of Computers?", options: ["Charles Babbage", "Alan Turing", "John von Neumann", "Steve Jobs"], answer: 0 },
  { q: "Primary colors are red, blue, and?", options: ["Green", "Yellow", "Purple", "Orange"], answer: 1 },
  { q: "Which river is the longest?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
  { q: "Which metal is liquid at room temperature?", options: ["Mercury", "Iron", "Copper", "Sodium"], answer: 0 },
  { q: "Which vitamin is produced in skin by sunlight?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], answer: 3 },
  { q: "Taj Mahal is located in?", options: ["Delhi", "Agra", "Jaipur", "Mumbai"], answer: 1 },
  { q: "Fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Leopard"], answer: 0 },
  { q: "Currency of Japan?", options: ["Yuan", "Yen", "Won", "Dollar"], answer: 1 },
  { q: "Which is NOT a programming language?", options: ["Python", "Ruby", "HTML", "Swift"], answer: 2 },
  { q: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: 1 },
  { q: "Binary system is base?", options: ["8", "10", "2", "16"], answer: 2 },
  { q: "Light travels at about?", options: ["3×10^6 m/s", "3×10^8 m/s", "3×10^5 m/s", "3×10^7 m/s"], answer: 1 },
  { q: "Which blood group is universal donor?", options: ["A", "B", "AB", "O"], answer: 3 },
  { q: "Which ocean is between Africa and Australia?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 1 },
  { q: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Readable Link", "Unified Routing Layer", "Uniform Route Locator"], answer: 0 },
  { q: "Largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], answer: 2 },
  { q: "Chemical symbol for Gold?", options: ["Au", "Ag", "Gd", "Go"], answer: 0 },
  { q: "How many bytes are in a kilobyte (binary)?", options: ["1000", "1024", "512", "2048"], answer: 1 },
  { q: "Which city is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
  { q: "Which is a frontend framework?", options: ["Django", "Laravel", "React", "Rails"], answer: 2 },
  { q: "Which organ is responsible for breathing?", options: ["Liver", "Kidney", "Lungs", "Stomach"], answer: 2 },
  { q: "Which device stores data permanently?", options: ["RAM", "Cache", "SSD", "Registers"], answer: 2 },
  { q: "The process of plants making food is?", options: ["Respiration", "Transpiration", "Photosynthesis", "Germination"], answer: 2 },
  { q: "Which country is called the Land of the Rising Sun?", options: ["China", "South Korea", "Japan", "Thailand"], answer: 2 },
  { q: "HTML element for largest heading?", options: ["<h6>", "<h1>", "<head>", "<header>"], answer: 1 },
  { q: "CSS property to change text color?", options: ["background-color", "font-color", "color", "text-color"], answer: 2 }
];
while (QUESTIONS_POOL.length < 50) {
  QUESTIONS_POOL.push(...QUESTIONS_POOL.slice(0, 50 - QUESTIONS_POOL.length));
}

// ====== Constants & Elements ======
const BOARD_KEY = 'kbc_board_v3';

const els = {
  // Screens
  startScreen: document.getElementById('startScreen'),
  gameScreen: document.getElementById('gameScreen'),

  // Start form
  startForm: document.getElementById('startForm'),
  startName: document.getElementById('startName'),
  startAge: document.getElementById('startAge'),

  // Game UI
  playerBadge: document.getElementById('playerBadge'),
  questionText: document.getElementById('questionText'),
  optionsGrid: document.getElementById('optionsGrid'),
  optionTemplate: document.getElementById('optionTemplate'),
  lockBtn: document.getElementById('lockBtn'),
  nextBtn: document.getElementById('nextBtn'),
  progress: document.getElementById('progress'),
  questionCounter: document.getElementById('questionCounter'),
  scoreCounter: document.getElementById('scoreCounter'),
  fiftyBtn: document.getElementById('fiftyBtn'),
  resetBtn: document.getElementById('resetBtn'),
  timer: document.getElementById('timer'),
  pauseBtn: document.getElementById('pauseBtn'),

  // Leaderboard
  leaderboardList: document.getElementById('leaderboardList'),
  clearBoardBtn: document.getElementById('clearBoardBtn'),

  // Result modal
  modal: document.getElementById('resultModal'),
  resultSummary: document.getElementById('resultSummary'),
  resultRemark: document.getElementById('resultRemark'),
  timeTakenLine: document.getElementById('timeTakenLine'),
  playAgainBtn: document.getElementById('playAgainBtn'),
  closeModalBtn: document.getElementById('closeModalBtn'),

  // Back to Menu button (add this in your HTML controls next to Reset/Pause if not present)
  backBtn: document.getElementById('backBtn'),
};

// ====== Game State ======
let state = {
  // Player
  playerName: '',
  playerAge: 0,

  // Game
  questions: [],
  index: 0,
  score: 0,
  selected: null,
  locked: false,
  eliminated: new Set(),
  fiftyLeft: 2,

  // Timer
  timerDuration: 30,
  timeLeft: 30,
  timerId: null,
  startTime: 0,
  endTime: 0,

  // Pause
  pauseUsed: false,
  paused: false,

  // Per-question shuffled view
  currentView: null,
};

let lastResult = null;

// ====== Leaderboard init on load ======
renderBoard();

// ====== Start Form ======
els.startForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = els.startName.value.trim();
  const age = parseInt(els.startAge.value, 10);

  if (!name || isNaN(age) || age < 5 || age > 120) {
    alert('Please enter a valid name and age (5–120).');
    return;
  }

  state.playerName = name;
  state.playerAge = age;

  startGame();
});

// ====== Back to Menu ======
if (els.backBtn) {
  els.backBtn.addEventListener('click', backToMenu);
}
function backToMenu() {
  // Stop current game state safely
  stopTimer();
  // Hide game, show start
  els.gameScreen.classList.add('hidden');
  els.startScreen.classList.remove('hidden');
  // Reset the form for new person
  els.startForm.reset();
  // Reset key state bits so next start is clean
  state.selected = null;
  state.locked = false;
  state.eliminated.clear();
  state.fiftyLeft = 2;
  state.pauseUsed = false;
  state.paused = false;
  document.body.classList.remove('paused');
  // Keep leaderboard as-is (do not clear)
  setTimeout(() => els.startName && els.startName.focus(), 0);
}

// ====== Start Game ======
function startGame() {
  // Screens
  els.startScreen.classList.add('hidden');
  els.gameScreen.classList.remove('hidden');

  // Player badge
  els.playerBadge.textContent = `${state.playerName} • ${state.playerAge} yrs`;

  // Reset game state
  state.questions = pickRandom(QUESTIONS_POOL, 10);
  state.index = 0;
  state.score = 0;
  state.selected = null;
  state.locked = false;
  state.eliminated = new Set();
  state.fiftyLeft = 2;
  els.fiftyBtn.disabled = false;
  els.fiftyBtn.textContent = `50-50 (${state.fiftyLeft} left)`;

  state.timerDuration = 30;
  state.timeLeft = 30;
  state.startTime = Date.now();
  state.endTime = 0;

  state.pauseUsed = false;
  state.paused = false;
  els.pauseBtn.disabled = false;
  els.pauseBtn.textContent = 'Pause (1)';
  document.body.classList.remove('paused');

  state.currentView = null;

  hideModal();
  renderQuestion();
  updateCounters();
  updateProgress();
}

// ====== Utilities ======
function pickRandom(arr, n) {
  const copy = [...arr];
  shuffle(copy);
  return copy.slice(0, n);
}
function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function optionPrefix(i) { return ['A)', 'B)', 'C)', 'D)'][i] || `${i+1})`; }
function escapeHtml(str='') {
  return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

// Create shuffled view for current question while retaining correct index
function createShuffledQuestionView(qItem) {
  const opts = qItem.options.map((text, idx) => ({ text, originalIndex: idx }));
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  const correctNewIndex = opts.findIndex(o => o.originalIndex === qItem.answer);
  return {
    q: qItem.q,
    options: opts.map(o => o.text),
    correctIndex: correctNewIndex,
    mapNewToOriginal: opts.map(o => o.originalIndex)
  };
}

// ====== Rendering ======
function renderQuestion() {
  stopTimer();
  const baseItem = state.questions[state.index];

  // Build shuffled view for this step
  const view = createShuffledQuestionView(baseItem);
  state.currentView = view;

  els.questionText.textContent = view.q;
  els.optionsGrid.innerHTML = '';

  view.options.forEach((opt, i) => {
    const node = els.optionTemplate.content.cloneNode(true);
    const btn = node.querySelector('.option');
    const label = node.querySelector('.label');
    btn.dataset.index = i;
    label.textContent = optionPrefix(i) + ' ' + opt;
    btn.addEventListener('click', () => onSelect(i, btn));
    els.optionsGrid.appendChild(node);
  });

  state.selected = null;
  state.locked = false;
  state.eliminated = new Set();
  els.lockBtn.disabled = true;
  els.nextBtn.disabled = true;

  state.timeLeft = state.timerDuration;
  updateTimerText();
  startTimer();
}

function updateCounters() {
  els.questionCounter.textContent = `Q${state.index + 1}/10`;
  els.scoreCounter.textContent = `Score: ${state.score}`;
}
function updateProgress() {
  const pct = (state.index / 10) * 100;
  els.progress.style.width = `${pct}%`;
}

// ====== Selection and Locking ======
function onSelect(i, btn) {
  if (state.locked || state.paused) return;
  if (state.eliminated.has(i)) return;

  [...els.optionsGrid.querySelectorAll('.option')].forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.selected = i;
  els.lockBtn.disabled = false;
}
function lockAnswer(force = false) {
  if ((state.selected === null && !force) || state.locked) return;
  state.locked = true;
  stopTimer();

  const correctIndex = state.currentView.correctIndex;
  const buttons = [...els.optionsGrid.querySelectorAll('.option')];

  buttons.forEach((b, i) => {
    b.classList.add('locked');
    if (i === correctIndex) b.classList.add('correct');
    if (i !== correctIndex && i === state.selected) b.classList.add('incorrect');
  });

  if (state.selected === correctIndex) state.score += 1;

  updateCounters();
  els.nextBtn.disabled = false;
  els.lockBtn.disabled = true;
}

// ====== Next Question ======
els.nextBtn.addEventListener('click', nextQuestion);
function nextQuestion() {
  if (state.index < 9) {
    state.index += 1;
    state.currentView = null;
    updateCounters();
    updateProgress();
    triggerNextAnimation();
    renderQuestion();
  } else {
    showResult();
  }
}
function triggerNextAnimation() {
  els.nextBtn.style.transform = 'scale(0.98)';
  setTimeout(() => { els.nextBtn.style.transform = ''; }, 150);
}

// ====== Lifelines ======
els.fiftyBtn.addEventListener('click', useFifty);
function useFifty() {
  if (state.locked || state.paused) return;
  if (state.fiftyLeft <= 0) return;

  const correct = state.currentView.correctIndex;
  const indices = [0,1,2,3].filter(i => i !== correct);
  shuffle(indices);
  const toEliminate = indices.slice(0, 2);
  state.eliminated = new Set(toEliminate);

  [...els.optionsGrid.querySelectorAll('.option')].forEach((btn, i) => {
    if (state.eliminated.has(i)) {
      btn.disabled = true;
      btn.style.opacity = 0.55;
    }
  });

  if (state.selected !== null && state.eliminated.has(state.selected)) {
    state.selected = null;
    els.lockBtn.disabled = true;
    [...els.optionsGrid.querySelectorAll('.option')].forEach(b => b.classList.remove('selected'));
  }

  state.fiftyLeft -= 1;
  els.fiftyBtn.textContent = `50-50 (${state.fiftyLeft} left)`;
  if (state.fiftyLeft === 0) els.fiftyBtn.disabled = true;
}

// ====== Timer ======
function startTimer() {
  stopTimer();
  state.paused = false;
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerText();
    if (state.timeLeft <= 0) {
      stopTimer();
      lockAnswer(true);
      els.nextBtn.disabled = false;
      els.lockBtn.disabled = true;
    }
  }, 1000);
}
function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}
function updateTimerText() {
  const t = Math.max(state.timeLeft, 0);
  els.timer.textContent = `${t}s`;
  if (t <= 10 && !state.paused) {
    els.timer.style.background = 'rgba(245,158,11,.15)';
    els.timer.style.borderColor = 'var(--warning)';
    els.timer.style.color = '#fde68a';
  } else if (state.paused) {
    // paused state styled via body.paused in CSS
  } else {
    els.timer.style.background = '#0b1220';
    els.timer.style.borderColor = 'var(--border)';
    els.timer.style.color = '#fff';
  }
}

// ====== Pause (one-time) ======
els.pauseBtn.addEventListener('click', togglePause);
function togglePause() {
  if (state.pauseUsed && !state.paused) return; // only once per game
  if (!state.paused) {
    stopTimer();
    state.paused = true;
    state.pauseUsed = true;
    els.pauseBtn.textContent = 'Resume';
    document.body.classList.add('paused');
    // Disable interactions while paused
    els.lockBtn.disabled = true;
    els.fiftyBtn.disabled = true;
    [...els.optionsGrid.querySelectorAll('.option')].forEach(b => b.disabled = true);
  } else {
    state.paused = false;
    els.pauseBtn.textContent = 'Pause (0)';
    document.body.classList.remove('paused');
    // Re-enable interactions as per state
    if (!state.locked) {
      els.fiftyBtn.disabled = state.fiftyLeft === 0;
      [...els.optionsGrid.querySelectorAll('.option')].forEach((b,i) => {
        b.disabled = state.eliminated.has(i);
      });
      els.lockBtn.disabled = (state.selected === null);
    }
    startTimer();
    els.pauseBtn.disabled = true; // cannot pause again
  }
}

// ====== Results + Leaderboard ======
function showResult() {
  els.progress.style.width = '100%';
  stopTimer();
  state.endTime = Date.now();

  const total = 10;
  const score = state.score;
  els.resultSummary.textContent = `${state.playerName} (${state.playerAge}) scored ${score}/${total}`;

  const percent = Math.round((score / total) * 100);
  let remark = '';
  if (percent === 100) remark = 'Outstanding! Perfect score!';
  else if (percent >= 80) remark = 'Excellent performance!';
  else if (percent >= 60) remark = 'Good job! Keep practicing.';
  else if (percent >= 40) remark = 'Not bad. Review and try again.';
  else remark = 'Better luck next time!';
  els.resultRemark.textContent = remark;

  const timeTakenSec = Math.max(1, Math.round((state.endTime - state.startTime) / 1000));
  els.timeTakenLine.textContent = `Time taken: ${timeTakenSec}s`;

  // Persist to leaderboard
  addToBoard(state.playerName, state.playerAge, score, timeTakenSec, new Date().toISOString());
  renderBoard();

  showModal();
}

function showModal() { els.modal.classList.remove('hidden'); }
function hideModal() { els.modal.classList.add('hidden'); }

// Leaderboard storage
function loadBoard() {
  try {
    const raw = localStorage.getItem(BOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveBoard(board) {
  localStorage.setItem(BOARD_KEY, JSON.stringify(board));
}
function addToBoard(name, age, score, time, isoDate) {
  const board = loadBoard();
  board.push({ name, age, score, time, date: isoDate });
  // Sort: score desc, time asc, date desc
  board.sort((a,b) => (b.score - a.score) || (a.time - b.time) || (new Date(b.date) - new Date(a.date)));
  saveBoard(board);
}

// Render leaderboard with trophies for top 3, others follow
function renderBoard() {
  const board = loadBoard();
  els.leaderboardList.innerHTML = '';
  if (board.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No scores yet. Start a game!';
    els.leaderboardList.appendChild(li);
    return;
  }
  const trophy = (idx) => idx===0?'🥇':idx===1?'🥈':idx===2?'🥉':'';

  board.forEach((e, idx) => {
    const li = document.createElement('li');
    const date = new Date(e.date);
    const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    const prefix = trophy(idx) ? `${trophy(idx)} ` : `${idx+1}. `;
    li.innerHTML = `${prefix}${escapeHtml(e.name)} (${e.age}) — Score: ${e.score}/10, Time: ${e.time}s<br><small>${dateStr}</small>`;
    els.leaderboardList.appendChild(li);
  });
}

// ====== Clear Board (optional admin) ======
els.clearBoardBtn.addEventListener('click', () => {
  if (confirm('Clear entire leaderboard? This cannot be undone.')) {
    localStorage.removeItem(BOARD_KEY);
    renderBoard();
  }
});

// ====== Modal & Controls ======
els.playAgainBtn.addEventListener('click', () => {
  hideModal();
  backToMenu(); // go back so a new person can be added; board preserved
});
els.closeModalBtn.addEventListener('click', hideModal);
els.resetBtn.addEventListener('click', () => {
  if (confirm('Restart this game?')) {
    stopTimer();
    startGame();
  }
});
els.lockBtn.addEventListener('click', () => lockAnswer(false));

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'enter' && !els.lockBtn.disabled) lockAnswer(false);
  if (k === 'n' && !els.nextBtn.disabled) nextQuestion();
  if (k === 'p' && !els.pauseBtn.disabled) togglePause();
});
