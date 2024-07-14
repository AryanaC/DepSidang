import { useEffect, useState } from "react";
import { updateGalery } from "@/app/api/gallery/route";
import { getInformation } from "@/app/api/information/route";
import { IGallery } from "@/types/gallery";
import { IInformation } from "@/types/information";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "../spinner";

interface UpdateOptions {
  galery: IGallery;
  open: boolean;
  onClose: () => void;
}

const UpdateGalery = ({ galery, open, onClose }: UpdateOptions) => {
  const [informationId, setInformationId] = useState<string>(galery.information.id_information);
  const [image, setImage] = useState<File | null>(null);
  const [informationOptions, setInformationOptions] = useState<IInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      fetchInformation();
    }
  }, [open]);

  useEffect(() => {
    if (galery) {
      setInformationId(galery.information.id_information);
    }
  }, [galery]);

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

  const handleSubmit = async () => {
    setLoading(true);

    if (!informationId || (!image && !galery.image)) {
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
    if (image) {
      formData.append("image", image);
    }

    try {
      await updateGalery(galery.id_galery, formData);
      setLoading(false);
      toast({
        title: "Success",
        description: "Galery updated successfully.",
      });
      onClose();
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update galery.",
      });
      console.error("Error updating galery:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Galery</DialogTitle>
          <DialogDescription>
            Update the form below to update the galery item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="information_id">Information</Label>
            <select
              id="information_id"
              value={informationId}
              onChange={(e) => setInformationId(e.target.value)}
              className="col-span-3 border border-gray-300 rounded-md p-2"
              disabled={true}
            >
              <option value="">
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
          <Button type="button" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGalery;
