import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import CartContextProvider from "@/lib/store/CartContext";
import OfferContextProvider from "@/lib/store/OfferProductContext";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maxer Shop",
  description:
    "Fast growing shop Maxer. We have the best sneakres and the best prices on the market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CartContextProvider>
        <OfferContextProvider>
          <html lang="en" className="h-full">
            <body className={`flex flex-col min-h-screen ${roboto.className}`}>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Navigation />
                <main className=" flex flex-grow ">{children}</main>
                <Toaster position="top-right" />
                <Footer />
              </ThemeProvider>
            </body>
          </html>
        </OfferContextProvider>
      </CartContextProvider>
    </ClerkProvider>
  );
}
