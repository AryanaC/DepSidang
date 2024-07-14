import { createInformation } from "@/app/api/information/route";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "../spinner";
import { Label } from "@/components/ui/label";

interface CreateInformationProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateInformation({ open, onClose }: CreateInformationProps) {
  const [judulFoto, setJudulFoto] = useState("");
  const [namaLokasi, setNamaLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!judulFoto || !namaLokasi || !deskripsi) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out all fields.",
      });
      setLoading(false);
      return;
    }

    const data = {
      judul_foto: judulFoto,
      nama_lokasi: namaLokasi,
      deskripsi: deskripsi,
    };

    try {
      await createInformation(data);
      setLoading(false);
      toast({
        title: "Success",
        description: "Information created successfully.",
      });
      onClose();
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create Information.",
      });
      console.error("Error creating Information:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Information</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new Information item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="judul_foto">Judul Foto</Label>
            <Input
              id="judul_foto"
              value={judulFoto}
              onChange={(e) => setJudulFoto(e.target.value)}
              className="col-span-3 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="nama_lokasi">Nama Lokasi</Label>
            <Input
              id="nama_lokasi"
              value={namaLokasi}
              onChange={(e) => setNamaLokasi(e.target.value)}
              className="col-span-3 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Input
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="col-span-3 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
