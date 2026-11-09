import { Resend } from "resend";
import { calculateDeposit } from "../../lib/pricing";

const resend = new Resend(process.env.RESEND_API_KEY);

const mapUrl =
  "https://sailaway-claude.vercel.app/helford-river-map.png";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
        const {
      name,
      email,
      phone,
      notes,
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

const { deposit, remainder } = calculateDeposit(total);

const emailContent = `
NEW BOOKING REQUEST

CUSTOMER DETAILS
${name}
${phone}
${email}


BOOKING DETAILS
${bookings.map((b) => `${b.boat} (${b.category})`).join(", ")}
Start time: ${time}
Date: ${date}
Duration: ${bookings.map((b) => b.isMultiDay ? `${b.days} days` : b.duration).join(", ")}
Starting place: ${location}


PAYMENT
Total: £${Number(total).toFixed(2)}
Deposit: £${deposit.toFixed(2)}
Remaining balance: £${remainder.toFixed(2)}


CUSTOMER NOTES
${notes?.trim() || "No additional notes supplied."}
`;

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

    const bookingRows = bookings
      .map((b, i) => `
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e8e5df;">
            <strong>${bookings.length > 1 ? `Boat ${i + 1}: ` : ""}${escapeHtml(b.boat)}</strong>
          </td>
        </tr>
      `)
      .join("");

    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #f3f1ec; font-family: Arial, Helvetica, sans-serif; color: #333333;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f1ec; padding: 30px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="background-color: #102d40; padding: 38px 20px 32px;">
              <div style="font-family: Georgia, serif; font-size: 36px; letter-spacing: 5px; color: #ffffff;">
                SAILAWAY
              </div>
              <div style="font-size: 13px; letter-spacing: 5px; color: #d8c9a5; margin-top: 8px;">
                ST ANTHONY
              </div>
            </td>
          </tr>

          <!-- MAIN CONTENT -->
          <tr>
            <td style="padding: 38px 35px 25px;">

              <h1 style="font-family: Georgia, serif; font-size: 25px; font-weight: normal; color: #173b50; margin: 0 0 22px;">
                Dear ${escapeHtml(name)}
              </h1>

              <p style="font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
                Thank you for your request to hire a
                <strong>${bookings.map((b) => escapeHtml(b.boat)).join(", ")}</strong>
                for ${bookings.map((b) => escapeHtml(b.isMultiDay ? `${b.days} days` : b.duration)).join(", ")}.
              </p>

              <p style="font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
                We've received your booking request and will check the tides and availability before giving you a call to confirm the final details.
              </p>

              <h2 style="font-family: Georgia, serif; font-size: 20px; font-weight: normal; color: #173b50; margin: 0 0 15px;">
                Your booking details
              </h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf9f6; border: 1px solid #e8e5df;">
                <tr>
                  <td style="padding: 12px 15px; border-bottom: 1px solid #e8e5df;">
                    <span style="color: #777777; font-size: 12px; text-transform: uppercase;">Date</span>
                    <br>
                    <strong>${escapeHtml(date)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; border-bottom: 1px solid #e8e5df;">
                    <span style="color: #777777; font-size: 12px; text-transform: uppercase;">Start time</span>
                    <br>
                    <strong>${escapeHtml(time)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; border-bottom: 1px solid #e8e5df;">
                    <span style="color: #777777; font-size: 12px; text-transform: uppercase;">Meeting location</span>
                    <br>
                    <strong>${escapeHtml(location)}</strong>
                  </td>
                </tr>
                ${bookingRows}
                <tr>
                  <td style="padding: 16px 15px; background-color: #f0eee8;">
                    <span style="font-size: 12px; color: #777777; text-transform: uppercase;">Total hire cost</span>
                    <br>
                    <strong style="font-size: 22px; color: #173b50;">£${Number(total).toFixed(2)}</strong>
                  </td>
                </tr>
              </table>

              <h2 style="font-family: Georgia, serif; font-size: 20px; font-weight: normal; color: #173b50; margin: 30px 0 15px;">
                Payment information
              </h2>

              <p style="font-size: 14px; line-height: 1.7; margin: 0 0 18px;">
                Once your booking is confirmed, we'll take a deposit of one third of the total cost, with the remaining balance due a week before your hire commences.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf9f6; border: 1px solid #e8e5df;">
                <tr>
                  <td style="padding: 14px 15px; border-bottom: 1px solid #e8e5df;">
                    <span style="font-size: 13px; color: #777777;">Deposit payable on confirmation</span>
                    <br>
                    <strong style="font-size: 20px; color: #173b50;">£${deposit.toFixed(2)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 15px;">
                    <span style="font-size: 13px; color: #777777;">Remaining balance</span>
                    <br>
                    <strong style="font-size: 20px; color: #173b50;">£${remainder.toFixed(2)}</strong>
                    <br>
                    <span style="font-size: 12px; color: #777777;">Due one week before your hire commences</span>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; line-height: 1.7; color: #666666; margin: 18px 0 28px;">
                If your hire is due to commence within the next fortnight, we'll instead take payment in full over the phone.
              </p>

              <img
                src="cid:helford-river-map"
                alt="Map of the Helford River"
                width="530"
                style="display: block; width: 100%; max-width: 530px; height: auto; border: 0; margin: 0 auto 28px;"
              >

              <p style="font-size: 14px; line-height: 1.7; margin: 0 0 18px;">
                In the meantime, take a moment to have a look at our
                <a href="https://sailawaystanthony.co.uk/boat-hire-faq" style="color: #173b50;">FAQs</a>.
              </p>

              <p style="font-size: 14px; line-height: 1.7; margin: 0;">
                If you'd like to get in touch, please give us a call on
                <strong>01326 231 357</strong>.
              </p>

              <p style="font-size: 15px; line-height: 1.7; margin: 28px 0 0;">
                We look forward to getting you afloat!
                <br><br>
                Yours sincerely,<br>
                <strong>The Sailaway Team</strong>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="background-color: #102d40; padding: 26px 20px;">
              <div style="font-size: 12px; letter-spacing: 2px; color: #d8c9a5;">
                SAILAWAY ST ANTHONY
              </div>
              <div style="font-size: 12px; color: #ffffff; margin-top: 10px;">
                HELFORD RIVER · CORNWALL
              </div>
              <div style="font-size: 13px; color: #ffffff; margin-top: 16px;">
                01326 231 357
              </div>
              <div style="font-size: 12px; margin-top: 8px;">
                <a href="https://sailawaystanthony.co.uk/" style="color: #d8c9a5; text-decoration: none;">
                  sailawaystanthony.co.uk
                </a>
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
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
      text: customerEmailContent,
      html: customerEmailHtml
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
