import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWAProvider from "@/components/pwa-provider";

// Import Firebase to initialize and log environment
import { getEnvironmentInfo } from "@/lib/firebase";

// Log environment info immediately
if (typeof window !== 'undefined') {
  const envInfo = getEnvironmentInfo();
  console.log('\n🔥 FIREBASE ENVIRONMENT INFO:');
  console.log(`Environment: ${envInfo.name}`);
  console.log(`Project ID: ${envInfo.config.projectId}`);
  console.log(`Auth Domain: ${envInfo.config.authDomain}`);
  console.log(`Is Production: ${envInfo.isProduction}\n`);
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PWA App",
  description: "A Progressive Web Application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PWA App",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "PWA App",
    title: "PWA App",
    description: "A Progressive Web Application",
  },
  twitter: {
    card: "summary",
    title: "PWA App",
    description: "A Progressive Web Application",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="A Progressive Web Application" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.svg" />
        
        <link rel="icon" type="image/svg+xml" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.svg" />
        <link rel="shortcut icon" href="/icons/icon-192x192.svg" />
        
        {/* Splash Screens */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Disable zooming on mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWAProvider>
          {children}
        </PWAProvider>
      </body>
    </html>
  );
}
