// Core Chrono-Flow game engine: owns the current level's live state (the
// path being drawn, the countdown timer, capacitor decay) and exposes a
// small event API the UI/render layers subscribe to. No DOM/canvas code here.

import { getLevel } from './levels.js';
import { areAdjacent } from './pathgen.js';

const MAX_VISITS = { junction: 2, default: 1 };

export const Phase = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};

export class ChronoFlowGame {
  constructor() {
    this.level = null;
    this.path = [];          // array of tile keys, in order, from start
    this.visitCounts = new Map();
    this.phase = Phase.IDLE;
    this.timeRemaining = 0;
    this.timeLimit = 0;
    this.capacitorKey = null;
    this.capacitorEnteredAt = 0;
    this.loseReason = null;
    this._listeners = {};
    this._rafId = null;
    this._lastTick = 0;
  }

  on(event, fn) {
    (this._listeners[event] ||= []).push(fn);
  }

  _emit(event, payload) {
    for (const fn of this._listeners[event] || []) fn(payload);
  }

  loadLevel(n) {
    this.stopLoop();
    const level = getLevel(n);
    this.level = level;
    this.path = [level.startKey];
    this.visitCounts = new Map([[level.startKey, 1]]);
    this.phase = Phase.PLAYING;
    this.timeLimit = level.timeLimit;
    this.timeRemaining = level.timeLimit;
    this.capacitorKey = null;
    this.capacitorEnteredAt = 0;
    this.loseReason = null;
    this._lastTick = performance.now();
    this._startLoop();
    this._emit('pathchange', this.path);
    this._emit('tick', this.timeRemaining);
    return level;
  }

  reset() {
    if (!this.level) return;
    this.loadLevel(this.level.number);
  }

  _startLoop() {
    const step = (now) => {
      if (this.phase !== Phase.PLAYING) return;
      const dt = now - this._lastTick;
      this._lastTick = now;
      this.timeRemaining = Math.max(0, this.timeRemaining - dt / 1000);
      this._emit('tick', this.timeRemaining);

      if (this.timeRemaining <= 0) {
        this._fail('time');
        return;
      }
      if (this.capacitorKey !== null) {
        const dwell = now - this.capacitorEnteredAt;
        const limit = this.level.capacitorDwellMs;
        this._emit('capacitor', { key: this.capacitorKey, dwell, limit });
        if (dwell >= limit) {
          this._fail('capacitor');
          return;
        }
      }
      this._rafId = requestAnimationFrame(step);
    };
    this._rafId = requestAnimationFrame(step);
  }

  stopLoop() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  _fail(reason) {
    this.phase = Phase.LOST;
    this.loseReason = reason;
    this.stopLoop();
    this._emit('lost', { reason });
  }

  maxVisitsFor(key) {
    const tile = this.level.tiles.get(key);
    return tile && tile.junction ? MAX_VISITS.junction : MAX_VISITS.default;
  }

  headTile() {
    return this.level.tiles.get(this.path[this.path.length - 1]);
  }

  // Attempt to extend the path onto the tile at `key`. Returns true if the
  // path changed (extended or trimmed).
  tryMove(targetKey) {
    if (this.phase !== Phase.PLAYING) return false;
    const level = this.level;
    const tile = level.tiles.get(targetKey);
    if (!tile) return false;
    if (tile.kind === 'grey') return false;

    if (targetKey === this.path[this.path.length - 1]) return false; // no-op, already head

    // Retreat: dragging back onto the tile immediately behind the head
    // pops it off (single-step undo). Checked before forward-extend so
    // backing off a junction tile you just left doesn't get mistaken for
    // a legitimate second pass through it.
    if (this.path.length >= 2 && this.path[this.path.length - 2] === targetKey) {
      this._truncateTo(this.path.length - 2);
      return true;
    }

    const head = this.path[this.path.length - 1];
    const headTile = level.tiles.get(head);
    const count = this.visitCounts.get(targetKey) || 0;
    if (areAdjacent(headTile, tile) && count < this.maxVisitsFor(targetKey)) {
      // Forward extend. On a junction tile (max 2 visits) this legitimately
      // adds a second, crossing pass through the same cell.
      this.path.push(targetKey);
      this.visitCounts.set(targetKey, count + 1);
      this._onHeadChanged(targetKey);
      this._emit('pathchange', this.path);
      if (targetKey === level.targetKey && this._allGreensVisited()) this._win();
      return true;
    }

    // Otherwise, if this tile is further back in the current path, treat a
    // drag onto it as a longer trim back to that point.
    const existingIdx = this.path.lastIndexOf(targetKey);
    if (existingIdx !== -1) {
      this._truncateTo(existingIdx);
      return true;
    }
    return false;
  }

  _truncateTo(idx) {
    const removed = this.path.slice(idx + 1);
    for (const k of removed) {
      const c = this.visitCounts.get(k) || 0;
      if (c <= 1) this.visitCounts.delete(k);
      else this.visitCounts.set(k, c - 1);
    }
    this.path = this.path.slice(0, idx + 1);
    this._onHeadChanged(this.path[this.path.length - 1]);
    this._emit('pathchange', this.path);
  }

  _onHeadChanged(newHeadKey) {
    const tile = this.level.tiles.get(newHeadKey);
    if (tile && tile.capacitor) {
      if (this.capacitorKey !== newHeadKey) {
        this.capacitorKey = newHeadKey;
        this.capacitorEnteredAt = performance.now();
      }
    } else {
      this.capacitorKey = null;
    }
  }

  _allGreensVisited() {
    for (const gk of this.level.greenKeys) {
      if (!this.path.includes(gk)) return false;
    }
    return true;
  }

  _win() {
    this.phase = Phase.WON;
    this.stopLoop();
    const frac = this.timeLimit > 0 ? this.timeRemaining / this.timeLimit : 0;
    let stars = 1;
    if (frac > 0.5) stars = 3;
    else if (frac > 0.2) stars = 2;
    this._emit('won', { stars, timeRemaining: this.timeRemaining });
  }
}
