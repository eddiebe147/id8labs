export const resumeData = {
  name: "Eddie Belaval",
  fullName: "Eduardo J Belaval",
  location: "Miami, FL",
  email: "eddie.belaval@gmail.com",
  phone: "917.862.2747",
  website: "www.eddiebelaval.com",

  titles: ["Cinematographer", "Story Producer", "Tech Builder"] as const,

  tagline: "Miami-born builder, filmmaker, and thinker.",
  bio: "From capturing light behind the camera to building tools for creators. Every project starts with understanding people deeply—what they want, what they fear, and what makes them human.",

  // Career stats - the numbers that tell the story
  stats: [
    { value: "15+", label: "Years in Production" },
    { value: "6", label: "Countries Filmed" },
    { value: "30+", label: "Productions" },
    { value: "10+", label: "Networks & Studios" },
  ],

  certifications: [
    { name: "FAA Licensed Drone Pilot", icon: "drone" },
    { name: "Local 600 Union Member", icon: "union" },
  ],

  skills: [
    "HD/UHD Camera Operation",
    "Field Producing",
    "MultiCam Direction",
    "Lighting Design",
    "Motion Control Timelapse",
    "Dolly, Jib & Steadicam",
    "Final Cut Pro",
  ],

  techSkills: [
    "Next.js",
    "TypeScript",
    "React",
    "AI/LLM Integration",
    "Supabase",
    "Tool Building",
  ],

  careerChapters: [
    {
      phase: "The Eye",
      title: "Cinematographer",
      years: "2008-2019",
      description:
        "Capturing stories through the lens. From reality TV to documentaries, learning that every frame tells a story—and that the best shots come from understanding people first.",
      highlights: [
        "Director of Photography on 15+ productions across MTV, A&E, History, Oxygen",
        "Motion control & timelapse specialist with custom rig builds",
        "On-call 24/7 for A&E's The First 48—capturing raw crime stories as they unfolded",
        "Shot in 6 countries for Reserve Channel's ExPats documentary series",
      ],
    },
    {
      phase: "The Story",
      title: "Story Producer",
      years: "2019-2021",
      description:
        "Moving from behind the camera to shaping the narrative. Years of watching human behavior through a lens taught me what makes stories resonate—authenticity, tension, and emotional truth.",
      highlights: [
        "90 Day Fiance: The Other Way (TLC) - Produced storylines across international locations",
        "Developed character arcs and narrative beats for multi-episode story threads",
        "Bridged technical crew and creative vision as someone who'd done both",
      ],
    },
    {
      phase: "The Build",
      title: "Tech Builder",
      years: "2021-Present",
      description:
        "Every tool I build starts with a frustration I've felt. After 15 years solving problems on set with duct tape and creativity, I'm now solving them with code.",
      highlights: [
        "Founder of ID8Labs - building tools for creative people",
        "Applying production thinking to software: ship fast, iterate, solve real problems",
        "AI-powered workflow solutions for creators and small teams",
      ],
    },
  ],

  // Select projects with richer context
  selectProjects: [
    {
      title: "The First 48",
      network: "A&E",
      role: "Field Producer / Camera Operator",
      location: "DeKalb & Harris County",
      description: "On call 24/7, following real homicide detectives from the moment dispatch calls. Capturing raw, unscripted moments as cases unfold in real-time.",
    },
    {
      title: "ExPats",
      network: "Reserve Channel",
      role: "Director of Photography / Producer",
      location: "6 Countries",
      description: "Traveled internationally capturing 'day in the life' stories of Americans abroad. Produced under Tony DiSanto and Liz Gately, hosted by Savannah Jane Buffett.",
    },
    {
      title: "GE Works Campaign",
      network: "GE",
      role: "Camera Operator / Timelapse Specialist",
      location: "Nationwide",
      description: "Year-long ad campaign capturing highly stylized trick shots and timelapse sequences using custom motion-controlled equipment.",
    },
  ],

  credits: {
    realityTV: [
      {
        title: "90 Day Fiance: The Other Way",
        network: "TLC",
        role: "Story Producer",
        years: "2019-2021",
        featured: true,
      },
      {
        title: "The First 48",
        network: "A&E",
        role: "Field Producer / Camera Op",
        years: "DeKalb & Harris County",
        featured: true,
      },
      {
        title: "Dark Horse Nation",
        network: "History Channel",
        role: "Director of Photography",
        years: "",
        featured: true,
      },
      {
        title: "Teen Mom",
        network: "MTV",
        role: "Camera Operator",
        years: "",
        featured: false,
      },
      {
        title: "My Life as Liz",
        network: "MTV",
        role: "Field Producer / Camera Op",
        years: "S1, S2 & S3",
        featured: false,
      },
      {
        title: "Made",
        network: "MTV",
        role: "Field Producer / Camera Op",
        years: "",
        featured: false,
      },
      {
        title: "Married at First Sight",
        network: "Kinetic Content",
        role: "Camera Operator",
        years: "Season 2",
        featured: false,
      },
      {
        title: "Living Different",
        network: "Oxygen",
        role: "Director of Photography",
        years: "",
        featured: false,
      },
      {
        title: "Rampage for Real",
        network: "Spike TV",
        role: "Camera Operator",
        years: "",
        featured: false,
      },
      {
        title: "10 Million Dollar Bigfoot Bounty",
        network: "Original Media",
        role: "Camera Operator",
        years: "",
        featured: false,
      },
      {
        title: "American Choppers",
        network: "Pilgrim",
        role: "Camera Operator",
        years: "",
        featured: false,
      },
      {
        title: "Orange County Choppers",
        network: "Discovery",
        role: "Camera Operator",
        years: "",
        featured: true,
      },
      {
        title: "High on the Hog",
        network: "Netflix",
        role: "Camera Operator",
        years: "",
        featured: true,
      },
    ],
    scripted: [
      {
        title: "Gotham",
        network: "Warner Bros/DC Comics",
        role: "Camera Operator",
        years: "",
        featured: true,
      },
      {
        title: "PUZZLE",
        network: "Olive Productions",
        role: "'A' Camera Operator",
        years: "",
        featured: false,
      },
      {
        title: "The Engagement",
        network: "Canal Street Films",
        role: "Director of Photography",
        years: "",
        featured: false,
      },
    ],
    documentary: [
      {
        title: "ExPats",
        network: "Reserve Channel",
        role: "Director of Photography / Producer",
        years: "6 countries",
        featured: false,
      },
      {
        title: "In The Grey - Life as a Transgender",
        network: "World Why",
        role: "Director of Photography",
        years: "",
        featured: false,
      },
      {
        title: "Carry That Weight - a Rockumentary",
        network: "Hyperion",
        role: "Director of Photography",
        years: "",
        featured: false,
      },
      {
        title: "Day in the Life of an NYJTL Student",
        network: "NYJTL",
        role: "Director of Photography",
        years: "",
        featured: false,
      },
    ],
    digital: [
      {
        title: "Digital Builds",
        network: "OCC+",
        role: "Producer / Director / Operator",
        years: "",
        featured: true,
      },
    ],
    commercial: [
      { brand: "GE", project: "Works Ad Campaign", role: "Camera Operator / Timelapse" },
      {
        brand: "Honda",
        project: "Millionth Export Factory",
        role: "Timelapse Specialist",
      },
      { brand: "Revlon", project: "#GoBOLD Campaign", role: "Camera Operator" },
      {
        brand: "Burger King / Jersey Shore",
        project: "Promo",
        role: "Director of Photography",
      },
      {
        brand: "Christian Louboutin",
        project: "Promo",
        role: "Camera Operator",
      },
      {
        brand: "Arcadis Engineering",
        project: "Corporate Interviews",
        role: "Camera Operator",
      },
      {
        brand: "Dasé Clothing Co",
        project: "Brand Promo",
        role: "Director of Photography / Editor",
      },
    ],
  },

  currentWork: {
    company: "ID8Labs",
    tagline: "Building tools for creative people",
    description:
      "From telling stories to building the tools for storytellers. Every tool I create starts with a frustration—if I'm annoyed by something repeatedly, there's probably a better way.",
  },

  social: {
    email: "eb@id8labs.tech",
    linkedin: "linkedin.com/in/eddiebelaval",
  },
} as const;

export type ResumeData = typeof resumeData;
