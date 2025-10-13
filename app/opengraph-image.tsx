import { ImageResponse } from 'next/og'

/**
 * OpenGraph Image Generator
 *
 * Generates a dynamic 1200x630 OG image for social sharing
 * Features ID8LABS branding with VHS aesthetic
 */
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
          backgroundColor: '#1A1614',
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(245, 241, 232, 0.03) 0px, transparent 1px, transparent 2px, rgba(245, 241, 232, 0.03) 3px)',
        }}
      >
        {/* RGB Accent Shapes */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '100px',
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(255, 60, 56, 0.15)',
            transform: 'rotate(15deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '120px',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(0, 217, 255, 0.15)',
            borderRadius: '50%',
          }}
        />

        {/* Main Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '120px',
              fontWeight: '700',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              color: '#FF3C38',
            }}
          >
            ID8
          </span>
          <span
            style={{
              fontSize: '120px',
              fontWeight: '700',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              color: '#F5F1E8',
            }}
          >
            LABS
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '36px',
            color: '#B8AEA3',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Professional Tools for the AI Era
        </div>

        {/* Accent Line */}
        <div
          style={{
            marginTop: '50px',
            width: '400px',
            height: '3px',
            background:
              'linear-gradient(90deg, transparent 0%, #FF3C38 20%, #39FF14 50%, #00D9FF 80%, transparent 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
