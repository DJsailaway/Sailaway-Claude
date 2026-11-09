export default function DateCard({
  value,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: value ? "14px 20px" : "24px",
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        background: "#FFFFFF",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all .25s ease"
      }}
    >
      <div

        style={{
          marginTop: value ? "6px" : "14px",
          fontSize: value ? "1rem" : "1.35rem",
          fontWeight: 600,
          color: "#123B5D"
        }}
      >
        {value || "What date would you like your boat?"}
      </div>

      <div
        style={{
          marginTop: "10px",
          color: "#64748B",
          fontSize: ".8rem"
        }}
      >
        {value
          ? "Tap to change"
          : "Tap to choose a date"}
      </div>
    </button>
  );
}
