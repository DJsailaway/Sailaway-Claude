import { useEffect, useState } from "react";

function Field({ error, children }) {
  return (
    <div style={{ position: "relative" }}>
      {children}

      {error && (
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#FEF2F2",
            color: "#B91C1C",
            border: "1px solid #FCA5A5",
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: 600,
            pointerEvents: "none",
            maxWidth: "55%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default function ContactStep({
  value,
  errors = {},
  onChange
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  const inputStyle = {
    width: "100%",
    padding: isMobile ? "16px" : "18px",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    fontSize: "1rem",
    color: "#123B5D",
    boxSizing: "border-box",
    outline: "none",
    background: "#FFFFFF"
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px"
      }}
    >
      <h1
        style={{
          margin: 0,
          color: "#123B5D",
          fontSize: isMobile ? "1.4rem" : "1.6rem",
          fontWeight: 600
        }}
      >
        Your details
      </h1>

      <p
        style={{
          margin: 0,
          color: "#64748B",
          lineHeight: 1.5
        }}
      >
        We use these details to confirm your booking - no spam.
      </p>

<Field error={errors.name}>
  <input
    type="text"
    placeholder="Full name"
    value={value.name}
    onChange={(e) =>
      onChange({
        name: e.target.value
      })
    }
    style={{
      ...inputStyle,
      border: errors.name
        ? "1px solid #EF4444"
        : inputStyle.border
    }}
  />
</Field>

<Field error={errors.email}>
  <input
    type="email"
    placeholder="Email address"
    value={value.email}
    onChange={(e) =>
      onChange({
        email: e.target.value
      })
    }
    style={{
      ...inputStyle,
      border: errors.email
        ? "1px solid #EF4444"
        : inputStyle.border
    }}
  />
</Field>

<Field error={errors.phone}>
  <input
    type="tel"
    placeholder="Telephone number"
    value={value.phone}
    onChange={(e) =>
      onChange({
        phone: e.target.value
      })
    }
    style={{
      ...inputStyle,
      border: errors.phone
        ? "1px solid #EF4444"
        : inputStyle.border
    }}
  />
</Field>

      <textarea
        placeholder="Anything you'd like us to know?"
        value={value.notes}
        onChange={(e) =>
          onChange({
            notes: e.target.value
          })
        }
        style={{
          ...inputStyle,
          minHeight: "120px",
          resize: "vertical"
        }}
      />
    </div>
  );
}
