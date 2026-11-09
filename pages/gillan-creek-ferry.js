import Head from "next/head";
import Navbar from "../components/navbar";
import SplitOverlayHero from "../components/SplitOverlayHero";
import { CONTACT_LINK, callIfPhone } from "../lib/contact";

export default function GillanCreekFerry() {
  return (
    <>
      <Head>
        <title>Gillan Creek Ferry | Helford River Ferry Crossing</title>
      </Head>

      <Navbar />

      <SplitOverlayHero
        imageSrc="/gillan-creek-ferry.jpg"
        alt="Gillan Creek Ferry crossing"
        title="Gillan Creek Ferry"
        showScrollCue={true}
        scrollTarget="page-content"
        scrollLabel="Explore"
        topContent={
          <>
            <p>
              A simple and scenic way to cross Gillan Creek on the Helford River.
            </p>
          </>
        }
        bottomContent={
          <>
            <p>
              Our ferry provides a convenient crossing between St Anthony and Gillan,
              perfect for walkers, locals, and visitors exploring the coastline.
            </p>
          </>
        }
      />

<div
  id="page-content"
  style={{
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
        <h2>About the ferry:</h2>
        <ul>
          <li>The crossing runs around three hours either side of high tide</li>
          <li>From the first of April to the end of October</li>
          <li>The ferry runs on demand - simply call us on 01326 231 357 or flip the sign down to call the ferryman</li>
          <li>Capacity is 6 people but we can simply return for larger parties</li>
          <li>The cost is £5 per person; dogs and luggage travel free</li> 
        </ul>

        <h2>Location</h2>
        <p>Gillan Creek, Helford River, Cornwall.</p>

        <div style={{ marginTop: "40px" }}>
          <a href={CONTACT_LINK} onClick={callIfPhone}>
            <button style={{
              padding: "14px 28px",
              backgroundColor: "#1e3a5f",
              color: "white",
              border: "none",
              borderRadius: "6px"
            }}>
              Contact us about the ferry
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
