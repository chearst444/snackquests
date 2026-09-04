// Chrono-Flow color system.
// Brand palette (chrome / UI): Deep Plum, Dusty Mauve, Coral Red, Warm Gold, Cream White.
// Functional tile colors (blue/green/grey/yellow) encode game state and stay
// close to the reference art so their meaning reads instantly on the grid.

export const PALETTE = {
  plum: '#412257',
  plumDark: '#2B1640',
  plumLight: '#5A3172',
  mauve: '#BA7FA3',
  coral: '#D85859',
  gold: '#EEBA4C',
  cream: '#F8F6E9',
};

export const TILE_COLORS = {
  blue: { fill: '#3BB6E8', dark: '#1E86B4', light: '#8FE0FF' },
  green: { fill: '#7CC142', dark: '#4E8F22', light: '#B8ED86' },
  grey: { fill: '#7C7C8C', dark: '#57575F', light: '#9E9EAE' },
  yellow: { fill: PALETTE.gold, dark: '#B8842A', light: '#FBDD97' },
  start: { fill: PALETTE.cream, dark: '#C9C6B4', light: '#FFFFFF' },
  target: { fill: PALETTE.coral, dark: '#A83A3B', light: '#F19191' },
  junction: { fill: PALETTE.mauve, dark: '#8C5A78', light: '#E0BFD3' },
};

export const PATH_COLOR = PALETTE.cream;
export const PATH_GLOW = 'rgba(248,246,233,0.35)';
