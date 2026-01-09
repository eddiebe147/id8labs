interface MagicLinkSuccessProps {
  email: string
  onReset: () => void
  variant?: 'sign-in' | 'sign-up'
}

export function MagicLinkSuccess({ email, onReset, variant = 'sign-in' }: MagicLinkSuccessProps): React.ReactElement {
  const bgColor = variant === 'sign-up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-orange-100 dark:bg-orange-900/20'
  const iconColor = variant === 'sign-up' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
  const description = variant === 'sign-up'
    ? 'Click the link to create your account and sign in. No password needed.'
    : 'Click the link in the email to sign in. No password needed.'

  const icon = variant === 'sign-up' ? (
    <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )

  return (
    <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg p-8 shadow-lg">
      <div className="text-center">
        <div className={`mx-auto w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
          Check your email
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6">
          We sent a magic link to <strong>{email}</strong>
        </p>
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {description}
        </p>
        <button
          onClick={onReset}
          className="mt-6 text-sm text-orange-500 dark:text-orange-400 hover:underline"
        >
          Use a different email
        </button>
      </div>
    </div>
  )
}
