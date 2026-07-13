"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// CTA that fires the Meta pixel "Lead" event, then routes into the studio.
export function CTA({ href, children, style }: { href: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <Link
      href={href}
      onClick={() => {
        try {
          window.fbq?.("track", "Lead");
        } catch {
          /* pixel not loaded — no-op */
        }
      }}
      style={style}
    >
      {children}
    </Link>
  );
}
