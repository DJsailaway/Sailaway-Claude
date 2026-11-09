import { PRICING } from "../data/pricing";

export function calculatePrice({
  boatId,
  durationType,
  durationKey,
  days = 1,
  location = "St Anthony"
}) {

const pricing = PRICING[boatId];

if (!pricing) {
  return {
    hasPrice: false,
    hire: 0,
    delivery: 0,
    total: 0,
    boatName: "",
    duration: "",
    lines: []
  };
}

  let hire = 0;
  let duration = "";

  if (durationType === "hourly") {

    hire = pricing.hourly?.[durationKey] ?? 0;

    const labels = {
      "1h": "1 Hour Hire",
      "2h": "2 Hour Hire",
      half: "Half Day Hire",
      full: "Full Day Hire"
    };

    duration = labels[durationKey];

  } else {

    if (days <= 7) {
      hire = pricing.multiDay?.[days] ?? 0;
    } else {
      hire =
        (pricing.multiDay?.[7] ?? 0) +
        ((days - 7) * (pricing.extraDay ?? 0));
    }

    duration = `${days} Day Hire`;
  }

  const delivery =
    PRICING.locations?.[location] ?? 0;

  const total =
    hire + delivery;

  return {

    hasPrice: true,

    boatName: boatId,

    duration,

    hire,

    delivery,

    total,

    lines: [

      {
        label: "Hire",
        value: hire
      },

      {
        label: "Delivery",
        value: delivery
      }

    ]

  };

}


// Splits a total into a one-third deposit and the remainder, to the nearest penny.
// Works in pence so floating-point errors can't creep in, and the remainder is
// calculated by subtraction so the two amounts always add up to the total exactly.
export function calculateDeposit(total) {
  const totalPence = Math.round(Number(total) * 100);

  if (!Number.isFinite(totalPence)) {
    return { deposit: 0, remainder: 0 };
  }

  const depositPence = Math.round(totalPence / 3);
  const remainderPence = totalPence - depositPence;

  return {
    deposit: depositPence / 100,
    remainder: remainderPence / 100
  };
}


// ---------------------------------------------------------------------------
// Helpers for hourly hire lengths and the "From £x" figures on the boat pages.
// Everything is read from data/pricing.js, so changing a price (or a boat's
// minimumHire) there updates the wizard and the boat pages together.
// ---------------------------------------------------------------------------

const HOURLY_KEYS = ["1h", "2h", "half", "full"];

const HOURLY_LABELS = {
  "1h": "1 hour",
  "2h": "2 hours",
  half: "a half day",
  full: "a full day"
};

// The hourly hire lengths a boat can be booked for, shortest first.
// A boat with minimumHire: "2h" in data/pricing.js has no 1-hour option.
export function getAvailableHourlyKeys(boatId) {
  const pricing = PRICING[boatId];
  if (!pricing?.hourly) return [];

  const start = Math.max(0, HOURLY_KEYS.indexOf(pricing.minimumHire ?? "1h"));

  return HOURLY_KEYS.slice(start).filter((key) => pricing.hourly[key] != null);
}

// Cheapest way to hire a boat, e.g. { price: 88, label: "1 hour" }.
// Pass one boat id, or a list of ids to get the cheapest of them.
export function getFromPrice(boatIds) {
  const ids = Array.isArray(boatIds) ? boatIds : [boatIds];
  let cheapest = null;

  for (const id of ids) {
    const key = getAvailableHourlyKeys(id)[0];
    if (!key) continue;

    const price = PRICING[id].hourly[key];

    if (cheapest === null || price < cheapest.price) {
      cheapest = { price, label: HOURLY_LABELS[key] };
    }
  }

  return cheapest;
}

export function formatPounds(amount) {
  return Number.isInteger(amount) ? `£${amount}` : `£${amount.toFixed(2)}`;
}
