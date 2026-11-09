import Link from "next/link";
import { callIfPhone } from "../lib/contact";

export default function CTASection({
  title,
  subtitle,
  buttons = [],
  background = "#f5f5f5",
  align = "center",
}) {
  return (
    <div
      style={{
        margin: "50px 0",
        padding: "35px 25px",
        backgroundColor: background,
        borderRadius: "12px",
        textAlign: align,
      }}
    >
      {title && <h2 style={{ marginBottom: "10px" }}>{title}</h2>}

      {subtitle && (
        <p style={{ marginBottom: "20px", opacity: 0.85 }}>
          {subtitle}
        </p>
      )}

      {buttons.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {buttons.map((btn, index) => (
            <Link
              key={index}
              href={btn.link}
              onClick={btn.callOnPhone ? callIfPhone : undefined}
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  padding: "14px 28px",
                  backgroundColor: btn.variant === "secondary" ? "white" : "#1e3a5f",
                  color: btn.variant === "secondary" ? "#1e3a5f" : "white",
                  border: btn.variant === "secondary" ? "2px solid #1e3a5f" : "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {btn.text}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
