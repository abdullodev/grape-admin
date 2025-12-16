import { Label } from "@/components/ui/label";
import ErrorBox from "@/components/custom-elements/error-box";
import { Controller, useFormContext } from "react-hook-form";
import Select, { SingleValue } from "react-select";

// Define option type
interface SelectOption {
  label: string;
  id: string | number;
}

// Component props interface
interface FormSelectProps {
  label?: string;
  name: string;
  required?: boolean;
  message?: string;
  options?: SelectOption[];
  onCustomChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Default options
const defaultOptions: SelectOption[] = Array.from({ length: 120 }, (_, i) => ({
  label: `Select ${i}`,
  id: i,
}));

export default function FormSelect({
  label = "",
  name,
  required = true,
  message = "Required",
  options = defaultOptions,
  onCustomChange,
  placeholder = "Select an option",
  disabled = false,
}: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors[name]?.message as string) || "";
  const hasError = !!errorMessage;

  const handleChange = (
    selectedOption: SingleValue<SelectOption>,
    fieldOnChange: (value: any) => void
  ) => {
    const value = selectedOption ? selectedOption.id : null;
    fieldOnChange(value);
    if (onCustomChange && value !== null) {
      onCustomChange(value);
    }
  };

  return (
    <div>
      {label && (
        <Label
          htmlFor={name}
          className={`text-sm font-normal ${
            hasError
              ? "text-red-600 dark:text-red-400"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {label}
          {required && (
            <span className="text-red-600 dark:text-red-400 ml-1">*</span>
          )}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        rules={required ? { required: message } : undefined}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            value={options.find((option) => option.id === field.value) || null}
            onChange={(option) => handleChange(option, field.onChange)}
            getOptionValue={(option) => option.id.toString()}
            placeholder={placeholder}
            isDisabled={disabled}
            className="mt-1 !h-10 !bg-[var(--accent)]"
            isClearable
            classNames={{
              control: (state) =>
                `!border !rounded-md !bg-transparent !transition-all !h-10
               ${
                 state.isFocused && !hasError
                   ? "!border-[var(--primary)] !ring-1 !ring-[var(--primary)]"
                   : ""
               } ${
                  !state.isFocused && !hasError ? "!border-[var(--border)]" : ""
                } ${hasError ? "!border-red-600" : ""} ${
                  state.isFocused && hasError ? "!ring-1 !ring-red-600" : ""
                }`,
              singleValue: () => "dark:!text-white", // Selected value color in dark mode
              placeholder: () =>
                hasError
                  ? "!text-red-600 dark:!text-red-100"
                  : "!text-zinc-400 dark:!text-zinc-500",
              menu: () => "!bg-[var(--card)]",
              option: (state) =>
                ` ${state.isFocused ? "!bg-[var(--primary)]/20" : ""} ${
                  state.isSelected ? "!bg-[var(--primary)]/80" : ""
                }
                `,
              input: () => "dark:!text-white",
            }}
          />
        )}
      />

      {hasError && <ErrorBox errorMessage={errorMessage} />}
    </div>
  );
}
