import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-full border border-line2 bg-paper px-[18px] py-3 text-[13.5px] font-normal text-ink placeholder:text-faint outline-none transition-[border-color,box-shadow] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,16,0.06)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
