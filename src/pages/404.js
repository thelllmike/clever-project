// src/pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4">Page not found</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Return Home 
        </Link>
      </div>
    </div>
  );
}
