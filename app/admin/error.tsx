'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="bg-white p-4 rounded-lg  flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-800">Something went wrong!</h2>
            <p className="text-gray-600 mt-2">We encountered an unexpected issue.</p>
            <button
                onClick={reset}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Try again
            </button>
        </div>
    )
}