import React, { ButtonHTMLAttributes } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  isLoading,
  ...rest
}) => {
  const defaultClassName =
    "rounded-xl flex items-center justify-center lg:hover:opacity-80 w-full font-bold py-2.5 px-6 bg-primary-500 whitespace-nowrap";
  const finalClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <button
      {...rest}
      className={finalClassName}
      disabled={disabled}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {isLoading ? (
        <CircularProgress color="inherit" size={22} thickness={5} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
