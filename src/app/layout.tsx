// app/layout.tsx
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <AuthProvider> */}

        
        <AuthProvider>{children}</AuthProvider>
          <Toaster />
          {/* <Navbar /> */}

        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
