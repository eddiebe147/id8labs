import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ID8Labs - Professional Tools for the AI Era'
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
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a1a 0%, #0a0a0a 50%)',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect width="32" height="32" fill="#000000" rx="4" />
            <rect x="8" y="8" width="3" height="16" fill="#FFFFFF" />
            <circle cx="20" cy="12" r="3.5" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <circle cx="20" cy="20" r="3.5" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 900,
            color: 'white',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          id8Labs
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#888888',
            marginBottom: 40,
          }}
        >
          Professional Tools for the AI Era
        </div>

        {/* Products */}
        <div
          style={{
            display: 'flex',
            gap: 24,
          }}
        >
          {['Composer', 'DeepStack', 'Claude Code Training'].map((product) => (
            <div
              key={product}
              style={{
                display: 'flex',
                padding: '12px 24px',
                backgroundColor: '#1a1a1a',
                borderRadius: 8,
                border: '1px solid #333',
                color: '#f97316',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {product}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            fontSize: 20,
            color: '#666',
            fontFamily: 'monospace',
          }}
        >
          id8labs.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
