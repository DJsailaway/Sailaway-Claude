import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";
import CTASection from "../components/CTASection";

export default function BoatyardServices() {
  return (
    <>
      <Head>
        <title>Boatyard Services Helford River | Moorings & Launching Cornwall</title>
        <meta
          name="description"
          content="Boatyard services on the Helford River including marine joinery, electrical work, painting and varnishing,
          rigging, repairs, maintenance and bespoke metalwork. Based in St Anthony, Cornwall."
        />
      </Head>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <SplitOverlayHero
        imageSrc="/boat-launching-helford.jpg"
        imageAlt="Boat launching on the Helford River"
        title="Boatyard Services on the Helford River"
        showScrollCue={true}
        scrollTarget="page-content"
        scrollLabel="Explore"
        topContent={
          <p>
            Reliable boatyard services from our experienced team at St Anthony.
          </p>
        }
      />

      <div
        id="page-content"
        style={{
          fontFamily: "sans-serif",
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <p>
          We offer a range of boatyard services from our base at St Anthony on the Helford River, Cornwall.
          Whether you need gardianage, metalwork, GRP repairs, joinery, polishing, antifouling or general maintenance,
          we provide a reliable and friendly service. Most of our work is bespoke, so call us to discuss your requirements.
        </p>

        <h2>Ancilliary Services</h2>

        <h2>Boat Launching</h2>
        <p>
          Convenient and straightforward launching facilities with easy access to the Helford River.
        </p>

        <h2>Moorings</h2>
        <p>
          Secure moorings in one of Cornwall’s most sheltered and beautiful rivers.
        </p>

        <h2>Storage</h2>
        <p>
          Seasonal boat storage available at St Anthony for local boat owners.
        </p>

        <h2>Rigging</h2>
        <p>
          Our experienced team can prepare your running and standing rigging to your instructions.
        </p>

        <h2>Location</h2>
        <p>
          Based in St Anthony on the Helford River, ideally located for easy water access.
        </p>

        {/* 🔻 CTA HUB (NOW PART OF SYSTEM) */}
        <CTASection
          title="Explore our full range of boatyard services"
          subtitle="Everything you need for launching, moorings, and storage on the Helford River:"
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
              text: "Boat Storage",
              link: "/boat-storage-helford",
            },
          ]}
        />
      </div>
    </>
  );
}
