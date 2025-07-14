import Link from "next/link";

export const runtime = "edge"; // Must be configured for the Edge Runtime

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        404 - Not Found
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Return Home
        </a>
      </Link>
    </div>
  );
}
