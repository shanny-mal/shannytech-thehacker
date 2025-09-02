// src/components/Testimonials.tsx
import { type JSX } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
   {
      id: 1,
      name: 'Aisha M.',
      role: 'CEO, Kariba Foods',
      quote: 'ShannyTech rebuilt our storefront and increased conversion by 42% within three months.',
   },
   {
      id: 2,
      name: 'Joseph K.',
      role: 'CTO, Riverbank NGO',
      quote: 'They helped us use AI to automate support — saving 200+ hours/month.',
   },
];

export default function Testimonials(): JSX.Element {
   return (
      <section>
         <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
               Customer stories
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
               Real outcomes from organizations we’ve partnered with.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
               <motion.blockquote
                  key={t.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow"
               >
                  <p className="text-slate-800 dark:text-white">“{t.quote}”</p>
                  <footer className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                     — {t.name},{' '}
                     <span className="text-slate-500 dark:text-slate-300">
                        {t.role}
                     </span>
                  </footer>
               </motion.blockquote>
            ))}
         </div>
      </section>
   );
}
