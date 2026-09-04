// Canvas rendering for the Chrono-Flow grid: tiles, icons, the drawn path,
// and the capacitor decay ring. Keeps a "transform" (cell size + origin)
// so input.js can convert pointer coordinates back to grid cells.

import { TILE_COLORS, PATH_COLOR, PATH_GLOW, PALETTE } from './palette.js';

const GAP = 0.14; // fraction of cell size left as gap between tiles

export class GridRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.transform = { cell: 0, ox: 0, oy: 0, dpr: 1 };
  }

  resize(level) {
    const canvas = this.canvas;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    const cell = Math.min(cssW / level.cols, cssH / level.rows);
    const ox = (cssW - cell * level.cols) / 2;
    const oy = (cssH - cell * level.rows) / 2;
    this.transform = { cell, ox, oy, dpr };
  }

  cellCenter(x, y) {
    const { cell, ox, oy } = this.transform;
    return { cx: ox + cell * (x + 0.5), cy: oy + cell * (y + 0.5) };
  }

  pointToCell(px, py) {
    const { cell, ox, oy } = this.transform;
    if (cell <= 0) return null;
    const gx = Math.floor((px - ox) / cell);
    const gy = Math.floor((py - oy) / cell);
    return { x: gx, y: gy };
  }

  draw(level, path, capacitorInfo) {
    const ctx = this.ctx;
    const { cell, dpr } = this.transform;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    const pathSet = new Set(path);
    for (const tile of level.tiles.values()) {
      this._drawTile(tile, level, pathSet, cell);
    }
    this._drawPath(level, path, cell);
    if (capacitorInfo && capacitorInfo.key) {
      this._drawCapacitorRing(level, capacitorInfo, cell);
    }
    ctx.restore();
  }

  _drawTile(tile, level, pathSet, cell) {
    const ctx = this.ctx;
    const { cx, cy } = this.cellCenter(tile.x, tile.y);
    const size = cell * (1 - GAP);
    const r = size * 0.28;
    const colors = TILE_COLORS[tile.kind] || TILE_COLORS.blue;
    const isPath = pathSet.has(tile.x + ',' + tile.y);

    ctx.save();
    ctx.translate(cx, cy);

    roundRect(ctx, -size / 2, -size / 2, size, size, r);
    const grad = ctx.createLinearGradient(0, -size / 2, 0, size / 2);
    grad.addColorStop(0, colors.light);
    grad.addColorStop(1, colors.fill);
    ctx.fillStyle = tile.kind === 'grey' ? colors.fill : grad;
    ctx.globalAlpha = tile.kind === 'grey' ? 0.55 : 1;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = Math.max(2, size * 0.07);
    ctx.strokeStyle = colors.dark;
    ctx.stroke();

    if (isPath && tile.kind !== 'grey') {
      roundRect(ctx, -size / 2, -size / 2, size, size, r);
      ctx.lineWidth = Math.max(2, size * 0.09);
      ctx.strokeStyle = PALETTE.cream;
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    this._drawIcon(tile, size);
    ctx.restore();
  }

  _drawIcon(tile, size) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.strokeStyle = 'rgba(0,0,0,0.28)';

    switch (tile.kind) {
      case 'start': {
        ctx.fillStyle = PALETTE.plum;
        ctx.beginPath();
        const s = size * 0.22;
        ctx.moveTo(-s * 0.5, -s);
        ctx.lineTo(-s * 0.5, s);
        ctx.lineTo(s * 0.8, 0);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'target': {
        ctx.strokeStyle = PALETTE.cream;
        ctx.lineWidth = Math.max(2, size * 0.06);
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = PALETTE.cream;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.08, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'green': {
        drawBolt(ctx, size * 0.28);
        break;
      }
      case 'yellow': {
        drawBattery(ctx, size * 0.3);
        break;
      }
      default:
        break;
    }

    if (tile.junction) {
      ctx.strokeStyle = 'rgba(65,34,87,0.55)';
      ctx.lineWidth = Math.max(2, size * 0.08);
      const s = size * 0.26;
      ctx.beginPath();
      ctx.moveTo(-s, -s); ctx.lineTo(s, s);
      ctx.moveTo(s, -s); ctx.lineTo(-s, s);
      ctx.stroke();
    }
  }

  _drawPath(level, path, cell) {
    if (path.length < 2) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    path.forEach((k, i) => {
      const t = level.tiles.get(k);
      const { cx, cy } = this.cellCenter(t.x, t.y);
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    });
    ctx.strokeStyle = PATH_GLOW;
    ctx.lineWidth = cell * 0.42;
    ctx.stroke();

    ctx.beginPath();
    path.forEach((k, i) => {
      const t = level.tiles.get(k);
      const { cx, cy } = this.cellCenter(t.x, t.y);
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    });
    ctx.strokeStyle = PATH_COLOR;
    ctx.lineWidth = cell * 0.16;
    ctx.stroke();
    ctx.restore();
  }

  _drawCapacitorRing(level, info, cell) {
    const t = level.tiles.get(info.key);
    if (!t) return;
    const { cx, cy } = this.cellCenter(t.x, t.y);
    const frac = Math.max(0, 1 - info.dwell / info.limit);
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.arc(0, 0, cell * 0.42, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
    ctx.strokeStyle = frac < 0.3 ? PALETTE.coral : PALETTE.cream;
    ctx.lineWidth = Math.max(3, cell * 0.09);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBolt(ctx, s) {
  ctx.save();
  ctx.fillStyle = 'rgba(65,34,87,0.55)';
  ctx.beginPath();
  ctx.moveTo(s * 0.15, -s);
  ctx.lineTo(-s * 0.5, s * 0.15);
  ctx.lineTo(-s * 0.05, s * 0.15);
  ctx.lineTo(-s * 0.15, s);
  ctx.lineTo(s * 0.5, -s * 0.15);
  ctx.lineTo(s * 0.05, -s * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBattery(ctx, s) {
  ctx.save();
  ctx.strokeStyle = 'rgba(65,34,87,0.6)';
  ctx.lineWidth = s * 0.16;
  roundRect(ctx, -s * 0.6, -s * 0.4, s * 1.1, s * 0.8, s * 0.15);
  ctx.stroke();
  ctx.fillStyle = 'rgba(65,34,87,0.6)';
  ctx.fillRect(s * 0.5, -s * 0.18, s * 0.18, s * 0.36);
  ctx.fillRect(-s * 0.35, -s * 0.2, s * 0.15, s * 0.4);
  ctx.restore();
}
