// Procedural level generator for Chrono-Flow's 60 levels, tuned to the
// three difficulty tiers from the design brief. Every level is derived
// deterministically from its number, and every generated path is, by
// construction, a valid solution — so every level is guaranteed solvable.

import { makeRng, randInt, shuffle } from './rng.js';
import { generateWalk, connectPoints, generateSpur, key, areAdjacent } from './pathgen.js';

export const LEVEL_COUNT = 60;

function tierOf(n) {
  if (n <= 10) return 1;
  if (n <= 30) return 2;
  return 3;
}

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function tierParams(n) {
  const tier = tierOf(n);
  if (tier === 1) {
    const p = (n - 1) / 9;
    return {
      tier,
      progress: p,
      pathLen: Math.round(lerp(5, 11, p)),
      greenCount: Math.round(lerp(2, 4, p)),
      decoyCount: 0,
      capacitorCount: 0,
      allowJunction: false,
      greyFill: false,
      maxBoard: 7,
    };
  }
  if (tier === 2) {
    const p = (n - 11) / 19;
    return {
      tier,
      progress: p,
      pathLen: Math.round(lerp(10, 20, p)),
      greenCount: Math.round(lerp(3, 7, p)),
      decoyCount: n < 15 ? 0 : Math.round(lerp(1, 3, p)),
      capacitorCount: 0,
      allowJunction: false,
      greyFill: true,
      maxBoard: 10,
    };
  }
  const p = (n - 31) / 29;
  return {
    tier: 3,
    progress: p,
    pathLen: Math.round(lerp(16, 32, p)),
    greenCount: Math.round(lerp(4, 10, p)),
    decoyCount: Math.round(lerp(2, 4, p)),
    capacitorCount: Math.round(lerp(1, 5, p)),
    allowJunction: p > 0.12 && n % 2 === 1,
    greyFill: true,
    maxBoard: 13,
    capacitorDwellMs: lerp(2400, 1400, p),
  };
}

function evenlySpacedIndices(poolLen, count, offset = 1) {
  // Picks `count` indices out of [offset, offset+poolLen) spread evenly.
  const out = [];
  if (count <= 0 || poolLen <= 0) return out;
  for (let i = 1; i <= count; i++) {
    const idx = offset + Math.min(poolLen - 1, Math.round((i * poolLen) / (count + 1)));
    out.push(idx);
  }
  return [...new Set(out)];
}

function tryBuildJunction(cols, rows, mainPath, usedSet, rng) {
  const lo = Math.floor(mainPath.length * 0.3);
  const hi = Math.ceil(mainPath.length * 0.7);
  const candidates = shuffle(rng, Array.from({ length: hi - lo }, (_, i) => lo + i));

  for (const j of candidates) {
    const J = mainPath[j];
    const freeNeighbors = [];
    for (const d of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = J.x + d[0], ny = J.y + d[1];
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      const k = key(nx, ny);
      if (!usedSet.has(k)) freeNeighbors.push({ x: nx, y: ny });
    }
    if (freeNeighbors.length < 2) continue;
    const pairs = shuffle(rng, freeNeighbors).slice(0, 4);
    for (let a = 0; a < pairs.length; a++) {
      for (let b = a + 1; b < pairs.length; b++) {
        const blocked = new Set(usedSet);
        blocked.add(key(J.x, J.y));
        const loop = connectPoints(cols, rows, pairs[a], pairs[b], blocked, rng, 8);
        if (loop) {
          return { index: j, loop };
        }
      }
    }
  }
  return null;
}

function boardSizeFor(pathLen, maxBoard) {
  const size = Math.ceil(Math.sqrt(pathLen * 3));
  return Math.max(5, Math.min(maxBoard, size));
}

function buildRaw(n) {
  const params = tierParams(n);
  const rng = makeRng(n * 104729 + 17);

  let mainPath = null;
  let cols = 0, rows = 0;
  let size = boardSizeFor(params.pathLen, params.maxBoard);

  for (let grow = 0; grow < 6 && !mainPath; grow++) {
    cols = rows = Math.min(params.maxBoard, size + grow);
    mainPath = generateWalk(cols, rows, params.pathLen, rng);
  }
  if (!mainPath) {
    // Last-resort fallback: shorter path on the largest allowed board.
    cols = rows = params.maxBoard;
    mainPath = generateWalk(cols, rows, Math.max(4, Math.floor(params.pathLen * 0.6)), rng);
  }
  if (!mainPath) throw new Error('Failed to generate level ' + n);

  const usedSet = new Set(mainPath.map((c) => key(c.x, c.y)));
  const tiles = new Map();
  mainPath.forEach((c, i) => {
    let kind = 'blue';
    if (i === 0) kind = 'start';
    else if (i === mainPath.length - 1) kind = 'target';
    tiles.set(key(c.x, c.y), { x: c.x, y: c.y, kind, junction: false, capacitor: false });
  });

  // Green data nodes: evenly spaced among the interior of the path.
  const interiorCount = mainPath.length - 2;
  const greenIdx = evenlySpacedIndices(interiorCount, Math.min(params.greenCount, interiorCount));
  const greenIdxSet = new Set(greenIdx);
  for (const i of greenIdx) {
    const c = mainPath[i];
    tiles.get(key(c.x, c.y)).kind = 'green';
  }

  // Capacitors (tier 3): evenly spaced among remaining interior cells.
  let capacitorDwellMs = null;
  if (params.capacitorCount > 0) {
    capacitorDwellMs = Math.round(params.capacitorDwellMs);
    const pool = [];
    for (let i = 1; i < mainPath.length - 1; i++) if (!greenIdxSet.has(i)) pool.push(i);
    const capIdx = evenlySpacedIndices(pool.length, Math.min(params.capacitorCount, pool.length), 0)
      .map((k) => pool[k - 1]).filter((v) => v !== undefined);
    for (const i of capIdx) {
      const c = mainPath[i];
      const t = tiles.get(key(c.x, c.y));
      t.kind = 'yellow';
      t.capacitor = true;
    }
  }

  // Junction (tier 3, some levels): splice a small self-crossing loop in.
  let junctionKey = null;
  let finalSequenceLen = mainPath.length;
  if (params.allowJunction) {
    const built = tryBuildJunction(cols, rows, mainPath, usedSet, rng);
    if (built) {
      const J = mainPath[built.index];
      const jKey = key(J.x, J.y);
      tiles.get(jKey).junction = true;
      junctionKey = jKey;
      for (const c of built.loop) {
        const k = key(c.x, c.y);
        if (!tiles.has(k)) tiles.set(k, { x: c.x, y: c.y, kind: 'blue', junction: false, capacitor: false });
        usedSet.add(k);
      }
      finalSequenceLen += built.loop.length + 1; // loop cells + the revisit of J
    }
  }

  // Decoy dead-end spurs (tier 2+): traversable but lead nowhere useful.
  for (let d = 0; d < params.decoyCount; d++) {
    const originIdx = randInt(rng, 1, mainPath.length - 2);
    const origin = mainPath[originIdx];
    const len = randInt(rng, 2, 3);
    const spur = generateSpur(cols, rows, origin, len, rng, usedSet);
    if (!spur) continue;
    for (const c of spur) {
      const k = key(c.x, c.y);
      tiles.set(k, { x: c.x, y: c.y, kind: 'blue', junction: false, capacitor: false });
      usedSet.add(k);
    }
  }

  // Grey obstacle fill (tier 2+): every unused cell in the bounding box.
  if (params.greyFill) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const k = key(x, y);
        if (!tiles.has(k)) tiles.set(k, { x, y, kind: 'grey', junction: false, capacitor: false });
      }
    }
  }

  const start = mainPath[0];
  const target = mainPath[mainPath.length - 1];
  const greenKeys = new Set(greenIdx.map((i) => key(mainPath[i].x, mainPath[i].y)));

  const timeLimit = computeTimeLimit(params, finalSequenceLen, greenKeys.size, params.capacitorCount, !!junctionKey);

  return {
    number: n,
    tier: params.tier,
    cols, rows,
    tiles,
    startKey: key(start.x, start.y),
    targetKey: key(target.x, target.y),
    greenKeys,
    junctionKey,
    capacitorDwellMs,
    timeLimit,
  };
}

function computeTimeLimit(params, steps, greenCount, capacitorCount, hasJunction) {
  const p = params.progress;
  let base, perStep, perGreen;
  if (params.tier === 1) { base = 8; perStep = lerp(3.2, 2.2, p); perGreen = 2.0; }
  else if (params.tier === 2) { base = 6; perStep = lerp(2.0, 1.3, p); perGreen = 1.5; }
  else { base = 6; perStep = lerp(1.3, 0.85, p); perGreen = 1.2; }

  let seconds = base + steps * perStep + greenCount * perGreen;
  if (params.tier === 3) seconds += capacitorCount * lerp(3.0, 1.8, p);
  if (hasJunction) seconds += 3;
  return Math.round(seconds);
}

const cache = new Map();

export function getLevel(n) {
  if (n < 1 || n > LEVEL_COUNT) return null;
  if (cache.has(n)) return cache.get(n);
  const lvl = buildRaw(n);
  cache.set(n, lvl);
  return lvl;
}

export function tierLabel(tier) {
  return tier === 1 ? 'Live Wire' : tier === 2 ? 'Dead Grid' : 'Overcharge';
}

export { tierOf, areAdjacent };
