"use client";
import { Portal, Select } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { collectionList } from "@/dataObject/ListCollection.ts";

interface DropDownListProps {
  highlightColor?: string;
  withIndicator?: boolean;
  label: string;
  items?: { label: string; value: string }[];
}

type MySelectProps = ComponentProps<typeof Select.Root> & DropDownListProps;

export const DropDownList = ({
  highlightColor = "blue",
  withIndicator = true,
  label,
  items,
  ...chakraProps
}: MySelectProps) => {
  return (
    <Select.Root
      {...chakraProps}
      size="md"
      width="30%"
      colorPalette="gray"
      collection={collectionList}
    >
      <Select.HiddenSelect />
      <Select.Label color="#6E7C7C">{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={label} color="#6E7C7C" />
        </Select.Trigger>
        {withIndicator && (
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        )}
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collectionList.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                <span style={{ color: highlightColor }}>{item.label}</span>
                {withIndicator && <Select.ItemIndicator />}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
