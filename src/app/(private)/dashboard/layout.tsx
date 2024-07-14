import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../../globals.css";
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
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
