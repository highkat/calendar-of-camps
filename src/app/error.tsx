'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
 
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
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center py-12">
      <AlertTriangle className="h-32 w-32 text-destructive opacity-70 mb-8" />
      <h1 className="text-4xl font-bold text-destructive mb-4">Something went wrong!</h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        We encountered an unexpected issue. Please try again, or contact support if the problem persists.
      </p>
      {error?.message && (
        <p className="text-sm bg-destructive/10 p-3 rounded-md text-destructive mb-8 max-w-xl">
          Error details: {error.message}
        </p>
      )}
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        size="lg"
      >
        Try again
      </Button>
      <Button asChild variant="link" className="mt-4">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  )
}

import Link from 'next/link'; // Add missing import
