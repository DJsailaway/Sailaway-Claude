import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";
import CTASection from "../components/CTASection";

export default function BoatStorage() {
  return (
    <>
      <Head>
        <title>Boat Storage St Anthony | Helford River Boat Storage Cornwall</title>
        <meta
          name="description"
          content="Boat storage at St Anthony on the Helford River, Cornwall. Secure and convenient seasonal boat storage for local Helford boat owners."
        />
      </Head>

      <Navbar />

      {/* HERO */}
      <SplitOverlayHero
        imageSrc="/boat-storage-helford.jpg"
        imageAlt="Boat storage at St Anthony on the Helford River"
        title="Boat Storage at St Anthony on the Helford River"
        showScrollCue={true}
        scrollTarget="page-content"
        scrollLabel="Explore"
        objectPosition="center bottom"
        overlayOpacity={0.05}
      />

      {/* MAIN CONTENT */}
      <div
        id="page-content"
        style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "60px 20px",
        }}
      >
        <h2>Boat Storage Services</h2>

        <p>
          Secure and convenient boat storage at St Anthony, perfectly positioned
          for easy access to the Helford River and the surrounding coastline.
        </p>

        <ul
          style={{
            lineHeight: 1.9,
            marginBottom: "30px",
          }}
        >
          <li>Seasonal boat storage at St Anthony</li>
          <li>Convenient access to the Helford River</li>
          <li>Suitable for yachts, powerboats, dinghies and tenders</li>
          <li>Comprehensive boatyard services on-site</li>
          <li>Experienced boat staff through the off season</li>
          <li>Ideal for local Helford River boat owners</li>
        </ul>

        <h2>Boat Storage on the Helford River</h2>

        <p>
          Keeping your boat stored locally means less time towing, easier
          launching and more opportunities to enjoy a day on the water whenever
          the weather is right. Our expert team have decades of experience
          preparing and caring for vessels and will take any unwanted jobs
          on your behalf.
        </p>

        <p>
          Our storage area at St Anthony provides a practical base for regular
          users of the Helford River, with straightforward access for launching
          and collecting your boat throughout the season.
        </p>

        <h2>Why Store Your Boat at St Anthony?</h2>

        <p>
          Many of our storage customers also use our launching and boatyard
          services, making St Anthony a simple one-stop location for keeping
          their boats ready to enjoy. With moorings available as well, we're
          able to offer a year-round solution for anyone wanting their boat
          launched, moored, hauled out and stored, as well as any sundry
          services like overhauling or antifouling. We have well over a 
          century's experience caring for boats of all types and work hard
          to ensure boats and equipment are safely and securely stored.
        </p>

        <h2>Location</h2>

        <p>St Anthony, Helford River, Cornwall.</p>

        {/* CTA HUB */}
        <CTASection
          title="Explore our full boatyard services"
          subtitle="Everything you need for launching, maintaining and storing your boat on the Helford River:"
          buttons={[
            {
              text: "Boat Launching",
              link: "/boat-launching-helford",
              variant: "secondary",
            },
            {
              text: "Moorings",
              link: "/gillan-creek-moorings",
              variant: "secondary",
            },
            {
              text: "Boatyard Services",
              link: "/boatyard-services",
            },
          ]}
        />
      </div>
    </>
  );
}
