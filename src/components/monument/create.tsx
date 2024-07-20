"use client"
import { createMonument } from "@/app/api/monument/route";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/spinner";
import { Label } from "@/components/ui/label";
import { IInformation } from "@/types/information";
import { getInformation } from "@/app/api/information/route";

interface CreateMonumentProps {
  open: boolean;
  onClose: () => void;
}

const CreateMonument: React.FC<CreateMonumentProps> = ({ open, onClose }) => {
  const [informationId, setInformationId] = useState<string>("");
  const [informationOptions, setInformationOptions] = useState<IInformation[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      fetchInformation();
    }
  }, [open]);

  const fetchInformation = async () => {
    try {
      const result = await getInformation();
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

  const handleInformationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInformationId(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!informationId || !image) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide both information ID and image.",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("information_id", informationId);
    formData.append("image", image);

    try {
      await createMonument(formData);
      toast({
        title: "Success",
        description: "Monument created successfully.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create monument.",
      });
      console.error("Error creating monument:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Monument</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new monument item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="information_id">Information ID</Label>
            <select
              id="information_id"
              value={informationId}
              onChange={handleInformationChange}
              className="col-span-3 border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                Select Information
              </option>
              {informationOptions.map((info) => (
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
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? <LoadingSpinner /> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMonument;
