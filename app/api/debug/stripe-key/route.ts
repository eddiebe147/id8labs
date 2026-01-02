import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY

  if (!key) {
    return NextResponse.json({ status: 'NOT_SET' })
  }

  return NextResponse.json({
    status: 'SET',
    prefix: key.substring(0, 15),
    length: key.length,
    startsWithSkTest: key.startsWith('sk_test_'),
  })
}
