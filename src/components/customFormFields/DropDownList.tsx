"use client";
import { Portal, Select } from "@chakra-ui/react";
import { ComponentProps } from "react";

interface DropDownListProps {
    highlightColor?: string;
    withIndicator?: boolean;
    label: string;
    items: { label: string; value: string }[];
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
        <Select.Root {...chakraProps} size="md" width="30%" colorPalette="gray">
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
                        {items.map((item) => (
                            <Select.Item item={item.value} key={item.value}>
                <span style={{ color: highlightColor }}>
                  {item.label}
                </span>
                                {withIndicator && <Select.ItemIndicator />}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
};