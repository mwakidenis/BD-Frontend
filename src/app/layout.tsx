import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import Providers from "@/providers/Providers";
import { Suspense } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SoptokBD",
  description: "Your trusted online medicine store",
  keywords: ["medicine", "pharmacy", "healthcare", "SoptokBD"],
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  publisher: "SoptokBD",
  authors: [
    {
      name: "SoptokBD",
    },
  ],
  creator: "Ishtiak Ahmed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            {children}
            <Toaster position="top-right" />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
