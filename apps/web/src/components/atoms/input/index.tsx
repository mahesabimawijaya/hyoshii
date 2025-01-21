import { FC, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
type Size = "lg" | "md" | "sm" | "xs";
type Color = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}
interface TextareaElementProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

interface BaseProps {
  label?: string;
  className?: string;
  inputClassName?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: Size;
  color?: Color;
  type?: string;
  errorMessage?: string;
}

type InputProps = (InputElementProps | TextareaElementProps) & BaseProps;

export const Input: FC<InputProps> = (props) => {
  const { label, className = "", inputClassName = "", startIcon, endIcon, size = "md", color, type, errorMessage, as = "input", ...rest } = props;

  const sizeClass = `input-${size}`;
  const colorClass = color ? `input-${color}` : "";
  const errorClass = errorMessage ? "input-error" : "";

  if (as === "textarea") {
    return (
      <div className={`form-control ${className}`}>
        {label && (
          <label className="label">
            <span className={`label-text`}>{label}</span>
          </label>
        )}
        <div className="relative">
          {startIcon && <span className="absolute inset-y-0 left-0 flex items-center pl-3">{startIcon}</span>}
          <textarea
            className={`textarea textarea-bordered w-full ${sizeClass} ${colorClass} ${errorClass} ${inputClassName} ${startIcon ? "pl-10" : ""}`}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
          {endIcon && <span className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</span>}
        </div>
        {errorMessage && (
          <label className="label">
            <span className="text-sm text-red-500 font-normal">{errorMessage}</span>
          </label>
        )}
      </div>
    );
  } else {
    return (
      <div className={`form-control ${className}`}>
        {label && (
          <label className="label">
            <span className={`label-text`}>{label}</span>
          </label>
        )}
        <div className="relative">
          {startIcon && <span className="absolute inset-y-0 left-0 flex items-center pl-3">{startIcon}</span>}
          <input
            type={type || "text"}
            className={`input input-bordered w-full ${sizeClass} ${colorClass} ${errorClass} ${inputClassName} ${startIcon ? "pl-10" : ""}`}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
          {endIcon && <span className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</span>}
        </div>
        {errorMessage && (
          <label className="label">
            <span className="text-sm text-red-500 font-normal">{errorMessage}</span>
          </label>
        )}
      </div>
    );
  }
};
