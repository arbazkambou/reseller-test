import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // 👈 add icons

export type FormInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type: HTMLInputTypeAttribute;
  description?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  showTogglePassword?: boolean;
  min?: number;
  step?: number;
  max?: number;
};

function FormInputField<T extends FieldValues>({
  control,
  name,
  label,
  type,
  description,
  className,
  inputClassName,
  disabled,
  showTogglePassword = false,
  placeholder,
  min,
  step,
  max,
}: FormInputFieldProps<T>) {
  // local state only for toggling (no typing changes)
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const effectiveType: HTMLInputTypeAttribute =
    showTogglePassword && isPassword ? (show ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={effectiveType}
                placeholder={placeholder}
                className={`${inputClassName ?? ""} ${
                  showTogglePassword && isPassword ? "pr-10" : ""
                }`}
                disabled={disabled}
                autoComplete="new-password"
                min={min}
                step={step}
                max={max}
              />

              {showTogglePassword && isPassword && (
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted"
                  tabIndex={-1}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default FormInputField;
