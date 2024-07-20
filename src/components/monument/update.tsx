import { useEffect, useState } from "react";
import { updateMonument } from "@/app/api/monument/route";
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
import { IMonument } from "@/types/monument";
import { IInformation } from "@/types/information";

interface UpdateMonumentProps {
  monument: IMonument;
  open: boolean;
  onClose: () => void;
}

const UpdateMonument: React.FC<UpdateMonumentProps> = ({ monument, open, onClose }) => {
  const [formState, setFormState] = useState({
    image: null as File | null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (monument) {
      setFormState({
        image: null,
      });
    }
  }, [monument]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: files ? files[0] : null,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { image } = formState;

    if (!image) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image.",
      });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("image", image);

    try {
      await updateMonument(monument.id, data);
      toast({
        title: "Success",
        description: "Monument updated successfully.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update monument.",
      });
      console.error("Error updating monument:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Monument</DialogTitle>
          <DialogDescription>
            Fill out the form below to update the monument item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-2.5 mb-1.5">
            <Label htmlFor="information_id">Information ID</Label>
            <select
              id="information_id"
              value={monument.nama_lokasi}
              className="col-span-3 border border-gray-300 rounded-md p-2"
              disabled
            >
              <option value={monument.nama_lokasi}>{monument.nama_lokasi}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 items-center gap-2.5">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              onChange={handleChange}
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

export default UpdateMonument;
