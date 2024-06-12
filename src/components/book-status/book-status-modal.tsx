import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import SelectBox from "@/components/select-box";

const BooksStatusModal = () => {
  const options = [
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Blueberry",
      value: "blueberry",
    },
    {
      label: "Grapes",
      value: "grapes",
    },
    {
      label: "Apple",
      value: "apple",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Issue Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Issue Book to Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre">Members</Label>
            <SelectBox
              placeholder="Select Member"
              selectLabel="Member List"
              options={options}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre">In Stock</Label>
            <SelectBox
              placeholder="Select Book"
              selectLabel="Books List"
              options={options}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BooksStatusModal;
