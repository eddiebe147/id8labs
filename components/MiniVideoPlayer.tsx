'use client'

import { useState, useRef } from 'react'

interface MiniVideoPlayerProps {
  src: string
  poster?: string
  title: string
  downloadName?: string
}

const PlayIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
)

const ExpandIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
)

export default function MiniVideoPlayer({ src, poster, title, downloadName }: MiniVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    video.play()
    setIsPlaying(true)
    setShowControls(true)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-black group">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={showControls}
          className="w-full h-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Play Overlay - only show when not playing and no controls */}
        {!isPlaying && !showControls && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
          >
            <div className="w-20 h-20 rounded-full bg-id8-orange/90 hover:bg-id8-orange flex items-center justify-center text-white transition-colors">
              <PlayIcon />
            </div>
          </button>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between p-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-id8-orange">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </span>
          <span className="text-sm font-medium text-[var(--text-primary)]">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            title="Fullscreen"
          >
            <ExpandIcon />
          </button>
          <a
            href={src}
            download={downloadName || title}
            className="p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors text-[var(--text-tertiary)] hover:text-id8-orange"
            title="Download video"
          >
            <DownloadIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
