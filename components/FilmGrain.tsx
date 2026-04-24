export default function FilmGrain() {
  return (
    <>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            >
              <animate
                attributeName="seed"
                from="0"
                to="10"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </feTurbulence>
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.035,
          filter: 'url(#grain-filter)',
          background: '#ffffff',
        }}
      />
    </>
  )
}
