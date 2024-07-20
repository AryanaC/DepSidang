import { updateInformation } from "@/app/api/information/route";
import { useEffect, useState } from "react";
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
import { IInformation } from "@/types/information";

interface UpdateInformationProps {
  information: IInformation | undefined;
  open: boolean;
  onClose: () => void;
}

interface UpdateInformationType {
  judul_foto: string;
  nama_lokasi: string;
  deskripsi: string;
}

export default function UpdateInformation({
  information,
  open,
  onClose,
}: UpdateInformationProps) {
  const [judulFoto, setJudulFoto] = useState<string>("");
  const [namaLokasi, setNamaLokasi] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (information) {
      setJudulFoto(information.judul_foto);
      setNamaLokasi(information.nama_lokasi);
      setDeskripsi(information.deskripsi);
    }
  }, [information]);

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

    console.log(data);

    try {
      if(information) {
        await updateInformation(information.id_information, data);
        setLoading(false);
        toast({
          title: "Success",
          description: "Information Updated successfully.",
        });
        onClose();
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to Update Information.",
      });
      console.error("Error creating Information:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Information</DialogTitle>
          <DialogDescription>
            Fill out the form below to Update a new Information item.
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
