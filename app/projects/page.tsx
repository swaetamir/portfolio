"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../../lib/projects";

export default function ProjectsPage() {
    const [hovered, setHovered] = useState<string | null>(null);

  return (
    
    <main className="bg-white text-black p-8">
        
      {/* poster canvas */}
      <div className="relative bg-white overflow-hidden" style={{ width: 1510, height: 950, margin: "0 auto" }}>
        {/* title */}
        <div
          style={{
            left: 48,
            top: 31,
            position: "absolute",
            color: "black",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          Selected Works &amp; Experiments
        </div>

        {/* line 1 */}
        <div
          style={{
            width: 490,
            height: 10,
            left: 48,
            top: 73,
            position: "absolute",
            borderTop: "2px solid black",
          }}
        />

        {/* rows */}
        {PROJECTS.map((p) => (
          <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          onMouseEnter={() => setHovered(p.slug)}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: 1435,
            height: 125,
            left: 38,
            top: p.top,
            position: "absolute",
            overflow: "hidden",
            border: hovered === p.slug ? "1.25px solid black" : "1px solid black",
            background: "white",
            textDecoration: "none",
            color: "black",
            display: "block",
            opacity:
              hovered === null
                ? 1
                : hovered === p.slug
                ? 1
                : 0.6,
            transition: "border 0.15s ease, opacity 0.15s ease",
          }}
          
        >
            {/* preview image (for now) */}
            {p.previewSrc && (
              <Image
                src={p.previewSrc}
                alt=""
                fill
                style={{
                    objectFit: "cover",
                    opacity:
                      hovered === p.slug
                        ? (p.previewOpacity ?? 0.3) + 0.15
                        : p.previewOpacity ?? 0.3,
                    transform: hovered === p.slug ? "scale(1.02)" : "scale(1)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  
                priority={p.top <= 240}
              />
            )}

            {/* title centered */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              {p.title}
            </div>
          </Link>
        ))}

        {/* icon top right */}
        <Link
        href="/"
        style={{
            left: 1426,
            top: 17,
            position: "absolute",
            width: 71,
            height: 71,
            cursor: "pointer",
            display: "block",
        }}
        >
        <Image src="/faces/unimpressed.png" alt="Back to home" width={71} height={71} />
        </Link>
      </div>
    </main>
  );
}
