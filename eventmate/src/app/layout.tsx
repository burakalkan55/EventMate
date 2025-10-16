import "./globals.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "EventMate",
  description: "Find your perfect event partner.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
      

        {/* Sayfa içeriği */}
        <main>{children}</main>

        {/* Footer her sayfada en altta */}
        <Footer />
      </body>
    </html>
  );
}
