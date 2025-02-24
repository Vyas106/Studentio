// app/layout.tsx
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
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
