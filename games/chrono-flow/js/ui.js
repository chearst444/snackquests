// DOM screen management: title / level-select / gameplay HUD / win-lose
// modal. Pure DOM plumbing — no game rules live here.

import { LEVEL_COUNT, tierOf, tierLabel } from './levels.js';
import { loadProgress } from './storage.js';

const $ = (id) => document.getElementById(id);

export const screens = {
  title: $('screen-title'),
  levels: $('screen-levels'),
  game: $('screen-game'),
};

export function showScreen(name) {
  for (const key of Object.keys(screens)) {
    screens[key].classList.toggle('active', key === name);
  }
}

export function renderLevelSelect(onPick) {
  const progress = loadProgress();
  const container = $('tier-list');
  container.innerHTML = '';

  const tiers = [
    { tier: 1, range: [1, 10] },
    { tier: 2, range: [11, 30] },
    { tier: 3, range: [31, 60] },
  ];

  for (const t of tiers) {
    const block = document.createElement('div');
    block.className = 'tier-block';

    const title = document.createElement('div');
    title.className = 'tier-title';
    title.textContent = `Tier ${t.tier} — ${tierLabel(t.tier)}`;
    block.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'tier-grid';

    for (let n = t.range[0]; n <= t.range[1] && n <= LEVEL_COUNT; n++) {
      const btn = document.createElement('button');
      const locked = n > progress.unlocked;
      const stars = progress.stars[n] || 0;
      btn.className = 'level-btn' + (locked ? ' locked' : '') + (stars > 0 ? ' done' : '');
      btn.disabled = locked;
      btn.innerHTML = `<span>${locked ? '&#128274;' : n}</span>` +
        (!locked ? `<span class="stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>` : '');
      if (!locked) btn.addEventListener('click', () => onPick(n));
      grid.appendChild(btn);
    }
    block.appendChild(grid);
    container.appendChild(block);
  }
}

export function setHudLevel(n) {
  $('hud-level').textContent = `Level ${n} — Tier ${tierOf(n)}`;
}

export function setHudStatus(text) {
  $('hud-status').textContent = text || '';
}

export function updateTimerBar(fraction) {
  const fill = $('timer-fill');
  fill.style.transform = `scaleX(${Math.max(0, Math.min(1, fraction))})`;
}

export function showModal({ title, starsLit, body, showNext }) {
  $('modal-title').textContent = title;
  const starsEl = $('modal-stars');
  starsEl.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span');
    span.className = 'star' + (i < starsLit ? ' lit' : '');
    span.innerHTML = '&#9733;';
    starsEl.appendChild(span);
  }
  $('modal-body').textContent = body;
  $('btn-modal-next').style.display = showNext ? '' : 'none';
  $('modal-overlay').classList.add('active');
}

export function hideModal() {
  $('modal-overlay').classList.remove('active');
}

export function showHowTo() {
  $('howto-overlay').classList.add('active');
}

export function hideHowTo() {
  $('howto-overlay').classList.remove('active');
}

export const el = $;
