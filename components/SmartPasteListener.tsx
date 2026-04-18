"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function SmartPasteListener() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only engage Smart Paste on the homepage or tools index
    if (pathname !== "/" && pathname !== "/tools") return;

    const handlePaste = (e: ClipboardEvent) => {
      // Don't intercept if they are actively typing in an input
      if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
        return;
      }

      const text = e.clipboardData?.getData("text")?.trim();
      if (!text) return;

      // 1. Check if valid JSON
      if ((text.startsWith("{") && text.endsWith("}")) || (text.startsWith("[") && text.endsWith("]"))) {
        try {
          JSON.parse(text);
          localStorage.setItem("toolstack_pipe_payload", text);
          router.push("/tools/json-formatter?pipe=true");
          return;
        } catch { /* not json */ }
      }

      // 2. Check if valid Base64
      const b64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      if (text.length > 10 && b64Regex.test(text.replace(/\\s/g, ""))) {
        localStorage.setItem("toolstack_pipe_payload", text);
        router.push("/tools/base64-encoder-decoder?pipe=true");
        return;
      }

      // 3. Check if SQL
      const upperText = text.toUpperCase();
      if (upperText.startsWith("SELECT ") || upperText.startsWith("UPDATE ") || upperText.startsWith("INSERT ") || upperText.startsWith("DELETE ") || upperText.startsWith("CREATE ")) {
        localStorage.setItem("toolstack_pipe_payload", text);
        router.push("/tools/sql-formatter?pipe=true");
        return;
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [pathname, router]);

  return null;
}
