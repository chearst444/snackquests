// Player progress persistence via localStorage. Falls back to an in-memory
// store if localStorage is unavailable (e.g. private browsing edge cases),
// so the game still runs — progress just won't survive a reload.

const KEY = 'chronoflow_progress_v1';

function makeMemoryStore() {
  let data = null;
  return {
    getItem: () => data,
    setItem: (_, v) => { data = v; },
  };
}

let backend;
try {
  const testKey = '__cf_test__';
  window.localStorage.setItem(testKey, '1');
  window.localStorage.removeItem(testKey);
  backend = window.localStorage;
} catch (_) {
  backend = makeMemoryStore();
}

function defaultProgress() {
  return { unlocked: 1, stars: {}, bestTime: {}, hasSeenIntro: false };
}

export function loadProgress() {
  try {
    const raw = backend.getItem(KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    return { ...defaultProgress(), ...parsed };
  } catch (_) {
    return defaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    backend.setItem(KEY, JSON.stringify(progress));
  } catch (_) { /* best effort */ }
}

export function markIntroSeen() {
  const progress = loadProgress();
  if (progress.hasSeenIntro) return progress;
  progress.hasSeenIntro = true;
  saveProgress(progress);
  return progress;
}

export function recordWin(levelNumber, stars, timeRemaining, levelCount) {
  const progress = loadProgress();
  const prevStars = progress.stars[levelNumber] || 0;
  progress.stars[levelNumber] = Math.max(prevStars, stars);
  const prevBest = progress.bestTime[levelNumber];
  if (prevBest === undefined || timeRemaining > prevBest) {
    progress.bestTime[levelNumber] = timeRemaining;
  }
  if (levelNumber >= progress.unlocked && levelNumber < levelCount) {
    progress.unlocked = levelNumber + 1;
  }
  saveProgress(progress);
  return progress;
}
