"use client";

import { usePathname } from "next/navigation";

// Hides the ToolStack site chrome (Navbar / Footer) on brand sections like
// Mindwire and The Markup, so each feels like its own site.
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && (pathname.startsWith("/mindwire") || pathname.startsWith("/the-markup"))) return null;
  return <>{children}</>;
}
