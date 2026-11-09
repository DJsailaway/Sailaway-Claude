import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";
import Image from "next/image";
import CTASection from "../components/CTASection";
import Button from "../components/Button";
import { getFromPrice, formatPounds } from "../lib/pricing";

// Boat Card component
function BoatCard({ title, description, imageSrc, href, fromPrice }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
        <Image src={imageSrc} alt={title} fill style={{ objectFit: "cover" }} />
      </div>

      <div style={{ padding: "16px" }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{title}</h3>

        <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "12px" }}>
          {description}
        </p>

        {fromPrice && (
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1e3a5f", marginBottom: "14px" }}>
            From {formatPounds(fromPrice.price)} for {fromPrice.label}
          </p>
        )}

        {href && <Button href={href}>Check availability</Button>}
      </div>
    </div>
  );
}

export default function SailingBoatHire() {
  return (
    <>
      <Head>
        <title>Sailing Boat Hire Helford River | Dinghy Hire Cornwall</title>
      </Head>

      <Navbar />

      <SplitOverlayHero
        imageSrc="/hero-sailing.jpg"
        alt="A family sailing on the Helford River"
        title="Sailing Boat Hire on the Helford River"
        height="380px"
        overlayOpacity={0.3}
        objectPosition="center 30%"
      />

      <div
        style={{
          fontFamily: "sans-serif",
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
          Enjoy traditional sailing on the Helford River with our fleet of dayboats and dinghies. Our sailing boats are available to any party with a competent sailor, while our motorboats can be booked by total novices or experienced boatmen alike. We offer a varied fleet of motor and sailboats, and are able to offer delivery to all points along the Helford River. Visitors can take a short hop up the river for a couple of hours, or reserve a boat for a week or two to immerse themselves in this wonderful Cornish tradition. Of course, our boats are supplied with fuel, with all the requisite safety equipment and are fully licensed and insured. With well over a century of experience handling boats on the Helford, we aim to take any hassle out of your time afloat, and will show you how to rig and use the boat and give you a few tips on where to go before you set off on your own adventure.
        </p>

        <h2>Our Sailing Boats</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <BoatCard
            title="Drascombe Longboat"
            description="Traditional sailing boat for up to 6 people."
            imageSrc="/sailing-boats-helford-river.jpg"
            fromPrice={getFromPrice("drascombe")}
            href="/?boat=drascombe#booking-wizard"
          />

          <BoatCard
            title="Wayfarer Dinghy"
            description="Great for confident sailors."
            imageSrc="/sailing-hire-cornwall.jpg"
            fromPrice={getFromPrice("wayfarer")}
            href="/?boat=wayfarer#booking-wizard"
          />

          <BoatCard
            title="Topaz, Pico & Topper"
            description="Single and double-handed dinghies."
            imageSrc="/sailing-hire-helford-river.jpg"
            fromPrice={getFromPrice(["topaz", "pico", "topper"])}
            href="/?activity=sailing#booking-wizard"
          />
        </div>

        <h2>Important Information</h2>
        <ul style={{ marginBottom: "40px", lineHeight: "1.8" }}>
          <li>✔ Suitable for experienced sailors</li>
          <li>✔ Safety briefing provided</li>
          <li>✔ Life jackets included</li>
        </ul>

        {/* 🔻 CTA (FIXED LINK + CONSISTENT WITH SITE STRUCTURE) */}
        <CTASection
          title="Prefer something easier to handle?"
          subtitle="Our motor boats are perfect for relaxed exploring — no sailing experience needed."
          buttons={[
            {
              text: "See our Motor Boats",
              link: "/motor-boat-hire-helford",
            },
          ]}
        />
      </div>
    </>
  );
}
