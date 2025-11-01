import React from "react";

interface DatePickerProps {
  label?: string;
  selectedDate?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  minDate?: string;
  maxDate?: string;
  value?: string; // Pour compatibilité
}

export const CalendarField: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  placeholder = "Sélectionnez une date",
  isRequired = false,
  isDisabled = false,
  minDate,
  maxDate,
  value, // Accepte value pour compatibilité
}) => {
  // Utilisez selectedDate en priorité, sinon value
  const dateValue = selectedDate || value;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && <label style={{ fontSize: "16px" }}>{label}</label>}
      <input
        type="date"
        value={dateValue || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={isRequired}
        disabled={isDisabled}
        min={minDate}
        max={maxDate}
        style={{
          padding: "8px",
          borderRadius: "7px",
          border: "1px solid rgba(51, 51, 51, 0.25)",
          fontSize: "16px",
          cursor: isDisabled ? "not-allowed" : "pointer",
          height: 40,
          color: "#6E7C7C",
        }}
      />
    </div>
  );
};
