"use client";

import { useEffect, useMemo, useState } from "react";

const W = 1392;
const H = 900;

export default function PosterStage({ children }: { children: React.ReactNode }) {
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const padding = 32; // p-8

  const scale = useMemo(() => {
    const availW = Math.max(0, vw - padding * 2);
    const availH = Math.max(0, vh - padding * 2);
    if (!availW || !availH) return 1;
    return Math.min(availW / W, availH / H, 1);
  }, [vw, vh]);

  const scaledW = W * scale;
  const scaledH = H * scale;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding,
        overflow: "auto", // <- scroll instead of clipping
        background: "white",
      }}
    >
      <div
        style={{
          width: scaledW,
          height: scaledH,
          margin: "auto", // centers inside the scrollable stage
        }}
      >
        <div
          style={{
            width: W,
            height: H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
