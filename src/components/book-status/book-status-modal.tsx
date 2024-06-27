import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectBox from "@/components/select-box";
import { useForm } from "react-hook-form";
import { TBookIssueForm, TSelectBoxOptions } from "@/type";
import {
  getAvailableBooks,
  getMembers,
  insertIntoDB,
  updateIntoDB,
} from "@/actions/serverActions";
import { booksOptions, membersOptions } from "./helper";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  member_id: "",
  book_id: "",
};

const BooksStatusModal = () => {
  const [membersOption, setMemberOption] = useState<TSelectBoxOptions[]>([]);

  const [booksOption, setBooksOption] = useState<TSelectBoxOptions[]>([]);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TBookIssueForm>({
    defaultValues: initialState,
  });

  useEffect(() => {
    (async () => {
      const { success: s1, data: d1 } = await getAvailableBooks();
      if (s1) {
        setBooksOption(booksOptions(d1 as Record<string, string>[]));
      }
      const { success: s2, data: d2 } = await getMembers();
      if (s2) {
        setMemberOption(membersOptions(d2 as Record<string, string>[]));
      }
    })();
  }, []);

  const handleForm = async (value: any) => {
    value.member_id = +value.member_id;
    value.book_id = +value.book_id;
    value.issue_date = new Date().toISOString();

    const { success, message } = await insertIntoDB("book_loans", value);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
    } else {
      await updateIntoDB("books", value.book_id, { status: "issued" });
      toast({
        title: "Success",
        description: message,
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
      reset(initialState);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Issue Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleForm)}>
          <DialogHeader>
            <DialogTitle>Issue Book to Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <SelectBox
              placeholder="Select Member"
              selectLabel="Member List"
              label="Members"
              name="member_id"
              setValue={setValue}
              requiredMessage="Member is required"
              register={register}
              watch={watch}
              error={errors?.member_id}
              errorMessage={errors?.member_id?.message}
              options={membersOption}
            />
            <SelectBox
              placeholder="Select Book"
              selectLabel="Books List"
              label="In Stock"
              name="book_id"
              setValue={setValue}
              requiredMessage="Book is required"
              register={register}
              watch={watch}
              error={errors?.book_id}
              errorMessage={errors?.book_id?.message}
              options={booksOption}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BooksStatusModal;
