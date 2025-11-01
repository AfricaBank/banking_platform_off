import { createListCollection } from "@chakra-ui/react";
export const collectionList = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export const col2 = createListCollection({
  items: [
    { label: "Boyka", value: "Scott adkins" },
    { label: "Denzel ", value: "Washington" },
  ],
});

export const civility = createListCollection({
  items: [
    { label: "Mr", value: "monsieur" },
    { label: "Mme ", value: "mme" },
  ],
});

export const sexe = createListCollection({
  items: [
    { label: "Homme", value: "homme" },
    { label: "Femme  ", value: "femme" },
  ],
});
