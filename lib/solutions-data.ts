export interface FAQItem {
  q: string;
  a: string;
}

export interface SolutionData {
  id: string;
  category: "Solutions" | "Ecosystem Programs";
  name: string;
  heroTitle: string;
  heroSub: string;
  whoThisIsFor: string[];
  overview: string;
  whatYouGet: string[];
  keyBenefits: string[];
  useCases: string[];
  deploymentModels: string[];
  whyEntion: string[];
  howItWorks: string[];
  faqs: FAQItem[];
  finalCta: string;
  ctaLabel: string;
}

export const SOLUTIONS_DATA: SolutionData[] = [
  {
    id: "s1",
    category: "Solutions",
    name: "Innovation Labs & Institutional Enablement",
    heroTitle: "Empowering Future Innovators with Technology",
    heroSub: "Build modern innovation labs and future-ready computing environments with scalable infrastructure, deployment support, and ecosystem enablement.",
    whoThisIsFor: [
      "Universities & engineering colleges",
      "Schools building AI or digital labs",
      "Research labs & innovation centers",
      "Institutions upgrading existing infrastructure"
    ],
    overview: "Ention partners with educational institutions to design and deploy modern computing infrastructure that enables practical learning, AI development, research, and innovation-driven education.",
    whatYouGet: [
      "Device lab setup options(No Minimum limit)",
      "AI & development-ready environments",
      "Custom hardware configurations",
      "Lab deployment & management support",
      "Faculty onboarding & training",
      "Workshops, hackathons & internship integration",
      "AMC & technical support options"
    ],
    keyBenefits: [
      "Faster lab deployment",
      "Industry-ready learning environments",
      "AI & research enablement",
      "Cost-efficient institutional pricing",
      "Long-term academic partnership support"
    ],
    useCases: [
      "AI & development lab deployment",
      "Project-based learning environments",
      "Research & innovation infrastructure",
      "Institution-wide technology modernization"
    ],
    deploymentModels: [
      "Direct institutional purchase",
      "Lab-as-a-Service model",
      "Leasing & financing options",
      "Co-branded institutional partnerships"
    ],
    whyEntion: [
      "Combines infrastructure with ecosystem enablement",
      "Custom-built institutional solutions",
      "Long-term partnership approach",
      "Cost-optimized deployment models for India"
    ],
    howItWorks: [
      "Requirement discussion",
      "Solution planning & configuration",
      "Deployment & onboarding",
      "Ongoing support & scaling"
    ],
    faqs: [
      {
        q: "Minimum lab size?",
        a: "Flexible based on institutional requirements."
      },
      {
        q: "Are custom configurations supported?",
        a: "Yes, fully customizable."
      },
      {
        q: "Is faculty training included?",
        a: "Yes, onboarding and training support are available."
      },
      {
        q: "Are financing options available?",
        a: "Yes, leasing and EMI options are supported."
      }
    ],
    finalCta: "Ready to build your innovation ecosystem with Ention?",
    ctaLabel: "Discuss Your Lab Setup"
  },
  {
    id: "s2",
    category: "Solutions",
    name: "Educational Institution Solutions",
    heroTitle: "Affordable Computing Solutions for Modern Education",
    heroSub: "Enable students, educators, and institutions with scalable, reliable, and cost-effective computing solutions designed for modern learning environments.",
    whoThisIsFor: [
      "Colleges, universities & training institutes",
      "Schools & academic organizations",
      "Coaching centers & skill development organizations",
      "Institutions deploying student device programs"
    ],
    overview: "Ention helps educational institutions deploy affordable, high-performance computing solutions with flexible configurations, institutional branding, and long-term support.",
    whatYouGet: [
      "Affordable performance laptops",
      "Bulk institutional deployment",
      "Custom configurations for learning needs",
      "Institutional branding options",
      "Smart device management support",
      "Student & faculty device programs",
      "Deployment & onboarding assistance",
      "AMC & technical support options"
    ],
    keyBenefits: [
      "Cost-effective institutional pricing",
      "Simplified large-scale deployment",
      "Flexible configuration options",
      "Reliable long-term support",
      "Improved digital learning access"
    ],
    useCases: [
      "Student laptop deployment programs",
      "Campus-wide device enablement",
      "Digital classroom infrastructure",
      "Skill development & training environments"
    ],
    deploymentModels: [
      "Direct institutional purchase",
      "Bulk device deployment",
      "Leasing & EMI options",
      "Annual maintenance support"
    ],
    whyEntion: [
      "Education-focused deployment approach",
      "Flexible pricing & scaling models",
      "Reliable after-sales support",
      "Long-term institutional partnership mindset"
    ],
    howItWorks: [
      "Requirement discussion",
      "Device & deployment planning",
      "Configuration & onboarding",
      "Ongoing support & scaling"
    ],
    faqs: [
      {
        q: "Minimum order quantity?",
        a: "Flexible based on institutional requirements."
      },
      {
        q: "Is institutional branding available?",
        a: "Yes, branding support is available."
      },
      {
        q: "Are financing options supported?",
        a: "Yes, leasing and EMI options are available."
      },
      {
        q: "Are custom configurations available?",
        a: "Yes, fully customizable."
      }
    ],
    finalCta: "Ready to modernize your institution’s computing infrastructure?",
    ctaLabel: "Discuss Your Requirements"
  },
  {
    id: "s3",
    category: "Solutions",
    name: "Enterprise & Organizational Solutions",
    heroTitle: "Enterprise Computing Built for Scale",
    heroSub: "Flexible computing infrastructure, deployment support, and lifecycle management solutions designed for modern organizations and growing teams.",
    whoThisIsFor: [
      "Corporates & enterprises",
      "SMEs & growing businesses",
      "Startup teams & remote workforces",
      "Organizations upgrading computing infrastructure"
    ],
    overview: "Ention provides scalable enterprise computing solutions with customized hardware configurations, operational support, and flexible deployment models for modern businesses.",
    whatYouGet: [
      "Custom hardware configurations",
      "Business laptop deployment",
      "Try-before-buy experience programs",
      "Leasing & financing solutions",
      "AMC & lifecycle management support",
      "Dedicated deployment assistance",
      "IT support & maintenance services",
      "Bulk procurement support"
    ],
    keyBenefits: [
      "Scalable business deployment",
      "Reduced infrastructure complexity",
      "Flexible financing models",
      "Reliable lifecycle support",
      "Faster onboarding & operational readiness"
    ],
    useCases: [
      "Workforce device deployment",
      "Remote & hybrid work enablement",
      "Enterprise IT modernization",
      "Startup team infrastructure setup"
    ],
    deploymentModels: [
      "Direct purchase",
      "Leasing & subscription options",
      "AMC support programs",
      "Enterprise procurement partnerships"
    ],
    whyEntion: [
      "Enterprise-focused deployment approach",
      "Custom infrastructure capabilities",
      "Long-term operational support",
      "Cost-optimized business solutions"
    ],
    howItWorks: [
      "Share organizational requirements",
      "Solution planning & configuration",
      "Deployment & onboarding",
      "Ongoing support & lifecycle management"
    ],
    faqs: [
      {
        q: "Can hardware configurations be customized?",
        a: "Yes, fully customizable."
      },
      {
        q: "Are leasing options available?",
        a: "Yes, flexible financing models are supported."
      },
      {
        q: "Is dedicated support included?",
        a: "Yes, enterprise support options are available."
      },
      {
        q: "Can solutions scale as teams grow?",
        a: "Yes, deployment models are designed for scalability."
      }
    ],
    finalCta: "Build scalable computing infrastructure with Ention.",
    ctaLabel: "Request Enterprise Solution"
  },
  {
    id: "s4",
    category: "Solutions",
    name: "Co-Creation & White-Label Solutions",
    heroTitle: "Build Custom Technology Solutions Together",
    heroSub: "From white-label devices to collaborative product development, Ention helps partners bring technology ideas to market faster.",
    whoThisIsFor: [
      "Startups & MSMEs",
      "Brands launching computing products",
      "Research labs & innovation teams",
      "Organizations needing custom hardware solutions"
    ],
    overview: "Ention collaborates with partners to co-create hardware, software, and white-label computing solutions with flexible manufacturing and deployment support.",
    whatYouGet: [
      "White-label laptop programs",
      "Custom hardware configurations",
      "Joint product development support",
      "Dedicated production batches",
      "Pilot testing & deployment support",
      "Dedicated after-sales services"
    ],
    keyBenefits: [
      "Faster product go-to-market",
      "Reduced development complexity",
      "Access to infrastructure & expertise",
      "Flexible collaboration models",
      "Market-ready deployment support"
    ],
    useCases: [
      "Custom computing device launches",
      "White-label product deployment",
      "Pilot hardware initiatives",
      "Collaborative innovation projects"
    ],
    deploymentModels: [
      "White-label partnerships",
      "Joint development agreements",
      "Project-based collaboration models",
      "Dedicated production partnerships"
    ],
    whyEntion: [
      "Combines manufacturing with ecosystem enablement",
      "Flexible co-creation capabilities",
      "Strong execution & deployment support",
      "Partner-focused collaboration approach"
    ],
    howItWorks: [
      "Submit your requirements or idea",
      "Feasibility & solution evaluation",
      "Co-development & planning",
      "Production, deployment & scaling"
    ],
    faqs: [
      {
        q: "Can we launch products under our own brand?",
        a: "Yes, white-label support is available."
      },
      {
        q: "Are custom hardware configurations supported?",
        a: "Yes, fully customizable."
      },
      {
        q: "Is manufacturing support included?",
        a: "Yes, production support is available."
      },
      {
        q: "Can projects scale over time?",
        a: "Yes, solutions are designed for long-term scalability."
      }
    ],
    finalCta: "Let’s build something impactful together.",
    ctaLabel: "Start Collaboration"
  },
  {
    id: "e1",
    category: "Ecosystem Programs",
    name: "Startup Ecosystem Partnerships",
    heroTitle: "Enabling Startup Ecosystems with Scalable Technology Access",
    heroSub: "Support startups and innovation communities with affordable computing infrastructure, financing access, and ecosystem-driven deployment programs.",
    whoThisIsFor: [
      "Incubators & accelerators",
      "Innovation hubs & startup communities",
      "Banks & financial institutions supporting MSMEs",
      "Government ecosystem initiatives"
    ],
    overview: "Ention collaborates with ecosystem enablers to provide startups and MSMEs with structured access to high-performance devices, financing models, and ecosystem support programs.",
    whatYouGet: [
      "Startup device access programs",
      "Bulk ecosystem deployment",
      "Leasing & financing integration",
      "Co-branded startup initiatives",
      "Dedicated partner support"
    ],
    keyBenefits: [
      "Startup-focused pricing models",
      "Reduced upfront infrastructure costs",
      "Faster startup onboarding",
      "Stronger ecosystem enablement",
      "Scalable deployment capabilities"
    ],
    useCases: [
      "Startup device enablement programs",
      "Incubator infrastructure partnerships",
      "MSME technology access initiatives",
      "Ecosystem-wide deployment support"
    ],
    deploymentModels: [
      "Partnership-based deployment",
      "Co-branded ecosystem initiatives",
      "Revenue-sharing collaborations",
      "Volume-based pricing structures"
    ],
    whyEntion: [
      "Focused on startup ecosystem enablement",
      "Flexible financial models",
      "Scalable operational support",
      "Long-term partnership approach"
    ],
    howItWorks: [
      "Submit partnership request",
      "Evaluation & alignment",
      "Program structuring",
      "Launch & onboarding"
    ],
    faqs: [
      {
        q: "Minimum startup network size?",
        a: "Flexible based on partnership scope."
      },
      {
        q: "Can programs be co-branded?",
        a: "Yes, co-branded initiatives are supported."
      },
      {
        q: "Are financing options included?",
        a: "Yes, financing integration is available."
      },
      {
        q: "Is dedicated partner support provided?",
        a: "Yes, dedicated support is included."
      }
    ],
    finalCta: "Strengthen your startup ecosystem with Ention.",
    ctaLabel: "Partner With Ention"
  },
  {
    id: "e2",
    category: "Ecosystem Programs",
    name: "Campus Ambassador Program (ECAP)",
    heroTitle: "Lead Innovation in Your Campus Community",
    heroSub: "Become part of the Ention ecosystem and help drive technology, innovation, and community engagement within your campus.",
    whoThisIsFor: [
      "College students from any stream",
      "Tech enthusiasts & community leaders",
      "Students interested in startups & innovation",
      "Campus event organizers & creators"
    ],
    overview: "The Ention Campus Ambassador Program (ECAP) builds a network of student leaders who represent Ention on campus through events, community engagement, and innovation-driven activities.",
    whatYouGet: [
      "Official campus ambassador role",
      "Event & workshop opportunities",
      "Community leadership experience",
      "Direct connection with the Ention team",
      "Branding & content exposure opportunities"
    ],
    keyBenefits: [
      "Certificate & LinkedIn recognition",
      "Internship & PPO opportunities",
      "Industry exposure & networking",
      "Exclusive rewards & incentives",
      "Hands-on ecosystem experience"
    ],
    useCases: [
      "Organized campus tech events",
      "Built student innovation communities",
      "Created peer learning initiatives",
      "Secured internships & career opportunities"
    ],
    deploymentModels: [
      "Semester-based engagement",
      "Performance-driven growth opportunities",
      "Campus-level community initiatives"
    ],
    whyEntion: [
      "Real industry exposure beyond certifications",
      "Direct learning & networking opportunities",
      "Hands-on experience in innovation ecosystems",
      "Career-focused growth environment"
    ],
    howItWorks: [
      "Apply online",
      "Submit a short introduction",
      "Get shortlisted",
      "Begin your ambassador journey"
    ],
    faqs: [
      {
        q: "Who can apply?",
        a: "Any college student can apply."
      },
      {
        q: "Is prior experience required?",
        a: "No, enthusiasm and initiative matter most."
      },
      {
        q: "Is this a paid opportunity?",
        a: "Performance-based rewards and incentives are available."
      },
      {
        q: "Is the program flexible with academics?",
        a: "Yes, participation is designed to be flexible."
      }
    ],
    finalCta: "Start your journey with Ention.",
    ctaLabel: "Apply Now"
  }
];

export function getSolutionById(id: string): SolutionData | undefined {
  return SOLUTIONS_DATA.find(s => s.id.toLowerCase() === id.toLowerCase());
}
