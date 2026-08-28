import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-full border border-zinc-200 bg-white px-[18px] py-3 text-[13.5px] font-normal text-zinc-900 placeholder:text-zinc-400 outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-out hover:border-zinc-300 hover:shadow-[0_0_0_4px_rgba(14,14,16,0.04)] focus:border-zinc-900 focus:shadow-[0_0_0_4px_rgba(14,14,16,0.07),0_8px_28px_-6px_rgba(14,14,16,0.18)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-500 aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-700 dark:focus:border-zinc-100 dark:focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]",
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
