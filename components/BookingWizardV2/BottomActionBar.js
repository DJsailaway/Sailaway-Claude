import { useEffect, useState } from "react";
import { colours, spacing, radius, shadows } from "./styles";

export default function BottomActionBar({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  total = "£0",
  showTotal = true,
  disableNext = false
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${colours.border}`,
        boxShadow: shadows.card,
        padding: isMobile
          ? `${spacing.sm}px 8px`
          : `${spacing.md}px ${spacing.lg}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.sm,
        zIndex: 1000,
        boxSizing: "border-box"
      }}
    >
      {/* Back */}

      <button
        onClick={onBack}
        style={{
          padding: isMobile
            ? `${spacing.sm}px ${spacing.md}px`
            : `${spacing.sm}px ${spacing.lg}px`,
          borderRadius: radius.md,
          border: `1px solid ${colours.border}`,
          background: colours.card,
          color: colours.primary,
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "0.25s ease",
          whiteSpace: "nowrap",
          flexShrink: 0
        }}
      >
        ‹ {backLabel}
      </button>

      {/* Total */}

      {showTotal && (
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "16px",
            fontWeight: 700,
            color: colours.primary,
            whiteSpace: "nowrap"
          }}
        >
          {total}
        </div>
      )}

      {/* Next */}

      <button
        onClick={onNext}
        disabled={disableNext}
        style={{
          padding: isMobile
            ? `${spacing.sm}px ${spacing.md}px`
            : `${spacing.sm}px ${spacing.xl}px`,
          borderRadius: radius.md,
          border: "none",
          background: disableNext
            ? colours.border
            : colours.primary,
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          cursor: disableNext ? "not-allowed" : "pointer",
          transition: "0.25s ease",
          opacity: disableNext ? 0.5 : 1,
          whiteSpace: "nowrap",
          flexShrink: 0
        }}
      >
        {nextLabel} ›
      </button>
    </div>
  );
}
