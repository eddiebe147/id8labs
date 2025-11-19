/**
 * useWaveSimulation Hook
 * Manages wave grid state and ripple lifecycle
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  createWaveGrid,
  updateWaveGrid,
  createRipple,
  updateRipples,
  shouldSpawnAmbientRipple,
  generateRandomRipplePosition,
  type WaveGrid,
  type RippleSource,
} from '@/utils/wavePhysics'

export interface WaveSimulationConfig {
  width: number
  height: number
  spacing: number
  dampening?: number
  ambientRippleInterval?: number
  maxAmbientRipples?: number
  enabled?: boolean
}

export interface WaveSimulationState {
  grid: WaveGrid
  ripples: RippleSource[]
  time: number
}

export function useWaveSimulation(config: WaveSimulationConfig) {
  const {
    width,
    height,
    spacing,
    dampening = 0.95,
    ambientRippleInterval = 4000,
    maxAmbientRipples = 3,
    enabled = true,
  } = config

  const [grid, setGrid] = useState<WaveGrid>(() =>
    createWaveGrid(width, height, spacing)
  )
  const [ripples, setRipples] = useState<RippleSource[]>([])
  const timeRef = useRef(0)
  const lastAmbientSpawnRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Reset grid when dimensions change
  useEffect(() => {
    setGrid(createWaveGrid(width, height, spacing))
  }, [width, height, spacing])

  // Animation loop
  useEffect(() => {
    if (!enabled) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return
    }

    const animate = () => {
      timeRef.current += 1

      // Update existing ripples (age them and remove expired)
      setRipples((currentRipples) => {
        const updated = updateRipples(currentRipples)

        // Spawn ambient ripples
        const now = Date.now()
        if (
          shouldSpawnAmbientRipple(
            lastAmbientSpawnRef.current,
            now,
            ambientRippleInterval
          )
        ) {
          const ambientCount = updated.filter((r) => r.type === 'ambient').length
          if (ambientCount < maxAmbientRipples) {
            const pos = generateRandomRipplePosition(width, height)
            updated.push(createRipple(pos.x, pos.y, 'ambient'))
            lastAmbientSpawnRef.current = now
          }
        }

        return updated
      })

      // Update wave grid
      setGrid((currentGrid) => {
        const newGrid = {
          ...currentGrid,
          points: currentGrid.points.map((row) =>
            row.map((point) => ({ ...point }))
          ),
        }
        updateWaveGrid(newGrid, ripples, timeRef.current, dampening)
        return newGrid
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [
    enabled,
    width,
    height,
    spacing,
    dampening,
    ambientRippleInterval,
    maxAmbientRipples,
    ripples,
  ])

  // Add ripple at specific position
  const addRipple = useCallback(
    (x: number, y: number, amplitude?: number) => {
      setRipples((current) => [...current, createRipple(x, y, 'mouse', amplitude)])
    },
    []
  )

  // Clear all ripples
  const clearRipples = useCallback(() => {
    setRipples([])
  }, [])

  return {
    grid,
    ripples,
    time: timeRef.current,
    addRipple,
    clearRipples,
  }
}
