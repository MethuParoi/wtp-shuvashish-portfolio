
import Navbar from "@/components/ui/Navigation/Navbar";
import "../global.css";
import Footer from "@/components/ui/Navigation/Footer";


export default function RootLayout({
  children,
}) {
  return (
    <div>
      <div className="bg-dark-navy flex min-h-screen min-w-screen flex-col">
        <Navbar />
        <div className="min-h-[80dvh] flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}