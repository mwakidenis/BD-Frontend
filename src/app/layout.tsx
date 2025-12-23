import type { Metadata } from "next";
import "./globals.css";
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
        <Suspense
          fallback={
            <div>
              <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
                <div className="text-center">
                  {/* Animated Spinner */}
                  <div className="relative w-50 h-50 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full">
                      <span className="text-white font-bold text-xl">
                        SoptokBD
                      </span>
                    </div>
                  </div>

                  {/* Loading Text */}
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Loading...
                  </h3>
                  <p className="text-sm text-gray-500">Please wait a moment</p>
                </div>
              </div>
            </div>
          }
        >
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
