"use client";
export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="flex flex-col items-center justify-center w-full h-[80vh] text-center px-4">
      <h1 className="text-not-found-h text-54-64-700">Error</h1>
      {error.message ? (
        <h2 className="text-not-found-h text-28-40-500">{error.message}</h2>
      ) : (
        <h2 className="text-not-found-h text-28-40-500">
          Something went wrong
        </h2>
      )}
      <p className="text-not-found-text text-18-28-500">
        Please try again later or return to the{" "}
        <a href="/" className="text-not-found-link underline">
          HomePage
        </a>
        .
      </p>
    </main>
  );
}
