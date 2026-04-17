export type ProjectRow = {
    slug: string;
    title: string;
    top: number;

    // list-page preview
    previewSrc?: string;
    previewOpacity?: number;

    // poster-page content
    deadpan?: string;
    description?: string;
    year?: string;
    stack?: string[];
    links?: { label: string; href: string }[];
    heroSrc?: string; // big screenshot on the poster page
    heroFit?: "cover" | "contain";
    heroPosition?: string;
    heroScale?: number;
  };

  export const PROJECTS: ProjectRow[] = [
    {
      slug: "the-spiral",
      title: "The Spiral",
      top: 104,
      previewSrc: "/previews/spiral.gif",
      previewOpacity: 0.3,
      heroSrc: "/previews/spiral.gif",
      heroPosition: "center top",
      deadpan: "Spiral of all things data.",
      description: "A handcoded 3D spiral built in Three.js to visualize data-related articles and writing. Each point in the spiral maps to a piece of content from the archive.",
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
      heroPosition: "center 60%",
      deadpan: "My listening habits, observed over time.",
      description: "A visual analysis of 9 years of Spotify listening data (2017–Feb 2026). Uses the Spotify API to surface long-term shifts in taste, genre, and artist affinity over time.",
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
      description: "A client-side kinetic energy analysis system that uses computer vision to detect and measure motion intensity in popular music videos — all processed in the browser via WebGL.",
      year: "2026",
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "TensorFlow.js", "COCO-SSD (client-side, WebGL)", "Cloudflare R2 (video CDN)"],
      links: [{ label: "Live Demo", href: "https://defcon-system.vercel.app" }, { label: "GitHub", href: "https://github.com/swaetamir/defcon" }],
    },
    {
      slug: "hackathon",
      title: "Memory Box",
      top: 512,
      previewSrc: "/previews/membox.png",
      previewOpacity: 0.3,
      heroSrc: "/previews/membox.gif",
      heroScale: 1.2,
      deadpan: "A real-time shared memory box.",
      description: "Built in 24 hours at a hackathon. A real-time app for sending curated memory boxes to people you care about — focused on friendship, reconnection, and presence.",
      year: "2026",
      stack: ["React", "TypeScript", "ML (light)", "Supabase"],
      links: [{ label: "Devpost", href: "https://devpost.com/software/memory-box-4vxrz0" }],
    },
    {
      slug: "rl-comp579",
      title: "RL Project (COMP579)",
      top: 648,
      deadpan: "Coming soon.",
      description: "A comparison of SARSA and Expected SARSA in tabular reinforcement learning environments. Coming soon.",
      year: "2026",
      stack: ["Python", "NumPy", "RL"],
    },
  ];
