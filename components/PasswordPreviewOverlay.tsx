"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function PasswordPreviewOverlay() {
    const [pwd, setPwd] = useState<string>("••••••••••••••••");

    useEffect(() => {
        const update = () => {
            setPwd(Array.from({ length: 16 }, randomChar).join(""));
        };
        update();
        const interval = setInterval(update, 90);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
            style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                right: 14,
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "rgba(6,6,12,0.85)",
                backdropFilter: "blur(12px)",
                borderRadius: 12,
                border: "1px solid rgba(74,222,128,0.4)",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                boxShadow: "0 8px 24px rgba(74,222,128,0.15)",
            }}
        >
            <motion.span
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: 14, lineHeight: 1, filter: "drop-shadow(0 0 6px rgba(74,222,128,0.6))" }}
            >
                🔒
            </motion.span>
            <span
                style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "#4ade80",
                    letterSpacing: "0.06em",
                    flex: 1,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textShadow: "0 0 12px rgba(74,222,128,0.45)",
                }}
            >
                {pwd}
            </span>
            <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    fontSize: 9,
                    fontWeight: 900,
                    color: "#4ade80",
                    letterSpacing: "0.12em",
                    padding: "3px 7px",
                    borderRadius: 999,
                    background: "rgba(74,222,128,0.12)",
                    border: "1px solid rgba(74,222,128,0.3)",
                }}
            >
                SECURE
            </motion.span>
        </motion.div>
    );
}
