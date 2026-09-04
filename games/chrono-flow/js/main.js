import { ChronoFlowGame, Phase } from './game.js';
import { GridRenderer } from './render.js';
import { attachInput } from './input.js';
import { LEVEL_COUNT } from './levels.js';
import { recordWin, loadProgress, markIntroSeen } from './storage.js';
import {
  showScreen, renderLevelSelect, setHudLevel, setHudStatus,
  updateTimerBar, showModal, hideModal, showHowTo, hideHowTo, el,
} from './ui.js';

const canvas = el('grid-canvas');
const renderer = new GridRenderer(canvas);
const game = new ChronoFlowGame();
let currentLevelNumber = 1;
let detachInput = null;

function redraw() {
  if (!game.level) return;
  const capInfo = game.capacitorKey
    ? { key: game.capacitorKey, dwell: performance.now() - game.capacitorEnteredAt, limit: game.level.capacitorDwellMs }
    : null;
  renderer.draw(game.level, game.path, capInfo);
}

function startLevel(n) {
  currentLevelNumber = n;
  hideModal();
  showScreen('game');
  setHudStatus('');
  const level = game.loadLevel(n);
  setHudLevel(n);
  requestAnimationFrame(() => {
    renderer.resize(level);
    redraw();
  });
  if (detachInput) detachInput();
  detachInput = attachInput(canvas, renderer, game, redraw);
}

game.on('pathchange', redraw);

game.on('tick', (t) => {
  updateTimerBar(game.timeLimit > 0 ? t / game.timeLimit : 0);
  redraw();
});

game.on('capacitor', () => redraw());

game.on('won', ({ stars, timeRemaining }) => {
  recordWin(currentLevelNumber, stars, timeRemaining, LEVEL_COUNT);
  redraw();
  const hasNext = currentLevelNumber < LEVEL_COUNT;
  showModal({
    title: 'Network Charged',
    starsLit: stars,
    body: `Cleared with ${timeRemaining.toFixed(1)}s to spare.`,
    showNext: hasNext,
  });
});

game.on('lost', ({ reason }) => {
  redraw();
  const messages = {
    time: 'The timer ran out before the network was fully charged.',
    capacitor: 'A capacitor overloaded — it wasn’t discharged in time.',
  };
  setHudStatus(reason === 'time' ? 'Time expired' : 'Capacitor overload');
  showModal({
    title: 'Connection Lost',
    starsLit: 0,
    body: messages[reason] || 'The path failed.',
    showNext: false,
  });
});

window.addEventListener('resize', () => {
  if (game.level && game.phase !== Phase.IDLE) {
    renderer.resize(game.level);
    redraw();
  }
});

// ---------- Screen wiring ----------

el('btn-play').addEventListener('click', () => startLevel(1));
el('btn-levels').addEventListener('click', () => {
  renderLevelSelect(startLevel);
  showScreen('levels');
});
el('btn-levels-back').addEventListener('click', () => showScreen('title'));
el('btn-game-back').addEventListener('click', () => {
  game.stopLoop();
  hideModal();
  showScreen('title');
});
el('btn-reset').addEventListener('click', () => {
  hideModal();
  game.reset();
  redraw();
});

el('btn-modal-menu').addEventListener('click', () => {
  hideModal();
  showScreen('title');
});
el('btn-modal-retry').addEventListener('click', () => startLevel(currentLevelNumber));
el('btn-modal-next').addEventListener('click', () => startLevel(currentLevelNumber + 1));

el('btn-howto').addEventListener('click', () => showHowTo());
el('btn-howto-game').addEventListener('click', () => showHowTo());
el('btn-howto-close').addEventListener('click', () => hideHowTo());
el('howto-overlay').addEventListener('click', (evt) => {
  if (evt.target.id === 'howto-overlay') hideHowTo();
});

showScreen('title');

// First-ever visit: lead with the rules before anything else.
if (!loadProgress().hasSeenIntro) {
  markIntroSeen();
  showHowTo();
}
