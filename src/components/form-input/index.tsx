import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form";

type PropsFormInput = {
  name: string;
  label: string;
  placeholder: string;
  requiredMessage: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  register: any;
};

const FormInput = ({
  error,
  errorMessage,
  name,
  placeholder,
  requiredMessage,
  label,
  register,
}: PropsFormInput) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        placeholder={placeholder}
        className="col-span-3"
        {...register(name, { required: requiredMessage })}
      />
      {error && errorMessage && (
        <span className="text-red-500 col-span-4 text-center -mt-3">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
