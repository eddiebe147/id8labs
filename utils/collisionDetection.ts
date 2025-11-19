/**
 * Collision Detection for Wave-Boundary Interactions
 * Handles ray-casting and SVG path collision
 */

export interface BoundaryPoint {
  x: number
  y: number
}

export interface CollisionResult {
  collided: boolean
  point?: BoundaryPoint
  distance?: number
}

/**
 * Convert SVG path string to array of points
 * Simplified parser for basic path commands (M, L, H, V, C, Q)
 */
export function parseSVGPath(pathData: string): BoundaryPoint[] {
  const points: BoundaryPoint[] = []
  const commands = pathData.match(/[A-Za-z][^A-Za-z]*/g) || []

  let currentX = 0
  let currentY = 0

  commands.forEach((cmd) => {
    const type = cmd[0]
    const coords = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number)

    switch (type.toUpperCase()) {
      case 'M': // MoveTo
        currentX = coords[0]
        currentY = coords[1]
        points.push({ x: currentX, y: currentY })
        break

      case 'L': // LineTo
        currentX = coords[0]
        currentY = coords[1]
        points.push({ x: currentX, y: currentY })
        break

      case 'H': // Horizontal line
        currentX = coords[0]
        points.push({ x: currentX, y: currentY })
        break

      case 'V': // Vertical line
        currentY = coords[0]
        points.push({ x: currentX, y: currentY })
        break

      case 'C': // Cubic Bezier
        // Sample curve with multiple points for collision detection
        const steps = 10
        const [x1, y1, x2, y2, x, y] = coords
        for (let t = 0; t <= 1; t += 1 / steps) {
          const mt = 1 - t
          const bx =
            mt * mt * mt * currentX +
            3 * mt * mt * t * x1 +
            3 * mt * t * t * x2 +
            t * t * t * x
          const by =
            mt * mt * mt * currentY +
            3 * mt * mt * t * y1 +
            3 * mt * t * t * y2 +
            t * t * t * y
          points.push({ x: bx, y: by })
        }
        currentX = x
        currentY = y
        break

      case 'Q': // Quadratic Bezier
        const qSteps = 10
        const [qx1, qy1, qx, qy] = coords
        for (let t = 0; t <= 1; t += 1 / qSteps) {
          const mt = 1 - t
          const qbx = mt * mt * currentX + 2 * mt * t * qx1 + t * t * qx
          const qby = mt * mt * currentY + 2 * mt * t * qy1 + t * t * qy
          points.push({ x: qbx, y: qby })
        }
        currentX = qx
        currentY = qy
        break

      case 'Z': // ClosePath
        if (points.length > 0) {
          points.push({ x: points[0].x, y: points[0].y })
        }
        break
    }
  })

  return points
}

/**
 * Calculate distance between two points
 */
export function distance(p1: BoundaryPoint, p2: BoundaryPoint): number {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Check if a point is within threshold distance of boundary segment
 */
export function isNearBoundarySegment(
  point: BoundaryPoint,
  segmentStart: BoundaryPoint,
  segmentEnd: BoundaryPoint,
  threshold: number
): CollisionResult {
  const { x, y } = point
  const { x: x1, y: y1 } = segmentStart
  const { x: x2, y: y2 } = segmentEnd

  // Calculate closest point on line segment
  const dx = x2 - x1
  const dy = y2 - y1
  const lengthSquared = dx * dx + dy * dy

  if (lengthSquared === 0) {
    // Segment is a point
    const dist = distance(point, segmentStart)
    return {
      collided: dist <= threshold,
      point: segmentStart,
      distance: dist,
    }
  }

  // Project point onto line segment (clamped to [0,1])
  let t = ((x - x1) * dx + (y - y1) * dy) / lengthSquared
  t = Math.max(0, Math.min(1, t))

  // Closest point on segment
  const closestX = x1 + t * dx
  const closestY = y1 + t * dy
  const closestPoint = { x: closestX, y: closestY }

  const dist = distance(point, closestPoint)

  return {
    collided: dist <= threshold,
    point: closestPoint,
    distance: dist,
  }
}

/**
 * Check if a wave point collides with any boundary segments
 */
export function checkWaveBoundaryCollision(
  wavePoint: BoundaryPoint,
  boundaryPoints: BoundaryPoint[],
  collisionThreshold: number = 30
): CollisionResult {
  if (boundaryPoints.length < 2) {
    return { collided: false }
  }

  for (let i = 0; i < boundaryPoints.length - 1; i++) {
    const result = isNearBoundarySegment(
      wavePoint,
      boundaryPoints[i],
      boundaryPoints[i + 1],
      collisionThreshold
    )

    if (result.collided) {
      return result
    }
  }

  return { collided: false }
}

/**
 * Calculate reflection vector for wave collision
 * Returns new velocity direction after boundary collision
 */
export function calculateReflection(
  incidentX: number,
  incidentY: number,
  normalX: number,
  normalY: number
): { x: number; y: number } {
  // Normalize the normal vector
  const normalLength = Math.sqrt(normalX * normalX + normalY * normalY)
  if (normalLength === 0) {
    return { x: -incidentX, y: -incidentY }
  }

  const nx = normalX / normalLength
  const ny = normalY / normalLength

  // Reflection formula: R = I - 2(I·N)N
  const dotProduct = incidentX * nx + incidentY * ny
  const reflectedX = incidentX - 2 * dotProduct * nx
  const reflectedY = incidentY - 2 * dotProduct * ny

  return { x: reflectedX, y: reflectedY }
}

/**
 * Get normal vector for a boundary segment
 */
export function getBoundaryNormal(
  segmentStart: BoundaryPoint,
  segmentEnd: BoundaryPoint
): { x: number; y: number } {
  const dx = segmentEnd.x - segmentStart.x
  const dy = segmentEnd.y - segmentStart.y

  // Perpendicular vector (rotated 90 degrees)
  return { x: -dy, y: dx }
}
