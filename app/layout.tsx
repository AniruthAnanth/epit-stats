import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cascadiaCode = localFont({
  src: [
    {
      path: "../public/CascadiaCode-2407.24/woff2/CascadiaCode.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/CascadiaCode-2407.24/woff2/CascadiaCodeItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-cascadia-code",
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
    <html lang="en" style={{ colorScheme: 'light' }} className={cascadiaCode.variable}>
      <body className={crimsonPro.className}>
        {children}
      </body>
    </html>
  );
}
