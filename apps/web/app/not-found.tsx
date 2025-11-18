import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-text-dark">Page Not Found</h2>
        <p className="mb-6 text-secondary">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

