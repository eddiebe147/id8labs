/**
 * Loading State Component
 *
 * Displays during route transitions
 * Simple skeleton maintaining VHS aesthetic
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center space-y-6">
        {/* Logo Skeleton */}
        <div className="animate-pulse">
          <div className="font-mono text-5xl md:text-6xl font-bold tracking-wider">
            <span className="text-accent">ID8</span>
            <span className="text-text-primary">LABS</span>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: 'var(--rgb-red)',
              animationDelay: '0s',
            }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: 'var(--rgb-green)',
              animationDelay: '0.2s',
            }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: 'var(--rgb-blue)',
              animationDelay: '0.4s',
            }}
          />
        </div>
      </div>
    </div>
  )
}
