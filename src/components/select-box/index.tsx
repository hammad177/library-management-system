import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

type PropsSelectBox = {
  placeholder: string;
  selectLabel: string;
  label: string;
  name: string;
  requiredMessage: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  setValue: any;
  register: any;
  options: {
    label: string;
    value: string;
  }[];
};

const SelectBox = ({
  selectLabel,
  placeholder,
  label,
  options,
  error,
  errorMessage,
  name,
  requiredMessage,
  setValue,
  register,
}: PropsSelectBox) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="genre">{label}</Label>

      <Select
        onValueChange={(value) => setValue(name, value)}
        {...register(name, { required: requiredMessage })}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{selectLabel}</SelectLabel>
            {options?.length &&
              options.map((option, ind) => (
                <SelectItem key={option.label + ind} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && errorMessage && (
        <span className="text-red-500 col-span-4 text-center -mt-3">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default SelectBox;
