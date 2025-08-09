import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // se Navbar è default
import Footer from "@/components/Footer"; // se Footer è default
import SessionProvider from "@/components/SessionProvider"; // <-- senza {}

export const metadata: Metadata = {
  title: "Ari Yoga",
  description: "Lezioni di yoga online - Ari Yoga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className="antialiased bg-gray-50 text-gray-900"
        suppressHydrationWarning
      >
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
