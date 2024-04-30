import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import CartContextProvider from "@/lib/store/CartContext";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CartContextProvider>
        <html lang="en">
          <body className={roboto.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navigation />
              {children}
              <Toaster position="top-right" />
              <Footer />
            </ThemeProvider>
          </body>
        </html>
      </CartContextProvider>
    </ClerkProvider>
  );
}
