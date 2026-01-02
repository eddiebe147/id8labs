import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FF6B35',
          borderRadius: 32,
        }}
      >
        {/* Neural network 8 design */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A0A0B',
            borderRadius: 24,
            width: 120,
            height: 160,
            padding: 20,
          }}
        >
          {/* Top circle of 8 */}
          <svg width="60" height="80" viewBox="0 0 60 80">
            <circle
              cx="30"
              cy="22"
              r="18"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="30"
              cy="58"
              r="18"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
            {/* Connection nodes */}
            <circle cx="30" cy="4" r="3" fill="white" />
            <circle cx="48" cy="22" r="3" fill="white" />
            <circle cx="12" cy="22" r="3" fill="white" />
            <circle cx="30" cy="40" r="4" fill="white" />
            <circle cx="48" cy="58" r="3" fill="white" />
            <circle cx="12" cy="58" r="3" fill="white" />
            <circle cx="30" cy="76" r="3" fill="white" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
