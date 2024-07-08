"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SVGProps, useEffect, useState } from "react";
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
            <CardFooter className="p-0">
              <div className="w-full flex justify-end p-3">
                <StarIcon />
                {card.rating}
              </div>
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


function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}