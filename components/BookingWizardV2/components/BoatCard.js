export default function BoatCard({
  title,
  description,
  capacity,
  image,
  selected = false,
  compact = false,
  onClick,
  variant
}) {

  const isMotor = variant === "motor";
  const isSailing = variant === "sailing";
  const isPaddle = variant === "paddle";
  
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: compact ? "row" : "column",
        alignItems: compact ? "center" : "stretch",

        padding: 0,

        border: selected
          ? "2px solid #123B5D"
          : "1px solid #E5E7EB",

        borderRadius: "18px",

        background: selected
          ? "#F8FBFD"
          : "#FFFFFF",

        overflow: "hidden",

        cursor: "pointer",

        transition: "all 0.2s ease",

        boxShadow: selected
          ? "0 8px 24px rgba(18,59,93,0.10)"
          : "0 4px 16px rgba(0,0,0,0.05)"
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: compact ? "110px" : "100%",
          height: compact
           ? "80px"
           : isSailing
             ? "130px"
             : isMotor
               ? "190px"
               : "140px",

          objectFit: "cover",

          flexShrink: 0
        }}
      />

      <div
        style={{
          padding: compact ? "10px" : "12px",

          display: "flex",
          flexDirection: "column",

          justifyContent: "center",

          flex: 1,

          textAlign: "left"
        }}
      >
        <div
          style={{
            fontSize: compact
              ? "0.95rem"
              : isMotor
                ? "1.15rem"
                : isSailing
                  ? "1rem"
                  : "0.95rem",

            fontWeight: 600,

            color: "#123B5D"
          }}
        >
          {title}
        </div>

        {!compact && (
          <div
            style={{
              marginTop: compact ? "4px" : "8px",

              fontSize: isMotor
                ? "0.9rem"
                : isSailing
                  ? "0.82rem"
                  : "0.8rem",

              lineHeight: 1.5,

              color: "#64748B"
            }}
          >
            {description}
          </div>
        )}

        <div
          style={{
            marginTop: compact ? "6px" : "14px",

            fontSize: isMotor
              ? "0.85rem"
              : isSailing
                ? "0.8rem"
                : "0.78rem",

            color: "#123B5D",

            fontWeight: 500
          }}
        >
          Up to {capacity}
        </div>
      </div>
    </button>
  );
}
