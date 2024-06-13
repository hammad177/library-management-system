"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormModalProps, TAuthorForm } from "@/type";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import AppTooltip from "@/components/tooltip";
import { insertIntoDB, updateIntoDB } from "@/actions/serverActions";
import useFormSubmission from "@/hooks/useFormSubmission";

const initialState = {
  name: "",
};

const AuthorsModal = ({
  TriggerButton,
  isUpdate,
  formValues,
  itemId,
}: FormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAuthorForm>({
    defaultValues: isUpdate ? formValues : initialState,
  });

  const { handleFormSubmission } = useFormSubmission({
    isUpdate: isUpdate ?? false,
    itemId: itemId ?? "",
    initialState: initialState,
    tableName: "authors",
    reset: reset,
    addFn: insertIntoDB,
    editFn: updateIntoDB,
  });

  return (
    <Dialog>
      {isUpdate ? (
        <AppTooltip title="Edit">
          <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        </AppTooltip>
      ) : (
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <DialogHeader>
            <DialogTitle>{isUpdate ? "Edit" : "Add New"} Author</DialogTitle>
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
