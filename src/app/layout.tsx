import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import Providers from "@/providers/Providers";
import { Suspense } from "react";
// import Providers from "../providers/Providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppinsClassName: string = poppins.className;

export const metadata: Metadata = {
  title: "SoptokBD",
  description: "",
  keywords: [""],
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  publisher: "",
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
    <html lang="en">
      <body className={`${poppinsClassName}  antialiased`}>
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
