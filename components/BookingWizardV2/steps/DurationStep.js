import { useEffect, useState } from "react";
import { getAvailableHourlyKeys } from "../../../lib/pricing";

const HOURLY_OPTIONS = [
  {
    key: "1h",
    label: "1 Hour"
  },
  {
    key: "2h",
    label: "2 Hours"
  },
  {
    key: "half",
    label: "Half Day (4 Hours)"
  },
  {
    key: "full",
    label: "Full Day (8 Hours)"
  }
];

export default function DurationStep({
  activity,
  boatId,
  value,
  onChange
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  // Which lengths this boat can be hired for comes from data/pricing.js
  const availableKeys = getAvailableHourlyKeys(boatId);

  const hourlyOptions = availableKeys.length
    ? HOURLY_OPTIONS.filter((o) => availableKeys.includes(o.key))
    : HOURLY_OPTIONS;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <h1
        style={{
          margin: 0,
          color: "#123B5D",
          fontSize: isMobile
            ? "1.4rem"
            : "1.8rem",
          fontWeight: 600
        }}
      >
        How long would you like the boat for?
      </h1>

      {/* MODE SELECTOR */}

      <div
        style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
      }}
    >
        <button
          onClick={() =>
            onChange({
              durationMode: "hourly"
            })
          }
  style={{
  padding: "18px",
  borderRadius: "18px",

  border: "2px solid #123B5D",

  background:
    value.durationMode === null ||
    value.durationMode === "hourly"
      ? "#123B5D"
      : "#FFFFFF",

  color:
    value.durationMode === null ||
    value.durationMode === "hourly"
      ? "#FFFFFF"
      : "#123B5D",

  fontWeight: 700,
  fontSize: "1rem",

  cursor: "pointer",

  boxShadow:
    value.durationMode === "hourly"
      ? "0 8px 24px rgba(18,59,93,0.18)"
      : "none"
}}
        >
          Hourly
        </button>

        <button
          onClick={() =>
            onChange({
              durationMode: "multiday"
            })
          }
          style={{
  padding: "20px",
  borderRadius: "18px",

  border: "2px solid #123B5D",

  background:
    value.durationMode === null ||
    value.durationMode === "multiday"
      ? "#123B5D"
      : "#FFFFFF",

  color:
    value.durationMode === null ||
    value.durationMode === "multiday"
      ? "#FFFFFF"
      : "#123B5D",

  fontWeight: 700,
  fontSize: "1rem",

  cursor: "pointer",

  boxShadow:
    value.durationMode === "multiday"
      ? "0 8px 24px rgba(18,59,93,0.18)"
      : "none"
}}
        >
          Multi-Day
        </button>
      </div>

      {/* HOURLY */}

      {value.durationMode === "hourly" && (
        <div
         style={{
           display: "grid",
           gridTemplateColumns: isMobile
             ? "1fr"
             : "repeat(4, 1fr)",
           gap: isMobile ? "10px" : "16px"
         }}
       >
          {hourlyOptions.map((option) => (
            <button
              key={option.key}
              onClick={() =>
                onChange({
                  durationKey: option.key
                })
              }
              style={{
                  padding: isMobile
                  ? "18px"
                  : "26px",
                borderRadius: "16px",
                border:
                  value.durationKey === option.key
                    ? "2px solid #123B5D"
                    : "1px solid #E5E7EB",
                background:
                  value.durationKey === option.key
                    ? "#F8FBFD"
                    : "#FFFFFF",
                cursor: "pointer",
                fontWeight: 600,
                  fontSize: isMobile
                    ? "1rem"
                    : "1.1rem"
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* MULTI DAY */}

      {value.durationMode === "multiday" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "10px"
          }}
        >
          <button
            onClick={() =>
              onChange({
                days: Math.max(
                  2,
                  value.days - 1
                )
              })
            }
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              border: "none",
              background: "#123B5D",
              color: "white",
              fontSize: "28px",
              cursor: "pointer"
            }}
          >
            −
          </button>

          <div
            style={{
              minWidth: "80px",
              textAlign: "center"
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#123B5D"
              }}
            >
              {value.days}
            </div>

            <div
              style={{
                color: "#64748B",
                fontSize: "0.9rem"
              }}
            >
              Days
            </div>
          </div>

          <button
            onClick={() =>
              onChange({
                days: Math.min(
                  31,
                  value.days + 1
                )
              })
            }
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              border: "none",
              background: "#123B5D",
              color: "white",
              fontSize: "28px",
              cursor: "pointer"
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
