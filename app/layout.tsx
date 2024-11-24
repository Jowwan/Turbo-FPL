import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turbo FPL",
  description:
    "FPL Turbo is the ultimate Fantasy Premier League tool, featuring AI-powered predicted points, Opta stats for all players, team management with FPL ID, and predicted price changes. Optimize your FPL strategy with data-driven insights and make smarter decisions each week",
  icons: {
    icon: "/FPLTurboIcon.png", // /public path
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
