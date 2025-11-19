/**
 * Wave Physics Simulation
 * Implements 2D wave equation with dampening and interference
 */

export interface WavePoint {
  x: number
  y: number
  velocity: number
  displacement: number
}

export interface RippleSource {
  x: number
  y: number
  amplitude: number
  frequency: number
  phase: number
  age: number // Frames since spawn
  maxAge: number
  type: 'mouse' | 'ambient'
}

export interface WaveGrid {
  width: number
  height: number
  spacing: number
  points: WavePoint[][]
}

/**
 * Initialize wave grid with given dimensions
 */
export function createWaveGrid(
  width: number,
  height: number,
  spacing: number
): WaveGrid {
  const cols = Math.ceil(width / spacing)
  const rows = Math.ceil(height / spacing)

  const points: WavePoint[][] = []
  for (let y = 0; y < rows; y++) {
    const row: WavePoint[] = []
    for (let x = 0; x < cols; x++) {
      row.push({
        x: x * spacing,
        y: y * spacing,
        velocity: 0,
        displacement: 0,
      })
    }
    points.push(row)
  }

  return { width, height, spacing, points }
}

/**
 * Calculate wave displacement at a point from a ripple source
 * Uses damped sinusoidal wave equation
 */
export function calculateWaveDisplacement(
  point: WavePoint,
  source: RippleSource,
  time: number
): number {
  const dx = point.x - source.x
  const dy = point.y - source.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Early exit for distant points
  if (distance > 1000) return 0

  // Wave equation: amplitude * sin(frequency * distance - phase) * dampening
  const wavePhase = source.frequency * distance - source.phase - time * 0.05
  const wave = Math.sin(wavePhase)

  // Age-based dampening (fade out over time)
  const ageFactor = Math.max(0, 1 - source.age / source.maxAge)

  // Distance-based dampening (1/r falloff with minimum threshold)
  const distanceDamping = 1 / (1 + distance / 150)

  return source.amplitude * wave * distanceDamping * ageFactor
}

/**
 * Update wave grid with all active ripple sources
 * Applies wave interference and dampening
 */
export function updateWaveGrid(
  grid: WaveGrid,
  ripples: RippleSource[],
  time: number,
  dampening: number = 0.95
): void {
  const { points } = grid

  for (let y = 0; y < points.length; y++) {
    for (let x = 0; x < points[y].length; x++) {
      const point = points[y][x]

      // Calculate total displacement from all ripples (wave interference)
      let totalDisplacement = 0
      for (const ripple of ripples) {
        totalDisplacement += calculateWaveDisplacement(point, ripple, time)
      }

      // Update velocity based on displacement (spring-like behavior)
      const springForce = -totalDisplacement * 0.01
      point.velocity += springForce

      // Apply dampening to velocity
      point.velocity *= dampening

      // Update displacement
      point.displacement += point.velocity

      // Gradually return to rest position
      point.displacement *= 0.98
    }
  }
}

/**
 * Create a new ripple source
 */
export function createRipple(
  x: number,
  y: number,
  type: 'mouse' | 'ambient',
  amplitude?: number
): RippleSource {
  const isAmbient = type === 'ambient'

  return {
    x,
    y,
    amplitude: amplitude || (isAmbient ? 3 : 5),
    frequency: isAmbient ? 0.015 : 0.02,
    phase: 0,
    age: 0,
    maxAge: isAmbient ? 180 : 120, // Frames until fade complete
    type,
  }
}

/**
 * Update all ripples, incrementing age and removing expired ones
 */
export function updateRipples(ripples: RippleSource[]): RippleSource[] {
  return ripples
    .map((ripple) => ({
      ...ripple,
      age: ripple.age + 1,
      phase: ripple.phase + 0.1,
    }))
    .filter((ripple) => ripple.age < ripple.maxAge)
}

/**
 * Ambient ripple spawner
 * Returns coordinates for new ambient ripple or null
 */
export function shouldSpawnAmbientRipple(
  lastSpawnTime: number,
  currentTime: number,
  spawnInterval: number
): boolean {
  return currentTime - lastSpawnTime > spawnInterval
}

/**
 * Generate random position within bounds with margin
 */
export function generateRandomRipplePosition(
  width: number,
  height: number,
  margin: number = 100
): { x: number; y: number } {
  return {
    x: margin + Math.random() * (width - margin * 2),
    y: margin + Math.random() * (height - margin * 2),
  }
}

/**
 * Get interpolated displacement for rendering
 * Uses bilinear interpolation for smooth visualization
 */
export function getInterpolatedDisplacement(
  grid: WaveGrid,
  x: number,
  y: number
): number {
  const { points, spacing } = grid

  const col = x / spacing
  const row = y / spacing

  const x0 = Math.floor(col)
  const y0 = Math.floor(row)
  const x1 = Math.min(x0 + 1, points[0].length - 1)
  const y1 = Math.min(y0 + 1, points.length - 1)

  // Bounds check
  if (y0 < 0 || y0 >= points.length || x0 < 0 || x0 >= points[0].length) {
    return 0
  }

  // Get corner values
  const d00 = points[y0][x0].displacement
  const d10 = x1 < points[0].length ? points[y0][x1].displacement : d00
  const d01 = y1 < points.length ? points[y1][x0].displacement : d00
  const d11 =
    x1 < points[0].length && y1 < points.length
      ? points[y1][x1].displacement
      : d00

  // Interpolation weights
  const fx = col - x0
  const fy = row - y0

  // Bilinear interpolation
  const top = d00 * (1 - fx) + d10 * fx
  const bottom = d01 * (1 - fx) + d11 * fx

  return top * (1 - fy) + bottom * fy
}
