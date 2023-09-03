import { TextInput, TextInputProps } from "flowbite-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface PrimaryTextInputProps extends TextInputProps {
    name?: string;
    icon?: any;
    required?: boolean;
    register: UseFormRegister<any>;
}

export const PrimaryTextInput = ({
    name = "",
    icon = null,
    required = false,
    register,
    ...props
}: PrimaryTextInputProps) => {
    return (
        <TextInput
            icon= {icon}
            {...register(name, {required})}
            {...props}
            theme={{
                field: {
                    input: {
                        colors: {
                            gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-yellow-300 focus:ring-yellow-300"
                        }
                    }
                }
            }}
            >
        </TextInput>
    );
}