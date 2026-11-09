import { Resend } from "resend";
import { calculateDeposit } from "../../lib/pricing";

const resend = new Resend(process.env.RESEND_API_KEY);

const mapUrl =
  "https://sailaway-claude.vercel.app/helford-river-map.png";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
        const {
      name,
      email,
      phone,
      bookings,
      date,
      time,
      total,
      location
    } = req.body;

    // Format boat breakdown
    const bookingDetails = bookings
      .map((b, i) => {
        return `
Boat ${i + 1}
--------------------
Boat: ${b.boat}
Category: ${b.category}
Duration: ${b.isMultiDay ? `${b.days} days` : b.duration}
`;
      })
      .join("\n");

          const emailContent = `
NEW BOOKING REQUEST

========================

CUSTOMER DETAILS
Name: ${name}
Email: ${email}
Phone: ${phone}

DATE: ${date}
START TIME: ${time}

LOCATION
${location}

BOOKING DETAILS
${bookingDetails}

TOTAL PRICE: £${total}

========================
`;

        const { deposit, remainder } = calculateDeposit(total);

        const customerEmailContent = `
Dear ${name},

Thank you for your request to hire ${bookings.map((b) => b.boat).join(", ")} for ${bookings.map((b) => b.isMultiDay ? `${b.days} days` : b.duration).join(", ")} on ${date}, meeting at ${location} at ${time}.

We'll check the tides and availability and give you a call to confirm the final details as soon as we can.

Once your booking is confirmed, we'll take one third (£${deposit.toFixed(2)}) of the cost as a deposit, with the remainder (£${remainder.toFixed(2)}) due a week before the hire commences. If your hire is due to commence within the next fortnight, we'll instead take payment in full over the phone.

Please take a moment to have a look at our FAQs:
https://sailawaystanthony.co.uk/boat-hire-faq

If you'd like to get in touch, please give us a call on 01326 231 357.

We look forward to getting you afloat!

Yours sincerely,
The Sailaway Team
`;

    const businessEmail = await resend.emails.send({
      from: "Sailaway Bookings <onboarding@resend.dev>",
      to: "david@stanthony.co.uk",
      subject: "New Boat Booking Request",
      text: emailContent
    });

    if (businessEmail.error) {
      throw new Error(businessEmail.error.message);
    }

    const customerEmail = await resend.emails.send({
      from: "Sailaway Bookings <onboarding@resend.dev>",
      to: email,
      subject: "We've received your boat hire request",
      text: customerEmailContent
    });

    if (customerEmail.error) {
      throw new Error(customerEmail.error.message);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send booking email" });
  }
}
