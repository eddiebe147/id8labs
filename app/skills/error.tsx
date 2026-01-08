'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Skills Page Error:', error)
  }, [error])

  return (
    <div className="container py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-red-500 mb-8 max-w-lg mx-auto bg-gray-100 p-4 rounded text-left overflow-auto">
        {error.message}
        {error.digest && <span className="block text-xs mt-2 text-gray-500">Digest: {error.digest}</span>}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 border rounded hover:bg-gray-50">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
