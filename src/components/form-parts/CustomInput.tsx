import { Input } from "@/components/ui/input";
import { useField, useFormikContext } from "formik";

const CustomInput = ({
  label,
  placeholder,
  name,
  type,
}: {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <small className="text-sm leading-none font-medium text-white/50">
          {label}
        </small>
      )}
      <Input
        value={String(field.value ?? "")}
        placeholder={placeholder}
        name={name}
        className="w-full"
        type={type}
        onChange={(e) => setFieldValue(name, e.target.value)}
      />

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomInput;
