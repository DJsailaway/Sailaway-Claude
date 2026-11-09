export default function ReviewBooking({
  reviewData,
  onEditStep,
  onSubmitRequest,
  submissionStatus,
}) {
  if (!reviewData) {
    return null;
  }

  const {
    boat,
    duration,
    durationMode,
    durationKey,
    days,
    date,
    startTime,
    meetingPlace,
    customer,
    price,
  } = reviewData;

  return (
   <div
    style={{
      background: "#F8FAFC",
      padding: "8px 20px",
    }}
  >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: "0 0 6px",
            color: "#123B5D",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          Review your booking
        </h1>

<div
  style={{
    background: "white",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "16px",
  }}
>
  <Row
  label="Boat"
  value={boat}
  onChange={() => onEditStep(0)}
/>

<Row
  label="Duration"
  value={
    duration ||
    (durationKey === "multi"
      ? `${days} Days`
      : durationKey)
  }
  onChange={() => onEditStep(2)}
/>

<Row
  label="Meeting time"
  value={`${date} · ${startTime}`}
  onChange={() => onEditStep(3)}
/>

<Row
  label="Meet at"
  value={meetingPlace}
  onChange={
    durationMode === "multiday" && days >= 2
      ? () => onEditStep(4)
      : undefined
  }
  noBorder
/>

  <Divider />


<Row
  label="Name"
  value={customer?.name}
  onChange={() => onEditStep(5)}
/>

<Row
  label="Email"
  value={customer?.email}
  onChange={() => onEditStep(5)}
/>

<Row
  label="Phone"
  value={customer?.phone}
  onChange={() => onEditStep(5)}
  noBorder 
/>


{customer?.notes && (
  <>
    <Divider />

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "6px 0",
      }}
    >
      <span
        style={{
          color: "#64748B",
          flexShrink: 0,
        }}
      >
        Notes
      </span>

      <span
        style={{
          color: "#334155",
          fontWeight: 500,
          textAlign: "right",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "65%",
        }}
        title={customer.notes}
      >
        {customer.notes}
      </span>
    </div>
  </>
)}


  {price?.hasPrice && (
      <Row
        label="Total"
        value={`£${price.total}`}
        highlight
        noBorder
      />
    )}

</div>

<button
  onClick={onSubmitRequest}
  disabled={submissionStatus === "sending"}
  style={{
    width: "100%",
    padding: "16px",
    marginTop: "8px",
    border: "none",
    borderRadius: "14px",
    background: submissionStatus === "sending" ? "#64748B" : "#123B5D",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 600,
    cursor: submissionStatus === "sending" ? "wait" : "pointer",
    opacity: submissionStatus === "sending" ? 0.8 : 1
  }}
>
  {submissionStatus === "sending"
    ? "Sending request..."
    : "Send booking request"}
</button>

{submissionStatus === "error" && (
  <p
    style={{
      color: "#B91C1C",
      fontSize: "14px",
      textAlign: "center",
      marginTop: "12px"
    }}
  >
    Sorry, we couldn't send your request just now. Please try again or call us on 01326 231 357.
  </p>
)}
          
      </div>
    </div>
  );
}


function Section({ title, children }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "14px",
        marginBottom: "12px",
      }}
    >
      <h2
        style={{
          margin: "0 0 14px",
          color: "#123B5D",
          fontSize: "18px",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}


function Row({ label, value, highlight, noBorder, onChange }) 
{ return (  
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "6px 0",
        borderBottom: noBorder
          ? "none"
          : "1px solid #F1F5F9",
      }}
    >
      <span
        style={{
          color: "#64748B",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: highlight ? "#123B5D" : "#334155",
          fontWeight: highlight ? 700 : 500,
          textAlign: "right",
        }}
      >
{value || "-"}

{onChange && (
  <button
    onClick={onChange}
    style={{
      marginLeft: "12px",
      border: "1px solid #123B5D",
      background: "#FFFFFF",
      color: "#123B5D",
      fontWeight: 600,
      fontSize: "13px",
      cursor: "pointer",
      padding: "4px 10px",
      borderRadius: "999px",
      transition: "all .2s ease",
      whiteSpace: "nowrap"
    }}
  >
    Change
  </button>
)}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid #E5E7EB",
        margin: "8px 0",
      }}
    />
  );
}
