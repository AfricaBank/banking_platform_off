import { createListCollection } from "@chakra-ui/react";

export const applicationLanguages = createListCollection({
  items: [
    { label: "Français", value: "Français" },
    { label: "Anglais", value: "Anglais" },
  ],
});
