import { Label, TextInputProps } from "flowbite-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { PrimaryTextInput } from "./PrimaryTextInput";

interface PrimaryTextInputProps extends TextInputProps {
  label: string;
  name: string;
  icon?: any;
  required?: boolean;
  register: UseFormRegister<any>;
  errors?: any;
}

export const PrimaryTextInputWithLabel = ({
  label = "",
  name = "",
  errors,
  ...props
}: PrimaryTextInputProps) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <PrimaryTextInput style={{height: '40px'}} name={name} {...props} />
      {errors && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};
