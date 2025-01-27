import type { Metadata } from "next";
import { Inter, Italiana, Montserrat } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cory Surya",
  description: "-",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
