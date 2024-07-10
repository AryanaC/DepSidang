import { FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./button";
import { IGallery } from "@/types/gallery";
import Link from "next/link";

interface ModalProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  data?: IGallery;
}

const Modal: FC<ModalProps> = ({ image, isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-white border border-black grid grid-cols-1 md:grid-cols-3 min-w-[90%] max-w-[90%] min-h-[70%] md:min-h-[90%] max-h-[90%] mx-auto">
        <div className="relative w-full h-full overflow-hidden col-span-1 md:col-span-2">
          <Image
            src={image}
            alt="Full Size Image"

            fill
            className="object-contain bg-cover"
          />
        </div>
        <div className="p-4">
          <Button
            onClick={onClose}
            variant={"link"}
            className="absolute top-2 right-2 p-2 text-neutral-950 rounded-full"
            >
                <X />
            </Button>
          <h2 className="text-2xl font-semibold mb-2">{data?.information.judul_foto}</h2>
          <h2 className="text-lg font-medium mb-4">{data?.information.nama_lokasi}</h2>
          <p className="font-light mb-7">{data?.information.deskripsi}</p>
          <Link href={`/rating/${data?.id_galery}`}>
            <Button>Comment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
