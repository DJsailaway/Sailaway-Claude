import Image from "next/image";
import { useState, useEffect } from "react";

export default function SplitOverlayHero({
  imageSrc,
  imageAlt,
  alt,
  title,
  topContent,
  bottomContent,
  height = "500px",
  overlayOpacity = 0.1,
  objectPosition = "center",
  showScrollCue = false,
  scrollTarget = "page-content",
  scrollLabel = "Explore more"
}) {
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToContent = () => {
  const target = document.getElementById(scrollTarget);

  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.35);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: height,
        overflow: "hidden",
      }}
    >
      {/* IMAGE */}
      <Image
        src={imageSrc}
        alt={imageAlt ?? alt ?? ""}
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: objectPosition,
          zIndex: 0,
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.08s linear",
        }}
      />

      {/* SUBTLE WATER LIGHT EFFECT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,0.06) 100%)",
          backgroundSize: "200% 200%",
          animation: "waterShimmer 6s ease-in-out infinite",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
          zIndex: 1,
        }}
      />

      {/* TOP TEXT */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "20px" : "30px",
          left: isMobile ? "18px" : "30px",
          right: isMobile ? "18px" : "30px",
          color: "white",
          zIndex: 2,
          maxWidth: isMobile ? "100%" : "600px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: isMobile
              ? "32px"
              : "clamp(40px, 5vw, 64px)",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>

        {topContent}
      </div>

      {/* BOTTOM TEXT */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "20px" : "30px",
          left: isMobile ? "18px" : "30px",
          right: isMobile ? "18px" : "30px",
          color: "white",
          zIndex: 2,
          maxWidth: isMobile ? "100%" : "600px",
        }}
      >
        {bottomContent}
      </div>

      {showScrollCue && (
  <div
    onClick={scrollToContent}
    style={{
      position: "absolute",
      bottom: "26px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      color: "rgba(255,255,255,0.95)",
      userSelect: "none",
    }}
  >
    <div
      style={{
        fontSize: "11px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "8px",
        fontWeight: 600,
      }}
    >
      {scrollLabel}
    </div>

    <div
      style={{
        fontSize: "26px",
        animation: "floatArrow 2.8s ease-in-out infinite",
      }}
    >
      ⌄
    </div>
  </div>
)}
        
<style jsx>{`
  @keyframes waterShimmer {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes floatArrow {
    0% {
      transform: translateY(0px);
      opacity: 0.85;
    }

    50% {
      transform: translateY(6px);
      opacity: 1;
    }

    100% {
      transform: translateY(0px);
      opacity: 0.85;
    }
  }
`}</style>
    </div>
  );
}
