// Pointer-event handling: turns mouse/touch input into grid-cell moves
// against the game engine. Uses the Pointer Events API so mouse, touch,
// and pen all funnel through one code path. Two ways to play, both
// available at once: drag continuously from the path's head (or an
// earlier tile, to trim), or tap each next tile one at a time - the
// latter is the reliable path on touch, since a single tap can't be
// hijacked by a host page's scroll/swipe gesture the way a sustained
// drag sometimes can.

export function attachInput(canvas, renderer, game, onMove) {
  let dragging = false;

  function cellFromEvent(evt) {
    const rect = canvas.getBoundingClientRect();
    // rect is the on-screen (possibly CSS-scaled, e.g. by a host preview
    // pane that zooms the whole page) size; renderer.pointToCell works in
    // the canvas's unscaled layout coordinates (clientWidth/clientHeight).
    // Normalize by the ratio between the two so pointer math stays correct
    // even when the page is displayed at a different scale than 1:1.
    const scaleX = canvas.clientWidth ? rect.width / canvas.clientWidth : 1;
    const scaleY = canvas.clientHeight ? rect.height / canvas.clientHeight : 1;
    const px = (evt.clientX - rect.left) / (scaleX || 1);
    const py = (evt.clientY - rect.top) / (scaleY || 1);
    return renderer.pointToCell(px, py);
  }

  function handleAt(evt) {
    const cell = cellFromEvent(evt);
    if (!cell) return;
    const key = cell.x + ',' + cell.y;
    if (game.tryMove(key)) onMove();
  }

  function onPointerDown(evt) {
    if (game.phase !== 'playing') return;
    const cell = cellFromEvent(evt);
    if (!cell) return;
    const key = cell.x + ',' + cell.y;

    if (game.path.includes(key)) {
      // Pressing on the current path (its head, to keep dragging forward,
      // or an earlier tile, to trim) starts a drag gesture.
      dragging = true;
      try { canvas.setPointerCapture(evt.pointerId); } catch (_) { /* noop */ }
      handleAt(evt);
      evt.preventDefault();
      return;
    }

    // Tap-to-extend: pressing a tile adjacent to the current head advances
    // the path by one step immediately, independent of any drag gesture.
    // This is the primary way to play on touch, where a sustained drag can
    // get intercepted by a host page's own scroll/swipe handling before it
    // ever reaches the canvas — a single tap has no such failure mode.
    // Continuing to hold and move from here also keeps extending via drag.
    if (game.tryMove(key)) {
      dragging = true;
      try { canvas.setPointerCapture(evt.pointerId); } catch (_) { /* noop */ }
      onMove();
      evt.preventDefault();
    }
  }

  function onPointerMove(evt) {
    if (!dragging) return;
    handleAt(evt);
    evt.preventDefault();
  }

  function onPointerUp(evt) {
    dragging = false;
    try { canvas.releasePointerCapture(evt.pointerId); } catch (_) { /* noop */ }
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.style.touchAction = 'none';

  return function detach() {
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
  };
}
