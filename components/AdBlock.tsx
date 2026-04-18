import React from "react";

interface AdBlockProps {
  type: "horizontal" | "vertical" | "square";
  label?: string;
}

export function AdBlock({ type, label = "Sponsored" }: AdBlockProps) {
  const styles: Record<string, React.CSSProperties> = {
    horizontal: {
      width: "100%",
      height: 120,
      background: "rgba(255,255,255,0.02)",
      border: "1px dashed rgba(255,255,255,0.1)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 8,
      margin: "32px 0",
    },
    vertical: {
      width: 300,
      height: 600,
      background: "rgba(255,255,255,0.02)",
      border: "1px dashed rgba(255,255,255,0.1)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 12,
    },
    square: {
      width: "100%",
      aspectRatio: "1/1",
      maxHeight: 300,
      background: "rgba(255,255,255,0.02)",
      border: "1px dashed rgba(255,255,255,0.1)",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 12,
    },
  };

  return (
    <div style={styles[type]} className="ad-container">
      <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </span>
      <div style={{ padding: "0 20px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0, fontWeight: 500 }}>
          Advertisement Space
        </p>
      </div>
    </div>
  );
}
