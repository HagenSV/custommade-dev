import { ButtonHTMLAttributes, forwardRef } from "react";

type FilledButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  };

const FilledButton = forwardRef<HTMLButtonElement, FilledButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`cursor-pointer px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-900 ${className}`}
      />
    );
  }
);

FilledButton.displayName = "FilledButton";

export default FilledButton;