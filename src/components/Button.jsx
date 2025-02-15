// components/Button.jsx
import { clsx } from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(
  ({ text, type = "button", disabled, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
          "w-fit rounded-full bg-clever-purple px-8 py-4 text-[32px] font-medium uppercase leading-none text-clever-black md:px-16 md:py-6 md:text-[4vw]",
          className,
        )}
        {...props}
      >
        {text}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
