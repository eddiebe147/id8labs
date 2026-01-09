export function AuthDivider(): React.ReactElement {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border-light dark:border-border-dark" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white dark:bg-bg-dark text-text-light-secondary dark:text-text-dark-secondary">
          or continue with email
        </span>
      </div>
    </div>
  )
}
