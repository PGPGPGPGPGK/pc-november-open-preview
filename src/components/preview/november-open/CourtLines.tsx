/**
 * DESIGN PREVIEW ONLY — authored pickleball-court line drawing used as quiet
 * hero texture (20 x 44 ft court: baselines, sidelines, 7 ft non-volley lines,
 * centre service lines, net). Pure SVG, no raster, no animation.
 */
export function CourtLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 440"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* outer court */}
      <rect x="10" y="10" width="180" height="420" />
      {/* non-volley zone lines (7 ft either side of the net) */}
      <path d="M10 157H190M10 283H190" />
      {/* centre service lines */}
      <path d="M100 10V157M100 283V430" />
      {/* net */}
      <path d="M0 220H200" strokeDasharray="2 9" strokeWidth={4} />
    </svg>
  );
}
