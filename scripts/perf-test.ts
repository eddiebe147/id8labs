/**
 * Performance Testing Script for id8labs
 *
 * Measures API response times and provides benchmarks
 * Run with: npx tsx scripts/perf-test.ts
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

interface TestResult {
  endpoint: string
  times: number[]
  avg: number
  min: number
  max: number
  p95: number
  status: 'pass' | 'warn' | 'fail'
}

async function measureEndpoint(
  endpoint: string,
  iterations: number = 10
): Promise<TestResult> {
  const times: number[] = []

  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        // Bypass cache for accurate measurements
        headers: { 'Cache-Control': 'no-cache' },
      })
      await res.json()
    } catch {
      // Count failed requests as slow
      times.push(5000)
      continue
    }
    const end = performance.now()
    times.push(end - start)

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 100))
  }

  times.sort((a, b) => a - b)
  const avg = times.reduce((a, b) => a + b, 0) / times.length
  const p95 = times[Math.floor(times.length * 0.95)]

  // Status thresholds (in ms)
  // pass: avg < 100ms, warn: avg < 500ms, fail: avg >= 500ms
  let status: 'pass' | 'warn' | 'fail' = 'fail'
  if (avg < 100) status = 'pass'
  else if (avg < 500) status = 'warn'

  return {
    endpoint,
    times,
    avg: Math.round(avg),
    min: Math.round(times[0]),
    max: Math.round(times[times.length - 1]),
    p95: Math.round(p95),
    status,
  }
}

async function runTests() {
  console.log(`\n🚀 Performance Test Suite`)
  console.log(`📍 Target: ${BASE_URL}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)

  const endpoints = [
    '/api/claude-stats',
    '/api/claude-observations',
    '/',
    '/essays',
    '/lab',
  ]

  const results: TestResult[] = []

  for (const endpoint of endpoints) {
    process.stdout.write(`Testing ${endpoint}...`)
    const result = await measureEndpoint(endpoint, 5)
    results.push(result)

    const icon = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌'
    console.log(` ${icon} avg: ${result.avg}ms (${result.min}-${result.max}ms)`)
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📊 Summary`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)

  const passCount = results.filter((r) => r.status === 'pass').length
  const warnCount = results.filter((r) => r.status === 'warn').length
  const failCount = results.filter((r) => r.status === 'fail').length

  console.log(`✅ Pass (< 100ms): ${passCount}`)
  console.log(`⚠️  Warn (< 500ms): ${warnCount}`)
  console.log(`❌ Fail (>= 500ms): ${failCount}`)

  // Detailed table
  console.log(`\n┌────────────────────────────┬───────┬───────┬───────┬───────┐`)
  console.log(`│ Endpoint                   │  Avg  │  Min  │  Max  │  P95  │`)
  console.log(`├────────────────────────────┼───────┼───────┼───────┼───────┤`)

  for (const r of results) {
    const ep = r.endpoint.padEnd(26)
    const avg = `${r.avg}ms`.padStart(5)
    const min = `${r.min}ms`.padStart(5)
    const max = `${r.max}ms`.padStart(5)
    const p95 = `${r.p95}ms`.padStart(5)
    console.log(`│ ${ep} │ ${avg} │ ${min} │ ${max} │ ${p95} │`)
  }

  console.log(`└────────────────────────────┴───────┴───────┴───────┴───────┘\n`)

  // Recommendations
  if (failCount > 0) {
    console.log(`⚡ Recommendations:`)
    for (const r of results.filter((r) => r.status === 'fail')) {
      console.log(`   - ${r.endpoint}: Consider adding caching or optimizing queries`)
    }
    console.log('')
  }

  return results
}

// Run if executed directly
runTests().catch(console.error)
