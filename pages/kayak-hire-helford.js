import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";

export default function KayakHire() {
  return (
    <>
      <Head>
        <title>Kayak Hire Helford River | Paddleboard Hire Cornwall</title>
        <meta
          name="description"
          content="Hire kayaks and paddleboards on the Helford River. A relaxed and affordable way to explore Cornwall’s waterways."
        />
      </Head>

      <Navbar />

      {/* HERO */}
<SplitOverlayHero
  imageSrc="/kayak-hire-helford.jpg"
  alt="Kayak hire on the Helford River"
  title="Kayak & Paddleboard Hire on the Helford River"
  overlayStrength="light"
  objectPosition="center 75%"
  topContent={
    <>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        Explore at your own pace with our easy-to-use kayaks and paddleboards — perfect for families, beginners, and those looking for a peaceful way to enjoy the water.
      </p>
    </>
  }
/>

      {/* CONTENT */}
      <div
        style={{
          fontFamily: "sans-serif",
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        <h2>Available Options</h2>
        <ul style={{ marginBottom: "30px", lineHeight: "1.8" }}>
          <li>Single Kayaks</li>
          <li>Double Kayaks</li>
          <li>Stand-Up Paddleboards</li>
        </ul>

        <h2>Why Choose Kayaks?</h2>
        <ul style={{ marginBottom: "30px", lineHeight: "1.8" }}>
          <li>✔ Easy to use</li>
          <li>✔ No experience needed</li>
          <li>✔ Great for exploring creeks</li>
        </ul>

        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            padding: "30px",
            borderRadius: "10px"
          }}
        >
          <h2>Check Availability</h2>
          <p style={{ marginBottom: "20px" }}>
            Use our booking form to check availability and request your preferred date and time.
          </p>

          <a href="/?activity=paddle#booking-wizard">
            <button
              style={{
                padding: "14px 28px",
                fontSize: "1.1rem",
                backgroundColor: "#1e3a5f",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Check availability
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
