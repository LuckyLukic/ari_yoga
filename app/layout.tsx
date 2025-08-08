// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ari Yoga — Lezioni di Yoga online",
    template: "%s | Ari Yoga",
  },
  description:
    "Lezioni di yoga online con playlist e percorsi guidati. Video gratuiti e area premium per iscritti.",
  keywords: [
    "yoga",
    "lezioni yoga",
    "playlist yoga",
    "meditazione",
    "benessere",
  ],
  openGraph: {
    title: "Ari Yoga — Lezioni di Yoga online",
    description:
      "Lezioni di yoga online con playlist e percorsi guidati. Video gratuiti e area premium per iscritti.",
    url: "https://example.com",
    siteName: "Ari Yoga",
    type: "website",
  },
  alternates: { canonical: "https://example.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
