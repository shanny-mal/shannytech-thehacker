import { type JSX } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
// shadcn/ui Card — update path if your project uses a different alias
import { Card } from '@/components/ui/card';

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

const containerVariants: Variants = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
   },
};

const itemVariants: Variants = {
   hidden: { opacity: 0, y: 10 },
   show: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};

export default function Testimonials(): JSX.Element {
   return (
      <section aria-labelledby="testimonials-heading" className="py-12">
         <div className="mb-8">
            <h2
               id="testimonials-heading"
               className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
            >
               Customer stories
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
               Real outcomes from organizations we’ve partnered with.
            </p>
         </div>

         <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
         >
            {TESTIMONIALS.map((t, i) => (
               <motion.blockquote
                  key={t.id}
                  variants={itemVariants}
                  className="rounded-2xl"
                  aria-labelledby={`testimonial-${t.id}`}
               >
                  <Card className="p-6 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition">
                     <div className="flex gap-4">
                        {/* avatar badge */}
                        <div
                           className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow"
                           style={{
                              background:
                                 i % 3 === 0
                                    ? 'linear-gradient(180deg,#0284C7 0%,#06B6D4 100%)'
                                    : i % 3 === 1
                                      ? 'linear-gradient(180deg,#FB923C 0%,#F97316 100%)'
                                      : 'linear-gradient(180deg,#10B981 0%,#059669 100%)',
                           }}
                           aria-hidden
                        >
                           {t.name.charAt(0)}
                        </div>

                        <div className="flex-1">
                           <div className="flex items-start gap-3">
                              <FaQuoteLeft
                                 className="text-amber-400 mt-0.5"
                                 aria-hidden
                              />
                              <p
                                 id={`testimonial-${t.id}`}
                                 className="text-slate-800 dark:text-white text-lg leading-relaxed"
                              >
                                 {t.quote}
                              </p>
                           </div>

                           <footer className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                 {t.name}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">
                                 {' '}
                                 — {t.role}
                              </span>
                           </footer>
                        </div>
                     </div>
                  </Card>
               </motion.blockquote>
            ))}
         </motion.div>
      </section>
   );
}
