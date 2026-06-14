"use client";

import { Portal, Select, ListCollection } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi"; 
import { FaCheck } from "react-icons/fa"; 
import React from "react";

// Types de base partagés par les deux modes
interface BaseDropDownProps {
  highlightColor?: string;
  withIndicator?: boolean;
  label: string;
  collection: ListCollection<{ label: string; value: string }>;
  placeholder?: string;
  width?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

// Configuration 1 : Mode sélection Unique (Comportement historique par défaut)
interface SingleDropDownProps extends BaseDropDownProps {
  multiple?: false; // Absent ou explicitement à false
  value?: string;
  onValueChange?: (value: string) => void;
}

// Configuration 2 : Mode sélection Multiple (Nouveau besoin)
interface MultipleDropDownProps extends BaseDropDownProps {
  multiple: true;   // Obligatoirement défini à true
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

// L'union assure la flexibilité et la sécurité du typage à la compilation
type DropDownListProps = SingleDropDownProps | MultipleDropDownProps;

export const DropDownList: React.FC<DropDownListProps> = ({
  highlightColor = "blue.200",
  withIndicator = true,
  label,
  collection,
  placeholder = "Select an option",
  width = "100%",
  size = "md",
  disabled = false,
  multiple = false, // Par défaut, sélection simple si non spécifié
  value,
  onValueChange,
}) => {
  
  // Adaptation de la valeur d'entrée pour le composant racine Select.Root de Chakra UI v3
  // Select.Root attend systématiquement un tableau (string[])
  const getSelectValue = (): string[] => {
    if (!value) return [];
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return typeof value === "string" ? [value] : [];
  };

  // Gestion unifiée de la modification de valeur
  const handleSelectionChange = (details: { value: string[] }) => {
    if (!onValueChange) return;

    if (multiple) {
      // En mode multiple, on renvoie directement l'intégralité du tableau collecté
      (onValueChange as (value: string[]) => void)(details.value);
    } else {
      // En mode simple, on extrait le premier élément ou une chaîne vide
      const singleVal = details.value.length > 0 ? details.value[0] : "";
      (onValueChange as (value: string) => void)(singleVal);
    }
  };

  return (
    <Select.Root
      collection={collection}
      size={size}
      width={width}
      value={getSelectValue()}
      disabled={disabled}
      multiple={multiple} // Propriété native de Chakra v3 pour activer le multi-sélection
      onValueChange={handleSelectionChange}
    >
      <Select.HiddenSelect />
      
      <Select.Label color="#6E7C7C" fontSize="sm" mb={1} fontWeight="medium">
        {label}
      </Select.Label>
      
      <Select.Control>
        <Select.Trigger
          bg="white"
          rounded="7px"
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