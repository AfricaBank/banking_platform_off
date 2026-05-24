"use client";
import { Portal, Select, ListCollection } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi"; // flèche
import { FaCheck } from "react-icons/fa"; // coche
import React from "react";

interface DropDownListProps {
  highlightColor?: string;
  withIndicator?: boolean;
  label: string;
  collection: ListCollection<{ label: string; value: string }>;
  placeholder?: string;
  width?: string;
  size?: "sm" | "md" | "lg";
  value?: string;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
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
      value={selectValue}
      onValueChange={(details) => {
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
          {withIndicator && (
            <Select.Indicator>
              <FiChevronDown /> {/* Icône de flèche */}
            </Select.Indicator>
          )}
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
                {withIndicator && (
                  <Select.ItemIndicator>
                    <FaCheck /> {/* Icône de validation */}
                  </Select.ItemIndicator>
                )}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
