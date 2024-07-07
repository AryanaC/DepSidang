"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { IGallery } from "@/types/gallery";
import { getGalery } from "../api/gallery/route";
import Image from "next/image";

export default function Galery() {
  return (
    <main>
      <GallerySection />
    </main>
  );
}

const GallerySection = () => {
  const [data, setData] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGalery();
        setData(result);
      } catch (error) {
        console.error("Error fetching information data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-svh bg-white p-3 md:p-28">
      <h1 className="text-2xl font-bold text-center">Our Gallery</h1>
      <div className="grid grid-cols-3">
        {data.map((card) => (
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-40">
                <Image fill src={card.image} alt="" className="bg-cover" />
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
