// components/Button.jsx
import { clsx } from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      text,
      type = "button",
      disabled,
      className = "",
      size = "md", // "sm" | "md" | "lg"
      ...props
    },
    ref,
  ) => {
    const sizeClasses =
      size === "sm"
        ? "px-6 py-3 text-base md:px-7 md:py-3.5 md:text-lg" // ✅ a bit bigger
        : size === "lg"
          ? "px-10 py-5 text-2xl md:px-16 md:py-6 md:text-[4vw]"
          : "px-8 py-4 text-lg md:px-12 md:py-5 md:text-xl";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
          "w-fit rounded-full bg-clever-purple font-medium uppercase leading-none text-clever-black",
          "transition-transform duration-200 ease-out hover:scale-[1.06] active:scale-[0.98]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
          sizeClasses,
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