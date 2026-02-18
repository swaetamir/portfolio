"use client";

import Image from "next/image";
import { PROJECTS } from "@/lib/projects";
import CloseButton from "@/components/CloseButton";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (slug: string) => void;
};

export default function ProjectsWindow({ open, onClose, onSelect }: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        width: 1435,
        height: 805,
        left: 38,
        top: 104,
        position: "absolute",
        background: "white",
        overflow: "hidden",
        border: "1px solid black",
        zIndex: 60,
      }}
    >
      {/* close */}
      <div style={{ position: "absolute", right: 9, top: 9, zIndex: 80 }}>
        <CloseButton onClick={onClose} ariaLabel="Close projects" />
      </div>

      {/* list */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 35,
          right: 48,
          bottom: 35,
          overflowY: "auto",
          paddingRight: 8,
        }}
      >
        {PROJECTS.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => onSelect(p.slug)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              padding: "0 0 10px 0",
              margin: 0,
              cursor: "pointer",
              color: "black",
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "inherit",
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* faint preview background (optional) */}
      {PROJECTS[0]?.previewSrc ? (
        <Image
          src={PROJECTS[0].previewSrc}
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.04, pointerEvents: "none" }}
        />
      ) : null}
    </div>
  );
}
