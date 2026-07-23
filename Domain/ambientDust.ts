function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function round(value: number, places: number) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export type AmbientDustParticle = {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  driftX: string;
  driftY: string;
};

export const DESKTOP_DUST_COUNT = 22;
export const MOBILE_DUST_COUNT = 10;

/**
 * Edge-to-edge grid (with light jitter) so particles reach corners and
 * sides of the viewport — not a centre cluster.
 */
export function createAmbientDustParticles(count: number): AmbientDustParticle[] {
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  const edgePad = 2;
  const span = 100 - edgePad * 2;

  return Array.from({ length: count }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const columnRatio = columns === 1 ? 0.5 : column / (columns - 1);
    const rowRatio = rows === 1 ? 0.5 : row / (rows - 1);
    const jitterX = (seededRandom(index * 23 + 1) - 0.5) * (span / columns) * 0.35;
    const jitterY = (seededRandom(index * 23 + 2) - 0.5) * (span / rows) * 0.35;

    const left = Math.min(98, Math.max(2, edgePad + columnRatio * span + jitterX));
    const top = Math.min(98, Math.max(2, edgePad + rowRatio * span + jitterY));

    return {
      left: `${round(left, 3)}%`,
      top: `${round(top, 3)}%`,
      animationDelay: `${round(seededRandom(index * 23 + 3) * 16, 2)}s`,
      animationDuration: `${round(22 + seededRandom(index * 23 + 4) * 14, 2)}s`,
      driftX: `${round(-8 + seededRandom(index * 23 + 5) * 16, 2)}px`,
      driftY: `${round(-12 + seededRandom(index * 23 + 6) * 24, 2)}px`,
    };
  });
}
