export const LoadingSpinner = ({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}
      />
    </div>
  );
};
