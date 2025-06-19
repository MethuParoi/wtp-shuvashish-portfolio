import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center gap-6">
      <h2 className="text-9xl font-bold text-secondary">404</h2>
      <p className="text-xl text-[#101010]">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors cursor-pointer">
          Go to Home
        </button>
      </Link>
    </div>
  );
}