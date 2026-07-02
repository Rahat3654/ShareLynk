"use client";

// Decorative "glowing world / connected nodes / network lines / digital globe"
// technology illustration for the hero. Pure SVG + CSS — lightweight, animated,
// and theme-aware. (This is artwork, not the ShareLynk logo.)
export function GlobeIllustration() {
  // Deterministic node positions on the globe surface.
  const nodes = [
    { cx: 250, cy: 90 }, { cx: 340, cy: 150 }, { cx: 160, cy: 140 },
    { cx: 300, cy: 240 }, { cx: 190, cy: 260 }, { cx: 250, cy: 320 },
    { cx: 120, cy: 210 }, { cx: 380, cy: 220 }, { cx: 250, cy: 200 },
  ];
  const links: [number, number][] = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7],
    [0, 1], [2, 6], [3, 7], [4, 5],
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-brand-blue/25 blur-3xl" />
      <div className="absolute inset-10 -z-10 rounded-full bg-brand-cyan/10 blur-2xl" />

      <svg viewBox="0 0 500 500" className="h-full w-full animate-float" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sphere" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#123a99" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#0b1b3b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#050b1a" stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F4CFF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rotating meridians / parallels group */}
        <g transform="translate(250 250)">
          <g className="origin-center [animation:spin-slow_50s_linear_infinite]">
            <circle r="200" fill="url(#sphere)" stroke="url(#stroke)" strokeOpacity="0.35" strokeWidth="1" />
            {[0.35, 0.6, 0.85].map((s, i) => (
              <ellipse key={`m${i}`} rx={200 * s} ry="200" fill="none" stroke="url(#stroke)" strokeOpacity="0.25" strokeWidth="1" />
            ))}
            {[-120, -60, 0, 60, 120].map((y, i) => (
              <ellipse key={`p${i}`} rx="200" ry={Math.sqrt(Math.max(0, 200 * 200 - y * y))} cy={y} fill="none" stroke="url(#stroke)" strokeOpacity="0.18" strokeWidth="1" transform={`translate(0 ${y * 0})`} />
            ))}
          </g>
          <circle r="200" fill="none" stroke="url(#stroke)" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>

        {/* Network links */}
        <g stroke="url(#stroke)" strokeWidth="1.2" strokeOpacity="0.55" filter="url(#soft)">
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              strokeDasharray="4 6"
              className="[animation:shimmer_3s_linear_infinite]"
            />
          ))}
        </g>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={i === 8 ? 7 : 4.5} fill="#00C2FF" filter="url(#soft)" />
            <circle cx={n.cx} cy={n.cy} r={i === 8 ? 14 : 9} fill="none" stroke="#00C2FF" strokeOpacity="0.35">
              <animate attributeName="r" values={`${i === 8 ? 10 : 7};${i === 8 ? 20 : 14};${i === 8 ? 10 : 7}`} dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Orbiting satellite */}
        <g transform="translate(250 250)">
          <g className="origin-center [animation:spin-slow_18s_linear_infinite]">
            <circle cx="235" cy="0" r="5" fill="#fff" filter="url(#soft)" />
          </g>
        </g>
      </svg>

      {/* Floating glass telemetry chips */}
      <div className="absolute -left-2 top-14 hidden animate-float rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl sm:block">
        <div className="text-[10px] uppercase tracking-widest text-cyan-200/70">Live sessions</div>
        <div className="text-lg font-semibold text-white">12,480</div>
      </div>
      <div className="animation-delay-2000 absolute -right-2 bottom-16 hidden animate-float rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl sm:block">
        <div className="text-[10px] uppercase tracking-widest text-cyan-200/70">Encrypted</div>
        <div className="text-lg font-semibold text-white">256-bit AES</div>
      </div>
    </div>
  );
}
