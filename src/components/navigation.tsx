"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface NavigationProps {
  isMobile?: boolean;
}

interface NavigationLink {
  link: string;
  label: string;
}

const LINKS: NavigationLink[] = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  { link: "/gallery", label: "Gallery" },
  { link: "https://capstone-pro-flax.vercel.app/", label: "Virtual Map" },
  { link: "/rating", label: "Rating" },
];

const Navigation: React.FC<NavigationProps> = ({ isMobile = false }) => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const setActive = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
      {LINKS.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          onClick={() => setActive(item.link)}
          className={`text-gray-300 transition-all ease-out duration-50 uppercase tracking-widest py-3 px-3 hover:border-b-[1.5px] hover:text-white ${
            isMobile ? "md:hidden" : ""
          } ${activeLink === item.link ? "border-b-[1.5px] font-normal" : "font-light"}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default Navigation;
