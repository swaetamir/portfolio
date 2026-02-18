"use client";

import { useEffect, useRef, useState } from "react";
import CloseButton from "@/components/CloseButton";

type Props = {
  open: boolean;
  onClose: () => void;
  zIndex?: number;
  onFocus?: () => void;
};

export default function AboutPopup({ open, onClose, zIndex, onFocus }: Props) {
  // hooks must always run
  const hostRef = useRef<HTMLDivElement | null>(null);

  const [pos, setPos] = useState({ x: 303, y: 130 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  useEffect(() => {
    if (!open) return;

    function onMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      const host = hostRef.current;
      if (!host) return;

      const hostRect = host.getBoundingClientRect();

      const s = scaleRef.current;
      const nextX = (e.clientX - hostRect.left) / s - offsetRef.current.x;
      const nextY = (e.clientY - hostRect.top) / s - offsetRef.current.y;

      // clamp (1392 x 900)
      setPos({
        x: clamp(nextX, 10, 1392 - 520 - 10),
        y: clamp(nextY, 10, 900 - 300 - 10),
      });
    }

    function onUp() {
      draggingRef.current = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={hostRef}
      role="dialog"
      aria-modal="false"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: zIndex ?? 80,
        pointerEvents: "none",
      }}
    >
      <div
        onMouseDownCapture={() => onFocus?.()}
        style={{
          width: 520,
          height: 300,
          left: pos.x,
          top: pos.y,
          position: "absolute",
          background: "white",
          overflow: "hidden",
          border: "1px solid black",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          pointerEvents: "auto",
        }}
      >
        {/* drag handle */}
        <div
        aria-label="Drag about window"
        onMouseDown={(e) => {
            e.stopPropagation();
            draggingRef.current = true;
            const s = hostRef.current ? hostRef.current.getBoundingClientRect().width / 1392 : 1;
            scaleRef.current = s;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            offsetRef.current = {
              x: (e.clientX - rect.left) / s,
              y: (e.clientY - rect.top) / s,
            };
        }}
        style={{
            position: "absolute",
            inset: 0,              
            cursor: "grab",
            zIndex: 1,
        }}
        />

        <div style={{ position: "absolute", top: 9, right: 10, zIndex: 2 }}>
          <CloseButton onClick={onClose} ariaLabel="Close about window" />
        </div>

        <div
          style={{
            left: 23,
            top: 20,
            position: "absolute",
            fontSize: 20,
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          About
        </div>

        <div
          style={{
            left: 23,
            top: 60,
            position: "absolute",
            fontSize: 16,
            fontWeight: 700,
            width: 470,
            lineHeight: 1.35,
          }}
        >
          Computer Science &amp; Statistics student building data-driven products.
          I'm interested in where machine learning, systems, and user experience intersect.
        </div>

        <div
          style={{
            left: 23,
            top: 140,
            position: "absolute",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
            How I Work
        </div>

        <div
          style={{
            left: 23,
            top: 170,
            position: "absolute",
            fontSize: 16,
            fontWeight: 700,
            width: 470,
            lineHeight: 1.5,
          }}
        >
          • Applied ML & model evaluation (Python, NumPy, scikit-learn)
          <br />
          • Building interactive, data-driven tools (Pandas, SQL)
          <br />
          • Full-stack implementation (Next.js, Typescript, APIs, Postgres)
          <br />
          • Iteration guided by metrics and UX (React, Figma)
        </div>
      </div>
    </div>
  );
}