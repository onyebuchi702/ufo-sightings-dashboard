import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  onClick,
  disabled = false,
  className = "",
  children,
  variant = "primary",
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${disabled ? disabledClasses : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
