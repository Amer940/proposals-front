import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useField, useFormikContext } from "formik";
import { useState } from "react";

type Option = { label: string; value: string | number };

const CustomSelect = ({
  options,
  label,
  placeholder,
  name,
  onChange,
}: {
  options?: Option[];
  label?: string;
  placeholder?: string;
  name: string;
  onChange?: (option: Option) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleValueChange = (selectedValue: string | number) => {
    const selectedOption = options?.find(
      (option) => String(option.value) === selectedValue
    );

    if (onChange && selectedOption) {
      onChange(selectedOption);
    } else {
      setFieldValue(name, selectedValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      {label && (
        <small className="text-sm leading-none font-medium text-white/50">
          {label}
        </small>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {field.value
              ? options?.find((option) => option.value === field.value)?.label
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[27.5vw]">
          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
            <CommandList
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      handleValueChange(String(option.value));
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        field.value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomSelect;
