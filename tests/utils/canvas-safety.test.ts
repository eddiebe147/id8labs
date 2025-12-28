import { describe, it, expect, vi, beforeEach } from 'vitest'
import { safeArc, safeRadius, safeRadialGradient } from '@/utils/canvas-safety'

describe('Canvas Safety Utilities', () => {
  describe('safeRadius', () => {
    it('should return the radius when positive', () => {
      expect(safeRadius(10)).toBe(10)
      expect(safeRadius(0.5)).toBe(0.5)
      expect(safeRadius(1000)).toBe(1000)
    })

    it('should return minimum radius when input is negative', () => {
      expect(safeRadius(-5)).toBe(0.1)
      expect(safeRadius(-0.001)).toBe(0.1)
      expect(safeRadius(-1000)).toBe(0.1)
    })

    it('should return minimum radius when input is zero', () => {
      expect(safeRadius(0)).toBe(0.1)
    })

    it('should return minimum radius when input is NaN', () => {
      expect(safeRadius(NaN)).toBe(0.1)
    })

    it('should return minimum radius when input is Infinity', () => {
      expect(safeRadius(Infinity)).toBe(0.1)
      expect(safeRadius(-Infinity)).toBe(0.1)
    })

    it('should use custom minimum radius when provided', () => {
      expect(safeRadius(-5, 1)).toBe(1)
      expect(safeRadius(0, 0.5)).toBe(0.5)
      expect(safeRadius(NaN, 2)).toBe(2)
    })

    it('should not affect valid radii when custom minimum is smaller', () => {
      expect(safeRadius(10, 5)).toBe(10)
      expect(safeRadius(0.3, 0.1)).toBe(0.3)
    })

    it('should clamp to custom minimum when radius is below it', () => {
      expect(safeRadius(0.05, 0.1)).toBe(0.1)
      expect(safeRadius(2, 5)).toBe(5)
    })
  })

  describe('safeArc', () => {
    let mockCtx: CanvasRenderingContext2D
    let mockArc: ReturnType<typeof vi.fn>

    beforeEach(() => {
      mockArc = vi.fn()
      mockCtx = {
        arc: mockArc,
      } as unknown as CanvasRenderingContext2D
    })

    it('should call ctx.arc with valid positive radius', () => {
      safeArc(mockCtx, 100, 100, 50, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 50, 0, Math.PI * 2, undefined)
    })

    it('should clamp negative radius to 0.1', () => {
      safeArc(mockCtx, 100, 100, -50, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should clamp zero radius to 0.1', () => {
      safeArc(mockCtx, 100, 100, 0, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should clamp NaN radius to 0.1', () => {
      safeArc(mockCtx, 100, 100, NaN, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should clamp Infinity radius to 0.1', () => {
      safeArc(mockCtx, 100, 100, Infinity, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should pass through counterclockwise parameter', () => {
      safeArc(mockCtx, 100, 100, 50, 0, Math.PI, true)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 50, 0, Math.PI, true)
    })

    it('should pass through all angle parameters correctly', () => {
      safeArc(mockCtx, 50, 75, 25, Math.PI / 4, Math.PI * 1.5, false)

      expect(mockArc).toHaveBeenCalledWith(50, 75, 25, Math.PI / 4, Math.PI * 1.5, false)
    })

    it('should handle very small positive radii', () => {
      safeArc(mockCtx, 100, 100, 0.05, 0, Math.PI * 2)

      // 0.05 < 0.1, so should be clamped to 0.1
      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should preserve radii equal to minimum', () => {
      safeArc(mockCtx, 100, 100, 0.1, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })
  })

  describe('safeRadialGradient', () => {
    let mockCtx: CanvasRenderingContext2D
    let mockCreateRadialGradient: ReturnType<typeof vi.fn>
    let mockGradient: CanvasGradient

    beforeEach(() => {
      mockGradient = {} as CanvasGradient
      mockCreateRadialGradient = vi.fn().mockReturnValue(mockGradient)
      mockCtx = {
        createRadialGradient: mockCreateRadialGradient,
      } as unknown as CanvasRenderingContext2D
    })

    it('should create gradient with valid positive radii', () => {
      const result = safeRadialGradient(mockCtx, 100, 100, 10, 100, 100, 50)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 10, 100, 100, 50)
      expect(result).toBe(mockGradient)
    })

    it('should clamp negative inner radius to 0', () => {
      safeRadialGradient(mockCtx, 100, 100, -10, 100, 100, 50)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 0, 100, 100, 50)
    })

    it('should clamp negative outer radius to 0.1', () => {
      safeRadialGradient(mockCtx, 100, 100, 10, 100, 100, -50)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 10, 100, 100, 0.1)
    })

    it('should clamp both radii when both are negative', () => {
      safeRadialGradient(mockCtx, 100, 100, -10, 100, 100, -50)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 0, 100, 100, 0.1)
    })

    it('should allow zero inner radius', () => {
      safeRadialGradient(mockCtx, 100, 100, 0, 100, 100, 50)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 0, 100, 100, 50)
    })

    it('should handle NaN radii', () => {
      safeRadialGradient(mockCtx, 100, 100, NaN, 100, 100, NaN)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 0, 100, 100, 0.1)
    })

    it('should handle Infinity radii', () => {
      safeRadialGradient(mockCtx, 100, 100, Infinity, 100, 100, -Infinity)

      expect(mockCreateRadialGradient).toHaveBeenCalledWith(100, 100, 0, 100, 100, 0.1)
    })

    it('should return the gradient object', () => {
      const result = safeRadialGradient(mockCtx, 0, 0, 0, 100, 100, 100)

      expect(result).toBe(mockGradient)
    })
  })

  describe('Real-world scenarios from CLAUDE.md', () => {
    let mockCtx: CanvasRenderingContext2D
    let mockArc: ReturnType<typeof vi.fn>

    beforeEach(() => {
      mockArc = vi.fn()
      mockCtx = {
        arc: mockArc,
      } as unknown as CanvasRenderingContext2D
    })

    it('should handle 3D perspective projection producing negative radius', () => {
      // Simulating: scale = fov / (fov + z) where z < -fov produces negative scale
      const fov = 500
      const z = -600 // Behind camera
      const scale = fov / (fov + z) // = 500 / -100 = -5
      const baseRadius = 10
      const calculatedRadius = baseRadius * scale // = -50

      safeArc(mockCtx, 100, 100, calculatedRadius, 0, Math.PI * 2)

      // Should NOT crash, radius should be clamped
      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should handle resize race condition with zero dimensions', () => {
      const width = 0 // Before window dimensions are set
      const height = 0
      const radius = Math.min(width, height) / 2 // = 0

      safeArc(mockCtx, 0, 0, radius, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(0, 0, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should handle division by zero in row calculations', () => {
      const y = 50
      const rows = 0 // Edge case
      const radius = rows === 0 ? 0 : y / rows

      safeArc(mockCtx, 100, 100, radius, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })

    it('should handle lerp interpolation edge cases', () => {
      // Sometimes lerp can produce unexpected values at extremes
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const unexpectedRadius = lerp(10, -20, 1.5) // = 10 + (-30 * 1.5) = -35

      safeArc(mockCtx, 100, 100, unexpectedRadius, 0, Math.PI * 2)

      expect(mockArc).toHaveBeenCalledWith(100, 100, 0.1, 0, Math.PI * 2, undefined)
    })
  })
})
