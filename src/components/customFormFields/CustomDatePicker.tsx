import { useState } from "react";
import { CalendarField } from "./CalendarField";

interface CustomDatePickerInterface {
  nomDuChamp: string;
}

export function CustomDatePicker({ nomDuChamp }: CustomDatePickerInterface) {
  const [date, setDate] = useState<string>("");

  return (
    <div style={{ width: "100%" }}>
      <p>{nomDuChamp}</p>
      <CalendarField selectedDate={date} onChange={setDate} isRequired={true} />
    </div>
  );
}
