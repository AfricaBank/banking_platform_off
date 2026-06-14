"use client";

import { Portal, Select, ListCollection, HStack, Tag } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi"; 
import { FaCheck } from "react-icons/fa"; 
import React from "react";

// Structure d'un élément de la collection pour le typage strict
interface CollectionItem {
  label: string;
  value: string;
}

interface DropDownListMultiProps {
  label: string;
  placeholder: string;
  collection: ListCollection<CollectionItem>;
  value: string[];
  onValueChange: (value: string[]) => void;
}

export const DropDownListMulti = ({
  label,
  placeholder = "Select an option",
  collection,
  value,
  onValueChange,
}: DropDownListMultiProps) => {

  // Suppression d'un tag individuel au clic sur la croix
  const handleRemoveItem = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Évite l'ouverture automatique du menu déroulant
    const updatedValues = value.filter((val) => val !== itemToRemove);
    onValueChange(updatedValues);
  };

  return (
    <Select.Root
      multiple
      collection={collection}
      value={value}
      width="100%"
      size="md"
      onValueChange={(details) => onValueChange(details.value)}
    >
      {/* 1. Restauration du composant caché pour l'accessibilité */}
      <Select.HiddenSelect />
      
      {/* 2. Harmonisation parfaite du label (Couleur #6E7C7C, taille sm, medium) */}
      <Select.Label color="#6E7C7C" fontSize="sm" mb={1} fontWeight="medium">
        {label}
      </Select.Label>
      
      <Select.Control>
        {/* 3. Adaptation du Trigger avec rounded="7px", bg="white" et flexibilité en hauteur */}
        <Select.Trigger 
          bg="white"
          rounded="7px"
          display="flex" 
          alignItems="center"
          flexWrap="wrap" 
          gap={2} 
          height={value.length > 0 ? "auto" : undefined}
          minH={value.length > 0 ? "40px" : undefined}
          py={value.length > 0 ? 1.5 : undefined}
          px={3}
          _disabled={{
            bg: "gray.100",
            borderColor: "gray.300",
            color: "gray.500",
            cursor: "not-allowed",
            opacity: 0.8,
          }}
        >
          {value.length > 0 ? (
            <HStack gap={2} flexWrap="wrap" width="full">
              {value.map((itemValue) => {
                const itemData = collection.items.find((i: CollectionItem) => i.value === itemValue);
                const displayLabel = itemData ? itemData.label : itemValue;

                return (
                  <Tag.Root 
                    key={itemValue} 
                    variant="solid" 
                    colorPalette="gray"
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    <Tag.Label>{displayLabel}</Tag.Label>
                    <Tag.EndElement>
                      <Tag.CloseTrigger onClick={(e) => handleRemoveItem(itemValue, e)} />
                    </Tag.EndElement>
                  </Tag.Root>
                );
              })}
            </HStack>
          ) : (
            /* Utilisation du ValueText natif pour le placeholder à l'identique */
            <Select.ValueText placeholder={placeholder} />
          )}
        </Select.Trigger>

        {/* 4. Repositionnement de l'indicateur à l'extérieur du Trigger, comme sur l'original */}
        <Select.IndicatorGroup>
          <Select.Indicator>
            <FiChevronDown />
          </Select.Indicator>
        </Select.IndicatorGroup>
      </Select.Control>

      {/* 5. Intégration du Portal et de la coche FaCheck lors de la mise en surbrillance */}
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item: CollectionItem) => (
              <Select.Item 
                item={item} 
                key={item.value}
                _highlighted={{ bg: "blue.200" }}
              >
                {item.label}
                <Select.ItemIndicator>
                  <FaCheck />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};