import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EDGE AI TRADER",
  description: "AI-powered Forex market analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
