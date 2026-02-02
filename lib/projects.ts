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
      slug: "book-blog",
      title: "Book Blog",
      top: 104,
      previewSrc: "/previews/bookblog.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/bookblog.png",
      deadpan: "A personal reading archive with built-in LLM chatbot.",
      year: "2025–2026",
      stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "RAG"],
      links: [
        { label: "GitHub", href: "https://github.com/yourname/book-blog" },
        { label: "Live", href: "https://your-domain.com" },
      ],
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
      links: [{ label: "GitHub", href: "https://github.com/yourname/preference-drift" }],
    },
    {
      slug: "hackathon",
      title: "Hackathon Project (1st place winner)",
      top: 376,
      deadpan: "Coming soon...",
      year: "2026",
      stack: ["React", "TypeScript", "ML (light)", "Firebase"],
      links: [{ label: "Devpost", href: "https://devpost.com/yourproject" }],
    },
    {
      slug: "rl-comp579",
      title: "RL Project (COMP579)",
      top: 512,
      deadpan: "Coming soon...",
      year: "2026",
      stack: ["Python", "NumPy", "RL"],
    },
    {
      slug: "ml-reflection",
      title: "ML Reflection",
      top: 648,
      deadpan: "Coming soon...",
      year: "2026",
      stack: ["Writing", "ML"],
    },
    {
      slug: "micro-case-study",
      title: "Micro Project Case Study",
      top: 784,
      deadpan: "Coming soon...",
      year: "2026",
      stack: ["Product thinking", "Design", "Engineering"],
    },
  ];
  