export default function TimeCard({
  value,
  disabled,
  onClick,
  expanded,
  children
}) {
return (
  <div
    style={{
      width: "100%",
      padding: "20px",
      borderRadius: "20px",
      border: "1px solid #E5E7EB",
      background: disabled ? "#F8FAFC" : "#FFFFFF",
      boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
      cursor: disabled ? "default" : "pointer",
      textAlign: "left",
      opacity: disabled ? 0.6 : 1,
      transition: "all .2s ease"
    }}
  >
    {/* CLICKABLE HEADER */}
    <div
      onClick={!disabled ? onClick : undefined}
      style={{
        cursor: disabled ? "default" : "pointer"
      }}
    >

      <div
        style={{
          marginTop: "0px",
          fontSize: "1.35rem",
          fontWeight: 600,
          color: "#123B5D"
        }}
      >
        {disabled
          ? "What time would you like to go?"
          : value || "Choose a time"}
      </div>

{(disabled || value) && (
  <div
    style={{
      marginTop: "10px",
      color: "#64748B",
      fontSize: ".95rem"
    }}
  >
    {disabled
      ? "Select a date first"
      : "Tap to change"}
  </div>
)}
    </div>

    {expanded && (
      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gap: "12px"
        }}
      >
        {children}
      </div>
    )}
  </div>
);
}
