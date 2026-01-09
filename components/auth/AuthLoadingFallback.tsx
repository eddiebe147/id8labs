export function AuthLoadingFallback(): React.ReactElement {
  return (
    <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg p-8 shadow-lg">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mt-8" />
      </div>
    </div>
  )
}
