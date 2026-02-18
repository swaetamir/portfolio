"use client";

import { useEffect, useMemo, useState } from "react";
import FaceGrid from "@/components/FaceGrid";
import ContactPopup from "@/components/ContactPopup";
import ProjectsWindow from "@/components/ProjectsWindow";
import ProjectWindow from "@/components/ProjectWindow";
import AboutPopup from "@/components/AboutPopup";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const [scale, setScale] = useState(1);
  useEffect(() => {
    function update() {
      setScale(Math.min(
        (window.innerWidth - 64) / 1392,
        (window.innerHeight - 64) / 900,
        1
      ));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [zOrder, setZOrder] = useState(["about", "contact", "projects", "project"]);
  const bringToFront = (id: string) =>
    setZOrder((prev) => [...prev.filter((x) => x !== id), id]);
  const zOf = (id: string) => 80 + zOrder.indexOf(id);

  const projects = useMemo(
    () =>
      PROJECTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        previewSrc: p.previewSrc,
        previewOpacity: p.previewOpacity,
        top: p.top,
      })),
    []
  );

  return (
    <main style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "white", overflow: "hidden", color: "black" }}>
      {/* wrapper sized to scaled poster*/}
      <div style={{ width: 1392 * scale, height: 900 * scale, flexShrink: 0, position: "relative" }}>
      <div
        className="relative bg-white overflow-hidden"
        style={{ width: 1392, height: 900, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}
      >
        {/* name */}
        <div style={{ left: 50, top: 34, position: "absolute", fontSize: 36, fontWeight: 700 }}>
          SWAETA MIR
        </div>

        {/* underline */}
        <div style={{ width: 245.01, height: 0, left: 50, top: 76, position: "absolute", borderTop: "2px solid black" }} />
{/*}
        <div style={{ left: 50, top: 75, position: "absolute", fontSize: 15, fontWeight: 700 }}>
          Computer Science &amp; Statistics Student
        </div> */}

        {/* about */}
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => { setAboutOpen((v) => !v); bringToFront("about"); }}
          style={{
            left: 50,
            top: 130,
            position: "absolute",
            fontSize: 20,
            fontWeight: 700,
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            zIndex: 60,
          }}
        >
          About Me
        </button>
        {aboutOpen && (
          <div
            style={{
              width: 90,
              height: 0,
              left: 50,
              top: 154,
              position: "absolute",
              borderTop: "2px solid black",
              zIndex: 60,
              pointerEvents: "none",
            }}
          />
        )}

        {/*selected Works*/}
        <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => { setProjectsOpen((v) => !v); bringToFront("projects"); }}
        style={{
          left: 50,
          top: 101,
          position: "absolute",
          color: "black",
          fontSize: 20,
          fontWeight: 700,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        Selected Works &amp; Experiments
      </button>

        {projectsOpen && (
          <div
            style={{
              width: 272,
              height: 0,
              left: 50,
              top: 126,
              position: "absolute",
              borderTop: "2px solid black",
              zIndex: 60,
              pointerEvents: "none",
            }}
          />
        )}

        {/* contact */}
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => { setContactOpen((v) => !v); bringToFront("contact"); }}
          style={{
            left: 50,
            top: 763,
            position: "absolute",
            fontSize: 20,
            fontWeight: 700,
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            zIndex: 60,
          }}
        >
          Contact
        </button>
        {contactOpen && (
          <div
            style={{
              width: 67,
              height: 0,
              left: 52,
              top: 787,
              position: "absolute",
              borderTop: "2px solid black",
              zIndex: 60,
              pointerEvents: "none",
            }}
          />
        )}

        {/* footer */}
        <div style={{ left: 50, top: 815, position: "absolute", fontSize: 20, fontWeight: 700 }}>Montreal</div>
        <div style={{ left: 50, top: 839, position: "absolute", fontSize: 20, fontWeight: 700 }}>2025-2026</div>

        <FaceGrid />

        {/* overlays */}
        <div onMouseDown={(e) => e.stopPropagation()}>
          <AboutPopup open={aboutOpen} onClose={() => setAboutOpen(false)} zIndex={zOf("about")} onFocus={() => bringToFront("about")} />
        </div>
        <div onMouseDown={(e) => e.stopPropagation()}>
          <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} zIndex={zOf("contact")} onFocus={() => bringToFront("contact")} />
        </div>

        <div onMouseDown={(e) => e.stopPropagation()}>
          <ProjectsWindow
            open={projectsOpen}
            onClose={() => setProjectsOpen(false)}
            onSelect={(slug) => { setActiveSlug(slug); bringToFront("project"); }}
            projects={projects}
            zIndex={zOf("projects")}
            onFocus={() => bringToFront("projects")}
          />
        </div>

        <div onMouseDown={(e) => e.stopPropagation()}>
          <ProjectWindow slug={activeSlug} onClose={() => setActiveSlug(null)} zIndex={zOf("project")} onFocus={() => bringToFront("project")} />
        </div>
      </div>
      </div>
    </main>
  );
}