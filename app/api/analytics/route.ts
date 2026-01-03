import { NextRequest, NextResponse } from 'next/server'

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://umami-analytics-eddies-projects-b49c74d7.vercel.app'
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'a1468cfa-c7a0-4626-8217-154db2c99c93'
const SHARE_ID = 'J4VS54l6JI0GY7ht'

// Cache the share token to avoid repeated requests
let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getShareToken(): Promise<string> {
  // Return cached token if still valid (cache for 5 minutes)
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken
  }

  // Call the share endpoint to get a token
  const shareResponse = await fetch(`${UMAMI_URL}/api/share/${SHARE_ID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!shareResponse.ok) {
    throw new Error(`Failed to get share token: ${shareResponse.status}`)
  }

  const shareData = await shareResponse.json()

  // The share endpoint returns a token we can use
  cachedToken = shareData.token
  tokenExpiry = Date.now() + 5 * 60 * 1000 // 5 minutes

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
    // Get the share token first
    const token = await getShareToken()

    // Build the query params
    const params = new URLSearchParams()
    if (startAt) params.set('startAt', startAt)
    if (endAt) params.set('endAt', endAt)
    if (unit) params.set('unit', unit)
    if (type) params.set('type', type)
    params.set('timezone', 'America/New_York')

    const apiUrl = `${UMAMI_URL}/api/websites/${WEBSITE_ID}/${endpoint}?${params.toString()}`

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Umami API error: ${response.status}`, errorText)
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
