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
import Modal from "@/components/ui/modal";

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
  const [selectedImage, setSelectedImage] = useState<IGallery | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCardClick = (card: IGallery) => {
    setSelectedImage(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="min-h-svh bg-white p-3 md:p-10">
      <h1 className="text-2xl font-bold text-center mt-24 md:mt-28 mb-10">Our Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((card) => (
          <Card key={card.id} onClick={() => handleCardClick(card)} className="cursor-pointer">
            <CardContent className="p-0">
              <div className="relative w-full h-36 md:h-52">
                <Image fill src={card.image} alt="" className="bg-cover" />
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedImage && (
        <Modal
          image={selectedImage.image}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedImage}
        />
      )}
    </section>
  );
};
