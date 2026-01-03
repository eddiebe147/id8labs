import { NextRequest, NextResponse } from 'next/server'

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://umami-analytics-eddies-projects-b49c74d7.vercel.app'
const SHARE_ID = 'J4VS54l6JI0GY7ht'

// Cache the token for reuse
let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getShareToken(): Promise<string> {
  // Return cached token if still valid (refresh 5 min before expiry)
  if (cachedToken && Date.now() < tokenExpiry - 300000) {
    return cachedToken
  }

  const response = await fetch(`${UMAMI_URL}/api/share/${SHARE_ID}`)
  if (!response.ok) {
    throw new Error('Failed to get share token')
  }

  const data = await response.json()
  cachedToken = data.token
  // Token is typically valid for 1 hour
  tokenExpiry = Date.now() + 3600000

  return cachedToken!
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint') || 'stats'
  const startAt = searchParams.get('startAt')
  const endAt = searchParams.get('endAt')
  const unit = searchParams.get('unit') || 'day'
  const type = searchParams.get('type')

  try {
    const token = await getShareToken()
    const websiteId = 'a1468cfa-c7a0-4626-8217-154db2c99c93'

    // Build the query params
    const params = new URLSearchParams()
    if (startAt) params.set('startAt', startAt)
    if (endAt) params.set('endAt', endAt)
    if (unit) params.set('unit', unit)
    if (type) params.set('type', type)

    const apiUrl = `${UMAMI_URL}/api/websites/${websiteId}/${endpoint}?${params.toString()}`

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Umami API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}
