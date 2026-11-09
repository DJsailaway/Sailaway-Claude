import { useEffect, useState, useRef } from "react";
import DateCard from "../components/DateCard";
import TimeCard from "../components/TimeCard";

export default function DateStep({
  durationMode,
  durationKey,
  days,
  value,
  onChange
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dateInputRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = tomorrow
    .toISOString()
    .split("T")[0];

  const oneHourSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  const twoHourSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00"
  ];

  const availableTimes =
    durationKey === "1h"
      ? oneHourSlots
      : durationKey === "2h"
      ? twoHourSlots
      : [];

  const returnDate =
    value.date && durationMode === "multiday"
      ? (() => {
          const d = new Date(value.date);

          d.setDate(d.getDate() + days);

          return d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
        })()
      : null;

  return (
    <div
  style={{
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)"
  }}
>
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  }}
>
  <DateCard
    value={
      value.date
        ? new Date(value.date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : null
    }
    onClick={() => {
  if (dateInputRef.current?.showPicker) {
    dateInputRef.current.showPicker();
  } else {
    dateInputRef.current?.focus();
  }
}}
  />

    <input
      ref={dateInputRef}
      type="date"
      min={minDate}
      value={value.date || ""}
      onChange={(e) => {
        onChange({
          date: e.target.value
        });

        setShowTimePicker(true);
      }}
      style={{
        position: "absolute",
        opacity: 0,
        width: 1,
        height: 1,
        overflow: "hidden"
      }}
    />

<TimeCard
  disabled={!value.date}
  value={value.startTime}
  expanded={showTimePicker}
  onClick={() => {
    if (value.date) {
      setShowTimePicker((prev) => !prev);
    }
  }}
>
  {/* HALF DAY */}
  {durationKey === "half" && (
    <div
      style={{
        display: "grid",
        gap: "12px"
      }}
    >
      {[
        { id: "morning", label: "Morning · 09:00–13:00" },
        { id: "afternoon", label: "Afternoon · 13:00–17:00" }
      ].map((slot) => (
        <button
          key={slot.id}
          onClick={() => {
            onChange({ startTime: slot.id });
            setShowTimePicker(false);
          }}
          style={{
            padding: "18px",
            borderRadius: "18px",
            border:
              value.startTime === slot.id
                ? "2px solid #123B5D"
                : "1px solid #E5E7EB",
            background:
              value.startTime === slot.id ? "#123B5D" : "#FFFFFF",
            color:
              value.startTime === slot.id ? "#FFFFFF" : "#123B5D",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {slot.label}
        </button>
      ))}
    </div>
  )}

  {/* HOURLY */}
  {(durationKey === "1h" || durationKey === "2h") && (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "repeat(2, 1fr)"
          : "repeat(4, 1fr)",
        gap: "12px"
      }}
    >
      {availableTimes.map((time) => (
        <button
          key={time}
          onClick={() => {
            onChange({ startTime: time });
            setShowTimePicker(false);
          }}
          style={{
            padding: "18px",
            borderRadius: "18px",
            border:
              value.startTime === time
                ? "2px solid #123B5D"
                : "1px solid #E5E7EB",
            background:
              value.startTime === time ? "#123B5D" : "#FFFFFF",
            color:
              value.startTime === time ? "#FFFFFF" : "#123B5D",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {time}
        </button>
      ))}
    </div>
  )}

  {/* FULL DAY */}
  {durationKey === "full" && (
    <div
      style={{
        padding: "20px",
        borderRadius: "18px",
        border: "1px solid #E5E7EB",
        background: "#F8FBFD",
        color: "#123B5D",
        fontWeight: 600
      }}
    >
      Full Day Hire · 09:00–17:00
    </div>
  )}
</TimeCard>

</div>
</div>
);
}
