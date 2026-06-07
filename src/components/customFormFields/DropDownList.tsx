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
  disabled?: boolean; // Mise à jour de l'interface pour s'aligner sur les standards v3
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
  disabled = false, // 1. Récupération explicite de la propriété
}) => {
  const selectValue = value ? [value] : [];

  return (
    <Select.Root
      collection={collection}
      size={size}
      width={width}
      value={selectValue}
      disabled={disabled} // 2. Transmission de l'état bloqué au composant racine v3
      onValueChange={(details) => {
        if (onValueChange && details.value.length > 0) {
          onValueChange(details.value[0]);
        } else if (onValueChange) {
          onValueChange("");
        }
      }}
    >
      <Select.HiddenSelect />
      {/* Label stylisé pour correspondre au design du InputTextField */}
      <Select.Label color="#6E7C7C" fontSize="sm" mb={1} fontWeight="medium">
        {label}
      </Select.Label>
      
      <Select.Control>
        <Select.Trigger
          bg="white"
          rounded="7px"
          // 3. Application du style visuel grisé pour l'état désactivé
          _disabled={{
            bg: "gray.100",
            borderColor: "gray.300",
            color: "gray.500",
            cursor: "not-allowed",
            opacity: 0.8,
          }}
        >
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {withIndicator && (
            <Select.Indicator>
              <FiChevronDown />
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
                    <FaCheck />
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