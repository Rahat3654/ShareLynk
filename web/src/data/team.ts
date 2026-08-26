export interface TeamMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatar?: string;
  bio?: string;
  contributions: string[];
  skills: string[];
  socials?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

export const leadership: TeamMember = {
  id: "lead-1",
  name: "Dr. Md. Ahsan Habib",
  role: "Project Lead & Advisor",
  institution: "University of Dhaka",
  bio: "Directing the strategic vision, security protocols, and research architecture of ShareLynk — bridging academic innovation with enterprise-grade software engineering.",
  contributions: [
    "Security Architecture Supervision",
    "Research & Strategic Vision",
    "Campus Deployment Guidance",
  ],
  skills: ["Security Architecture", "Network Security", "Strategic Planning"],
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "advisor@sharelynk.com",
  },
};

export const coreTeam: TeamMember[] = [
  {
    id: "core-1",
    name: "Rafiqul Islam",
    role: "Lead Systems Architect",
    institution: "University of Dhaka",
    contributions: [
      "FastAPI Core Backend Engine",
      "Session Token Rotation Protocol",
      "Database & Alembic Migrations",
    ],
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Security"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "core-2",
    name: "Wahida Akhter",
    role: "Lead Frontend Engineer",
    institution: "University of Dhaka",
    contributions: [
      "Next.js Public Website & App Architecture",
      "React Admin Dashboard Platform",
      "Design System & UI Components",
    ],
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "UI/UX"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

export const interns: TeamMember[] = [
  {
    id: "intern-1",
    name: "Samiul Hasan",
    role: "Frontend Development Intern",
    institution: "University of Dhaka",
    contributions: [
      "Responsive UI Component Development",
      "Cross-Platform Theme Optimization",
      "Bengali Typography & Layout Integration",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "intern-2",
    name: "Anika Rahman",
    role: "Backend Development Intern",
    institution: "Bangladesh University of Engineering and Technology (BUET)",
    contributions: [
      "Download Tracking & Analytics API",
      "Automated DB Migration Scripts",
      "RESTful Endpoint Testing & Documentation",
    ],
    skills: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "intern-3",
    name: "Naimur Rashid",
    role: "UI/UX Design Intern",
    institution: "Islamic University of Technology (IUT)",
    contributions: [
      "Interactive Dashboard Wireframes",
      "Dark-Mode Color Tokens & Glassmorphism",
      "User Experience Flow Optimization",
    ],
    skills: ["Figma", "UI/UX Design", "Design Systems", "Prototyping"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "intern-4",
    name: "Faria Tasnim",
    role: "Software Engineering Intern",
    institution: "BRAC University",
    contributions: [
      "Cross-Platform Release Automation",
      "SHA-256 Checksum Verification Logic",
      "CI/CD Build Pipeline Enhancements",
    ],
    skills: ["TypeScript", "GitHub Actions", "Docker", "Linux"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "intern-5",
    name: "Mahmudul Hassan",
    role: "Research & Security Intern",
    institution: "University of Dhaka",
    contributions: [
      "256-bit Session Key Audit",
      "Local Peer Authentication Protocols",
      "Telemetry Privacy Compliance",
    ],
    skills: ["Cybersecurity", "Network Protocols", "Cryptography", "Python"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "intern-6",
    name: "Zarin Subah",
    role: "Product & Growth Intern",
    institution: "North South University",
    contributions: [
      "Bengali Digital Product Messaging",
      "User Onboarding & Feedback Research",
      "Campus Pilot Launch Strategy",
    ],
    skills: ["Product Strategy", "Copywriting", "Growth", "User Research"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

export const allTeamMembers: TeamMember[] = [
  leadership,
  ...coreTeam,
  ...interns,
];

const borderColors = ["#00c2ff", "#0f4cff", "#38bdf8", "#60a5fa", "#34d399", "#818cf8"];
const gradients = [
  "linear-gradient(145deg, rgba(15, 76, 255, 0.25), rgba(7, 19, 43, 0.85), rgba(5, 11, 26, 0.95))",
  "linear-gradient(145deg, rgba(0, 194, 255, 0.22), rgba(7, 19, 43, 0.85), rgba(5, 11, 26, 0.95))",
  "linear-gradient(145deg, rgba(56, 189, 248, 0.22), rgba(7, 19, 43, 0.85), rgba(5, 11, 26, 0.95))",
  "linear-gradient(145deg, rgba(96, 165, 250, 0.22), rgba(7, 19, 43, 0.85), rgba(5, 11, 26, 0.95))",
  "linear-gradient(145deg, rgba(52, 211, 153, 0.22), rgba(7, 19, 43, 0.85), rgba(5, 11, 26, 0.95))",
  "linear-gradient(145deg, rgba(129, 140, 248, 0.22), rgba(7, 19, 43, 0.85), rgba(5, 11, 26, 0.95))",
];

export const chromaInterns = interns.map((m, idx) => ({
  image: m.avatar || `https://i.pravatar.cc/300?img=${[12, 33, 47, 68, 59, 25][idx % 6]}`,
  title: m.name,
  subtitle: m.role,
  handle: `@${m.name.toLowerCase().split(" ")[0]}`,
  borderColor: borderColors[idx % borderColors.length],
  gradient: gradients[idx % gradients.length],
  url: m.socials?.linkedin || m.socials?.github,
  institution: m.institution,
  contributions: m.contributions,
  skills: m.skills,
}));

export const chromaAllMembers = allTeamMembers.map((m, idx) => ({
  image: m.avatar || `https://i.pravatar.cc/300?img=${[8, 11, 3, 12, 33, 47, 68, 59, 25][idx % 9]}`,
  title: m.name,
  subtitle: m.role,
  handle: `@${m.name.toLowerCase().split(" ")[0]}`,
  borderColor: borderColors[idx % borderColors.length],
  gradient: gradients[idx % gradients.length],
  url: m.socials?.linkedin || m.socials?.github,
  institution: m.institution,
  contributions: m.contributions,
  skills: m.skills,
}));

