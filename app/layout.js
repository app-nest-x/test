import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google"; // Add Roboto import
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",  // Add Roboto font variable
  subsets: ["latin"],
  weight:"500"
});

export const metadata = {
  title: "Expense Tracker",
  description: "Your Personal Expense Tracker App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
          <Toaster/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
