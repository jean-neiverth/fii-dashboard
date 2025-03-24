import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FII Dashboard",
  description: "FII Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-[8vw] flex flex-col justify-center items-center`}
      >
        <header className="m-4 w-full h-20 border-1 rounded-3xl shadow-md shadow-gray-500 border-gray-500 bg-sky-600 text-gray-100 text-4xl font-bold flex justify-center items-center mb-8">
          FII Dashboard
        </header>
        {children}
      </body>
    </html>
  );
}
