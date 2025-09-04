// src/data/servicesData.ts
export type Service = {
   id: string;
   slug: string;
   title: string;
   short: string;
   long: string;
   features: string[];
   tags?: string[]; // helpful for filters
   priceRange?: string;
   duration?: string;
   heroImage?: string; // path (public or src asset)
   color?: string; // tailwind gradient hint like 'from-amber-400 to-emerald-400'
   featured?: boolean;
   ctaText?: string;
   ctaHref?: string;
};

export const SERVICES: Service[] = [
   {
      id: 'web',
      slug: 'web-development',
      title: 'Web Development',
      short: 'Fast, accessible React frontends & static sites',
      long: 'We craft blazing-fast web apps and websites using Vite, React, Tailwind and Bun-friendly APIs. Accessible, SEO-forward and designed to convert — from prototype to production.',
      features: [
         'Responsive UI & accessibility (a11y)',
         'Vite + React performance optimizations',
         'Component-driven design & testing',
         'PWA, SSR or static export when appropriate',
      ],
      tags: ['frontend', 'performance', 'accessibility'],
      priceRange: '$3,500 — $25,000+',
      duration: '4–12 weeks',
      heroImage: '/assets/services/web-hero.webp',
      color: 'from-amber-400 to-emerald-400',
      featured: true,
      ctaText: 'Request web quote',
      ctaHref: '/contact',
   },

   {
      id: 'mobile',
      slug: 'mobile-apps',
      title: 'Mobile Apps',
      short: 'Native-like experiences for iOS & Android',
      long: 'Design and build performant mobile applications with a focus on native-feel UX, maintainability and efficient release cycles. We support React Native, Expo, and native toolchains when needed.',
      features: [
         'React Native / Expo',
         'App store releases',
         'Offline & sync',
         'Instrumentation & analytics',
      ],
      tags: ['mobile', 'app'],
      priceRange: '$8,000 — $80,000+',
      duration: '8–20 weeks',
      heroImage: '/assets/services/mobile-hero.webp',
      color: 'from-amber-400 to-sky-400',
      ctaText: 'Start a mobile project',
      ctaHref: '/contact',
   },

   {
      id: 'ai',
      slug: 'ai-integrations',
      title: 'AI Integrations',
      short: 'RAG, semantic search, assistants and automation',
      long: 'We integrate large language models into real workflows — retrieval-augmented generation (RAG), semantic search, document assistants, and automation pipelines — with safety and observability in mind.',
      features: [
         'RAG + embeddings',
         'Conversational assistants',
         'Semantic search',
         'Custom prompts & safety',
      ],
      tags: ['ai', 'ml', 'search'],
      priceRange: '$5,000 — $60,000+',
      duration: '6–16 weeks',
      heroImage: '/assets/services/ai-hero.webp',
      color: 'from-rose-400 to-amber-400',
      featured: true,
      ctaText: 'Explore AI services',
      ctaHref: '/services/ai-integrations',
   },

   {
      id: 'cloud',
      slug: 'cloud-devops',
      title: 'Cloud & DevOps',
      short: 'Scalable MySQL backends, observability, CI/CD',
      long: 'Design and operate resilient infrastructure with observability, autoscaling, secure networks and fast MySQL-backed APIs optimized for production workloads. We prefer lightweight, cost-conscious setups.',
      features: [
         'Bun + Express (or Node) APIs',
         'Managed MySQL',
         'CI/CD & infra-as-code',
         'Monitoring & alerts',
      ],
      tags: ['cloud', 'devops', 'mysql'],
      priceRange: '$4,000 — $50,000+',
      duration: '4–12 weeks',
      heroImage: '/assets/services/cloud-hero.webp',
      color: 'from-emerald-400 to-sky-400',
      ctaText: 'See our infra stack',
      ctaHref: '/services/cloud-devops',
   },

   {
      id: 'network',
      slug: 'networking',
      title: 'Networking & Consulting',
      short: 'Design, secure and optimize hybrid networks',
      long: 'Network architecture, onsite audits, VPNs and secure hybrid-cloud connectivity tailored to performance and budget constraints. We deliver practical designs and runbooks your ops team can operate.',
      features: [
         'Network audits',
         'Design & implementation',
         'Security hardening',
         'Optimization & monitoring',
      ],
      tags: ['network', 'security'],
      priceRange: '$2,000 — $30,000+',
      duration: '2–8 weeks',
      heroImage: '/assets/services/network-hero.webp',
      color: 'from-sky-400 to-amber-400',
      ctaText: 'Book a network audit',
      ctaHref: '/contact',
   },

   {
      id: 'cybersecurity',
      slug: 'cybersecurity',
      title: 'Cybersecurity',
      short: 'Protect your digital assets with pragmatic security',
      long: 'Risk-based security assessments, hardening, vulnerability scanning, and secure deployment patterns. We ensure your web, mobile and backend systems match best practices for confidentiality, integrity and availability.',
      features: [
         'Security assessments',
         'Vulnerability scanning',
         'Hardening & policies',
         'Incident response planning',
      ],
      tags: ['security', 'audit'],
      priceRange: '$2,500 — $40,000+',
      duration: '2–10 weeks',
      heroImage: '/assets/services/cyber-hero.webp',
      color: 'from-amber-400 to-rose-400',
      ctaText: 'Schedule a security review',
      ctaHref: '/contact',
   },

   {
      id: 'consulting',
      slug: 'it-consulting',
      title: 'IT Consulting',
      short: 'Strategy, audits & technical roadmaps',
      long: 'Technical strategy, architecture reviews, and advisory for leadership. We help teams choose the right trade-offs, plan migrations, and design roadmaps that align with business outcomes.',
      features: [
         'Technical strategy',
         'Architecture reviews',
         'Roadmaps & prioritization',
         'Governance',
      ],
      tags: ['consulting', 'strategy'],
      priceRange: '$1,500 — $25,000+',
      duration: '1–8 weeks',
      heroImage: '/assets/services/consulting-hero.webp',
      color: 'from-emerald-400 to-amber-400',
      ctaText: 'Request consulting',
      ctaHref: '/contact',
   },

   {
      id: 'data',
      slug: 'data-solutions',
      title: 'Data Solutions',
      short: 'ETL, warehousing & visualization',
      long: 'End-to-end data pipelines, warehousing, ETL/ELT, and dashboards that make your data actionable. We focus on durable pipelines, observability, and cost-effective storage.',
      features: [
         'ETL/ELT pipelines',
         'Data warehousing',
         'Dashboards & BI',
         'Data governance',
      ],
      tags: ['data', 'etl', 'analytics'],
      priceRange: '$3,000 — $45,000+',
      duration: '4–12 weeks',
      heroImage: '/assets/services/data-hero.webp',
      color: 'from-amber-400 to-emerald-500',
      ctaText: 'Talk data',
      ctaHref: '/contact',
   },

   {
      id: 'support',
      slug: 'it-support',
      title: 'IT Support & Managed Services',
      short: 'Managed ops, helpdesk & SLAs',
      long: "Ongoing support, managed services, and helpdesk options to keep systems healthy. Choose a monthly retainer or pay-as-you-go model to match your team's needs.",
      features: ['Managed ops', 'Helpdesk', 'On-call support', 'SLA options'],
      tags: ['support', 'managed'],
      priceRange: 'Retainer-based',
      duration: 'Ongoing',
      heroImage: '/assets/services/support-hero.webp',
      color: 'from-amber-300 to-emerald-400',
      ctaText: 'Get support',
      ctaHref: '/contact',
   },
];
