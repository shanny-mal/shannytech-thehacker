// src/pages/Services.tsx
import { type JSX, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/ServiceCard';
import ServiceFilters from '@/components/ServiceFilters';
import { SERVICES, type Service } from '@/data/servicesData';

export default function Services(): JSX.Element {
   const [query, setQuery] = useState('');
   const [filterTag, setFilterTag] = useState<string | null>(null);

   // derive tags (simple)
   const tags = useMemo(() => {
      const t = new Set<string>();
      SERVICES.forEach((s) => {
         s.features.forEach((f) => {
            const k = f.split(' ')[0]; // rough tag seed
            if (k) t.add(k);
         });
      });
      return Array.from(t).slice(0, 10);
   }, []);

   const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return SERVICES.filter((s) => {
         if (
            filterTag &&
            !s.features.some((f) =>
               f.toLowerCase().includes(filterTag.toLowerCase())
            )
         )
            return false;
         if (!q) return true;
         return (
            s.title.toLowerCase().includes(q) ||
            s.short.toLowerCase().includes(q) ||
            s.long.toLowerCase().includes(q) ||
            s.features.join(' ').toLowerCase().includes(q)
         );
      });
   }, [query, filterTag]);

   return (
      <div>
         {/* PAGE HERO */}
         <header className="bg-gradient-to-b from-black to-slate-900 text-white py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
               <div className="max-w-3xl">
                  <motion.h1
                     initial={{ opacity: 0, y: 6 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-4xl md:text-5xl font-extrabold leading-tight"
                  >
                     Our Services
                  </motion.h1>
                  <motion.p
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.12 }}
                     className="mt-4 text-lg text-slate-200"
                  >
                     End-to-end product development, AI integrations and
                     reliable infrastructure. Pick a service to learn more or
                     request a free consultation.
                  </motion.p>
               </div>
            </div>
         </header>

         {/* SEARCH & FILTERS */}
         <section className="bg-slate-50 dark:bg-slate-900 py-8">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
               <ServiceFilters
                  tags={tags}
                  onSearch={setQuery}
                  onFilter={setFilterTag}
               />
            </div>
         </section>

         {/* SERVICES GRID */}
         <main id="services-list" className="py-10">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.length === 0 ? (
                     <div className="col-span-full text-center text-slate-500">
                        No services match your search.
                     </div>
                  ) : (
                     filtered.map((s) => (
                        <ServiceCard key={s.id} service={s as Service} />
                     ))
                  )}
               </div>

               {/* CTA */}
               <div className="mt-10 text-center">
                  <p className="text-sm text-slate-600">
                     Interested in a tailored solution?{' '}
                     <Link
                        to="/contact"
                        className="font-medium text-amber-400 hover:underline"
                     >
                        Contact us
                     </Link>{' '}
                     and we’ll set up a free 30-minute consultation.
                  </p>
               </div>

               {/* FAQ & Testimonials (optional) */}
               <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                     <h3 className="text-xl font-semibold">
                        Frequently asked questions
                     </h3>
                     <div className="mt-4 space-y-3">
                        <details className="rounded-lg bg-white dark:bg-slate-800 p-4">
                           <summary className="cursor-pointer font-medium">
                              How long does a typical project take?
                           </summary>
                           <div className="mt-2 text-sm text-slate-600">
                              Typical timelines are 4–12 weeks depending on
                              scope. We start with a discovery sprint to define
                              scope and milestones.
                           </div>
                        </details>

                        <details className="rounded-lg bg-white dark:bg-slate-800 p-4">
                           <summary className="cursor-pointer font-medium">
                              Do you provide ongoing support?
                           </summary>
                           <div className="mt-2 text-sm text-slate-600">
                              Yes — we offer retainer, managed services and
                              SLA-backed support for production systems.
                           </div>
                        </details>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-xl font-semibold">What clients say</h3>
                     <blockquote className="mt-4 rounded-lg bg-white dark:bg-slate-800 p-4">
                        <p className="text-slate-700 dark:text-slate-200">
                           “ShannyTech rebuilt our e-commerce storefront and
                           conversion increased by 42% in 3 months.”
                        </p>
                        <footer className="mt-3 text-sm text-slate-500">
                           — Aisha M., CEO
                        </footer>
                     </blockquote>
                  </div>
               </section>
            </div>
         </main>
      </div>
   );
}
