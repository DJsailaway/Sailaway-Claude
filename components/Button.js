import Link from "next/link";

export default function Button({ href, children, variant = "primary" }) {
  const styles = {
    padding: "14px 28px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    border: "none",
    display: "inline-block",
    textDecoration: "none"
  };

  const variants = {
    primary: {
      backgroundColor: "#1e3a5f",
      color: "white"
    },
    secondary: {
      backgroundColor: "white",
      color: "#1e3a5f",
      border: "2px solid #1e3a5f"
    }
  };

  const style = { ...styles, ...variants[variant] };

  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button style={style}>
      {children}
    </button>
  );
}
