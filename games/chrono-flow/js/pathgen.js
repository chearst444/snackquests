// Randomized self-avoiding walk generators used to build guaranteed-solvable
// Chrono-Flow levels: a main corridor from start to target, short dead-end
// decoy spurs, and (tier 3) a small loop that shares one "junction" cell
// with the main corridor so the drawn path legitimately crosses itself.

import { shuffle, randInt } from './rng.js';

const DIRS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export function key(x, y) {
  return x + ',' + y;
}

function inBounds(x, y, cols, rows) {
  return x >= 0 && x < cols && y >= 0 && y < rows;
}

function neighborsOf(x, y, cols, rows, rng) {
  const opts = [];
  for (const d of DIRS) {
    const nx = x + d.x, ny = y + d.y;
    if (inBounds(nx, ny, cols, rows)) opts.push({ x: nx, y: ny });
  }
  return shuffle(rng, opts);
}

export function areAdjacent(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
}

// Randomized DFS with backtracking: grows a self-avoiding walk of exactly
// `targetLen` cells, avoiding any cell in `blocked`. Returns null if no walk
// of that length could be found after a bounded number of restarts.
export function generateWalk(cols, rows, targetLen, rng, blocked = new Set(), start = null) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const sx = start ? start.x : randInt(rng, 0, cols - 1);
    const sy = start ? start.y : randInt(rng, 0, rows - 1);
    if (blocked.has(key(sx, sy))) { if (start) return null; continue; }

    const path = [{ x: sx, y: sy }];
    const visited = new Set([key(sx, sy)]);
    const optionsStack = [neighborsOf(sx, sy, cols, rows, rng)];

    while (path.length < targetLen) {
      if (optionsStack.length === 0) break;
      const opts = optionsStack[optionsStack.length - 1];
      let moved = false;
      while (opts.length) {
        const cand = opts.pop();
        const k = key(cand.x, cand.y);
        if (visited.has(k) || blocked.has(k)) continue;
        path.push(cand);
        visited.add(k);
        optionsStack.push(neighborsOf(cand.x, cand.y, cols, rows, rng));
        moved = true;
        break;
      }
      if (!moved) {
        optionsStack.pop();
        path.pop();
        if (path.length === 0) break;
      }
    }
    if (path.length >= targetLen) return path.slice(0, targetLen);
    if (start) return null; // fixed start must succeed on its own merits
  }
  return null;
}

// Randomized DFS maze-solve: finds *a* self-avoiding walk connecting `from`
// to `to`, avoiding `blocked`, capped at maxLen cells. Used for junction loops.
export function connectPoints(cols, rows, from, to, blocked, rng, maxLen) {
  const target = key(to.x, to.y);
  const visited = new Set([key(from.x, from.y)]);
  const path = [{ x: from.x, y: from.y }];
  const optionsStack = [neighborsOf(from.x, from.y, cols, rows, rng)];

  while (path.length > 0) {
    if (key(path[path.length - 1].x, path[path.length - 1].y) === target && path.length > 1) {
      return path;
    }
    if (path.length >= maxLen) {
      // backtrack, this branch is too long
      optionsStack.pop();
      const dead = path.pop();
      visited.delete(key(dead.x, dead.y));
      continue;
    }
    const opts = optionsStack[optionsStack.length - 1];
    let moved = false;
    while (opts.length) {
      const cand = opts.pop();
      const k = key(cand.x, cand.y);
      if (k === target) {
        path.push(cand);
        return path;
      }
      if (visited.has(k) || blocked.has(k)) continue;
      path.push(cand);
      visited.add(k);
      optionsStack.push(neighborsOf(cand.x, cand.y, cols, rows, rng));
      moved = true;
      break;
    }
    if (!moved) {
      optionsStack.pop();
      const dead = path.pop();
      if (dead) visited.delete(key(dead.x, dead.y));
    }
  }
  return null;
}

// Grows a short dead-end spur (a decoy branch) off `origin`, avoiding `blocked`.
export function generateSpur(cols, rows, origin, len, rng, blocked) {
  const localBlocked = new Set(blocked);
  localBlocked.delete(key(origin.x, origin.y));
  const walk = generateWalk(cols, rows, len + 1, rng, localBlocked, origin);
  if (!walk) return null;
  return walk.slice(1); // drop origin itself, caller already has it
}
