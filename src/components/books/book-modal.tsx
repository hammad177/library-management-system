import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectBox from "@/components/select-box";

const BooksModal = () => {
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
        <Button variant="default">Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Book Title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edition">Edition</Label>
            <Input
              id="edition"
              placeholder="Book Edition"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre">Genre</Label>
            <SelectBox
              placeholder="Select Genre"
              selectLabel="Genres List"
              options={options}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre">Author</Label>
            <SelectBox
              placeholder="Select Author"
              selectLabel="Authors List"
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

export default BooksModal;
