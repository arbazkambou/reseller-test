import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Control, FieldPath, FieldValues } from "react-hook-form";
  
  export type FormCheckboxFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    description?: string;
    className?: string;
    disabled?: boolean;
  };
  
  export function FormCheckboxField<T extends FieldValues>({
    control,
    name,
    label,
    description,
    className,
    disabled,
  }: FormCheckboxFieldProps<T>) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={`flex flex-row items-center space-x-3 space-y-0 ${className || ""}`}>
            <FormLabel className="text-muted-foreground">{label}:</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            {description && (
              <div className="space-y-1 leading-none">
                <FormDescription>{description}</FormDescription>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }