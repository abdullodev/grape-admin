import ErrorBox from "@/components/custom-elements/error-box";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const DEFAULT_FORMAT = "DD.MM.YYYY";

// Component props interface
interface Props {
  label?: string;
  name: string;
  required?: boolean;
  message?: string;
  onCustomChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  date_format?: string;
}

export default function FormDatePicker({
  label = "",
  name,
  required = true,
  message = "Required",
  onCustomChange,
  placeholder = "Select Date",
  disabled = false,
  date_format = DEFAULT_FORMAT,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message?.toString() || "";
  const hasError = !!errorMessage;
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [rawValue, setRawValue] = useState("");

  // Format raw digits into the date format
  const formatDate = (digits: string) => {
    let result = "";

    for (let i = 0; i < digits.length && i < 8; i++) {
      if (i === 0) result += digits[i];
      else if (i === 1) result += digits[i];
      else if (i === 2) result += "." + digits[i];
      else if (i === 3) result += digits[i];
      else if (i === 4) result += "." + digits[i];
      else result += digits[i];
    }

    // Auto-add dot after day (position 2)
    if (result.length === 2 && digits.length === 2) {
      result += ".";
    }

    // Auto-add dot after month (position 5)
    if (result.length === 5 && digits.length === 4) {
      result += ".";
    }

    return result;
  };

  // Function to handle input including backspace
  const handleDateInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const input = e.target.value;

    // Store the raw digits
    const newRawValue = input.replace(/\D/g, "");
    setRawValue(newRawValue);

    // Format and update the displayed value
    const formattedValue = formatDate(newRawValue);
    onChange(formattedValue);
    if (onCustomChange) onCustomChange(formattedValue);
  };

  // Handle key events specifically for backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    // Only handle backspace
    if (e.key !== "Backspace") return;

    // Get current cursor position
    const input = e.currentTarget;
    const cursorPos = input.selectionStart;

    // If cursor is right after a dot, delete the dot and the digit before it
    if (cursorPos && input.value[cursorPos - 1] === ".") {
      e.preventDefault();

      // Remove one more digit from the raw value
      const newRawValue = rawValue.slice(0, -1);
      setRawValue(newRawValue);

      // Format and update
      const formattedValue = formatDate(newRawValue);
      onChange(formattedValue);
      if (onCustomChange) onCustomChange(formattedValue);

      // Set cursor position after update
      setTimeout(() => {
        if (inputRef.current) {
          const newPos = Math.max(0, cursorPos - 2);
          inputRef.current.setSelectionRange(newPos, newPos);
        }
      }, 0);
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
        rules={{
          ...(required ? { required: message } : {}),
        }}
        render={({ field }) => {
          // Update rawValue when field.value changes from outside (e.g., calendar selection)
          useEffect(() => {
            if (field.value) {
              setRawValue(field.value.replace(/\D/g, ""));
            }
          }, [field.value]);

          return (
            <div className="relative flex items-center mt-1">
              <Input
                ref={inputRef}
                value={field.value || ""}
                onChange={(e) => handleDateInput(e, field.onChange)}
                onKeyDown={(e) => handleKeyDown(e, field.onChange)}
                placeholder={placeholder}
                disabled={disabled}
                className={`!h-10 border !bg-[var(--accent)] transition-all !overflow-hidden ${
                  errorMessage
                    ? "border-red-600 focus:!border-red-600 focus:!ring-1 focus:!ring-red-600 dark:border-red-400 dark:focus:!ring-red-400"
                    : "!border-[var(--border)] focus:!border-[var(--primary)] focus:!ring-1 focus:!ring-[var(--primary)] dark:border-[var(--border)] dark:focus:ring-[var(--primary)]"
                }`}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0.5 h-auto px-3 !bg-none"
                    onClick={() => setOpen(true)}
                  >
                    <CalendarIcon className="h-4 w-4 text-gray-500 !bg-none" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? dayjs(field.value, date_format).toDate()
                        : undefined
                    }
                    onSelect={(date) => {
                      const formattedDate = date
                        ? dayjs(date).format(date_format)
                        : "";
                      field.onChange(formattedDate);
                      setRawValue(formattedDate.replace(/\D/g, ""));
                      if (onCustomChange) onCustomChange(formattedDate);
                      setOpen(false);
                      inputRef.current?.focus();
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          );
        }}
      />

      {hasError && <ErrorBox errorMessage={errorMessage} />}
    </div>
  );
}
