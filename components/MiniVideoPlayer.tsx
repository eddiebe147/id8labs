'use client'

import { useState, useRef } from 'react'
import { PlayIcon, DownloadIcon, ExpandIcon, VideoIcon } from '@/components/icons'

interface MiniVideoPlayerProps {
  src: string
  poster?: string
  title: string
  downloadName?: string
}

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
              <PlayIcon className="w-12 h-12" />
            </div>
          </button>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between p-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-id8-orange">
            <VideoIcon />
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
