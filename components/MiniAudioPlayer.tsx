'use client'

import { useState, useRef, useEffect } from 'react'
import { PlayIcon, PauseIcon, DownloadIcon, VolumeIcon, MusicIcon } from '@/components/icons'

interface MiniAudioPlayerProps {
  src: string
  title: string
  downloadName?: string
}

export default function MiniAudioPlayer({ src, title, downloadName }: MiniAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Title and Download */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-id8-orange">
            <MusicIcon />
          </span>
          <span className="text-sm font-medium text-[var(--text-primary)]">{title}</span>
        </div>
        <a
          href={src}
          download={downloadName || title}
          className="p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors text-[var(--text-tertiary)] hover:text-id8-orange"
          title="Download audio"
        >
          <DownloadIcon />
        </a>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={!isLoaded}
          className="w-10 h-10 rounded-full bg-id8-orange text-white flex items-center justify-center hover:bg-id8-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-tertiary)] w-10">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative h-2 group">
            <div className="absolute inset-0 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-id8-orange transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-xs font-mono text-[var(--text-tertiary)] w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume Control */}
        <div className="hidden sm:flex items-center gap-1 ml-2">
          <span className="text-[var(--text-tertiary)]">
            <VolumeIcon />
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-[var(--border)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-id8-orange [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
