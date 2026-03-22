"use client";
import {
  Portal,
  Select,
  ListCollection,
  createListCollection,
  Input,
} from "@chakra-ui/react";
import React, { useState, useMemo } from "react";

interface SearchableDropDownListProps {
  highlightColor?: string;
  withIndicator?: boolean;
  label: string;
  collection: ListCollection<{ label: string; value: string }>;
  placeholder?: string;
  width?: string;
  size?: "sm" | "md" | "lg";
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SearchableDropDownList: React.FC<SearchableDropDownListProps> = ({
  highlightColor = "blue.200",
  withIndicator = true,
  label,
  collection,
  placeholder = "Rechercher...",
  width = "100%",
  size = "md",
  value,
  onValueChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Filtrer la collection proprement
  const filteredCollection = useMemo(() => {
    if (!searchTerm) return collection;

    const filteredItems = collection.items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // On recrée une vraie instance de ListCollection
    return createListCollection({ items: filteredItems });
  }, [collection, searchTerm]);

  // 2. Préparer la valeur au format string[]
  const selectValue = useMemo(() => (value ? [value] : []), [value]);

  return (
    <Select.Root
      collection={filteredCollection}
      size={size}
      width={width}
      value={selectValue} // Correction : string[]
      onValueChange={(details) => {
        if (onValueChange && details.value.length > 0) {
          onValueChange(details.value[0]);
          setSearchTerm("");
        }
      }}
      onOpenChange={(details) => {
        if (!details.open) {
          setSearchTerm("");
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
            {/* 3. Champ de recherche stylisé avec Chakra */}
            <div style={{ padding: "8px" }}>
              <Input
                size="sm"
                placeholder="Filtrer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()} // Important pour éviter les conflits de touches
              />
            </div>

            {filteredCollection.items.map((item) => (
              <Select.Item
                key={item.value}
                item={item}
                _highlighted={{ bg: highlightColor }}
              >
                {item.label}
                {withIndicator && <Select.ItemIndicator />}
              </Select.Item>
            ))}

            {filteredCollection.items.length === 0 && (
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "gray",
                }}
              >
                Aucun résultat
              </div>
            )}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
