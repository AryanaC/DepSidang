"use client"

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Navigation from "@/components/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 flex items-center justify-between h-[6.5rem] px-5 md:px-6 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/90" : "bg-black/50"
      }`}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-white flex items-end gap-2 font-semibold text-lg md:text-2xl uppercase"
        >
          Puri <br /> Agung <span className="font-light">Kerambitan</span>
          <span className="sr-only"></span>
        </Link>
      </div>

      <nav className="hidden flex-col gap-7 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Navigation />
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-black">
          <nav className="grid gap-4 text-lg font-medium">
            <Navigation isMobile />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
