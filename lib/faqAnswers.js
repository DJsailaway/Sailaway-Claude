import { PRICING } from "../data/pricing";
import { boats } from "../components/BookingWizardV2/boats";
import { getFromPrice, formatPounds } from "./pricing";
import { PHONE_DISPLAY } from "./contact";

// FAQ answers that quote prices, boats or places are built from the same data the booking
// form uses (data/pricing.js and boats.js), so they stay correct when those files change.

const fromPrice = (ids) => {
  const p = getFromPrice(ids);
  return `${formatPounds(p.price)} for ${p.label}`;
};

const joinList = (items) =>
  items.length > 1
    ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
    : items[0] || "";

export const priceAnswer =
  `Prices depend on the boat and how long you hire it for. Motor boats start from ${fromPrice(["plymouth-pilot", "bass-boat"])}, ` +
  `sailing dinghies from ${fromPrice(["topaz", "pico", "topper"])}, and kayaks and paddleboards from ${fromPrice(["double-kayak", "single-kayak", "paddleboard"])}. ` +
  `Life jackets are included, and the booking form shows an estimated total as you go, before you send your request.`;

const twoHourBoats = boats
  .filter((b) => PRICING[b.id]?.minimumHire === "2h")
  .map((b) => b.title);

export const minimumHireAnswer = twoHourBoats.length
  ? `Most of our boats can be hired for a single hour. The ${joinList(twoHourBoats)} ${twoHourBoats.length > 1 ? "have" : "has"} a two-hour minimum.`
  : "Every one of our boats can be hired for a single hour.";

export const capacityAnswer =
  `Here is how many people each boat takes: ${boats.map((b) => `${b.title} (${b.capacity})`).join(", ")}.`;

const places = Object.entries(PRICING.locations || {}).filter(([name]) => name !== "St Anthony");
const placesByPrice = {};
places.forEach(([name, price]) => {
  if (!placesByPrice[price]) placesByPrice[price] = [];
  placesByPrice[price].push(name);
});
const deliveryGroups = Object.keys(placesByPrice)
  .map(Number)
  .sort((a, b) => b - a)
  .map((price) => `${joinList(placesByPrice[price])} ${price > 0 ? `for ${formatPounds(price)}` : "at no charge"}`);

export const deliveryAnswer =
  `For multi-day hire we can meet you at the boatyard or deliver your boat around the river: ${deliveryGroups.join("; ")}. You choose where when you book.`;

export const bookAheadAnswer =
  `In the school holidays especially, availability is often tight, so it\u2019s best to call us on ${PHONE_DISPLAY} before you head down.`;
