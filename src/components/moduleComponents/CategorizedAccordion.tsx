"use client";

import { Accordion, Span } from "@chakra-ui/react";
import { InfoBlock, InfoItem } from "./InfoBlock"; // Ajuste le chemin selon ton arborescence

export interface AccordionCategory {
  value: string;   // Identifiant unique pour le volet (ex: "statut", "infos")
  title: string;   // Titre textuel de la catégorie
  items: InfoItem[]; // Tableau d'éléments label/valeur
}

interface CategorizedAccordionProps {
  categories: AccordionCategory[];
  defaultValue?: string[]; // Tableau des catégories ouvertes par défaut
}

export const CategorizedAccordion = ({
  categories,
  defaultValue,
}: CategorizedAccordionProps) => {
  return (
    <Accordion.Root
      width="100%"
      collapsible
      multiple
      defaultValue={defaultValue}
      variant="plain" // Supprime les bordures globales par défaut pour styliser chaque bloc
    >
      {categories.map((category) => (
        <Accordion.Item
          key={category.value}
          value={category.value}
          bg="white"
          borderWidth="1px"
          borderColor="gray.100"
          borderRadius="lg"
          boxShadow="sm"
          mb={4} // Espace d'espacement entre chaque bloc d'information
          overflow="hidden"
        >
          {/* Déclencheur du volet */}
          <Accordion.ItemTrigger
            px={5}
            py={4}
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
            _focus={{ outline: "none" }}
            width="100%"
            display="flex"
            alignItems="center"
          >
            {/* CORRECTION : Remplacement de Accordion.ItemText par Span conforme à l'API v3 */}
            <Span
              flex="1"
              textAlign="left"
              fontSize="sm"
              fontWeight="medium"
              color="gray.600"
            >
              {category.title}
            </Span>
            <Accordion.ItemIndicator color="gray.400" />
          </Accordion.ItemTrigger>

          {/* Contenu rétractable */}
          <Accordion.ItemContent>
            {/* CORRECTION : Utilisation de Accordion.ItemBody pour encapsuler le contenu */}
            <Accordion.ItemBody pb={5} pt={0} px={5}>
              <InfoBlock items={category.items} />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};