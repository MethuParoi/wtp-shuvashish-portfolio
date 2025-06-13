
import "../global.css";
// import Navbar from "../../components/navbar/Navbar";


export default function RootLayout({
  children,
}) {
  return (
      <div>
        <div className="min-w-screen min-h-screen flex">
          {/* <Navbar /> */}
          {children}
          
        </div>
      </div>
  );
}