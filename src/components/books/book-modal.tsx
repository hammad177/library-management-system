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
import { FormModalProps, TBookForm } from "@/type";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import AppTooltip from "@/components/tooltip";
import {
  getAuthors,
  insertIntoDB,
  updateIntoDB,
} from "@/actions/serverActions";
import useFormSubmission from "@/hooks/useFormSubmission";
import SelectBox from "@/components/select-box";
import { authorsOptions, genreOptions } from "./helper";
import { useEffect, useState } from "react";

const initialState = {
  title: "",
  edition: "",
  genre: "",
  author_id: "",
};

const BooksModal = ({
  TriggerButton,
  isUpdate,
  formValues,
  itemId,
}: FormModalProps) => {
  const [authorsOption, setAuthorsOption] = useState<
    { label: string; value: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TBookForm>({
    defaultValues: isUpdate ? formValues : initialState,
  });

  const { handleFormSubmission } = useFormSubmission({
    isUpdate: isUpdate ?? false,
    itemId: itemId ?? "",
    initialState: initialState,
    tableName: "books",
    reset: reset,
    addFn: insertIntoDB,
    editFn: updateIntoDB,
  });

  useEffect(() => {
    (async () => {
      const { success, data } = await getAuthors();
      if (success) {
        setAuthorsOption(authorsOptions(data as Record<string, string>[]));
      }
    })();
  }, []);

  const handleForm = (value: any) => {
    value.author_id = +value.author_id;
    handleFormSubmission(value);
  };

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
        <form onSubmit={handleSubmit(handleForm)}>
          <DialogHeader>
            <DialogTitle>{isUpdate ? "Edit" : "Add New"} Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormInput
              name="title"
              label="Title"
              placeholder="Book Title"
              requiredMessage="Book Title is required"
              register={register}
              error={errors?.title}
              errorMessage={errors?.title?.message}
            />
            <FormInput
              name="edition"
              label="Edition"
              placeholder="Book Edition"
              requiredMessage="Book Edition is required"
              register={register}
              error={errors?.edition}
              errorMessage={errors?.edition?.message}
            />
            <SelectBox
              placeholder="Select Genre"
              selectLabel="Genres List"
              label="Genre"
              name="genre"
              setValue={setValue}
              requiredMessage="Genre is required"
              register={register}
              watch={watch}
              error={errors?.genre}
              errorMessage={errors?.genre?.message}
              options={genreOptions()}
            />
            <SelectBox
              placeholder="Select Author"
              selectLabel="Authors List"
              label="Author"
              name="author_id"
              setValue={setValue}
              requiredMessage="Author is required"
              register={register}
              watch={watch}
              error={errors?.author_id}
              errorMessage={errors?.author_id?.message}
              options={authorsOption}
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

export default BooksModal;
