import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar";
import {
  priceAnswer,
  minimumHireAnswer,
  capacityAnswer,
  deliveryAnswer,
  bookAheadAnswer
} from "../lib/faqAnswers";

export default function FAQPage() {
  const faqs = [
    {
      question: "Do I need a licence or experience to hire a boat on the Helford River?",
      answer:
        "No licence or previous experience is required. Our self-drive boats are designed for beginners, and we provide a full safety briefing before you set off so you feel confident on the water."
    },
    {
      question: "Is boat hire on the Helford River suitable for beginners?",
      answer:
        "Yes — the Helford River is one of the best places in Cornwall for beginners. The waters are sheltered and calm, and our boats are easy to operate with full instructions provided."
    },
    {
      question: "Where can I go when I hire a boat on the Helford River?",
      answer:
        "You can explore peaceful creeks, quiet anchorages, and hidden beaches along the Helford River. Popular areas include St Anthony, Frenchman’s Creek, and surrounding woodland inlets."
    },
    {
      question: "How long does it take to get to Frenchman’s Creek and the beaches?",
      answer:
        "From St Anthony, Eastern Cove takes about 10 minutes, Bosahan about half an hour, and Grebe or Durgan about 40 minutes. Frenchman’s Creek takes just under an hour."
    },
    {
      question: "Is the Helford River safe for boating and families?",
      answer:
        "Yes, the Helford River is one of Cornwall’s safest and most sheltered boating areas. It is ideal for families, beginners, and relaxed cruising."
    },
    {
      question: "Are life jackets provided with boat hire?",
      answer:
        "Yes, all safety equipment including life jackets is provided for every passenger as part of your boat hire."
    },
    {
      question: "What happens if the weather is bad on the day of my booking?",
      answer:
        "If the wind or weather makes your hire unsafe or impossible, we’ll refund it in full, or help you rebook if you’d rather. If gales take out a day or two of a multi-day hire, we’ll charge for the days the boat could actually be used, at our normal prices, rather than a share of the total. So a seven-day hire with two unusable days is charged as a five-day hire. Safety always comes first."
    },
    {
      question: "Do tides affect boat hire on the Helford River?",
      answer:
        "A little. The upper reaches of Gillan Creek and the pontoon at St Anthony can’t be reached at low tide, but you can hire at any state of the tide: we have deep-water moorings and motorised tenders to take you out to your boat. We’ll also guide you on the best times to go out so you get the most from your trip."
    },
    {
      question: "What should I bring for a day of boat hire?",
      answer:
        "We recommend bringing sun protection, warm layers, food and drinks, and a phone or camera. Comfortable clothing and non-slip footwear are best."
    },
    {
      question: "Can I bring my dog on a hire boat?",
      answer:
        "Yes, dogs are welcome on our hire boats. We don’t provide life jackets for dogs."
    },
    {
      question: "How do I book a boat on the Helford River?",
      answer:
        "You can request a booking through our online form. We will then confirm availability and help you choose the best boat and time for your trip."
    },
    {
      question: "Do I need to book in advance?",
      answer: bookAheadAnswer
    },
    {
      question: "How much does boat hire cost?",
      answer: priceAnswer
    },
    {
      question: "Is fuel included in the price?",
      answer:
        "Yes, fuel is included in the price of our motor boats. On longer hires we’ll come out and top up the tank for you."
    },
    {
      question: "How long can I hire a boat for?",
      answer:
        "We offer flexible hire durations including hourly, half-day, full-day, and multi-day hire options depending on your plans."
    },
    {
      question: "Is there a minimum hire time?",
      answer: minimumHireAnswer
    },
    {
      question: "How many people can each boat take?",
      answer: capacityAnswer
    },
    {
      question: "Are there age limits for hiring a boat?",
      answer:
        "Anyone under 18 must be supervised by a responsible adult."
    },
    {
      question: "Do the Wayfarer and Drascombe Longboat need sailing experience?",
      answer:
        "The Wayfarer does. The Drascombe Longboat can also be used as a motor boat, and if you’re using it that way you don’t need any sailing experience."
    },
    {
      question: "Do you run sailing lessons?",
      answer:
        "Not at the moment, no."
    },
    {
      question: "How does payment work?",
      answer:
        "You don\u2019t pay when you send your request. Once we\u2019ve confirmed your booking, we take a deposit of one third of the cost, with the remainder due a week before your hire starts. If your hire is due to start within the next fortnight, we\u2019ll take payment in full over the phone."
    },
    {
      question: "Can you deliver a boat to where I\u2019m staying?",
      answer: deliveryAnswer
    },
    {
      question: "Where are you based, and is there parking?",
      answer:
        "We\u2019re at The Boathouse, St Anthony, Helston, Cornwall, TR12 6JW, on Gillan Creek. There is an on-site car park a short walk from the water. Our Location page has directions and a map."
    },
    {
      question: "Are there toilets for hire customers?",
      answer:
        "Yes, toilets are available for our hire customers."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // JSON-LD structured data for Google (IMPORTANT FOR SEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Boat Hire FAQs Helford River | Self Drive Boats Cornwall</title>
        <meta
          name="description"
          content="Frequently asked questions about boat hire on the Helford River, Cornwall. No licence needed, beginner friendly, safe family boating."
        />

        {/* SEO SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <Navbar />

      {/* HERO BANNER */}
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src="/faq-banner.jpg"
          alt="Helford River boat hire FAQ banner"
          style={{
            width: "100%",
            height: "auto",
            display: "block"
          }}
        />

        {/* Heading over image (NO dark overlay as requested) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50px",
          transform: "translateY(-50%)",
          color: "white",
          textShadow: "0 2px 10px rgba(0,0,0,0.6)",
          maxWidth: "600px"
        }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
            Boat Hire FAQs – Helford River
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            Everything you need to know before your day on the water
          </p>
        </div>
      </div>

      {/* FAQ CONTENT */}
      <div style={{ fontFamily: "sans-serif", padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>

        <p style={{ marginBottom: "30px" }}>
          Below are answers to common questions about boat hire on the Helford River.
          If you need more help, we’re always happy to chat before your booking.
        </p>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "15px" }}>
              <h2
                onClick={() => toggleFAQ(index)}
                style={{
                  cursor: "pointer",
                  color: "#1e3a5f",
                  fontSize: "1.1rem",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </h2>

              {openIndex === index && (
                <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
