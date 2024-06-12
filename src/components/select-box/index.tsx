import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropsSelectBox = {
  placeholder: string;
  selectLabel: string;
  options: {
    label: string;
    value: string;
  }[];
};

const SelectBox = ({ selectLabel, placeholder, options }: PropsSelectBox) => {
  return (
    <Select>
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
  );
};

export default SelectBox;
