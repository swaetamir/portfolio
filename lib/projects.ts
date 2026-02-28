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
      slug: "data-studio",
      title: "Data Studio",
      top: 104,
      previewSrc: "/previews/spiral.gif",
      previewOpacity: 0.3,
      heroSrc: "/previews/spiral.gif",
      deadpan: "Spiral of all things data.",
      year: "2026",
      stack: ["Next.js", "TypeScript", "React Three Fiber", "Three.js", "Tailwind CSS"],
      links: [{ label: "Substack", href:"https://substack.com/@thedatastudioarchive"}]
    },
    {
      slug: "preference-drift",
      title: "Preference Drift",
      top: 240,
      previewSrc: "/previews/preference-drift.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/preference-drift.png",
      deadpan: "My listening habits, observed over time.",
      year: "2025–2026",
      stack: ["Next.js", "Spotify API", "Charts", "Data viz"],
      links: [{ label: "GitHub", href: "https://github.com/swaetamir/preference-drift" }],
    },
    {
      slug: "book-blog",
      title: "Book Blog",
      top: 376,
      previewSrc: "/previews/bookblog.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/bookblog.png",
      deadpan: "A personal reading archive with built-in LLM chatbot.",
      year: "2025–2026",
      stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "RAG"],
      links: [
        { label: "GitHub", href: "https://github.com/swaetamir/bookblog" },
      ],
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
