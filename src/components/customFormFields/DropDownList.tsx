"use client";
import { Portal, Select} from "@chakra-ui/react";
import { ComponentProps} from "react";
import { collectionList } from "@/dataObject/ListCollection.ts";

interface DropDownListProps {
    label: string;
    items: { label: string; value: string }[];
    highlightColor?: string;
    withIndicator?: boolean;
}

type MySelectProps = ComponentProps<typeof Select.Root> & DropDownListProps;

export const DropDownList = ({
                                 highlightColor = "blue",
                                 withIndicator = true,
                                 label,
                                 ...chakraProps
                             }: MySelectProps) => {
    return (
        <Select.Root
            {...chakraProps}
            size="md"
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