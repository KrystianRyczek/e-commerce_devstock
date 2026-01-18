export default function PageNotFound() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-[80vh] text-center px-4">
      <h1 className="text-not-found-h text-54-64-700">404</h1>
      <h2 className="text-not-found-h text-44-54-700">Page Not Found</h2>
      <p className="text-not-found-text text-24-36-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="text-not-found-text text-18-28-500">
        Please check the URL or return to the{" "}
        <a href="/" className="text-not-found-link underline">
          HomePage
        </a>
        .
      </p>
    </main>
  );
}
