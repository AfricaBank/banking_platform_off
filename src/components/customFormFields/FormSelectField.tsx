// src/components/customFormFields/FormSelectField.tsx
"use client";
import {
    Select,
} from "@chakra-ui/react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/form-control";
import { useController, Control, FieldValues } from "react-hook-form";


interface FormSelectFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    control: Control<FieldValues>;
    options: { label: string; value: string }[];
    rules?: Record<string, any>;
}

export const FormSelectField = ({
                                    name,
                                    label,
                                    placeholder,
                                    control,
                                    options,
                                    rules,
                                }: FormSelectFieldProps) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
    });

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Select
                {...field}
                id={name}
                placeholder={placeholder || label}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
    );
};