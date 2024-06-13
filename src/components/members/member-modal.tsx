import { insertIntoDB, updateIntoDB } from "@/actions/serverActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFormSubmission from "@/hooks/useFormSubmission";
import AppTooltip from "@/components/tooltip";
import { FormModalProps, TMemberForm } from "@/type";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";

const initialState = {
  name: "",
  email: "",
  phone_no: "",
};

const MembersModal = ({
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
  } = useForm<TMemberForm>({
    defaultValues: isUpdate ? formValues : initialState,
  });

  const { handleFormSubmission } = useFormSubmission({
    isUpdate: isUpdate ?? false,
    itemId: itemId ?? "",
    initialState: initialState,
    tableName: "members",
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
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormInput
              name="name"
              label="Name"
              placeholder="Member Name"
              requiredMessage="Member Name is required"
              register={register}
              error={errors?.name}
              errorMessage={errors?.name?.message}
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="Member Email"
              requiredMessage="Member Email is required"
              register={register}
              error={errors?.email}
              errorMessage={errors?.email?.message}
            />

            <FormInput
              name="phone_no"
              label="Phone No."
              placeholder="Member Phone Number"
              requiredMessage="Phone No. is required"
              register={register}
              error={errors?.phone_no}
              errorMessage={errors?.phone_no?.message}
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

export default MembersModal;
