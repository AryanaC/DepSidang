"use client";

import { createGalery } from "@/app/api/gallery/route";
import { getInformation } from "@/app/api/information/route";
import { IInformation } from "@/types/information";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
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
import { toast } from "../ui/use-toast";
import { LoadingSpinner } from "../spinner";

interface CreateGaleryProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateGalery({ open, onClose }: CreateGaleryProps) {
  const [informationId, setInformationId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [informationOptions, setInformationOptions] = useState<IInformation[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      fetchInformation();
    }
  }, [open]);

  const fetchInformation = async () => {
    try {
      const result = await getInformation();
      console.log(result);
      setInformationOptions(result.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch information.",
      });
      console.error("Error fetching information:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!informationId || !image) {
      console.log(informationId);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide both information ID and image.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("information_id", informationId);
    formData.append("image", image);

    try {
      await createGalery(formData);
      setLoading(false);
      toast({
        title: "Success",
        description: "Galery created successfully.",
      });
      onClose();
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create galery.",
      });
      console.error("Error creating galery:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Galery</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new galery item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="information_id" className="">
              Information ID
            </Label>
            <select
              id="information_id"
              value={informationId}
              onChange={(e) => setInformationId(e.target.value)}
              className="col-span-3 border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                Select Information
              </option>
              {informationOptions.map((info, i) => (
                <option key={info.id_information} value={info.id_information}>
                  {info.nama_lokasi}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 items-center gap-2.5">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="col-span-3"
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
