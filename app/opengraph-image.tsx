import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ID8Labs - Tools for creators. Infrastructure for builders.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0B',
          position: 'relative',
        }}
      >
        {/* Neural network background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.15,
          }}
        >
          <svg width="1200" height="630" viewBox="0 0 1200 630">
            {/* Simplified neural network lines */}
            <g stroke="#FF6B35" strokeWidth="1" fill="none" opacity="0.6">
              <line x1="100" y1="100" x2="300" y2="200" />
              <line x1="300" y1="200" x2="500" y2="150" />
              <line x1="500" y1="150" x2="700" y2="250" />
              <line x1="700" y1="250" x2="900" y2="180" />
              <line x1="900" y1="180" x2="1100" y2="280" />
              <line x1="150" y1="350" x2="350" y2="420" />
              <line x1="350" y1="420" x2="550" y2="380" />
              <line x1="550" y1="380" x2="750" y2="480" />
              <line x1="750" y1="480" x2="950" y2="400" />
              <line x1="950" y1="400" x2="1100" y2="500" />
              <line x1="200" y1="100" x2="400" y2="350" />
              <line x1="600" y1="150" x2="550" y2="380" />
              <line x1="850" y1="200" x2="750" y2="480" />
            </g>
            {/* Neural nodes */}
            <g fill="#FF6B35" opacity="0.4">
              <circle cx="100" cy="100" r="6" />
              <circle cx="300" cy="200" r="8" />
              <circle cx="500" cy="150" r="6" />
              <circle cx="700" cy="250" r="10" />
              <circle cx="900" cy="180" r="6" />
              <circle cx="1100" cy="280" r="8" />
              <circle cx="150" cy="350" r="6" />
              <circle cx="350" cy="420" r="8" />
              <circle cx="550" cy="380" r="10" />
              <circle cx="750" cy="480" r="6" />
              <circle cx="950" cy="400" r="8" />
              <circle cx="1100" cy="500" r="6" />
            </g>
          </svg>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 96,
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#FF6B35',
                fontFamily: 'Georgia, serif',
              }}
            >
              id8
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 300,
                color: '#FFFFFF',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Labs
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 42,
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontFamily: 'Georgia, serif',
              }}
            >
              Tools for creators.
            </span>
            <span
              style={{
                fontSize: 42,
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FFFFFF',
                fontFamily: 'Georgia, serif',
              }}
            >
              Infrastructure for builders.
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              color: '#9CA3AF',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            AI as thinking partner, not chatbot.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            color: '#6B7280',
            fontSize: 18,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span>id8labs.app</span>
          <span style={{ color: '#FF6B35' }}>|</span>
          <span>Built in Miami</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
