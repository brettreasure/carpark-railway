import type { Metadata } from "next";
  import { Inter } from "next/font/google";
  import "./globals.css";
  import Navigation from "@/components/Navigation";

  const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
  });

  export const metadata: Metadata = {
    title: "Not bad for a carpark",
    description: "A burst-out-laughing commentary on ridiculous 
  online reviews and modern Australian humour",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
          className={`${inter.variable} antialiased min-h-screen`}
        >
          <Navigation />
          <main className="pt-14">
            {children}
          </main>
        </body>
      </html>
    );
  }
