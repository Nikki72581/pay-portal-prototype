import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuvei Pay Portal (Prototype)",
  description: "Prototype portal for AR/AP payment links and portal payments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-neutral-50 antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
