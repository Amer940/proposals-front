import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { label: string; value: string | number };

const CustomSelectNoFormik = ({
  options,
  label,
  placeholder,
  value,
  onChange,
}: {
  options?: Option[];
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (option: Option) => void;
}) => {
  const handleValueChange = (selectedValue: string) => {
    const selectedOption = options?.find(
      (option) => String(option.value) === selectedValue
    );

    if (onChange && selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <small className="text-sm leading-none font-medium text-white/50">
          {label}
        </small>
      )}

      <Select
        value={String(value || "")}
        onValueChange={handleValueChange}
        disabled={!Array.isArray(options) && options?.length != 0}
      >
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(options) && options ? (
            options?.map((option, idx) => (
              <SelectItem
                className="cursor-pointer"
                key={idx}
                value={String(option.value)}
              >
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem className="cursor-pointer" key={0} value={0}>
              No data
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelectNoFormik;
