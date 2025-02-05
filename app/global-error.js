'use client';

export default function GlobalError({
  error,
  reset,
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
            <p className="text-gray-500 mb-8">{error.message || 'An unexpected error occurred'}</p>
            <button
              onClick={() => reset()}
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 