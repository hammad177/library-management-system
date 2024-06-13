import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppTooltip from "@/components/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { QueryResponse } from "@/type";

type PropsDeleteModal = {
  id: string;
  title: string;
  deleteFn: (itemId: string) => Promise<QueryResponse>;
};

const DeleteModal = ({ id, title, deleteFn }: PropsDeleteModal) => {
  const { toast } = useToast();

  const deleteData = async () => {
    const { success, message } = await deleteFn(id);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
    } else {
      toast({
        title: "Success",
        description: message,
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <Dialog>
      <AppTooltip title="Delete">
        <DialogTrigger asChild>
          <Trash2 />
        </DialogTrigger>
      </AppTooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {title}</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone. Are you sure you want to delete?</p>
        <DialogFooter>
          <Button type="submit" onClick={deleteData}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
