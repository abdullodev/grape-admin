import { InfoIcon } from "lucide-react";

const ErrorBox = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <p className="flex gap-2 items-center text-xs text-red-600 dark:text-red-400 mt-0.5">
      <InfoIcon width={16} /> {errorMessage}
    </p>
  );
};

export default ErrorBox;
