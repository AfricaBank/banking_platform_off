"use client";
import {
    Portal,
    Select,
    ListCollection,
    createListCollection,
    Input,
} from "@chakra-ui/react";
import { FiChevronDown } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import React, { useState, useMemo } from "react";

// L'interface doit être définie AVANT le composant
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

    const filteredCollection = useMemo(() => {
        if (!searchTerm) return collection;
        const filteredItems = collection.items.filter((item) =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        return createListCollection({ items: filteredItems });
    }, [collection, searchTerm]);

    const selectValue = useMemo(() => (value ? [value] : []), [value]);

    return (
        <Select.Root
            collection={filteredCollection}
            size={size}
            width={width}
            value={selectValue}
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
                        <div style={{ padding: "8px" }}>
                            <Input
                                size="sm"
                                placeholder="Filtrer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        </div>

                        {filteredCollection.items.map((item) => (
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
