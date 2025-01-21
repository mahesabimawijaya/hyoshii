import { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  weight?: string;
  px?: string;
  py?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className = "",
  bgColor = "bg-brand-50",
  textColor = "text-brand-500",
  weight = "font-medium",
  px = "px-6",
  py = "py-3",
  startIcon,
  endIcon,
  loading = false,
  disabled,
  ...rest
}) => {
  const loadingClass = loading ? "loading" : "";

  return (
    <button className={`rounded-md hover:opacity-85 ${loadingClass} ${bgColor} ${textColor} ${weight} ${px} ${py} ${className}`} disabled={disabled || loading} {...rest}>
      {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && !loading && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};
