import { Spinner } from "@heroui/spinner";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Spinner color="secondary" size={size} />
      <span className="text-sm text-default-500">{message}</span>
    </div>
  );
}
