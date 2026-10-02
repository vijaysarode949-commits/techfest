const BUILDINGS = [
  [0, 70], [38, 92], [70, 60], [104, 120], [140, 84], [176, 140], [214, 76],
  [246, 104], [288, 66], [318, 96], [700, 88], [736, 124], [774, 70], [808, 150],
  [846, 96], [884, 112], [922, 68], [956, 134], [994, 82], [1030, 104], [1068, 64],
  [1100, 118], [1140, 90], [1176, 72],
] as const

function windowsFor(x: number, height: number, seed: number) {
  const out: Array<{ x: number; y: number; d: number }> = []
  for (let row = 14; row < height - 8; row += 14) {
    for (let col = 6; col < 28; col += 9) {
      const n = Math.sin(seed * 12.9898 + row * 78.233 + col) * 43758.5453
      if (n - Math.floor(n) > 0.62) out.push({ x: x + col, y: 220 - height + row, d: (n - Math.floor(n)) * 6 })
    }
  }
  return out
}

/** Stylised Powai skyline: towers flanking the Convocation Hall dome. */
export function Skyline() {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e0e12" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <radialGradient id="dome-glow" cx="0.5" cy="1" r="0.6">
          <stop offset="0" stopColor="rgba(94,231,255,0.35)" />
          <stop offset="1" stopColor="rgba(94,231,255,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="510" cy="220" rx="260" ry="150" fill="url(#dome-glow)" />
      <g fill="url(#sky-fade)" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        {BUILDINGS.map(([x, height]) => (
          <rect key={x} x={x} y={220 - height} width={32} height={height} />
        ))}
        <rect x="380" y="150" width="260" height="70" />
        <path d="M410 150 A100 100 0 0 1 610 150 Z" />
        <rect x="502" y="40" width="16" height="22" />
      </g>
      <g fill="#5ee7ff">
        {BUILDINGS.flatMap(([x, height], i) =>
          windowsFor(x, height, i + 1).map((win) => (
            <rect key={`${x}-${win.x}-${win.y}`} x={win.x} y={win.y} width="3" height="3" opacity="0.7">
              <animate attributeName="opacity" values="0.15;0.85;0.15" dur={`${3 + win.d}s`} repeatCount="indefinite" />
            </rect>
          )),
        )}
      </g>
      <path d="M410 150 A100 100 0 0 1 610 150" fill="none" stroke="rgba(94,231,255,0.5)" strokeWidth="1.2" />
    </svg>
  )
}
