import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Expense Tracker",
  description: "Your Personal Expense Tracker App",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
};

function Fallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Configuration Error</h1>
        <p className="text-gray-500 mb-8">The application is not properly configured. Please check your environment variables.</p>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Fallback />
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
