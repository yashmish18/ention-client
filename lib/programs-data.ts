/**
 * Ention Programs & Ecosystem Data
 * Single source of truth for all collaborate/programs content.
 * Wire to backend via GET /api/programs when ready.
 */

export interface ProgramFAQ {
    q: string;
    a: string;
}

export interface Program {
    id: string;
    slug: string;
    emoji: string;
    badge: string;
    title: string;
    subtitle: string;
    hero: string;
    heroSub: string;
    for: string[];
    overview: string;
    deliverables: string[];
    benefits: string[];
    outcomes: string[];
    commercialModel: string[];
    engagementModels: string[];
    whyEntion: string[];
    howItWorks: string[];
    faqs: ProgramFAQ[];
    cta: string;
    ctaLabel: string;
    accentColor: string;
}

export const PROGRAMS: Program[] = [
    {
        id: "innovation-labs",
        slug: "innovation-labs",
        emoji: "🧩",
        badge: "For Institutions",
        title: "Innovation Labs & Institutional Programs",
        subtitle: "End-to-end lab setup with AI-ready computing infrastructure",
        hero: "Empowering Future Innovators with Technology",
        heroSub: "Build modern labs and innovation ecosystems with scalable, high-performance computing solutions.",
        for: ["Universities & engineering colleges", "Schools building digital / AI labs", "Research labs & AI centers", "Institutions upgrading existing infrastructure"],
        overview: "We partner with educational institutions to design and deploy future-ready computing infrastructure and innovation programs, enabling practical learning, research, and industry exposure.",
        deliverables: [
            "30 / 50 / 100+ device lab setup options",
            "Pre-configured AI / development environments",
            "Custom hardware configurations",
            "Lab management & deployment support",
            "Faculty training & onboarding",
            "Workshops, hackathons & internship integration",
            "Annual maintenance & technical support"
        ],
        benefits: [
            "Institutional pricing & cost efficiency",
            "Faster lab deployment (plug-and-play)",
            "Industry-ready student exposure",
            "AI & research enablement",
            "Co-branding opportunities"
        ],
        outcomes: [
            "Set up AI labs for 100–500+ students",
            "Enabled project-based learning environments",
            "Reduced infrastructure setup complexity by 40%",
            "Improved student placement readiness"
        ],
        commercialModel: [
            "One-time lab setup cost",
            "Per-device institutional pricing",
            "Optional AMC (Annual Maintenance Contract)",
            "Leasing / EMI options available",
            "Custom pricing based on scale"
        ],
        engagementModels: [
            "Direct purchase",
            "Lab-as-a-Service (subscription model)",
            "Co-branded institutional partnerships"
        ],
        whyEntion: [
            "Combines hardware + programs + ecosystem",
            "Custom-built solutions (not generic devices)",
            "Long-term academic partnership approach",
            "Cost-optimized for Indian institutions"
        ],
        howItWorks: [
            "Requirement discussion",
            "Solution design",
            "Deployment & setup",
            "Ongoing support"
        ],
        faqs: [
            { q: "Minimum lab size?", a: "Flexible — starts from ~20 devices" },
            { q: "Setup timeline?", a: "2–6 weeks depending on scale" },
            { q: "Is training included?", a: "Yes — for both faculty and students" },
            { q: "Custom configurations?", a: "Fully supported" }
        ],
        cta: "Ready to build your innovation lab with Ention?",
        ctaLabel: "Apply for Program",
        accentColor: "#F27D26"
    },
    {
        id: "startup-ecosystem",
        slug: "startup-ecosystem",
        emoji: "🚀",
        badge: "For Incubators",
        title: "Startup Ecosystem Partnerships",
        subtitle: "Device access, financing, and co-branded programs for startup communities",
        hero: "Powering Startup Ecosystems with Technology Access",
        heroSub: "Enable your startup network with scalable, affordable computing infrastructure.",
        for: ["Incubators & accelerators", "Innovation hubs & startup communities", "Banks & financial institutions supporting MSMEs", "Government ecosystem programs"],
        overview: "We collaborate with ecosystem enablers to provide startups and MSMEs with structured access to high-performance devices, financing, and innovation programs.",
        deliverables: [
            "Device access programs for startups",
            "Bulk deployment across ecosystem",
            "Leasing & financing integration",
            "Co-branded startup programs",
            "Dedicated partner support"
        ],
        benefits: [
            "Exclusive startup pricing",
            "Flexible leasing & credit models",
            "Scalable infrastructure access",
            "Faster startup onboarding",
            "Stronger ecosystem value proposition"
        ],
        outcomes: [
            "Enabled 50–500+ startups with device access",
            "Reduced upfront cost barriers for founders",
            "Increased program participation for partners",
            "Strengthened incubator offerings"
        ],
        commercialModel: [
            "Partner-based pricing structure",
            "Revenue-sharing (optional)",
            "Leasing / financing integration",
            "Volume-based discounts"
        ],
        engagementModels: [
            "MoU-based ecosystem partnerships",
            "Co-branded programs",
            "Revenue-sharing collaborations"
        ],
        whyEntion: [
            "Focused on startup ecosystem enablement",
            "Flexible financial models",
            "Scalable deployment capability",
            "Long-term partner support"
        ],
        howItWorks: [
            "Submit partnership request",
            "Evaluation & alignment",
            "Program structuring",
            "Launch & onboarding"
        ],
        faqs: [
            { q: "Minimum startups required?", a: "Flexible — no hard minimum" },
            { q: "Can we co-brand programs?", a: "Yes — full co-branding supported" },
            { q: "Financing options included?", a: "Yes — leasing & EMI available" },
            { q: "Dedicated support?", a: "Provided throughout the partnership" }
        ],
        cta: "Strengthen your startup ecosystem with Ention",
        ctaLabel: "Apply for Partnership",
        accentColor: "#F27D26"
    },
    {
        id: "campus-ambassador",
        slug: "campus-ambassador",
        emoji: "🎓",
        badge: "For Students",
        title: "Campus Ambassador Program (ECAP)",
        subtitle: "Represent Ention on campus — earn certificates, internships & rewards",
        hero: "Lead Innovation on Your Campus",
        heroSub: "Become the face of Ention in your college.",
        for: ["College students (all streams)", "Tech enthusiasts & community leaders", "Students interested in startups & innovation"],
        overview: "The Ention Campus Ambassador Program builds a network of student leaders who drive awareness, organize events, and promote innovation across campuses in India.",
        deliverables: [
            "Official campus representative role",
            "Event & workshop execution opportunities",
            "Content creation & branding exposure",
            "Direct connection with Ention team"
        ],
        benefits: [
            "Certificate & LinkedIn recognition",
            "Internship & PPO opportunities",
            "Industry exposure",
            "Rewards, goodies & incentives"
        ],
        outcomes: [
            "Organized tech events & workshops",
            "Built campus tech communities",
            "Secured internships & career opportunities"
        ],
        commercialModel: [
            "Free to join",
            "Performance-based rewards & incentives"
        ],
        engagementModels: [
            "Semester-based engagement",
            "Performance-driven growth"
        ],
        whyEntion: [
            "Real industry exposure (not just certificates)",
            "Direct career opportunities",
            "Hands-on experience in tech ecosystem"
        ],
        howItWorks: [
            "Apply online",
            "Submit short pitch",
            "Get shortlisted",
            "Start your journey"
        ],
        faqs: [
            { q: "Eligibility?", a: "Any college student — all streams welcome" },
            { q: "Time commitment?", a: "Flexible — work alongside your studies" },
            { q: "Is it paid?", a: "Incentive-based — performance rewards provided" }
        ],
        cta: "Start your journey with Ention",
        ctaLabel: "Apply Now",
        accentColor: "#F27D26"
    },
    {
        id: "co-creation",
        slug: "co-creation",
        emoji: "🤝",
        badge: "For Businesses",
        title: "Co-Creation & Shared Innovation",
        subtitle: "Joint hardware, software, and ecosystem co-development for faster market entry",
        hero: "Build Together. Innovate Faster. Scale Smarter.",
        heroSub: "We collaborate to co-create hardware, software, and ecosystem solutions.",
        for: ["Startups & MSMEs", "Corporates entering hardware space", "Research labs & innovation teams", "New brands with white-label needs"],
        overview: "We collaborate to co-create hardware, software, and ecosystem solutions, enabling faster product development and market entry through shared expertise, infrastructure, and resources.",
        deliverables: [
            "Joint product development",
            "Hardware & software co-creation",
            "White-label manufacturing support",
            "Pilot programs & testing",
            "Infrastructure & R&D access"
        ],
        benefits: [
            "Faster go-to-market",
            "Reduced development cost",
            "Access to expertise & infrastructure",
            "Strategic collaboration",
            "Market-ready solutions"
        ],
        outcomes: [
            "Helped brands launch computing devices",
            "Reduced product development timelines",
            "Enabled shared innovation ecosystems"
        ],
        commercialModel: [
            "Project-based pricing",
            "Revenue-sharing (optional)",
            "White-label manufacturing cost model"
        ],
        engagementModels: [
            "Joint development partnerships",
            "White-label agreements",
            "Strategic collaborations"
        ],
        whyEntion: [
            "Combines manufacturing + ecosystem + programs",
            "Flexible collaboration models",
            "Strong execution capability",
            "Partner-first approach"
        ],
        howItWorks: [
            "Submit your idea",
            "Feasibility evaluation",
            "Co-development planning",
            "Execution & scaling"
        ],
        faqs: [
            { q: "Can we launch our own brand?", a: "Yes — white-label fully supported" },
            { q: "Minimum scale?", a: "Case-based — we evaluate each project" },
            { q: "Development support?", a: "End-to-end support provided" }
        ],
        cta: "Let's build something impactful together",
        ctaLabel: "Start Collaboration",
        accentColor: "#F27D26"
    }
];

export function getProgramBySlug(slug: string): Program | undefined {
    return PROGRAMS.find(p => p.slug === slug);
}
