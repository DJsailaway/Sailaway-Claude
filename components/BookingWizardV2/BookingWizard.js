import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { boats } from "./boats";

import StepHeader from "./StepHeader";
import WizardLayout from "./WizardLayout";
import BottomActionBar from "./BottomActionBar";
import PriceSummary from "./PriceSummary";
import ActivityCard from "./ActivityCard";
import BoatStep from "./steps/BoatStep";
import DurationStep from "./steps/DurationStep";
import DateStep from "./steps/DateStep";
import LocationStep from "./steps/LocationStep";
import ContactStep from "./steps/ContactStep";
import { calculatePrice, getAvailableHourlyKeys } from "../../lib/pricing";
import ReviewBooking from "./ReviewBooking";

export default function BookingWizard() {
const [activity, setActivity] = useState(null);
const [selectedBoat, setSelectedBoat] = useState(null);
const [currentStep, setCurrentStep] = useState(0);

const [mode, setMode] = useState("wizard"); // "wizard" | "review" | "confirm"
const [returnToReview, setReturnToReview] = useState(false);

const [stepDirection, setStepDirection] = useState("forward");

const editStep = (step) => {
  setReturnToReview(true);
  setMode("wizard");
  setCurrentStep(step);

  setTimeout(() => {
    if (isMobile) {
      window.scrollTo({
        top: document.getElementById("booking-wizard")?.offsetTop,
        behavior: "instant",
      });
    } else {
      document
        .getElementById("booking-wizard")
        ?.scrollIntoView({
          block: "start",
          behavior: "instant",
        });
    }
  }, 0);
};
const [durationMode, setDurationMode] = useState(null);
const [durationKey, setDurationKey] = useState("2h");
const [hasSelectedDuration, setHasSelectedDuration] = useState(false);
const [hasSelectedPlace, setHasSelectedPlace] = useState(false);
const [days, setDays] = useState(7);

const [bookingDate, setBookingDate] = useState("");
const [startTime, setStartTime] = useState("");

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => {
    setIsMobile(window.innerWidth < 768);
  };

  check();

  window.addEventListener("resize", check);

  return () => window.removeEventListener("resize", check);
}, []);

// Lets other pages link straight into the wizard, e.g.
//   /?boat=bass-boat#booking-wizard     (boat chosen, starts at "length")
//   /?activity=paddle#booking-wizard    (starts at the list of kayaks/SUPs)
const router = useRouter();

useEffect(() => {
  if (!router.isReady) return;

  const { boat: boatId, activity: activityId } = router.query;
  const boat = boats.find((b) => b.id === boatId);

  if (boat) {
    setActivity(boat.activity);
    setSelectedBoat(boat);
    setCurrentStep(2);
  } else if (["motor", "sailing", "paddle"].includes(activityId)) {
    setActivity(activityId);
    setCurrentStep(1);
  }
}, [router.isReady]);

const [place, setPlace] = useState({
  mode: "boatyard",
  location: "St Anthony",
  shortTitle: "St Anthony",
  deliveryCharge: 0
});

const requiresDeliveryStep =
  durationMode === "multiday" &&
  days >= 2;

const getDurationLabel = () => {
  if (!hasSelectedDuration) {
    return "Length";
  }

  if (durationMode === "multiday") {
    return `${days} Days`;
  }

  if (durationKey === "1h") {
    return "1 Hour";
  }

  if (durationKey === "2h") {
    return "2 Hours";
  }

  if (durationKey === "half") {
    return "Half Day";
  }

  if (durationKey === "full") {
    return "Full Day";
  }

  return "Length";
};

const truncateLabel = (text, maxLength = 15) => {
  if (!text) return "";

  return text.length > maxLength
    ? `${text.slice(0, maxLength)}…`
    : text;
};

const getDateLabel = () => {
  if (!bookingDate) {
    return "Date";
  }

  const date = new Date(bookingDate);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
};

const getPlaceLabel = () => {
  if (!hasSelectedPlace) {
  return "St Anthony in Meneage";
}
  if (!place.location) {
    return "Place";
  }

  if (place.location === "Other") {
    return truncateLabel(place.customLocation || "Place");
  }

  return truncateLabel(place.shortTitle || place.location);
};

const progressSteps = [
  {
    key: "boat",
    label: selectedBoat?.shortTitle || "Boat"
  },
  {
    key: "duration",
    label: getDurationLabel()
  },
  {
  key: "date",
  label: getDateLabel()
  },
  ...(requiresDeliveryStep
    ? [
        {
          key: "location",
          label: getPlaceLabel()
        }
      ]
    : []),
  {
    key: "details",
    label: "You"
  }
];

let progressStep;

if (currentStep <= 1) {
  // Activity + Boat screens = Boat decision
  progressStep = 0;

} else if (currentStep === 2) {
  // Length
  progressStep = 1;

} else if (currentStep === 3) {
  // Date
  progressStep = 2;

} else if (requiresDeliveryStep) {
  // Multi-day journey
  progressStep = currentStep === 4 ? 3 : 4;

} else {
  // Hourly journey (Place skipped)
  progressStep = 3;
}
  
const [customer, setCustomer] = useState({
  name: "",
  email: "",
  phone: "",
  notes: ""
});

const [customerErrors, setCustomerErrors] = useState({});

const [submissionStatus, setSubmissionStatus] = useState("idle");

const handleSubmitRequest = async () => {
  setSubmissionStatus("sending");

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        bookings: [
          {
            boat: selectedBoat?.title || "",
            category: activity || "",
            isMultiDay: durationMode === "multiday",
            days,
            duration: getDurationLabel()
          }
        ],
        date: bookingDate,
        time: reviewData.startTime,
        total: price.total,
        location: getPlaceLabel()
      })
    });

    if (!response.ok) {
      throw new Error("Booking request failed");
    }

    setSubmissionStatus("success");

  } catch (error) {
    console.error("Booking submission error:", error);
    setSubmissionStatus("error");
  }
};

const validateCustomer = () => {
  const errors = {};

  if (!customer.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (!customer.email.match(/^\S+@\S+\.\S+$/)) {
    errors.email = "Please enter a valid email address";
  }

  const phoneDigits = customer.phone.replace(/\D/g, "");

  if (phoneDigits.length < 10) {
    errors.phone = "Please enter a valid telephone number";
  }

  setCustomerErrors(errors);

  return Object.keys(errors).length === 0;
};

const inputStyle = {
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #E5E7EB",
  fontSize: "1rem",
  outline: "none",
  color: "#123B5D"
};
  
const price = hasSelectedDuration
  ? calculatePrice({
      boatId: selectedBoat?.id,
      durationType: durationMode,
      durationKey,
      days,
      location: place.location
    })
  : {
      hasPrice: false,
      total: 0
    };

console.log(price);

const reviewData = {
  boat: selectedBoat?.title || "",
  duration: getDurationLabel(),
  durationMode,
  durationKey,
  days,
  date: getDateLabel(),
  startTime:
  durationKey === "full"
    ? "09:00"
    : durationKey === "half"
      ? startTime === "13:00"
        ? "13:00"
        : "09:00"
      : startTime,
  meetingPlace: getPlaceLabel(),

  customer: {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    notes: customer.notes
  },

  price
};
  
return (
  <div
    id="booking-wizard-inner"
    style={{
  height: "100dvh",

  display: "flex",
  flexDirection: "column",

  overflow: "hidden"
}}
  >

<style jsx>{`
  @keyframes slideForward {
    from {
      opacity: 0;
      transform: translateX(56px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideBack {
    from {
      opacity: 0;
      transform: translateX(-56px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`}</style>
    
<WizardLayout
  reviewMode={mode === "review"}
header={
  mode === "wizard" ? (
    <StepHeader
      progressStep={progressStep}
      progressSteps={progressSteps}
      onStepClick={(step) => {
        if (step === "boat") setCurrentStep(0);
        if (step === "duration") setCurrentStep(2);
        if (step === "date") setCurrentStep(3);
        if (step === "location") setCurrentStep(4);
        if (step === "details") setCurrentStep(5);
      }}
    />
  ) : (
    <div style={{ height: 0 }} />
  )
}

    footer={
    mode !== "review" ? (
      <BottomActionBar
      onBack={() => {
        setStepDirection("back");
        setCurrentStep(Math.max(0, currentStep - 1));
      }}
      nextLabel={returnToReview ? "Return to Review" : "Next"}
      onNext={() => {

  if (returnToReview) {

    if (currentStep === 5 && !validateCustomer()) {
      return;
    }

    setReturnToReview(false);
    setMode("review");

    setTimeout(() => {
      if (isMobile) {
        window.scrollTo({
          top: document.getElementById("booking-wizard")?.offsetTop,
          behavior: "instant"
        });
      } else {
        document
          .getElementById("booking-wizard")
          ?.scrollIntoView({
            block: "start",
            behavior: "instant"
          });
      }
    }, 0);

    return;
  }

if (currentStep === 5) {

  if (!validateCustomer()) {
    return;
  }

  setMode("review");

    setTimeout(() => {
      if (isMobile) {
        window.scrollTo({
          top: document.getElementById("booking-wizard")?.offsetTop,
          behavior: "instant"
        });
      } else {
        document
          .getElementById("booking-wizard")
          ?.scrollIntoView({
            block: "start",
            behavior: "instant"
          });
      }
    }, 0);

    return;
  }

  if (currentStep === 3 && !requiresDeliveryStep) {

    setPlace({
      mode: "boatyard",
      location: "St Anthony",
      deliveryCharge: 0
    });

    setCurrentStep(5);

  } else {

    setStepDirection("forward");

    setCurrentStep((prev) => {
      const maxStep = requiresDeliveryStep ? 5 : 4;
      return Math.min(maxStep, prev + 1);
    });

  }
}}
      total={
        price.hasPrice
          ? `£${price.total}`
          : "£0"
      }
      />
    ) : null
  }
>
{mode === "review" ? (
<div
  style={{
    height: "100%"
  }}
>
  <ReviewBooking
  reviewData={reviewData}
  onEditStep={editStep}
  onSubmitRequest={handleSubmitRequest}
  submissionStatus={submissionStatus}
/>
{submissionStatus === "success" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15, 23, 42, 0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "32px 24px",
        width: "100%",
        maxWidth: "440px",
        textAlign: "center",
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#DCFCE7",
          color: "#15803D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          margin: "0 auto 20px"
        }}
      >
        ✓
      </div>

      <h2
        style={{
          color: "#123B5D",
          fontSize: "24px",
          margin: "0 0 16px"
        }}
      >
        Thank you for your request!
      </h2>

      <p
        style={{
          color: "#475569",
          fontSize: "15px",
          lineHeight: 1.7
        }}
      >
        Your boat hire request has been sent to us, and we've also sent a confirmation email to your inbox with all the details for your records.
      </p>

      <p
        style={{
          color: "#475569",
          fontSize: "15px",
          lineHeight: 1.7
        }}
      >
        We'll be in touch as soon as we can to check availability, confirm the details and get you afloat!
      </p>

      <p
        style={{
          color: "#123B5D",
          fontWeight: 600,
          margin: "20px 0"
        }}
      >
        The Sailaway Team
      </p>

      <button
        onClick={() => {
  window.location.href = "/";
}}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "12px",
          background: "#123B5D",
          color: "#FFFFFF",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Done
      </button>
    </div>
  </div>
)}
</div>
) : (
<div
  key={`${currentStep}-${stepDirection}`}
  style={{
    animation:
      stepDirection === "forward"
        ? "slideForward 480ms cubic-bezier(0.22, 1, 0.36, 1)"
        : "slideBack 480ms cubic-bezier(0.22, 1, 0.36, 1)",
    height: "100%"
  }}
>

  {currentStep === 0 && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#123B5D",
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "6px"
          }}
        >
          Plan your time on the Helford
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "12px",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#64748B"
          }}
        >
          How would you like to explore?
        </p>
      </div>

      <ActivityCard
        title="Explore by motor boat"
        description="Comfortable and flexible for families"
        image="/images/wizard/motorboat.jpg"
        onClick={() => {
          setActivity("motor");
          setSelectedBoat(null);
          setCurrentStep(1);
        }}
      />

      <ActivityCard
        title="Go sailing"
        description="Traditional and hands-on"
        image="/images/wizard/sailing.jpg"
        onClick={() => {
          setActivity("sailing");
          setSelectedBoat(null);
          setCurrentStep(1);
        }}
      />

      <ActivityCard
        title="Paddle the creeks"
        description="Quiet and close to nature"
        image="/images/wizard/paddle.jpg"
        onClick={() => {
          setActivity("paddle");
          setSelectedBoat(null);
          setCurrentStep(1);
        }}
      />
    </div>
  )}

{currentStep === 1 && (
  <BoatStep
    activity={activity}
    selectedBoat={selectedBoat}
    onSelect={(boat) => {
      setSelectedBoat(boat);

      // If this boat has a longer minimum hire (e.g. 2 hours), don't leave an
      // unavailable length selected from an earlier choice
      const availableKeys = getAvailableHourlyKeys(boat.id);
      if (availableKeys.length && !availableKeys.includes(durationKey)) {
        setDurationKey(availableKeys[0]);
      }

      if (returnToReview) {
        setReturnToReview(false);
        setMode("review");

        setTimeout(() => {
          if (isMobile) {
            window.scrollTo({
              top: document.getElementById("booking-wizard")?.offsetTop,
              behavior: "instant"
            });
          } else {
            document
              .getElementById("booking-wizard")
              ?.scrollIntoView({
                block: "start",
                behavior: "instant"
              });
          }
        }, 0);

        return;
      }

      setStepDirection("forward");
      setCurrentStep(2);
    }}
  />
)}

{currentStep === 2 && (
<DurationStep
  activity={activity}
  boatId={selectedBoat?.id}
  value={{
    durationMode,
    durationKey,
    days
  }}
onChange={(patch) => {
  if (patch.durationMode !== undefined) {
    setDurationMode(patch.durationMode);
    setHasSelectedDuration(true);
  }

  if (patch.durationKey !== undefined) {
    setDurationKey(patch.durationKey);
    setHasSelectedDuration(true);
  }

  if (patch.days !== undefined) {
    setDays(patch.days);
    setHasSelectedDuration(true);

  if (patch.durationMode !== undefined) {
  setDurationMode(patch.durationMode);

  if (patch.durationMode !== "multiday") {
    setDays(0);
  }

  setHasSelectedDuration(true);
}

  if (patch.durationMode !== undefined) {
  setDurationMode(patch.durationMode);

  if (patch.durationMode !== "multiday") {
    setDays(0);
  }

  setHasSelectedDuration(true);
}  
  }
}}
/>
)}

    {currentStep === 3 && (
  <DateStep
    durationMode={durationMode}
    durationKey={durationKey}
    days={days}
    value={{
      date: bookingDate,
      startTime
    }}
    onChange={(patch) => {
      if (patch.date) {
        setBookingDate(patch.date);
      }

      if (patch.startTime) {
        setStartTime(patch.startTime);
      }
    }}
  />
)}

{requiresDeliveryStep && currentStep === 4 && (
  <LocationStep
    value={place}
    onChange={(patch) => {
      setHasSelectedPlace(true);
      setPlace((prev) => ({
        ...prev,
        ...patch
      }));
    }}
  />
)}

{currentStep === 5 && (
  <ContactStep
    value={customer}
    errors={customerErrors}
    onChange={(patch) => {
      setCustomer((prev) => ({
        ...prev,
        ...patch
      }));
    }}
  />
)}
  </div>
)}

</WizardLayout>

    </div>
  );
}
