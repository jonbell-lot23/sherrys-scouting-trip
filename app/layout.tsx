import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sherry's Sydney Scouting Trip",
  description: "IoT & home automation scouting guide for Sydney, Australia",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-dvh">
        <nav className="sticky top-0 z-50 border-b border-stone-200 dark:border-stone-700 bg-[var(--bg)]/90 backdrop-blur-sm">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-bold text-lg">
              🦘 Scouting Trip
            </a>
            <div className="flex gap-4 text-sm">
              <a href="/neighborhoods" className="hover:text-[var(--accent)]">
                Neighborhoods
              </a>
              <a href="/chat" className="hover:text-[var(--accent)]">
                Ask
              </a>
            </div>
          </div>
        </nav>
        <main className="max-w-lg mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
