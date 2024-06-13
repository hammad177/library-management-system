"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TAuthorForm } from "@/type";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import { addAuthor } from "@/actions/serverAction";
import { useToast } from "@/components/ui/use-toast";

const AuthorsModal = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAuthorForm>();

  const handleRegistration = async (data: any) => {
    const { success } = await addAuthor(data);
    if (!success) {
      toast({
        title: "Error",
        description: "Failed to add new author",
        variant: "destructive",
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
    } else {
      toast({
        title: "Success",
        description: "New author added successfully",
      });
      reset();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Author</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <DialogHeader>
            <DialogTitle>Add New Author</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormInput
              name="name"
              label="Name"
              placeholder="Author Name"
              requiredMessage="Author Name is required"
              register={register}
              error={errors?.name}
              errorMessage={errors?.name?.message}
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

export default AuthorsModal;
