import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField, useFormikContext } from "formik";

type Option = { label: string; value: string | number };

const CustomSelect = ({
  options,
  label,
  placeholder,
  name,
  onChange,
}: {
  options: Option[];
  label?: string;
  placeholder?: string;
  name: string;
  onChange?: (option: Option) => void;
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleValueChange = (selectedValue: string) => {
    const selectedOption = options.find(
      (option) => String(option.value) === selectedValue
    );

    if (onChange && selectedOption) {
      onChange(selectedOption);
    } else {
      setFieldValue(name, selectedValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <small className="text-sm leading-none font-medium text-white/50">
        {label}
      </small>

      <Select
        value={String(field.value || "")}
        onValueChange={handleValueChange}
        disabled={!Array.isArray(options)}
      >
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(options) ? (
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
      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomSelect;
