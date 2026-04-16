export type ProjectRow = {
    slug: string;
    title: string;
    top: number;

    // list-page preview
    previewSrc?: string;
    previewOpacity?: number;

    // poster-page content
    deadpan?: string;
    year?: string;
    stack?: string[];
    links?: { label: string; href: string }[];
    heroSrc?: string; // big screenshot on the poster page
  };

  export const PROJECTS: ProjectRow[] = [
    {
      slug: "the-spiral",
      title: "The Spiral",
      top: 104,
      previewSrc: "/previews/spiral.gif",
      previewOpacity: 0.3,
      heroSrc: "/previews/spiral.gif",
      deadpan: "Spiral of all things data.",
      year: "2026",
      stack: ["Next.js", "TypeScript", "React Three Fiber", "Three.js", "Tailwind CSS"],
      links: [{ label: "Live Demo", href:"https://thespiral.vercel.app"}, { label: "GitHub", href:"https://github.com/swaetamir/datastudio.git"},{ label: "Substack", href:"https://substack.com/@thedatastudioarchive"}]
    },
    {
      slug: "preference-drift",
      title: "Preference Drift",
      top: 240,
      previewSrc: "/previews/preference-drift.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/tastemap.gif",
      deadpan: "My listening habits, observed over time.",
      year: "2025–2026",
      stack: ["Next.js", "Spotify API", "Charts", "Data viz"],
      links: [{ label: "Live Demo", href: "https://preference-drift.vercel.app" }, { label: "GitHub", href: "https://github.com/swaetamir/preference-drift" }],
    },
    {
      slug: "defcon",
      title: "DEFCON",
      top: 376,
      previewSrc: "/previews/defcon.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/defcon2.png",
      deadpan: "Kinetic energy analysis system.",
      year: "2025",
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "TensorFlow.js", "COCO-SSD (client-side, WebGL)", "Cloudflare R2 (video CDN)"],
      links: [{ label: "Live Demo", href: "https://defcon-system.vercel.app" }, { label: "GitHub", href: "https://github.com/swaetamir/defcon" }],
    },
    {
      slug: "hackathon",
      title: "Memory Box",
      top: 512,
      previewSrc: "/previews/membox.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/membox.png",
      deadpan: "Memory box curated for a loved one with real-time sharing",
      year: "2026",
      stack: ["React", "TypeScript", "ML (light)", "Supabase"],
      links: [{ label: "Devpost", href: "https://devpost.com/software/memory-box-4vxrz0" }],
    },
    {
      slug: "rl-comp579",
      title: "RL Project (COMP579)",
      top: 648,
      deadpan: "Coming April 2026",
      year: "2026",
      stack: ["Python", "NumPy", "RL"],
    },
  ];
