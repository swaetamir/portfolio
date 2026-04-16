"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/projects";
import CloseButton from "@/components/CloseButton";

const W = 800;
const H = 540;
const HERO_H = 340;

type Props = {
  slug: string | null;
  onClose: () => void;
  zIndex?: number;
  onFocus?: () => void;
};

export default function ProjectWindow({ slug, onClose, zIndex, onFocus }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const [pos, setPos] = useState({ x: 336, y: 160 });

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  useEffect(() => {
    if (!slug) return;
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
    function onUp() { draggingRef.current = false; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [slug]);

  if (!slug) return null;

  const active = PROJECTS.find(
    (p) => p.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );
  if (!active) return null;

  return (
    <div
      ref={hostRef}
      role="dialog"
      aria-modal="false"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", inset: 0, zIndex: zIndex ?? 83, pointerEvents: "none" }}
    >
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
        {/* drag layer */}
        <div
          aria-label="Drag project window"
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


        {/* hero — full bleed, no border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: HERO_H, overflow: "hidden", background: "#f0f0f0" }}>
          {active.heroSrc ? (
            <Image
              src={active.heroSrc}
              alt={`${active.title} screenshot`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
              Coming soon...
            </div>
          )}
        </div>

        {/* divider */}
        <div style={{ position: "absolute", top: HERO_H, left: 0, right: 0, borderTop: "1px solid black", zIndex: 2 }} />

        {/* info band — pointerEvents none except links */}
        <div style={{
          position: "absolute",
          top: HERO_H + 1,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          pointerEvents: "none",
          padding: "16px 24px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          {/* top row: title + links + close */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{active.title}</div>
                {active.year && <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5 }}>{active.year}</div>}
              </div>
              {(active.description || active.deadpan) && (
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6, lineHeight: 1.6, maxWidth: 420, opacity: 0.8 }}>
                  {active.description ?? active.deadpan}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center", pointerEvents: "auto" }} onMouseDown={(e) => e.stopPropagation()}>
              {active.links && active.links.map((l, i) => (
                <a
                  key={`${l.label}-${i}`}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 13, fontWeight: 700, color: "black", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  {l.label}
                </a>
              ))}
              <div onMouseDown={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} ariaLabel="Close project window" />
              </div>
            </div>
          </div>

          {/* bottom row: stack wrapping */}
          {active.stack && active.stack.length > 0 && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", paddingTop: 1 }}>Stack</span>
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, lineHeight: 1.7 }}>{active.stack.join("  ·  ")}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
