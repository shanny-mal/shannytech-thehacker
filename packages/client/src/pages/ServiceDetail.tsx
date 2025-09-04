// src/pages/ServiceDetail.tsx
import { type JSX } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '@/data/servicesData';
import { motion } from 'framer-motion';

export default function ServiceDetail(): JSX.Element {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();
   const service = SERVICES.find((s) => s.slug === slug);

   if (!service) {
      return (
         <main className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-xl font-semibold">Service not found</h2>
               <p className="mt-2 text-sm text-slate-600">
                  We couldn't find that service.
               </p>
               <button
                  onClick={() => navigate(-1)}
                  className="mt-4 inline-block px-4 py-2 rounded bg-amber-400 text-black"
               >
                  Go back
               </button>
            </div>
         </main>
      );
   }

   return (
      <article className="pb-16">
         <header className="bg-gradient-to-b from-black to-slate-900 text-white py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
               >
                  <h1 className="text-4xl font-bold leading-tight">
                     {service.title}
                  </h1>
                  <p className="mt-4 text-lg text-slate-200 max-w-2xl">
                     {service.long}
                  </p>

                  <div className="mt-6 flex gap-3">
                     <Link to="/contact" className="inline-block">
                        <button className="rounded-lg px-5 py-3 bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-semibold">
                           Request a consultation
                        </button>
                     </Link>

                     <Link
                        to="/services"
                        className="inline-flex items-center px-4 py-3 rounded-lg border border-white/10 text-white/90"
                     >
                        Back to services
                     </Link>
                  </div>
               </motion.div>
            </div>
         </header>

         <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12">
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2">
                  <h2 className="text-2xl font-semibold">What we deliver</h2>
                  <ul className="mt-4 list-disc pl-5 text-slate-700 dark:text-slate-200 space-y-2">
                     {service.features.map((f) => (
                        <li key={f}>{f}</li>
                     ))}
                  </ul>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                        <div className="text-sm text-slate-500">
                           Estimated time
                        </div>
                        <div className="mt-1 font-semibold">
                           {service.duration}
                        </div>
                     </div>

                     <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                        <div className="text-sm text-slate-500">
                           Typical budget
                        </div>
                        <div className="mt-1 font-semibold">
                           {service.priceRange}
                        </div>
                     </div>
                  </div>
               </div>

               <aside className="rounded-lg bg-white dark:bg-slate-800 p-6">
                  <h3 className="text-lg font-semibold">Get started</h3>
                  <p className="mt-2 text-sm text-slate-600">
                     Schedule a free 30-minute consultation and we'll review
                     your goals.
                  </p>
               </aside>
            </section>
         </div>
      </article>
   );
}
