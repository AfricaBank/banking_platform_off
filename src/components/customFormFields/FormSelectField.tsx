"use client";
import { Select, Field, createListCollection } from "@chakra-ui/react";
import {
  useController,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import React from "react";

interface FormSelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  control: Control<TFieldValues>;
  options: { label: string; value: string }[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}

export const FormSelectField = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  options,
  rules,
}: FormSelectFieldProps<TFieldValues>) => {
  // 2. Création de la collection pour Chakra v3
  const collection = React.useMemo(
    () => createListCollection({ items: options }),
    [options],
  );

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Field.Root invalid={!!error}>
      <Field.Label>{label}</Field.Label>

      <Select.Root
        name={field.name}
        collection={collection}
        // Conversion de la valeur simple en tableau pour Chakra v3
        value={field.value ? [field.value] : []}
        onValueChange={(details) => {
          field.onChange(details.value[0] || "");
        }}
        onInteractOutside={() => field.onBlur()}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder={placeholder || "Sélectionnez une option"}
            />
          </Select.Trigger>
        </Select.Control>

        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};
