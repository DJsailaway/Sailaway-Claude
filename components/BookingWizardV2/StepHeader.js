import { useState, useEffect } from "react";
import { colours, spacing } from "./styles";

export default function StepHeader({
  progressStep = 0,
  progressSteps = [],
  onStepClick
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
        marginBottom: isMobile ? spacing.md : spacing.lg
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: isMobile ? "4px" : "16px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "8px"
        }}
      >
        {progressSteps.map((step, index) => {
          const current = index === progressStep;
          const completed = index < progressStep;

          return (
            <div
             key={step.key}
             onClick={() => {
               if (completed && onStepClick) {
                 onStepClick(step.key);
               }
             }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: isMobile ? "0 0 auto" : 1,
                minWidth: isMobile ? "56px" : 0,
                cursor: completed ? "pointer" : "default",
                padding: isMobile ? "0 4px" : 0
              }}
            >
              <div
                style={{
                 fontSize: isMobile ? "10px" : "14px",
                 lineHeight: 1.2,
                 textAlign: "center",
                 letterSpacing: isMobile ? "0.2px" : 0,
                 fontWeight: current ? 700 : 500,
                 color:
                   current || completed
                     ? colours.primary
                     : colours.textSecondary,
                 whiteSpace: "nowrap",
                 transition: "all 0.25s ease"
               }}
              >
                {step.label}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "3px",
                  borderRadius: "999px",
                  background: current
                    ? colours.accent
                    : completed
                    ? colours.primary
                    : colours.border,
                  transition: "all 0.25s ease"
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
