interface AuthErrorMessageProps {
  error: string | null
}

export function AuthErrorMessage({ error }: AuthErrorMessageProps): React.ReactElement | null {
  if (!error) return null

  return (
    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
    </div>
  )
}
