"use client";
import { Portal, Select, ListCollection } from "@chakra-ui/react";
import React from "react";

interface DropDownListProps {
  highlightColor?: string;
  withIndicator?: boolean;
  label: string;
  collection: ListCollection<{ label: string; value: string }>;
  placeholder?: string;
  width?: string;
  size?: "sm" | "md" | "lg";
  value?: string; // C'est une string simple venant du parent
  onValueChange?: (value: string) => void;
}

export const DropDownList: React.FC<DropDownListProps> = ({
  highlightColor = "blue.200",
  withIndicator = true,
  label,
  collection,
  placeholder = "Select an option",
  width = "100%",
  size = "md",
  value,
  onValueChange,
}) => {
  const selectValue = value ? [value] : [];

  return (
    <Select.Root
      collection={collection}
      size={size}
      width={width}
      value={selectValue} // Utilisation du tableau de strings
      onValueChange={(details) => {
        // details.value contient déjà un tableau de strings
        if (onValueChange && details.value.length > 0) {
          onValueChange(details.value[0]);
        } else if (onValueChange) {
          onValueChange("");
        }
      }}
    >
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {withIndicator && <Select.Indicator />}
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item
                key={item.value}
                item={item}
                _highlighted={{ bg: highlightColor }}
              >
                {item.label}
                {withIndicator && <Select.ItemIndicator />}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
