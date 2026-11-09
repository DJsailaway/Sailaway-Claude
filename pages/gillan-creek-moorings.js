import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";
import CTASection from "../components/CTASection";
import { CONTACT_LINK } from "../lib/contact";

export default function Moorings() {
  return (
    <>
      <Head>
        <title>Moorings Helford River | Gillan Creek Moorings Cornwall</title>
      </Head>

      <Navbar />

      <SplitOverlayHero
        imageSrc="/moorings-gillan-creek.jpg"
        imageAlt="Boat moorings at Gillan Creek"
        title="Moorings at Gillan Creek on the Helford River"
        showScrollCue={true}
        scrollTarget="page-content"
        scrollLabel="Explore"
      />

<div
  id="page-content"
  style={{
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
        <h2>Our Moorings Services</h2>
        <ul>
          <li>Seasonal and short-term moorings</li>
          <li>Direct access to Gillan Creek at the mouth of the Helford</li>
          <li>Moorings for vessels up to around 36ft</li>
          <li>Dinghy park available for tenders</li>
          <li>Ferry service to customers' boats</li>
          <li>Tidal pontoon at St Anthony for loading/unloading</li>
          <li>Car parking available for mooring customers</li>
          <li>Toilets and shower available on site</li>
          <li>Deep water and drying moorings available</li>
          <li>Comprehensive ancillary services if required</li>
        </ul>

        <h2>Why Choose Gillan Creek?</h2>
        <p>
          A quiet, sheltered location with easy access to the Helford River. Our moorings are fully licensed and insured, and
          checked annually. We keep a close eye on the weather and prepare carefully for any incoming seas on our owners' behalf. 
          We're also afloat every day, which lets us keep a closer eye on boats in our care than most marinas can.
        </p>

        {/* 🔻 SINGLE CLEAN CTA WITH HORIZONTAL BUTTONS */}
        <CTASection
          title="We offer comprehensive boat yard services"
          subtitle="including launch and retrieval, metal-, fibreglass and wood-work, rigging and storage:"
          buttons={[
            { text: "Boat Launching", link: "/boat-launching-helford" },
            { text: "Boatyard Services", link: "/boatyard-services", variant: "secondary" },
            { text: "Boat Storage", link: "/boat-storage-helford", variant: "secondary" },
          ]}
        />

        {/* Optional contact CTA */}
        <CTASection
          title="Need help choosing the right service?"
          buttons={[
            { text: "Contact us", link: CONTACT_LINK, callOnPhone: true },
          ]}
        />
      </div>
    </>
  );
}
