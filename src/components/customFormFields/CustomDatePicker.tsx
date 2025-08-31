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
                selectedDate={value} // Utilisez value au lieu de l'état local
                onChange={onChange || (() => {})} // Utilisez le onChange passé en prop
                isRequired={true}
            />
        </div>
    );
}
