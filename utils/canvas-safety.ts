/**
 * Canvas Safety Utilities
 *
 * Prevents IndexSizeError from canvas arc() when radius becomes negative.
 * This can happen with:
 * - 3D perspective projections when objects go "behind the camera"
 * - Race conditions during resize before dimensions are set
 * - Calculations that produce NaN or Infinity
 *
 * USAGE: Import safeArc and use instead of ctx.arc() directly
 */

/**
 * Safe wrapper for canvas arc() that ensures radius is never negative
 * @param ctx - Canvas 2D rendering context
 * @param x - X coordinate of the arc's center
 * @param y - Y coordinate of the arc's center
 * @param radius - Radius of the arc (will be clamped to minimum 0.1)
 * @param startAngle - Start angle in radians
 * @param endAngle - End angle in radians
 * @param counterclockwise - Optional direction flag
 */
export function safeArc(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  counterclockwise?: boolean
): void {
  // Guard against NaN, Infinity, and negative values
  const safeRadius = Number.isFinite(radius) ? Math.max(0.1, radius) : 0.1
  ctx.arc(x, y, safeRadius, startAngle, endAngle, counterclockwise)
}

/**
 * Ensure a radius value is safe for canvas arc()
 * Use this when you need the value for other calculations too
 * @param radius - The radius value to make safe
 * @param minRadius - Minimum allowed radius (default 0.1)
 */
export function safeRadius(radius: number, minRadius: number = 0.1): number {
  if (!Number.isFinite(radius)) return minRadius
  return Math.max(minRadius, radius)
}

/**
 * Safe wrapper for createRadialGradient that ensures radii are never negative
 */
export function safeRadialGradient(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number
): CanvasGradient {
  const safeR0 = safeRadius(r0, 0)
  const safeR1 = safeRadius(r1, 0.1)
  return ctx.createRadialGradient(x0, y0, safeR0, x1, y1, safeR1)
}
