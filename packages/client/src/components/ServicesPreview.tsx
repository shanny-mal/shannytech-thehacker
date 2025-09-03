import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import type { IconType } from 'react-icons';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/* icons (Feather) */
import {
   FiCpu,
   FiCode,
   FiCloud,
   FiDatabase,
   FiBriefcase,
   FiSmartphone,
   FiShield,
   FiWifi,
   FiHeadphones,
   FiZap,
   FiBarChart2,
} from 'react-icons/fi';

/**
 * Modern ServicesPreview
 * - Featured card (large) + grid of uniform cards
 * - Colors: blue / orange / green + neutral black/white accents
 * - Subtle entrance + hover motion (respects reduced motion)
 */

/* --- Reordered services (prioritized) --- */
const SERVICES = [
   {
      id: 'ai',
      title: 'AI Integrations',
      slug: 'ai-integrations',
      desc: 'RAG, chat assistants, semantic search',
   },
   {
      id: 'web',
      title: 'Web Development',
      slug: 'web-development',
      desc: 'Fast, accessible React & static sites',
   },
   {
      id: 'cloud',
      title: 'Cloud & DevOps',
      slug: 'cloud-devops',
      desc: 'Scalable infra & observability',
   },
   {
      id: 'data',
      title: 'Data Solutions',
      slug: 'data-solutions',
      desc: 'ETL, warehousing & visualization',
   },
   {
      id: 'consulting',
      title: 'IT Consulting',
      slug: 'it-consulting',
      desc: 'Strategy, audits & assessments',
   },
   {
      id: 'mobile',
      title: 'Mobile Apps',
      slug: 'mobile-apps',
      desc: 'iOS & Android',
   },
   {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      slug: 'cybersecurity',
      desc: 'Protect your digital assets',
   },
   {
      id: 'network',
      title: 'Networking',
      slug: 'networking',
      desc: 'Design & optimize hybrid networks',
   },
   {
      id: 'it-support',
      title: 'IT Support',
      slug: 'it-support',
      desc: 'Managed services & helpdesk',
   },
] as const;

/* --- Motion --- */
const containerVariants: Variants = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.06 },
   },
};

const cardVariants: Variants = {
   hidden: { opacity: 0, y: 10, scale: 0.995 },
   show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42 } },
   hover: { y: -6, scale: 1.02, transition: { duration: 0.15 } },
};

/* --- Color accents (use Tailwind classes where possible) --- */
const accentClass = (i: number) =>
   i % 3 === 0
      ? 'from-blue-600 to-sky-400'
      : i % 3 === 1
        ? 'from-orange-400 to-orange-600'
        : 'from-green-500 to-emerald-400';

/* --- Icon map for services --- */
const SERVICE_ICON_MAP: Record<string, IconType> = {
   ai: FiCpu,
   web: FiCode,
   cloud: FiCloud,
   data: FiDatabase,
   consulting: FiBriefcase,
   mobile: FiSmartphone,
   cybersecurity: FiShield,
   network: FiWifi,
   'it-support': FiHeadphones,
};

export default function ServicesPreview(): JSX.Element {
   return (
      <section
         id="services"
         aria-labelledby="services-heading"
         className="relative py-16"
      >
         {/* Decorative subtle shapes */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
         >
            <div
               className="absolute right-[-120px] top-8 w-[480px] h-[480px] rounded-full blur-3xl opacity-20"
               style={{ background: 'linear-gradient(90deg,#0369A1,#FB923C)' }}
            />
            <div
               className="absolute left-[-100px] bottom-12 w-[360px] h-[360px] rounded-full blur-2xl opacity-12"
               style={{ background: 'linear-gradient(90deg,#10B981,#06B6D4)' }}
            />
         </div>

         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               {/* Left: heading + CTAs */}
               <div className="lg:col-span-4">
                  <h2
                     id="services-heading"
                     className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white"
                  >
                     Services that move products forward
                  </h2>
                  <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-prose">
                     From prototypes to production — integrated AI, secure
                     infrastructure and high-quality engineering. Pick a service
                     and let’s get started.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 items-center">
                     <Link to="/contact">
                        <Button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-orange-400 to-green-500 text-white shadow-md hover:brightness-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400">
                           Get a quote
                        </Button>
                     </Link>

                     <Link
                        to="/services"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:underline"
                     >
                        View all services →
                     </Link>
                  </div>

                  {/* small features */}
                  <div className="mt-8 grid grid-cols-1 gap-3">
                     <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white font-semibold">
                           <FiZap className="h-5 w-5" aria-hidden />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              Rapid prototypes
                           </div>
                           <div className="text-xs text-slate-500 dark:text-slate-300">
                              2–4 week proofs of concept
                           </div>
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white font-semibold">
                           <FiBarChart2 className="h-5 w-5" aria-hidden />
                        </div>
                        <div>
                           <div className="text-sm font-semibold text-slate-900 dark:text-white">
                              Observability
                           </div>
                           <div className="text-xs text-slate-500 dark:text-slate-300">
                              Monitoring, tracing & logs
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right: grid with a featured card + uniform cards */}
               <div className="lg:col-span-8">
                  <motion.div
                     variants={containerVariants}
                     initial="hidden"
                     animate="show"
                     className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                     {/* Featured card (takes full width on small screens, left on larger screens) */}
                     <motion.article
                        variants={cardVariants}
                        whileHover="hover"
                        role="article"
                        aria-labelledby="srv-feature"
                        className="sm:col-span-2"
                     >
                        <Card className="relative overflow-hidden rounded-2xl p-6 bg-white/85 backdrop-blur-md border border-black/6 dark:bg-slate-900/65 dark:border-white/6 shadow-xl">
                           <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                              <div className="flex-shrink-0 h-16 w-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md bg-gradient-to-br from-blue-600 to-sky-400">
                                 <FiCpu className="h-7 w-7" aria-hidden />
                              </div>

                              <div className="flex-1 min-w-0">
                                 <h3
                                    id="srv-feature"
                                    className="text-xl font-semibold text-slate-900 dark:text-white"
                                 >
                                    AI Integrations
                                 </h3>
                                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-prose">
                                    Build RAG, chat assistants and semantic
                                    search to turn documents into answers and
                                    help users be productive.
                                 </p>

                                 <div className="mt-4 flex items-center gap-3">
                                    <Link to="/services/ai-integrations">
                                       <Button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-orange-400 to-green-500 text-white">
                                          Explore AI services
                                       </Button>
                                    </Link>

                                    <span className="text-sm text-slate-500">
                                       Trusted by 200+ projects
                                    </span>
                                 </div>
                              </div>
                           </div>

                           {/* subtle decorative corner */}
                           <div
                              className="absolute -right-6 -top-6 w-32 h-32 opacity-6 pointer-events-none"
                              style={{
                                 background:
                                    'conic-gradient(#0369A1,#FB923C,#10B981)',
                              }}
                           />
                        </Card>
                     </motion.article>

                     {/* Remaining uniform cards */}
                     {SERVICES.slice(1).map((s, i) => {
                        const idx = i + 1; // original index
                        const Icon = SERVICE_ICON_MAP[s.id] ?? FiCode;
                        return (
                           <motion.article
                              key={s.id}
                              variants={cardVariants}
                              whileHover="hover"
                              role="article"
                              aria-labelledby={`srv-${s.id}`}
                              className=""
                           >
                              <Card className="h-full overflow-hidden rounded-2xl p-5 bg-white/80 backdrop-blur-md border border-black/6 dark:bg-slate-900/65 dark:border-white/6 shadow-lg hover:shadow-2xl transition">
                                 <div className="flex items-start gap-4">
                                    <div
                                       className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-md bg-gradient-to-br ${accentClass(idx)}`}
                                    >
                                       <Icon className="h-5 w-5" aria-hidden />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                       <h4
                                          id={`srv-${s.id}`}
                                          className="text-base font-semibold text-slate-900 dark:text-white"
                                       >
                                          {s.title}
                                       </h4>
                                       <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                          {s.desc}
                                       </p>

                                       <div className="mt-4 flex items-center gap-3">
                                          <Link
                                             to={`/services/${s.slug}`}
                                             className="z-10"
                                             aria-label={`Learn more about ${s.title}`}
                                          >
                                             <Button
                                                variant="ghost"
                                                className="text-sm px-3 py-2 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                             >
                                                Learn more
                                             </Button>
                                          </Link>

                                          <div
                                             className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white"
                                             style={{
                                                background:
                                                   idx % 3 === 0
                                                      ? 'linear-gradient(90deg,#0369A1,#06B6D4)'
                                                      : idx % 3 === 1
                                                        ? 'linear-gradient(90deg,#FB923C,#F97316)'
                                                        : 'linear-gradient(90deg,#10B981,#059669)',
                                             }}
                                             aria-hidden
                                          >
                                             <svg
                                                width="8"
                                                height="8"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="opacity-95 mr-1"
                                             >
                                                <circle
                                                   cx="12"
                                                   cy="12"
                                                   r="10"
                                                   fill="currentColor"
                                                />
                                             </svg>
                                             <span className="sr-only">
                                                category
                                             </span>
                                             <span className="ml-0.5">
                                                {idx % 3 === 0
                                                   ? 'Ops'
                                                   : idx % 3 === 1
                                                     ? 'Cloud'
                                                     : 'Support'}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </Card>
                           </motion.article>
                        );
                     })}
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   );
}
