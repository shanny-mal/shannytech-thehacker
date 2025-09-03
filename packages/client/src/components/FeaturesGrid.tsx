import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import {
   FiZap,
   FiCpu,
   FiShield,
   FiHeadphones,
   FiCheckCircle,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

/**
 * FeaturesGrid — refreshed UI
 * - modern cards with icon badges, gradients and subtle motion
 * - respects prefers-reduced-motion
 * - color palette: blue / orange / green / black / white
 */

const FEATURES = [
   {
      id: 'speed',
      title: 'Built for speed',
      desc: 'From Bun-powered APIs to optimized frontends, performance is the baseline.',
      icon: FiZap,
      accent: ['from-blue-600', 'to-sky-400'],
   },
   {
      id: 'ai',
      title: 'AI-first workflows',
      desc: 'Semantic search, assistants and content pipelines to speed up teams.',
      icon: FiCpu,
      accent: ['from-indigo-600', 'to-emerald-400'],
   },
   {
      id: 'secure',
      title: 'Security & compliance',
      desc: 'Secure defaults, monitoring, and best practices baked in.',
      icon: FiShield,
      accent: ['from-orange-400', 'to-amber-500'],
   },
   {
      id: 'support',
      title: 'Operational support',
      desc: 'SLA-grade support and knowledge transfer to your teams.',
      icon: FiHeadphones,
      accent: ['from-green-500', 'to-emerald-400'],
   },
] as const;

const containerVariants: Variants = {
   hidden: { opacity: 0 },
   show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function FeaturesGrid(): JSX.Element {
   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

   useEffect(() => {
      if (typeof window === 'undefined' || !window.matchMedia) return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = () => setPrefersReducedMotion(mq.matches);
      try {
         mq.addEventListener('change', handler);
      } catch {
         // Safari fallback
         // @ts-ignore
         mq.addListener?.(handler);
      }
      return () => {
         try {
            mq.removeEventListener('change', handler);
         } catch {
            // @ts-ignore
            mq.removeListener?.(handler);
         }
      };
   }, []);

   const cardVariant: Variants = {
      hidden: { opacity: 0, y: 10 },
      show: {
         opacity: 1,
         y: 0,
         transition: { duration: prefersReducedMotion ? 0 : 0.42 },
      },
      hover: {
         y: prefersReducedMotion ? 0 : -6,
         scale: prefersReducedMotion ? 1 : 1.02,
      },
   };

   return (
      <section aria-labelledby="features-heading" className="py-12">
         <div className="mb-8 max-w-3xl">
            <h2
               id="features-heading"
               className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white"
            >
               Why teams pick us
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
               We combine product design, engineering excellence and AI to
               deliver value quickly — with reliability and observability built
               in.
            </p>
         </div>

         <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
         >
            {FEATURES.map((f, _i) => {
               const Icon = f.icon;
               const accent = f.accent.join(' ');
               return (
                  <motion.article
                     key={f.id}
                     variants={cardVariant}
                     whileHover="hover"
                     className="relative rounded-2xl bg-white dark:bg-slate-900/70 border border-black/6 dark:border-white/6 p-6 shadow-sm hover:shadow-lg transition-transform focus-within:shadow-lg outline-none"
                  >
                     <div className="flex items-start gap-4">
                        {/* Icon badge */}
                        <div
                           className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${accent}`}
                           aria-hidden
                        >
                           <Icon className="h-6 w-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                                 {f.title}
                              </h3>
                              <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200">
                                 <FiCheckCircle className="h-3 w-3 text-sky-500" />
                                 Proven
                              </span>
                           </div>

                           <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              {f.desc}
                           </p>

                           <div className="mt-4 flex items-center gap-3">
                              <Link
                                 to={`/services/${f.id}`}
                                 className="text-sm font-medium inline-flex items-center gap-2 focus:outline-none"
                              >
                                 <span className="text-sky-600 hover:underline">
                                    Learn more
                                 </span>
                                 <svg
                                    className="h-4 w-4 text-sky-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden
                                 >
                                    <path
                                       d="M5 12h14M13 5l6 7-6 7"
                                       stroke="currentColor"
                                       strokeWidth="1.6"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Link>

                              <button
                                 aria-label={`Try ${f.title}`}
                                 className="ml-auto inline-flex items-center gap-2 rounded-md px-3 py-1.5 bg-black text-white text-xs font-semibold hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 transition"
                              >
                                 Try
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* decorative subtle corner accent */}
                     <div
                        aria-hidden
                        className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 opacity-6"
                        style={{
                           background:
                              'conic-gradient(from 180deg at 50% 50%, #0369A1, #FB923C, #10B981)',
                        }}
                     />
                  </motion.article>
               );
            })}
         </motion.div>
      </section>
   );
}
