import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocationProvider } from "@/context/LocationContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import LocationModal from "@/components/LocationModal";
import AuthModal from "@/components/AuthModal";
import AiAssistantModal from "@/components/AiAssistantModal";

export const viewport: Viewport = {
  themeColor: "#174B35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ODIVA (ଓଡ଼ିଭା) – Your Odisha. Your Taste. Your Store.",
  description:
    "Odisha's authentic quick-commerce grocery platform delivering everyday groceries, GI-tagged sweets, fresh farm vegetables, and heritage recipes to your doorstep.",
  keywords: [
    "Odisha grocery",
    "Bhubaneswar grocery delivery",
    "Cuttack quick commerce",
    "Chhena Poda",
    "Pahala Rasagola",
    "Arua Rice",
    "Keonjhar Phula Badi",
    "Dalma ingredients",
    "ODIVA",
    "ଓଡ଼ିଭା",
  ],
  authors: [{ name: "ODIVA Technologies" }],
  openGraph: {
    title: "ODIVA (ଓଡ଼ିଭା) – Your Odisha. Your Taste. Your Store.",
    description: "Discover everyday groceries, traditional Odia favourites, and fresh produce delivered in 30-60 mins.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased text-odiva-dark">
        <LanguageProvider>
          <LocationProvider>
            <AuthProvider>
              <WishlistProvider>
                <CartProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <CartDrawer />
                  <LocationModal />
                  <AuthModal />
                  <AiAssistantModal />
                </CartProvider>
              </WishlistProvider>
            </AuthProvider>
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
