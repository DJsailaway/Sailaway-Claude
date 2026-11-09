import { useEffect, useState } from "react";
import BoatCard from "../components/BoatCard";
import { boats } from "../boats";

export default function BoatStep({
  activity,
  selectedBoat,
  onSelect
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  const filteredBoats = boats.filter(
    (boat) => boat.activity === activity
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "8px" : "20px",
        height: "100%",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#123B5D",
            fontSize: isMobile ? "1.25rem" : "2rem",
            fontWeight: 600
          }}
        >
          Choose your boat
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : activity === "sailing"
              ? "repeat(5, minmax(0, 1fr))"
              : activity === "paddle"
                ? "repeat(4, minmax(0, 1fr))"
                : "repeat(2, minmax(0, 1fr))",
            gap: activity === "sailing"
              ? (isMobile ? "8px" : "16px")
              : (isMobile ? "16px" : "16px"),
          }}
      >
        {filteredBoats.map((boat) => (
          <BoatCard
            key={boat.id}
            title={boat.title}
            description={boat.description}
            capacity={boat.capacity}
            image={boat.image}
            compact={isMobile}
            selected={selectedBoat?.id === boat.id}
            onClick={() => onSelect(boat)}
            variant={activity}
          />
        ))}
      </div>
    </div>
  );
}
