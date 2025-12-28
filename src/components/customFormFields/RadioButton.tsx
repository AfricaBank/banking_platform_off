import { HStack, RadioGroup, Text, VStack } from "@chakra-ui/react";

interface RadioButtonProps {
  label: string;
}

export const RadioButton = ({ label }: RadioButtonProps) => {
  return (
    <VStack align="start" gap="2">
      <Text fontSize="sm" fontWeight="medium" color="#6F4E1D">
        {label}
      </Text>

      <RadioGroup.Root defaultValue="Oui">
        <HStack gap="6">
          {items.map((item) => (
            <RadioGroup.Item key={item.value} value={item.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText color="#A3907C">
                {item.label}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </HStack>
      </RadioGroup.Root>
    </VStack>
  );
};

const items = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
