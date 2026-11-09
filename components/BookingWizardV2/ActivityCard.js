export default function ActivityCard({
  title,
  description,
  image,
  selected = false,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px 14px 52px",
        background: "#ffffff",
        border: selected
          ? "2px solid #C7A44D"
          : "1px solid #E5E7EB",
        borderRadius: "18px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        textAlign: "left",
        boxShadow: selected
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        overflow: "visible",
        minHeight: "84px"
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          position: "absolute",
          left: "-18px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)"
        }}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#123B5D",
            marginBottom: "4px"
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#64748B",
            lineHeight: 1.3
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          fontSize: "24px",
          color: "#123B5D",
          marginLeft: "12px",
          flexShrink: 0
        }}
      >
        ›
      </div>
    </button>
  );
}
