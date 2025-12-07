"use client";
import { Portal, Select, ListCollection } from "@chakra-ui/react";
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

    // Filtrer la collection basée sur la recherche
    const filteredCollection = useMemo(() => {
        if (!searchTerm) return collection;

        const filteredItems = collection.items.filter(item =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            ...collection,
            items: filteredItems
        };
    }, [collection, searchTerm]);

    // Trouver l'item correspondant à la valeur
    const selectedItem = collection.items.find(item => item.value === value);

    return (
        <Select.Root
            collection={filteredCollection}
            size={size}
            width={width}
            value={selectedItem ? [selectedItem] : []}
            onValueChange={(details) => {
                if (onValueChange && details.items && details.items.length > 0) {
                    onValueChange(details.items[0].value);
                    setSearchTerm(""); // Réinitialiser la recherche après sélection
                } else if (onValueChange) {
                    onValueChange("");
                }
            }}
            onOpenChange={(open) => {
                if (!open) {
                    setSearchTerm(""); // Réinitialiser la recherche quand fermé
                }
            }}
        >
            <Select.HiddenSelect />
            <Select.Label>{label}</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText
                        placeholder={placeholder}
                        children={selectedItem ? selectedItem.label : undefined}
                    />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    {withIndicator && <Select.Indicator />}
                </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {/* Champ de recherche intégré */}
                        <Select.ItemGroup>
                            <div style={{ padding: "8px 12px" }}>
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        border: "1px solid #E2E8F0",
                                        borderRadius: "4px",
                                        outline: "none"
                                    }}
                                    onClick={(e) => e.stopPropagation()} // Empêcher la fermeture
                                />
                            </div>
                        </Select.ItemGroup>

                        {/* Liste des résultats filtrés */}
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

                        {/* Message si aucun résultat */}
                        {filteredCollection.items.length === 0 && (
                            <Select.ItemGroup>
                                <div style={{
                                    padding: "8px 12px",
                                    color: "#718096",
                                    textAlign: "center"
                                }}>
                                    Aucun résultat trouvé
                                </div>
                            </Select.ItemGroup>
                        )}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
};
