import { useRef, useState } from "react";
import ErrorBox from "@/components/custom-elements/error-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  label = "",
  name,
  required = true,
  message = "Required",
  onCustomChange,
  ...props
}: React.ComponentProps<"input"> & {
  label?: string;
  name: string;
  required?: boolean;
  message?: string;
  onCustomChange?: (value: string | number) => void;
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Reference to the input element
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Determine if this is a password input
  const isPasswordInput = props.type === "password";

  // Get current input value
  const inputValue = watch(name) || "";

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

    // Use setTimeout to ensure the DOM has updated after state change
    setTimeout(() => {
      if (inputRef.current) {
        // Focus the input
        inputRef.current.focus();

        // If there's a value, move cursor to the end
        if (inputValue) {
          const length = inputValue.toString().length;
          inputRef.current.setSelectionRange(length, length);
        }
      }
    }, 0);
  };

  const errorMessage = errors[name]?.message?.toString() || "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    onCustomChange?.(value);

    return value;
  };

  // Get the register props and append our ref
  const registerProps = register(name, {
    required: required ? message : false,
    onChange: handleChange,
  });

  return (
    <div className="space-y-1">
      <Label
        htmlFor={name}
        className={`text-sm font-normal ${
          errorMessage
            ? "text-red-600 dark:text-red-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {label}
        {required && <span className="text-red-600 dark:text-red-400">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          {...registerProps}
          {...props}
          // Set up ref with react-hook-form ref
          ref={(e) => {
            registerProps.ref(e);
            inputRef.current = e;
          }}
          // Override type prop if this is a password input and showPassword is true
          type={
            isPasswordInput ? (showPassword ? "text" : "password") : props.type
          }
          // Add autocomplete attributes to control browser autofill behavior
          autoComplete={isPasswordInput ? "new-password" : props.autoComplete}
          // Additional attributes to discourage autofill
          {...(isPasswordInput && {
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false",
          })}
          className={`mt-1 h-10 border !bg-[var(--accent)] transition-all ${
            errorMessage
              ? "border-red-600 focus:!border-red-600 focus:!ring-1 focus:!ring-red-600  dark:border-red-400 dark:focus:!ring-red-400"
              : "!border-[var(--border)] focus:!border-[var(--primary)] focus:!ring-1 focus:!ring-[var(--primary)]  dark:border-[var(--border)] dark:focus:ring-[var(--primary)]"
          } ${isPasswordInput ? "pr-10" : ""}`}
        />

        {isPasswordInput && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            onMouseDown={(e) => {
              // Prevent button from stealing focus on mousedown
              e.preventDefault();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {errorMessage && <ErrorBox errorMessage={errorMessage} />}
    </div>
  );
};

export default FormInput;
