import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../../lib/projects";
import CloseButton from "@/components/CloseButton";

export default async function ProjectPoster({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();

  const active = PROJECTS.find((p) => p.slug.trim().toLowerCase() === slug);
  if (!active) return notFound();

  return (
    <main className="bg-white text-black p-8">
      {/* poster canvas */}
      <div
        className="relative bg-white overflow-hidden"
        style={{ width: 1510, height: 950, margin: "0 auto" }}
      >
        {/* expanded frame (Frame 4) */}
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
          }}
        >
          {/* close icon (go back to /projects) */}
          <div style={{ position: "absolute", left: 1400, top: 11, zIndex: 50 }}>
            <CloseButton href="/projects" ariaLabel="Back to projects" />
          </div>

          {/* left column */}
          <div
            style={{
              left: 48,
              top: 35,
              position: "absolute",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {active.title}
          </div>

          <div
            style={{
              left: 48,
              top: 59,
              position: "absolute",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {active.deadpan ?? "Project subtitle goes here."}
          </div>

          <div
            style={{
              left: 48,
              top: 113,
              position: "absolute",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            stack
          </div>

          {/* links */}
          {active.links?.find((l) => l.label.toLowerCase() === "github") && (
            <a
              href={active.links.find((l) => l.label.toLowerCase() === "github")!.href}
              target="_blank"
              rel="noreferrer"
              style={{
                left: 48,
                top: 174,
                position: "absolute",
                fontSize: 20,
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
              }}
            >
              github
            </a>
          )}

          {active.links?.find((l) => l.label.toLowerCase().includes("pdf")) && (
            <a
              href={active.links.find((l) => l.label.toLowerCase().includes("pdf"))!.href}
              target="_blank"
              rel="noreferrer"
              style={{
                left: 48,
                top: 198,
                position: "absolute",
                fontSize: 20,
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
              }}
            >
              download pdf
            </a>
          )}

          {/* pic */}
          <div
            style={{
              width: 890,
              height: 496,
              left: 500,
              top: 225,
              position: "absolute",
              overflow: "hidden",
              background: "white",
            }}
          >
            {active.heroSrc ? (
              <Image
                src={active.heroSrc}
                alt={`${active.title} screenshot`}
                width={890}
                height={496}
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
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                add screenshot
              </div>
            )}
          </div>

          {/* overlay label */}
          <div
            style={{
              left: 874,
              top: 449,
              position: "absolute",
              fontSize: 20,
              fontWeight: 700,
              pointerEvents: "none",
            }}
          >
            VIDEO DEMO/GIF
          </div>
        </div>
      </div>
    </main>
  );
}
