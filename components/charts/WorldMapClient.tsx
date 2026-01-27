'use client'

import { useState, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

interface MetricItem {
  x: string
  y: number
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString()
}

// World Map URL - self-hosted to avoid CDN loading issues
const geoUrl = "/world-atlas.json"

// Pre-load geography data to work around react-simple-maps fetch issues
function useGeographyData() {
  const [geoData, setGeoData] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(data => {
        setGeoData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load geography data:', err)
        setLoading(false)
      })
  }, [])

  return { geoData, loading }
}

// Country code to coordinates mapping for markers
const countryCoordinates: Record<string, [number, number]> = {
  'US': [-95.7, 37.1], 'United States': [-95.7, 37.1],
  'GB': [-3.4, 55.4], 'United Kingdom': [-3.4, 55.4],
  'DE': [10.5, 51.2], 'Germany': [10.5, 51.2],
  'FR': [2.2, 46.2], 'France': [2.2, 46.2],
  'CA': [-106.3, 56.1], 'Canada': [-106.3, 56.1],
  'AU': [133.8, -25.3], 'Australia': [133.8, -25.3],
  'IN': [78.9, 20.6], 'India': [78.9, 20.6],
  'BR': [-51.9, -14.2], 'Brazil': [-51.9, -14.2],
  'JP': [138.3, 36.2], 'Japan': [138.3, 36.2],
  'NL': [5.3, 52.1], 'Netherlands': [5.3, 52.1],
  'ES': [-3.7, 40.5], 'Spain': [-3.7, 40.5],
  'IT': [12.6, 42.5], 'Italy': [12.6, 42.5],
  'PL': [19.1, 51.9], 'Poland': [19.1, 51.9],
  'SE': [18.6, 60.1], 'Sweden': [18.6, 60.1],
  'MX': [-102.6, 23.6], 'Mexico': [-102.6, 23.6],
  'CN': [104.2, 35.9], 'China': [104.2, 35.9],
  'RU': [105.3, 61.5], 'Russia': [105.3, 61.5],
  'KR': [128.0, 35.9], 'South Korea': [128.0, 35.9],
  'SG': [103.8, 1.4], 'Singapore': [103.8, 1.4],
  'ID': [113.9, -0.8], 'Indonesia': [113.9, -0.8],
  'AR': [-63.6, -38.4], 'Argentina': [-63.6, -38.4],
  'ZA': [22.9, -30.6], 'South Africa': [22.9, -30.6],
  'TR': [35.2, 38.9], 'Turkey': [35.2, 38.9],
  'TH': [100.5, 15.9], 'Thailand': [100.5, 15.9],
  'VN': [108.3, 14.1], 'Vietnam': [108.3, 14.1],
  'PH': [121.8, 12.9], 'Philippines': [121.8, 12.9],
  'PK': [69.3, 30.4], 'Pakistan': [69.3, 30.4],
  'BD': [90.4, 23.7], 'Bangladesh': [90.4, 23.7],
  'NG': [8.7, 9.1], 'Nigeria': [8.7, 9.1],
  'EG': [30.8, 26.8], 'Egypt': [30.8, 26.8],
  'UA': [31.2, 48.4], 'Ukraine': [31.2, 48.4],
  'IL': [34.9, 31.0], 'Israel': [34.9, 31.0],
  'AE': [53.8, 23.4], 'UAE': [53.8, 23.4],
  'SA': [45.1, 23.9], 'Saudi Arabia': [45.1, 23.9],
  'IE': [-8.2, 53.1], 'Ireland': [-8.2, 53.1],
  'PT': [-8.2, 39.4], 'Portugal': [-8.2, 39.4],
  'BE': [4.5, 50.5], 'Belgium': [4.5, 50.5],
  'AT': [14.6, 47.5], 'Austria': [14.6, 47.5],
  'CH': [8.2, 46.8], 'Switzerland': [8.2, 46.8],
  'NO': [8.5, 60.5], 'Norway': [8.5, 60.5],
  'DK': [9.5, 56.3], 'Denmark': [9.5, 56.3],
  'FI': [25.7, 61.9], 'Finland': [25.7, 61.9],
  'NZ': [174.9, -40.9], 'New Zealand': [174.9, -40.9],
  'CL': [-71.5, -35.7], 'Chile': [-71.5, -35.7],
  'CO': [-74.3, 4.6], 'Colombia': [-74.3, 4.6],
  'PE': [-77.0, -9.2], 'Peru': [-77.0, -9.2],
  'VE': [-66.6, 6.4], 'Venezuela': [-66.6, 6.4],
  'MY': [101.7, 4.2], 'Malaysia': [101.7, 4.2],
  'TW': [121.0, 23.7], 'Taiwan': [121.0, 23.7],
  'HK': [114.2, 22.3], 'Hong Kong': [114.2, 22.3],
}

export function WorldMapClient({ data }: { data: MetricItem[] }) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const { geoData, loading: geoLoading } = useGeographyData()
  const maxValue = Math.max(...data.map(d => d.y), 1)

  // Build lookup for country traffic
  const trafficByCountry = data.reduce((acc, item) => {
    acc[item.x] = item.y
    return acc
  }, {} as Record<string, number>)

  // Show loading state while geography data loads
  if (geoLoading || !geoData) {
    return (
      <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#FF6B35] text-sm font-bold tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            GLOBAL TRAFFIC
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
            <span className="text-gray-500 text-sm">Loading map...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#FF6B35]/20 rounded-xl p-5 font-mono backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#FF6B35] text-sm font-bold tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          GLOBAL TRAFFIC
        </h3>
        <span className="text-gray-500 text-xs">{data.length} countries</span>
      </div>

      {/* Real World Map - fills panel */}
      <div className="relative flex-1 min-h-[200px] bg-gray-900/50 rounded-lg overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 155,
            center: [10, 20]
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1a1a1a"
                  stroke="#FF6B35"
                  strokeWidth={0.3}
                  style={{
                    default: { outline: 'none', opacity: 0.8 },
                    hover: { outline: 'none', fill: '#2a2a2a', opacity: 1 },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Traffic markers */}
          {data.slice(0, 20).map((country, i) => {
            const coords = countryCoordinates[country.x]
            if (!coords) return null

            const intensity = country.y / maxValue
            const baseRadius = 3 + intensity * 8

            return (
              <Marker
                key={i}
                coordinates={coords}
                onMouseEnter={() => setHoveredCountry(country.x)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Glow ring */}
                <circle
                  r={baseRadius + 4}
                  fill="#FF6B35"
                  opacity={0.2}
                  className="animate-pulse"
                />
                {/* Main dot */}
                <circle
                  r={baseRadius}
                  fill="#FF6B35"
                  opacity={0.7 + intensity * 0.3}
                  stroke="#FF6B35"
                  strokeWidth={1}
                  style={{ cursor: 'pointer' }}
                />
                {/* Bright center */}
                <circle
                  r={baseRadius * 0.4}
                  fill="#fff"
                  opacity={0.8}
                />
              </Marker>
            )
          })}
        </ComposableMap>

        {/* Hover tooltip */}
        {hoveredCountry && trafficByCountry[hoveredCountry] && (
          <div className="absolute top-2 right-2 bg-black/95 border border-[#FF6B35]/50 px-3 py-2 rounded-lg text-xs text-white shadow-xl z-10">
            <div className="text-[#FF6B35] font-bold">{hoveredCountry}</div>
            <div className="text-gray-300">{formatNumber(trafficByCountry[hoveredCountry])} visitors</div>
          </div>
        )}
      </div>

      {/* Top countries list */}
      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((country, i) => (
          <div key={i} className="flex items-center gap-3 group hover:bg-gray-800/30 p-1.5 rounded-lg transition-colors -mx-1.5">
            <span className="text-gray-500 text-xs w-5 text-center font-bold">{i + 1}</span>
            <div className="w-2 h-2 rounded-full bg-[#FF6B35]" style={{ opacity: 0.5 + ((5 - i) / 5) * 0.5 }} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-300 text-sm truncate group-hover:text-white transition-colors">{country.x || 'Unknown'}</span>
                <span className="text-[#FF6B35] text-sm font-bold">{formatNumber(country.y)} <span className="text-gray-500 font-normal">visitors</span></span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8B55] rounded-full transition-all duration-500"
                  style={{ width: `${(country.y / maxValue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
