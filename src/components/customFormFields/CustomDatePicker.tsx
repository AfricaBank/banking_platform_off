import { CalendarField } from "./CalendarField";

interface CustomDatePickerInterface {
    nomDuChamp: string;
    value?: string; // Ajoutez value
    onChange?: (date: string) => void; // Ajoutez onChange
}

export function CustomDatePicker({
                                     nomDuChamp,
                                     value,
                                     onChange
                                 }: CustomDatePickerInterface) {
    return (
        <div style={{ width: "100%" }}>
            <p>{nomDuChamp}</p>
            <CalendarField
                selectedDate={value}
                onChange={onChange || (() => {})}
                isRequired={true}
            />
        </div>
    );
}
