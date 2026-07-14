"use client";

import { usePathname } from "next/navigation";

// Hides the ToolStack site chrome (Navbar / Footer) on the Mindwire brand section,
// so /mindwire feels like its own site.
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/mindwire")) return null;
  return <>{children}</>;
}
