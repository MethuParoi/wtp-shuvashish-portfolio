import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center gap-6">
      <h2 className="text-9xl font-bold text-[#176D38]">404</h2>
      <p className="text-xl text-[#101010]">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button
          
          sx={{
            ":hover": {
              backgroundColor: "#749B3F",
              border: "1px solid #749B3F",
              color: "white",
            },
            backgroundColor: "transparent",
            border: "1px solid #749B3F",
            boxShadow: "none",
            color: "#749B3F",
            fontWeight: 600,
            borderRadius: "8px",
            display: "inline",
            textTransform: "capitalize",
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
}