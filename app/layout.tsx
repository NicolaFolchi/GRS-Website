import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Rental Solutions LLC | Energy, Maritime Logistics & Procurement",
  description:
    "Integrated services, logistics support, global procurement, and specialized engineering solutions for energy, maritime, subsea, and industrial operations.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1C3D",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
