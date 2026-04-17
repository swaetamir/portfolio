"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CloseButton from "@/components/CloseButton";

type ProjectRow = {
  slug: string;
  title: string;
  previewSrc?: string;
  previewOpacity?: number;
  top: number;
  disabled?: boolean;
  deadpan?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (slug: string) => void;
  projects: ProjectRow[];
  zIndex?: number;
  onFocus?: () => void;
};

export default function ProjectsWindow({ open, onClose, onSelect, projects, zIndex, onFocus }: Props) {
  // hooks always run
  const hostRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  const W = 700;
  const H = 500;

  const [pos, setPos] = useState({ x: 300, y: 170 });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

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

      setPos({
        x: clamp(nextX, 10, 1392 - W - 10),
        y: clamp(nextY, 10, 900 - H - 10),
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
    // host layer
    <div
      ref={hostRef}
      role="dialog"
      aria-modal="false"
      style={{ position: "absolute", inset: 0, zIndex: zIndex ?? 80, pointerEvents: "none" }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* window */}
      <div
        onMouseDownCapture={() => onFocus?.()}
        style={{
          width: W,
          height: H,
          left: pos.x,
          top: pos.y,
          position: "absolute",
          background: "white",
          border: "1px solid black",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        {/* drag layer (whole window) */}
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            draggingRef.current = true;
            const s = hostRef.current ? hostRef.current.getBoundingClientRect().width / 1392 : 1;
            scaleRef.current = s;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            offsetRef.current = { x: (e.clientX - rect.left) / s, y: (e.clientY - rect.top) / s };
          }}
          style={{ position: "absolute", inset: 0, cursor: "grab", zIndex: 1 }}
        />

        {/* close */}
        <div
          style={{ position: "absolute", top: 13, right: 13, zIndex: 3 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose} ariaLabel="Close projects window" />
        </div>

        {/* content */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          <div style={{ left: 38, top: 24, position: "absolute", fontSize: 22, fontWeight: 700 }}>
            Selected Works &amp; Experiments
          </div>

          <div style={{ width: 300, height: 0, left: 38, top: 50, position: "absolute", borderTop: "2px solid black" }} />

          {/* scroll area */}
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 78,
              width: W - 60,
              height: H - 108,
              overflowY: "auto",
              overflowX: "hidden",
              background: "white",
              pointerEvents: "auto",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {projects.map((p, i) => {
              const isHovered = hoveredSlug === p.slug;
              const dimmed = hoveredSlug !== null && !isHovered;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => !p.disabled && onSelect(p.slug)}
                  onMouseEnter={() => !p.disabled && setHoveredSlug(p.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  style={{
                    width: "100%",
                    height: 110,
                    position: "relative",
                    overflow: "hidden",
                    borderTop: i === 0 ? "none" : "1px solid black",
                    background: "white",
                    color: "black",
                    display: "block",
                    cursor: p.disabled ? "default" : "pointer",
                    padding: 0,
                    transform: isHovered ? "scale(1.03)" : "scale(1)",
                    opacity: dimmed ? 0.5 : p.disabled ? 0.4 : 1,
                    transition: "transform 0.15s ease, opacity 0.15s ease, outline 0.15s ease",
                    zIndex: isHovered ? 1 : 0,
                    outline: isHovered ? "1px solid black" : "none",
                    outlineOffset: "-1px",
                  }}
                >
                  {p.previewSrc && (
                    <Image
                      src={p.previewSrc}
                      alt=""
                      fill
                      style={{
                        objectFit: "cover",
                        opacity: isHovered ? 0.6 : (p.previewOpacity ?? 0.3),
                        transition: "opacity 0.15s ease",
                      }}
                    />
                  )}

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "0 24px",
                      pointerEvents: "none",
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{p.title}</div>
                    {p.deadpan && <div style={{ fontSize: 11, fontWeight: 700, marginTop: 8, opacity: 0.6 }}>{p.deadpan}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* border overlay — always on top of scaled items */}
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 78,
              width: W - 60,
              height: H - 108,
              border: "1px solid black",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}