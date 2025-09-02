import { motion } from 'framer-motion';
import type { JSX } from 'react';

const FEATURES = [
   {
      id: 'speed',
      title: 'Built for speed',
      desc: 'From Bun-powered APIs to optimized frontends, performance is the baseline.',
   },
   {
      id: 'ai',
      title: 'AI-first workflows',
      desc: 'Semantic search, assistants and content pipelines to speed up teams.',
   },
   {
      id: 'secure',
      title: 'Security & compliance',
      desc: 'Secure defaults, monitoring, and best practices baked in.',
   },
   {
      id: 'support',
      title: 'Operational support',
      desc: 'SLA-grade support and knowledge transfer to your teams.',
   },
];

export default function FeaturesGrid(): JSX.Element {
   return (
      <section>
         <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
               Why teams pick us
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
               We combine product design, engineering excellence and AI to
               deliver value quickly.
            </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
               <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow"
               >
                  <div className="text-slate-900 dark:text-white font-semibold text-lg">
                     {f.title}
                  </div>
                  <div className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
                     {f.desc}
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
