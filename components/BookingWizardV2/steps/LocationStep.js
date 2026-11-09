import { useState, useEffect } from "react";

import { PRICING } from "../../../data/pricing";
import { formatPounds } from "../../../lib/pricing";

// Places and delivery charges come from data/pricing.js ("St Anthony" = collect from the boatyard)
const locations = Object.entries(PRICING.locations)
  .filter(([name]) => name !== "St Anthony")
  .map(([name, price]) => ({ name, shortTitle: name, price }));

const paidPrices = locations.map((l) => l.price).filter((p) => p > 0);

const deliveryNote = paidPrices.length
  ? `Included / +${formatPounds(Math.max(...paidPrices))}`
  : "Included";

export default function LocationStep({
  value,
  onChange
}) {

  const [mode, setMode] = useState(
    value.mode || "boatyard"
  );

  const [deliveryOpen, setDeliveryOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    const check = () =>
      setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);

  }, []);

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "18px" : "24px"
      }}
    >

      <h1
        style={{
          margin: 0,
          color: "#123B5D",
          fontSize: isMobile
            ? "1.25rem"
            : "1.5rem",
          fontWeight: 600,
          lineHeight: 1.2
        }}
      >
        Where will you start?
      </h1>

      {!isMobile && (

        <p
          style={{
            margin: 0,
            color: "#64748B"
          }}
        >
          For multi-day hires we can meet you at the
          boatyard or deliver around the Helford.
        </p>

      )}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(260px,300px) minmax(260px,300px) minmax(320px,1fr)",

          gap: isMobile ? "0" : "18px",

          alignItems: "start"
        }}
      >

        {/* LEFT CARD */}

        <button

          onClick={() => {

            setMode("boatyard");

            setDeliveryOpen(false);

onChange({

  mode: "boatyard",

  location: "St Anthony",

  shortTitle: "St Anthony",

  deliveryCharge: 0

});

          }}

          style={{

            padding: deliveryOpen && isMobile
              ? "18px"
              : "22px",

            borderRadius: "18px",

            border:

              mode === "boatyard"

                ? "2px solid #123B5D"

                : "1px solid #E5E7EB",

            background:

              mode === "boatyard"

                ? "#F8FBFD"

                : "#FFFFFF",

            textAlign: "left",

            cursor: "pointer",

            transition: "all .25s ease"

          }}

        >

          <div
            style={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#123B5D"
            }}
          >
            Meet us at St Anthony
          </div>

          {!(deliveryOpen && isMobile) && (
            <>
              <div
                style={{
                  marginTop: "8px",
                  color: "#64748B"
                }}
              >
                Collect your boat from our boatyard.
              </div>

              <div
                style={{
                  marginTop: "14px",
                  fontWeight: 600,
                  color: "#15803D"
                }}
              >
                Included
              </div>
            </>
          )}

        </button>

        {/* RIGHT SIDE */}

<div
  style={{
    display: "contents"
  }}
>

                <button
          onClick={() => {

            setMode("delivery");
            setDeliveryOpen(!deliveryOpen);

            onChange({
              mode: "delivery"
            });

          }}

          style={{

            width: "100%",
            padding: "22px",
            alignSelf: "start",

            borderRadius: isMobile
              ? (
                deliveryOpen
                  ? "18px 18px 0 0"
                  : "18px"
                )
              : "18px",

            border:

              mode === "delivery"

                ? "2px solid #123B5D"

                : "1px solid #E5E7EB",

            background:

              mode === "delivery"

                ? "#F8FBFD"

                : "#FFFFFF",

            textAlign: "left",

            cursor: "pointer",

            transition: "all .25s ease"

          }}
        >

          <div
            style={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#123B5D"
            }}
          >
            Meet us elsewhere
          </div>

          {(!deliveryOpen || !isMobile) && (

            <>
              <div
                style={{
                  marginTop: "8px",
                  color: "#64748B"
                }}
              >
                Choose a location around the Helford.
              </div>

              <div
                style={{
                  marginTop: "14px",
                  fontWeight: 600,
                  color: "#123B5D"
                }}
              >
                {deliveryNote}
              </div>
            </>

          )}

        </button>

        {deliveryOpen && (

  <div
    style={{
      border: "2px solid #123B5D",
      borderTop: isMobile ? "none" : "2px solid #123B5D",
      borderRadius: isMobile
        ? "0 0 18px 18px"
        : "18px",
      background: "#FFFFFF",
      padding: "14px",
      marginTop: isMobile ? "-1px" : "0",
      maxHeight: isMobile ? "38vh" : "240px",
      overflowY: "auto",
      boxShadow: "0 12px 30px rgba(0,0,0,.08)"
    }}
  >

            <div
              style={{
                display: "grid",
                gap: "10px"
              }}
            >

              {locations.map((location) => (

                <button
                  key={location.name}

                  onClick={() =>
                   onChange({
                    mode: "delivery",
                    location: location.name,
                    shortTitle: location.shortTitle,
                    deliveryCharge: location.price
                  })
                  }

                  style={{

                    padding: "16px",

                    borderRadius: "14px",

                    border:

                      value.location ===
                      location.name

                        ? "2px solid #123B5D"

                        : "1px solid #E5E7EB",

                    background:

                      value.location ===
                      location.name

                        ? "#F8FBFD"

                        : "#FFFFFF",

                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    cursor: "pointer",

                    transition: "all .2s ease"

                  }}
                >

                  <span>

                    {location.name}

                  </span>

                  <strong>

                    {location.price === 0

                      ? "Included"

                      : `+£${location.price}`}

                  </strong>

                </button>

              ))}

              <div
                style={{
                  height: "1px",
                  background: "#E5E7EB",
                  margin: "6px 0"
                }}
              />

              <div
                style={{
                  fontWeight: 600,
                  color: "#123B5D",
                  marginBottom: "4px"
                }}
              >
                Can't see your location?
              </div>

{value.location !== "Other" ? (
  <button
    onClick={() =>
      onChange({
        mode: "delivery",
        location: "Other"
      })
    }
    style={{
      padding: "16px",
      borderRadius: "14px",
      border: "1px solid #E5E7EB",
      background: "#FFFFFF",
      textAlign: "left",
      cursor: "pointer"
    }}
  >
    Somewhere else…
  </button>
) : (
  <textarea
    autoFocus
    placeholder="Where would you like us to meet you?"
    value={value.customLocation || ""}
    onChange={(e) =>
      onChange({
        customLocation: e.target.value
      })
    }
    style={{
      minHeight: "90px",
      padding: "16px",
      borderRadius: "14px",
      border: "1px solid #D1D5DB",
      resize: "vertical",
      fontFamily: "inherit",
      fontSize: "0.95rem"
    }}
  />
)}

            </div>
          </div>
        )}

      </div>
    </div>
  </div>
);
}
