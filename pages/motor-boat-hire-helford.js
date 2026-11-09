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

export default function MotorBoatHire() {
  return (
    <>
      <Head>
        <title>Motor Boat Hire Helford River | Self Drive Boats Cornwall</title>
        <meta
          name="description"
          content="Hire a motor boat on the Helford River in Cornwall and explore at your own pace."
        />
      </Head>

      <Navbar />

      <SplitOverlayHero
        imageSrc="/hero-motor-boats.jpg"
        alt="A family aboard a self-drive motor boat on the Helford River"
        title="Motor Boat Hire on the Helford River"
        height="380px"
        overlayOpacity={0.25}
        objectPosition="center 70%"
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
          Explore the beautiful Helford River with Cornwall's largest self-drive boat hire fleet.
        </p>

        <p style={{ marginBottom: "30px" }}>
          Based in St Anthony, our boats are perfect for families, couples, and groups. Our fleet caters to total novices and experieced boatmen alike. We offer a varied fleet of motor and sailboats, and are able to offer delivery to all points along the Helford River. Visitors can take a short hop up the river for an hour, or reserve a boat for a week or two to immerse themselves in this wonderful Cornish tradition. Of course, our boats are supplied with fuel, with all the requisite safety equipment and are fully licensed and insured. With well over a century of experience handling boats on the Helford, we aim to take any hassle out of your time afloat, and will show you how to use the boat and give you a few tips on where to go before you set off on your own adventure.
        </p>

        <h2>Our Motor Boats</h2>

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
            title="Plymouth Pilot"
            description="Spacious and stable motor boat for up to 8 people."
            imageSrc="/Pilot.jpg"
            fromPrice={getFromPrice("plymouth-pilot")}
            href="/?boat=plymouth-pilot#booking-wizard"
          />

          <BoatCard
            title="Bass Boat"
            description="Ideal for smaller groups of up to 5 people."
            imageSrc="/Bass.jpg"
            fromPrice={getFromPrice("bass-boat")}
            href="/?boat=bass-boat#booking-wizard"
          />
        </div>

        {/* 🔻 UPDATED CTA SECTION (NOW CONSISTENT WITH REST OF SITE) */}
        <CTASection
          title="Prefer something more adventurous?"
          subtitle="If you'd like to try sailing instead, explore our sailing boat hire options."
          buttons={[
            {
              text: "See our Sailing Boats",
              link: "/sailing-boat-hire-helford",
            },
          ]}
        />
      </div>
    </>
  );
}
