import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";
import CTASection from "../components/CTASection";
import { PHONE_DISPLAY, PHONE_TEL } from "../lib/contact";

export default function Location() {
  return (
    <>
      <Head>
        <title>
          St Anthony on the Helford River | A Quiet Corner of Cornwall
        </title>

        <meta
          name="description"
          content="Discover St Anthony on the Helford River, Cornwall. Hidden beaches, peaceful creeks, local history and one of Cornwall's most beautiful places to explore by boat."
        />
      </Head>

      <Navbar />

      <SplitOverlayHero
        imageSrc="/st-anthony.jpg"
        imageAlt="St Anthony on the Helford River"
        title="St Anthony on the Helford River"
        overlayOpacity={0.15}
        objectPosition="center"
        showScrollCue={true}
        scrollTarget="page-content"
        scrollLabel="Explore"
        topContent={
          <div style={{ marginTop: "18px" }}>
            <button
              onClick={() =>
                document
                  .getElementById("directions")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
              }
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "10px 18px",
                borderRadius: "999px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                fontWeight: 600,
              }}
            >
              📍 How to get here
            </button>
          </div>
        }
        bottomContent={null}
      />

      <div
        id="page-content"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "70px 20px",
          lineHeight: 1.8,
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "24px",
          }}
        >
          Some places are best discovered slowly.
        </h2>

        <p>
          At the end of quiet Cornish lanes, St Anthony isn't 
          a place that changes much. The boats on the river may
          be more modern, but the hamlet itself has barely 
          altered over the centuries, and the pace of life 
          still feels reassuringly familiar.
        </p>

        <p>
          Perhaps that's why this small hamlet has changed so
          little. The old cottages still face the water,
          boats still rest on their moorings with the tide,
          and long summer evenings are accompanied by little
          more than birdsong and the gentle clink of halyards.
        </p>

        <p>
          It is a place that encourages people to slow down 
          and adjust to the rhythm of the tides rather than 
          the clock. Whether exploring quiet creeks, anchoring 
          for lunch or simply watching the river change through 
          the day, there is rarely any reason to hurry.
        </p>

        <hr
          style={{
            margin: "70px 0",
            border: 0,
            borderTop: "1px solid #ddd",
          }}
        />

        <h2>A Place People Return To</h2>

        <p>
          Many families who visit St Anthony first arrived as
          children and now return with children and
          grandchildren of their own.
        </p>

        <p>
          There is something timeless about spending a day on
          the Helford: drifting up quiet creeks, dropping an
          anchor for lunch, swimming from deserted beaches and
          discovering little corners that never appear on the
          usual tourist maps.
        </p>

        <p>
          Of course, everyone has a first visit.
          The Helford has a habit of making those feel like
          the start of a tradition.
        </p>

        <hr
          style={{
            margin: "70px 0",
            border: 0,
            borderTop: "1px solid #ddd",
          }}
        />

        <h2>A Few Favourite Places</h2>

        <h3>Gear Farm</h3>

        <p>
          Ask almost any local where to find the best Cornish
          pasty and you'll probably be pointed towards
          Gear Farm.
        </p>

        <h3>The Shipwrights Arms</h3>

        <p>
          A waterside pub that feels perfectly suited to a
          relaxed lunch after a morning exploring the river.
        </p>

        <h3>Hidden Beaches</h3>

        <p>
          Grove Beach, Horseshoe Cove and Eastern Cove are
          quiet little beaches that many visitors never find.
          On a warm evening at high tide they become wonderful
          places to swim and simply enjoy being beside the
          water.
        </p>

        <h3>Gillan Creek</h3>

        <p>
          Head upstream on a high tide between wooded
          banks, nested by Kingfishers, Ibis and Swans
        </p>

        <hr
          style={{
            margin: "70px 0",
            border: 0,
            borderTop: "1px solid #ddd",
          }}
        />

<div
  id="directions"
  style={{
    scrollMarginTop: "120px", // 👈 add this
  }}
>
  <h2>How to Get Here</h2>

  <p>
    St Anthony sits at the very end of quiet Cornish lanes on the edge of the
    Helford River, where the road naturally gives way to the water.
  </p>

  <p>
    Follow signs towards Helford and St Anthony. The final approach is narrow
    and winding, but it opens directly onto the river — a quiet destination
    with no through traffic.
  </p>

  <h3 style={{ marginTop: "30px" }}>By Car</h3>

  <p>
    There is a well-maintained on-site car park available for visitors,
    conveniently located close to the slipway and river access points.
  </p>

  <p>
    From here, it is a short walk to the water, beach areas, and moorings.
  </p>

  <h3 style={{ marginTop: "30px" }}>By Ferry</h3>

  <p>
    A seasonal ferry operates across the river from the south side of the
    Helford, offering a relaxed and scenic way to reach St Anthony without
    needing to drive around the estuary.
  </p>

  <p>
    It is a popular option for walkers and those exploring the Helford’s
    footpaths and creeks.
  </p>

  <h3 style={{ marginTop: "30px" }}>Location Map</h3>

<div style={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
  <iframe
    src="https://www.google.com/maps?ll=50.08944978350336,-5.1240&z=14&output=embed"
    width="100%"
    height="280"
    style={{ border: 0 }}
    loading="lazy"
  />

  {/* Fake pin overlay */}
  <div
    style={{
      position: "absolute",
      top: "55%",
      left: "81%",
      transform: "translate(-50%, -100%)",
      fontSize: "28px",
      pointerEvents: "none",
    }}
  >
    📍
  </div>
</div>

  <div
    style={{
      marginTop: "14px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "10px",
    }}
  >
    <a
      href="https://www.google.com/maps?q=The+Boathouse,+St+Anthony,+Helston,+TR12+6JW"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        padding: "10px 16px",
        borderRadius: "999px",
        border: "1px solid #ccc",
        color: "#333",
        fontWeight: 500,
      }}
    >
      Open in Google Maps
    </a>
  </div>
</div>

        <hr
          style={{
            margin: "70px 0",
            border: 0,
            borderTop: "1px solid #ddd",
          }}
        />

        <div id="contact" style={{ scrollMarginTop: "120px", marginBottom: "60px" }}>
          <h2>Contact</h2>

          <p>
            We’re always happy to chat before you book — give us a call, or
            come and find us at the end of the lane.
          </p>

          <address style={{ fontStyle: "normal", lineHeight: 1.8, margin: "20px 0" }}>
            The Boathouse
            <br />
            St Anthony
            <br />
            Helston
            <br />
            Cornwall
            <br />
            TR12 6JW
          </address>

          <p>
            <strong>Telephone:</strong>{" "}
            <a href={PHONE_TEL} style={{ color: "#1e3a5f", fontWeight: 600 }}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>

        <CTASection
          title="Start exploring the Helford"
          subtitle="Hire a boat, discover hidden creeks or enjoy a day on one of Cornwall's most beautiful rivers."
          buttons={[
            {
              text: "Motor Boats",
              link: "/motor-boat-hire-helford",
            },
            {
              text: "Traditional Sailing",
              link: "/sailing-boat-hire-helford",
              variant: "secondary",
            },
            {
              text: "Kayaks & SUPs",
              link: "/kayak-hire-helford",
              variant: "secondary",
            },
          ]}
        />
      </div>
    </>
  );
}
