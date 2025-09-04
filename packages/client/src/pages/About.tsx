// src/pages/About.tsx
import { useEffect, useMemo, type JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
   FaClock,
   FaChartLine,
   FaHandsHelping,
   FaUsers,
   FaGlobe,
} from 'react-icons/fa';

// shadcn/ui components (adjust import paths if different)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type TeamMember = {
   id: string;
   name: string;
   role: string;
   bio?: string;
   avatar?: string; // either public path or filename (we resolve both)
   linkedin?: string;
};

const TEAM: TeamMember[] = [
   {
      id: 'shannon',
      name: 'Shannon Chipezeze',
      role: 'Founder & Principal Engineer',
      bio: 'Product-led engineer focusing on fast frontends, reliable APIs and responsible AI integrations.',
      // keep existing value — the render will resolve this dynamically
      avatar: '/assets/images/about/shannon.jpg',
      linkedin: 'https://www.linkedin.com',
   },
   {
      id: 'shahyana',
      name: 'Shahyana C.',
      role: 'Head of Design',
      bio: 'Design systems, accessibility and conversion-focused UX.',
      avatar: '/assets/images/about/shahyana.jpg',
      linkedin: 'https://www.linkedin.com',
   },
   {
      id: 'idris',
      name: 'Idris C.',
      role: 'Lead DevOps',
      bio: 'Infrastructure, observability and production operations.',
      avatar: '/assets/images/about/idris.jpg',
      linkedin: 'https://www.linkedin.com',
   },
];

// Helper: extract basename (filename with extension) from path or URL
function basename(path?: string | null): string | null {
   if (!path) return null;
   const parts = path.split('/');
   return parts[parts.length - 1] || null;
}

export default function About(): JSX.Element {
   useEffect(() => {
      document.title = 'About — ShannyTech';
      return () => {
         document.title = 'ShannyTech';
      };
   }, []);

   /**
    * Dynamically import images via Vite glob.
    * We use eager mode so the assets are resolved at build time and are available synchronously.
    *
    * Directory structure expected (relative to this file):
    *  - ../assets/hero/*.webp | jpg | png
    *  - ../assets/images/about/*.jpg | webp | png  (team avatars)
    *
    * If your images are located elsewhere, update the glob paths below.
    */
   const { heroSrc, teamImagesMap, defaultAvatar } = useMemo(() => {
      // import hero images
      const heroModules = import.meta.glob(
         '../assets/hero/*.{jpg,jpeg,png,webp}',
         { eager: true }
      ) as Record<string, { default: string }>;
      // import team avatars (about)
      const teamModules = import.meta.glob(
         '../assets/images/about/*.{jpg,jpeg,png,webp}',
         { eager: true }
      ) as Record<string, { default: string }>;
      // also import a default avatar fallback (optional)
      const defaultModule = import.meta.glob(
         '../assets/team/default-avatar.*',
         { eager: true }
      ) as Record<string, { default: string }>;

      // build hero array (sorted by filename)
      const heroPaths = Object.keys(heroModules)
         .sort()
         .map((k) => heroModules[k].default);

      // pick a hero image that contains 'about' if available, else first
      let heroCandidate = heroPaths.find((p) => /about/i.test(p));
      if (!heroCandidate) heroCandidate = heroPaths[0] ?? '';

      // build team map keyed by filename (e.g. 'shannon.jpg' -> '/_assets/...hash...webp')
      const teamMap: Record<string, string> = {};
      Object.keys(teamModules).forEach((k) => {
         const name = k.split('/').pop() as string;
         teamMap[name] = teamModules[k].default;
      });

      // default avatar fallback (first match)
      const defaultAvatarPath = Object.keys(defaultModule).length
         ? defaultModule[Object.keys(defaultModule)[0]].default
         : '';

      return {
         heroSrc: heroCandidate,
         teamImagesMap: teamMap,
         defaultAvatar: defaultAvatarPath,
      };
   }, []);

   // Render
   return (
      <main
         id="main-content"
         className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
      >
         {/* HERO */}
         <section className="relative overflow-hidden" aria-label="About hero">
            {/* Background image (dynamically loaded) */}
            <div className="absolute inset-0 -z-10">
               {heroSrc ? (
                  // use img tag for better decoding behavior; lazy when not critical
                  <img
                     src={heroSrc}
                     alt=""
                     className="w-full h-full object-cover object-center opacity-70 dark:opacity-30"
                     style={{ filter: 'saturate(0.95) contrast(1.02)' }}
                     loading="lazy"
                  />
               ) : (
                  <div className="w-full h-full bg-gradient-to-b from-amber-50 to-emerald-50" />
               )}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 dark:from-transparent dark:to-black/60" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
               <div className="max-w-3xl">
                  <motion.h1
                     initial={{ opacity: 0, y: 6 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.45 }}
                     className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-black drop-shadow-md"
                  >
                     We build modern products that empower communities and
                     businesses.
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.08, duration: 0.45 }}
                     className="mt-4 text-lg text-white/90"
                  >
                     ShannyTech designs and engineers web, mobile and cloud
                     solutions — often with AI — so teams can scale, serve more
                     people, and reduce operational overhead.
                  </motion.p>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                     <Link to="/contact" aria-label="Contact ShannyTech">
                        <Button className="bg-amber-400 text-black px-5 py-3 shadow-lg">
                           Talk to an expert
                        </Button>
                     </Link>

                     <a
                        href="#values"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-white/20 text-white/95 text-sm hover:bg-white/5 transition"
                     >
                        Our values
                     </a>
                  </div>
               </div>
            </div>
         </section>

         {/* MISSION - VISION */}
         <section id="values" className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                     <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-amber-400/10 p-3 text-amber-400">
                           <FaHandsHelping size={20} />
                        </div>
                        <div>
                           <h3 className="text-lg font-semibold">Mission</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              To help organizations and communities bridge the
                              digital divide through practical, measurable
                              digital products and services.
                           </p>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6">
                     <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-emerald-400/10 p-3 text-emerald-400">
                           <FaGlobe size={20} />
                        </div>
                        <div>
                           <h3 className="text-lg font-semibold">Vision</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              A world where modern tooling and responsible AI
                              help local businesses thrive and public services
                              reach everyone.
                           </p>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-6">
                     <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-sky-400/10 p-3 text-sky-500">
                           <FaChartLine size={20} />
                        </div>
                        <div>
                           <h3 className="text-lg font-semibold">Approach</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              Product-first, iterative delivery. We ship tested
                              increments, measure outcomes, and continuously
                              improve.
                           </p>
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
         </section>

         {/* WHAT WE DO — grid of cards */}
         <section className="py-12 bg-slate-50 dark:bg-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <header className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                     What we do
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
                     From product discovery and UX to production-ready backends
                     and AI-enabled experiences.
                  </p>
               </header>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-5 hover:shadow-lg transition">
                     <div className="flex items-start gap-3">
                        <div className="rounded-md p-3 bg-amber-400/10 text-amber-400">
                           <FaUsers />
                        </div>
                        <div>
                           <h3 className="font-semibold">Product Design</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              UX research, wireframes, and design systems built
                              for accessibility.
                           </p>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-5 hover:shadow-lg transition">
                     <div className="flex items-start gap-3">
                        <div className="rounded-md p-3 bg-emerald-400/10 text-emerald-400">
                           <FaClock />
                        </div>
                        <div>
                           <h3 className="font-semibold">Engineering</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              React, Vite, Bun-ready APIs, and resilient
                              deployment pipelines.
                           </p>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-5 hover:shadow-lg transition">
                     <div className="flex items-start gap-3">
                        <div className="rounded-md p-3 bg-sky-400/10 text-sky-400">
                           <FaChartLine />
                        </div>
                        <div>
                           <h3 className="font-semibold">Data & AI</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              Semantic search, RAG, and data pipelines that turn
                              documents into answers.
                           </p>
                        </div>
                     </div>
                  </Card>

                  <Card className="p-5 hover:shadow-lg transition">
                     <div className="flex items-start gap-3">
                        <div className="rounded-md p-3 bg-rose-400/10 text-rose-400">
                           <FaHandsHelping />
                        </div>
                        <div>
                           <h3 className="font-semibold">Cloud & Ops</h3>
                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              Managed MySQL, monitoring, CI/CD and
                              cost-conscious infrastructure.
                           </p>
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
         </section>

         {/* METRICS / SOCIAL PROOF */}
         <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow">
                     <div className="text-3xl font-extrabold text-amber-400">
                        200+
                     </div>
                     <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Projects delivered
                     </div>
                  </div>

                  <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow">
                     <div className="text-3xl font-extrabold text-emerald-400">
                        95%
                     </div>
                     <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Client satisfaction
                     </div>
                  </div>

                  <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow">
                     <div className="text-3xl font-extrabold text-sky-400">
                        24/7
                     </div>
                     <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Support & monitoring options
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* TIMELINE / MILESTONES */}
         <section className="py-12 bg-slate-50 dark:bg-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                  Our journey
               </h3>

               <ol className="relative border-l border-slate-200 dark:border-slate-700">
                  <li className="mb-10 ml-6">
                     <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-black">
                        2019
                     </span>
                     <h4 className="text-lg font-semibold">Foundation</h4>
                     <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        ShannyTech started as a freelance consultancy focused on
                        fast frontends and accessible websites.
                     </p>
                  </li>

                  <li className="mb-10 ml-6">
                     <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-black">
                        2021
                     </span>
                     <h4 className="text-lg font-semibold">Product focus</h4>
                     <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Shifted to product-first delivery and began offering
                        managed services and cloud architecture.
                     </p>
                  </li>

                  <li className="mb-10 ml-6">
                     <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-sky-400 text-black">
                        2023
                     </span>
                     <h4 className="text-lg font-semibold">AI & scale</h4>
                     <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Expanded services to include semantic search, RAG
                        assistants and observability-first infra.
                     </p>
                  </li>
               </ol>
            </div>
         </section>

         {/* TEAM */}
         <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                     Meet the team
                  </h3>
               </div>

               <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {TEAM.map((m) => {
                     // Determine avatar src: resolve by basename mapped to imported team images,
                     // or fall back to provided path, or the default avatar.
                     const base = basename(m.avatar) ?? '';
                     const avatarSrc =
                        (teamImagesMap[base] || m.avatar || defaultAvatar) ??
                        defaultAvatar;

                     return (
                        <Card key={m.id} className="p-5">
                           <div className="flex gap-4 items-start">
                              <img
                                 src={avatarSrc}
                                 alt={`${m.name} avatar`}
                                 className="h-14 w-14 rounded-full object-cover shadow"
                                 loading="lazy"
                              />
                              <div className="flex-1">
                                 <div className="flex items-center justify-between">
                                    <div>
                                       <div className="font-semibold text-slate-900 dark:text-white">
                                          {m.name}
                                       </div>
                                       <div className="text-sm text-slate-500 dark:text-slate-300">
                                          {m.role}
                                       </div>
                                    </div>

                                    {m.linkedin && (
                                       <a
                                          href={m.linkedin}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-slate-400 hover:text-amber-400 ml-4 text-sm"
                                       >
                                          LinkedIn
                                       </a>
                                    )}
                                 </div>

                                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                    {m.bio}
                                 </p>
                              </div>
                           </div>
                        </Card>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* FAQ & CTA */}
         <section className="py-12 bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Frequently asked questions
                     </h3>

                     <div className="mt-4 space-y-3">
                        <details className="group rounded-lg bg-white dark:bg-slate-800 p-4">
                           <summary className="cursor-pointer font-medium text-slate-900 dark:text-white">
                              How long does a typical project take?
                           </summary>
                           <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              Projects typically range from 4–16 weeks depending
                              on scope and integrations — we provide clear
                              milestones and delivery cadence during discovery.
                           </div>
                        </details>

                        <details className="group rounded-lg bg-white dark:bg-slate-800 p-4">
                           <summary className="cursor-pointer font-medium text-slate-900 dark:text-white">
                              Do you offer ongoing support?
                           </summary>
                           <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              Yes — we offer retainers, managed services and
                              24/7 monitoring options for production systems.
                           </div>
                        </details>
                     </div>
                  </div>

                  <aside className="rounded-xl p-6 bg-white dark:bg-slate-800 shadow">
                     <h4 className="text-lg font-semibold">Ready to start?</h4>
                     <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Book a free consultation and get a practical roadmap
                        tailored to your needs.
                     </p>
                     <div className="mt-4">
                        <Link to="/contact">
                           <Button className="bg-amber-400 text-black px-4 py-2">
                              Book consultation
                           </Button>
                        </Link>
                        <Link
                           to="/services"
                           className="ml-3 inline-block text-sm text-slate-600 dark:text-slate-300 hover:underline"
                        >
                           Explore services
                        </Link>
                     </div>
                  </aside>
               </div>
            </div>
         </section>
      </main>
   );
}
