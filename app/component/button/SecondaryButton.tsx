import { Button } from "flowbite-react";
import React, { ReactNode } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { HiUser, HiKey, HiInformationCircle } from "react-icons/hi";

type SecondaryButtonProps = {
  children: ReactNode;
  onClick?: (e: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isProcessing?: boolean;
  icon?: ReactNode;
};

export const SecondaryButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  isProcessing = false,
  icon,
}: SecondaryButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      isProcessing={isProcessing}
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
      className={className}
      color="light"
      theme={{
        color: {
          light:
            "text-gray-900 bg-gray-300 border border-gray-300 enabled:hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300",
        },
      }}
    >
      {HiKey}
      {children}
    </Button>
  );
};
