# Chrono-Flow

A time-management, path-tracing puzzle game. You're an operator in a data
processing facility: draw a continuous path from the **start** node through
every **data node**, and reach the **target** — all before the network's
timer runs out.

Built with plain HTML/CSS/JS and Canvas 2D. No build step, no dependencies.

## Play locally

Because the game uses ES modules, it needs to be served over HTTP (not
opened as a `file://` URL). From the project root:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## How it works

- **Blue tiles** are live processors — safe to traverse.
- **Green tiles** are data nodes — your path must visit every one.
- **Grey tiles** are inactive processors — obstacles, impassable (from Tier 2 on).
- **Yellow tiles** are capacitors — you can pass through, but if you linger
  on one too long without discharging it (moving on), the connection
  overloads and the run fails (Tier 3).
- **Junction tiles** (marked with an "×") allow the path to legitimately
  cross itself once, via two different arms (Tier 3).

Drag from the start node to draw your path; drag back over your own trail
to undo a step. Reach the target with every green node charged, before the
timer bar empties, to clear the level and earn 1–3 stars based on time
remaining.

## Difficulty tiers

- **Levels 1–10 (Live Wire)** — blue and green tiles only, generous timers.
- **Levels 11–30 (Dead Grid)** — grey obstacles and decoy dead-end spurs
  appear, timers tighten.
- **Levels 31–60 (Overcharge)** — capacitors and (on select levels)
  self-crossing junctions, with the tightest timers.

## Project structure

```
index.html          Screens: title, level select, gameplay HUD, modal
css/style.css        All styling (palette-driven, mobile-first)
js/palette.js         Color tokens (brand palette + functional tile colors)
js/rng.js              Deterministic PRNG (levels are seeded by number)
js/pathgen.js         Self-avoiding walk / maze-connect generators
js/levels.js            Tiered procedural level generator (60 levels)
js/game.js               Core engine: path state, timer, capacitor decay, win/lose
js/render.js              Canvas rendering of the grid, path, and HUD ring
js/input.js                Pointer-event → grid-move translation
js/storage.js               localStorage progress (unlocked levels, stars, best times)
js/ui.js                     DOM screen management
js/main.js                    Bootstraps and wires everything together
```

Every level is generated deterministically from its number (levels.js),
and by construction always has at least one valid, playable solution —
verified for all 60 levels, including realistic play that never requires
retracing the same edge through a junction tile.
