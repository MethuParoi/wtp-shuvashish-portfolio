
import Navbar from "@/components/ui/Navigation/Navbar";
import "../global.css";
import Footer from "@/components/ui/Navigation/Footer";


export default function RootLayout({
  children,
}) {
  return (
      <div>
        <div className="min-w-screen min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 min-h-[80dvh]">
            {children}
          </div>
          <Footer/>
        </div>
      </div>
  );
}