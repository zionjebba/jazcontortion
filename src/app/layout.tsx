export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/env"; // Trigger env validation on startup
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Jaz Contortion",
    default: "Jaz Contortion | Flexibility & Mobility Coaching",
  },
  description: "Transform your body with expert flexibility and mobility coaching by Jaz Contortion. Discover online programs, video courses, and personal training.",
  openGraph: {
    title: "Jaz Contortion | Flexibility & Mobility Coaching",
    description: "Transform your body with expert flexibility and mobility coaching by Jaz Contortion.",
    url: "https://jazcontortion.com",
    siteName: "Jaz Contortion",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaz Contortion | Flexibility & Mobility Coaching",
    description: "Transform your body with expert flexibility and mobility coaching.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
