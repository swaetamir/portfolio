"use client";

import Image from "next/image";
import { useState } from "react";
import { PROJECTS } from "@/lib/projects";

type Screen =
  | { id: "home" }
  | { id: "about" }
  | { id: "contact" }
  | { id: "projects" }
  | { id: "project"; slug: string };

const MOBILE_FACES = ["unimpressed", "happy", "questioning"] as const;

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontSize: 20,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      ← Back
    </button>
  );
}

function HomeScreen({ onNav }: { onNav: (screen: Screen) => void }) {
  return (
    <div style={{ display: "flex", height: "100%", padding: "40px 32px", gap: 16 }}>
      {/* left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, whiteSpace: "nowrap" }}>SWAETA MIR</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 40 }}>
            Computer Science &amp; Statistics Student
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <button
              type="button"
              onClick={() => onNav({ id: "projects" })}
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", fontSize: 18, fontWeight: 700, textAlign: "left" }}
            >
              Selected Works &amp; Experiments
            </button>
            <button
              type="button"
              onClick={() => onNav({ id: "about" })}
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", fontSize: 18, fontWeight: 700, textAlign: "left" }}
            >
              About Me
            </button>
            <button
              type="button"
              onClick={() => onNav({ id: "contact" })}
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", fontSize: 18, fontWeight: 700, textAlign: "left" }}
            >
              Contact
            </button>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Montreal</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>2025–2026</div>
        </div>
      </div>

      {/* right — 3 faces stacked */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, alignItems: "center" }}>
        {MOBILE_FACES.map((face) => (
          <Image
            key={face}
            src={`/faces/${face}.png`}
            alt={face}
            width={108}
            height={108}
            style={{ display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}

function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ padding: "40px 32px", height: "100%", boxSizing: "border-box", overflowY: "auto" }}>
      <div style={{ marginBottom: 32 }}>
        <BackButton onBack={onBack} />
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>About</div>

      <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.5, marginBottom: 28 }}>
        Computer Science &amp; Statistics student building data-driven products.
        I&apos;m interested in where machine learning, systems, and user experience intersect.
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>How I Work</div>

      <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.8 }}>
        • Applied ML &amp; model evaluation (Python, NumPy, scikit-learn)<br />
        • Building interactive, data-driven tools (Pandas, SQL)<br />
        • Full-stack implementation (Next.js, TypeScript, APIs, Postgres)<br />
        • Iteration guided by metrics and UX (React, Figma)
      </div>
    </div>
  );
}

function ContactScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ padding: "40px 32px", height: "100%", boxSizing: "border-box" }}>
      <div style={{ marginBottom: 32 }}>
        <BackButton onBack={onBack} />
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 32 }}>Contact</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <a
          href="mailto:swaeta.mobasher@gmail.com"
          style={{ fontSize: 20, fontWeight: 700, color: "black", textDecoration: "underline", textUnderlineOffset: 4 }}
        >
          email
        </a>
        <a
          href="https://github.com/swaetamir"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 20, fontWeight: 700, color: "black", textDecoration: "underline", textUnderlineOffset: 4 }}
        >
          github
        </a>
      </div>
    </div>
  );
}

function ProjectsScreen({ onBack, onSelect }: { onBack: () => void; onSelect: (slug: string) => void }) {
  return (
    <div style={{ padding: "40px 32px 0", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 32 }}>
        <BackButton onBack={onBack} />
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Selected Works &amp; Experiments</div>
      <div style={{ marginBottom: 8 }} />

      <div style={{ overflowY: "auto", flex: 1 }}>
        {PROJECTS.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => !p.disabled && onSelect(p.slug)}
            style={{
              width: "100%",
              height: 90,
              position: "relative",
              cursor: p.disabled ? "default" : "pointer",
              opacity: p.disabled ? 0.4 : 1,
              overflow: "hidden",
              borderTop: i === 0 ? "none" : "1px solid black",
              background: "white",
              color: "black",
              display: "block",
              padding: 0,
            }}
          >
            {p.previewSrc && (
              <Image
                src={p.previewSrc}
                alt=""
                fill
                style={{ objectFit: "cover", opacity: p.previewOpacity ?? 0.3 }}
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
                padding: "0 16px",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</div>
              {p.deadpan && <div style={{ fontSize: 10, fontWeight: 700, marginTop: 7, opacity: 0.6 }}>{p.deadpan}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectScreen({ slug, onBack }: { slug: string; onBack: () => void }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;

  return (
    <div style={{ padding: "40px 32px", height: "100%", boxSizing: "border-box", overflowY: "auto" }}>
      <div style={{ marginBottom: 32 }}>
        <BackButton onBack={onBack} />
      </div>

      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{project.title}</div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 20, lineHeight: 1.6 }}>{project.description ?? project.deadpan}</div>

      {project.heroSrc && (
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            position: "relative",
            overflow: "hidden",
            border: "1px solid black",
            marginBottom: 24,
          }}
        >
          <Image
            src={project.heroSrc}
            alt={`${project.title} screenshot`}
            fill
            style={{ objectFit: project.heroFit ?? "cover", objectPosition: project.heroPosition ?? "center", transform: project.heroScale ? `scale(${project.heroScale})` : undefined }}
          />
        </div>
      )}

      {!project.heroSrc && (
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Coming soon...
        </div>
      )}

      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Stack</div>
      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.7, marginBottom: 24 }}>
        {project.stack?.join("  ·  ")}
      </div>

      {project.links && project.links.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {project.links.map((l, i) => (
            <a
              key={`${l.label}-${i}`}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 15, fontWeight: 700, color: "black", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileView() {
  const [screen, setScreen] = useState<Screen>({ id: "home" });

  return (
    <div style={{ width: "100vw", height: "100dvh", background: "white", color: "black", overflow: "hidden" }}>
      {screen.id === "home" && (
        <HomeScreen onNav={setScreen} />
      )}
      {screen.id === "about" && (
        <AboutScreen onBack={() => setScreen({ id: "home" })} />
      )}
      {screen.id === "contact" && (
        <ContactScreen onBack={() => setScreen({ id: "home" })} />
      )}
      {screen.id === "projects" && (
        <ProjectsScreen
          onBack={() => setScreen({ id: "home" })}
          onSelect={(slug) => setScreen({ id: "project", slug })}
        />
      )}
      {screen.id === "project" && (
        <ProjectScreen
          slug={screen.slug}
          onBack={() => setScreen({ id: "projects" })}
        />
      )}
    </div>
  );
}
