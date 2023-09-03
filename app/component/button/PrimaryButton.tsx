import { Button } from "flowbite-react";
import React, { ReactNode } from "react";
import { AiOutlineLoading } from "react-icons/ai";

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: (e: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isProcessing?: boolean;
};

export const PrimaryButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  isProcessing = false,
}: PrimaryButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      isProcessing={isProcessing}
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
      className={className}
      color="yellow"
      theme={{
        color: {
          yellow: "hover:bg-yellow-200 bg-yellow-300",
        },
      }}
    >
      {children}
    </Button>
  );
};
