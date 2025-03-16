import { useState } from "react";
import { CalendarField } from "./CalendarField";

export function CustomDatePicker() {
  const [date, setDate] = useState<string>("");

  return (
    <div style={{ padding: "20px" }}>
      <CalendarField
        label="Date de naissance"
        selectedDate={date}
        onChange={setDate}
        isRequired={true}
      />
    </div>
  );
}
