import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "An Introduction to Applied Statistics for Epidemiology",
  description: "Learn R and Python through the lens of statistical thinking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <body className={crimsonPro.className}>
        {children}
      </body>
    </html>
  );
}
