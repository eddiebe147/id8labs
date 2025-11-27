'use client'

import { useState } from 'react'
import { LEDWallBg, LEDWallVariant } from '@/components/foundation/led-wall-bg'
import { NeuralNetworkBg } from '@/components/foundation/neural-network-bg'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Background Explorer Test Page
 *
 * Multiple background styles:
 * - LED Wall: Dot matrix aesthetic with pixel trace trails
 * - Neural Network: 3D rotating brain with firing synapses
 */

type BackgroundMode = 'led-wall' | 'neural-network'

const ledVariants: Array<{ id: LEDWallVariant; name: string; description: string }> = [
  {
    id: 'always-visible',
    name: 'Always Visible Grid',
    description: 'Every LED dot is dimly lit in charcoal, orange data "paints" over them brighter with pixel trace trails',
  },
  {
    id: 'dots-on-demand',
    name: 'Dots On Demand',
    description: 'Dots are invisible until orange data passes through - they glow and fade like phosphor trails',
  },
  {
    id: 'wave-patterns',
    name: 'Wave Patterns',
    description: 'Charcoal dots pulse in sine wave patterns across the screen, orange rides on top',
  },
]

export default function TestBackgroundPage() {
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('led-wall')
  const [activeVariant, setActiveVariant] = useState<LEDWallVariant>('dots-on-demand')
  const [intensity, setIntensity] = useState(50)
  const [particleCount, setParticleCount] = useState(25)
  const [gridSpacing, setGridSpacing] = useState(22)
  const [showControls, setShowControls] = useState(true)

  // Neural network specific controls
  const [neuronCount, setNeuronCount] = useState(60)
  const [connectionDensity, setConnectionDensity] = useState(40)
  const [rotationSpeed, setRotationSpeed] = useState(0.001)
  const [fireRate, setFireRate] = useState(30)

  const currentVariant = ledVariants.find(v => v.id === activeVariant)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        {backgroundMode === 'led-wall' ? (
          <motion.div
            key={`led-${activeVariant}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LEDWallBg
              variant={activeVariant}
              orangeIntensity={intensity}
              particleCount={particleCount}
              gridSpacing={gridSpacing}
              dotSize={4}
              trailLength={30}
            />
          </motion.div>
        ) : (
          <motion.div
            key="neural-network"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <NeuralNetworkBg
              neuronCount={neuronCount}
              connectionDensity={connectionDensity}
              rotationSpeed={rotationSpeed}
              fireRate={fireRate}
              orangeIntensity={intensity}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Toggle controls button */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-colors"
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>

        {/* Control panel */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed top-4 left-4 z-50 p-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-sm max-h-[90vh] overflow-y-auto"
            >
              <h1 className="text-xl font-bold text-white mb-1">Background Explorer</h1>
              <p className="text-white/60 text-xs mb-6">Choose your visual style</p>

              {/* Background Mode Toggle */}
              <div className="mb-6">
                <label className="text-white/80 text-xs font-medium uppercase tracking-wide mb-3 block">Background Style</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBackgroundMode('led-wall')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                      backgroundMode === 'led-wall'
                        ? 'bg-[#FF7A4D]/20 border-[#FF7A4D] text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    LED Wall
                  </button>
                  <button
                    onClick={() => setBackgroundMode('neural-network')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                      backgroundMode === 'neural-network'
                        ? 'bg-[#FF7A4D]/20 border-[#FF7A4D] text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    Neural Network
                  </button>
                </div>
              </div>

              {/* LED Wall Controls */}
              {backgroundMode === 'led-wall' && (
                <>
                  {/* Variant selector */}
                  <div className="space-y-3 mb-6">
                    <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Dot Behavior</label>
                    <div className="space-y-2">
                      {ledVariants.map(v => (
                        <button
                          key={v.id}
                          onClick={() => setActiveVariant(v.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            activeVariant === v.id
                              ? 'bg-[#FF7A4D]/20 border-[#FF7A4D] text-white'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="font-medium text-sm">{v.name}</div>
                          <div className="text-xs opacity-60 mt-1 line-clamp-2">{v.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Particle count slider */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Particle Count</label>
                      <span className="text-[#FF7A4D] text-sm font-mono">{particleCount}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={particleCount}
                      onChange={e => setParticleCount(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                    />
                  </div>

                  {/* Grid spacing slider */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Grid Density</label>
                      <span className="text-[#FF7A4D] text-sm font-mono">{gridSpacing}px</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="40"
                      value={gridSpacing}
                      onChange={e => setGridSpacing(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                    />
                  </div>
                </>
              )}

              {/* Neural Network Controls */}
              {backgroundMode === 'neural-network' && (
                <>
                  {/* Neuron count */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Neuron Count</label>
                      <span className="text-[#FF7A4D] text-sm font-mono">{neuronCount}</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="120"
                      value={neuronCount}
                      onChange={e => setNeuronCount(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                    />
                  </div>

                  {/* Connection density */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Connection Density</label>
                      <span className="text-[#FF7A4D] text-sm font-mono">{connectionDensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={connectionDensity}
                      onChange={e => setConnectionDensity(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                    />
                  </div>

                  {/* Fire rate */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Fire Rate</label>
                      <span className="text-[#FF7A4D] text-sm font-mono">{fireRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={fireRate}
                      onChange={e => setFireRate(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                    />
                  </div>

                  {/* Rotation speed */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Rotation Speed</label>
                      <span className="text-[#FF7A4D] text-sm font-mono">{(rotationSpeed * 1000).toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rotationSpeed * 1000}
                      onChange={e => setRotationSpeed(Number(e.target.value) / 1000)}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 mt-1">
                      <span>Still</span>
                      <span>Fast</span>
                    </div>
                  </div>
                </>
              )}

              {/* Shared: Intensity slider */}
              <div className="mb-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white/80 text-xs font-medium uppercase tracking-wide">Orange Intensity</label>
                  <span className="text-[#FF7A4D] text-sm font-mono">{intensity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={intensity}
                  onChange={e => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A4D]"
                />
              </div>

              {/* Quick presets */}
              <div className="pt-4 border-t border-white/10">
                <label className="text-white/80 text-xs font-medium uppercase tracking-wide mb-3 block">Quick Presets</label>
                <div className="flex gap-2 flex-wrap">
                  {backgroundMode === 'led-wall' ? (
                    <>
                      <button
                        onClick={() => { setIntensity(35); setParticleCount(15); setGridSpacing(25); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Subtle
                      </button>
                      <button
                        onClick={() => { setIntensity(50); setParticleCount(25); setGridSpacing(22); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Balanced
                      </button>
                      <button
                        onClick={() => { setIntensity(70); setParticleCount(40); setGridSpacing(20); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Dense
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setNeuronCount(40); setConnectionDensity(30); setFireRate(15); setRotationSpeed(0.0005); setIntensity(40); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Calm
                      </button>
                      <button
                        onClick={() => { setNeuronCount(60); setConnectionDensity(40); setFireRate(30); setRotationSpeed(0.001); setIntensity(60); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Active
                      </button>
                      <button
                        onClick={() => { setNeuronCount(100); setConnectionDensity(60); setFireRate(60); setRotationSpeed(0.002); setIntensity(80); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Intense
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero section */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.7)' }}
            >
              ID8Labs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 mb-8"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
            >
              Life is non-linear. Your tools should be too.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex gap-4"
            >
              <button className="px-6 py-3 bg-[#FF7A4D] text-white font-medium rounded-lg hover:bg-[#FF8F66] transition-colors shadow-lg shadow-[#FF7A4D]/30">
                Primary Action
              </button>
              <button className="px-6 py-3 border-2 border-[#FF7A4D] text-[#FF7A4D] font-medium rounded-lg hover:bg-[#FF7A4D]/10 transition-colors">
                Secondary
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll test sections - to test parallax */}
        <div className="py-24 px-8">
          <div className="max-w-4xl mx-auto space-y-32">
            <section className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-4">Section One</h3>
              <p className="text-white/70 text-lg">
                Scroll down to see the parallax effect. The neural network background moves slightly slower than the content,
                creating a subtle depth effect that makes the content feel like it's floating above the brain visualization.
              </p>
            </section>

            <section className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-4">Section Two</h3>
              <p className="text-white/70 text-lg">
                The parallax factor is set to 0.15 by default, meaning the background moves at 15% of the scroll speed.
                This is subtle enough to feel natural without being disorienting.
              </p>
            </section>

            <section className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-4">Section Three</h3>
              <p className="text-white/70 text-lg">
                The neural network continues its slow rotation and occasional signal firing regardless of scroll position,
                creating a living, breathing backdrop for your content.
              </p>
            </section>

            <section className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-4">Final Section</h3>
              <p className="text-white/70 text-lg">
                Even at the bottom of the page, the background remains visible and active - full opacity throughout.
              </p>
            </section>
          </div>
        </div>

        {/* Current mode indicator */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
            <span className="text-white/60 text-sm">Active: </span>
            <span className="text-[#FF7A4D] text-sm font-medium">
              {backgroundMode === 'led-wall' ? currentVariant?.name : 'Neural Network'}
            </span>
          </div>
        </div>

        {/* Info card */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4"
            >
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF7A4D] mt-1.5 animate-pulse" />
                  <div>
                    {backgroundMode === 'led-wall' && currentVariant ? (
                      <>
                        <p className="text-white/90 text-sm font-medium mb-1">{currentVariant.name}</p>
                        <p className="text-white/60 text-xs">{currentVariant.description}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-white/90 text-sm font-medium mb-1">Neural Network</p>
                        <p className="text-white/60 text-xs">3D rotating brain visualization with firing synapses that cascade through connected neurons</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
