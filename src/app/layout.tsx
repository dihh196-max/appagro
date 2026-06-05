import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroNet — Tudo do agro, em um só lugar",
  description:
    "SaaS do agronegócio: clima, cotações, calculadoras, AgroIA e muito mais.",
  applicationName: "AgroNet",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AgroNet",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1A2F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-fg flex flex-col">{children}</body>
    </html>
  );
}
