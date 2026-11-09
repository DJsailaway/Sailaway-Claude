export default function WizardLayout({
  header,
  children,
  footer,
  reviewMode
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        height: "100%",

        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",

        display: "grid",
        gridTemplateRows: "auto 1fr auto"
      }}
    >
      {header}

      <div
        style={{
          minHeight: 0,
          height: "100%"
        }}
      >
        {children}
      </div>

      {footer}
    </div>
  );
}
