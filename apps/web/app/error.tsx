"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-text-dark">Something went wrong!</h2>
        <p className="mb-6 text-secondary">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

