"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/projects";
import CloseButton from "@/components/CloseButton";

const W = 700;
const H = 480;

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
  const [pos, setPos] = useState({ x: 346, y: 180 });

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

    function onUp() {
      draggingRef.current = false;
    }

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

        {/* close */}
        <div
          style={{ position: "absolute", right: 9, top: 9, zIndex: 3 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose} ariaLabel="Close project window" />
        </div>

        {/* content — pointerEvents:none so drag layer stays active over empty areas */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>

          {/* left column — flex so stack + links never overlap */}
          <div style={{
            position: "absolute",
            left: 24,
            top: 22,
            width: 200,
            bottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{active.title}</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{active.deadpan ?? ""}</div>

            {active.stack && active.stack.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Stack</div>
                <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.7 }}>
                  {active.stack.join("  ·  ")}
                </div>
              </div>
            )}

            {/* links */}
            {active.links && active.links.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "auto" }} onMouseDown={(e) => e.stopPropagation()}>
                {active.links.map((l, i) => (
                  <a
                    key={`${l.label}-${i}`}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "black",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* hero */}
          <div
            style={{
              width: 420,
              height: 320,
              left: 240,
              top: 100,
              position: "absolute",
              overflow: "hidden",
              background: "white",
              border: "1px solid black",
            }}
          >
            {active.heroSrc ? (
              <Image
                src={active.heroSrc}
                alt={`${active.title} screenshot`}
                width={340}
                height={240}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Coming soon...
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
