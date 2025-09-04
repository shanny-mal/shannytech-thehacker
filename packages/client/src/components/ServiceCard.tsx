import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import type { Service } from '@/data/servicesData';

export default function ServiceCard({
   service,
}: {
   service: Service;
}): JSX.Element {
   return (
      <motion.article
         initial={{ opacity: 0, y: 8 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.36, ease: 'easeOut' }}
         className="w-full"
         aria-labelledby={`service-${service.id}`}
      >
         <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row gap-4">
               <div
                  className={classNames(
                     'h-28 md:h-auto md:w-40 flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl',
                     'bg-gradient-to-br',
                     service.color ?? 'from-amber-400 to-emerald-400'
                  )}
                  style={{ minWidth: 120 }}
                  aria-hidden
               >
                  {service.title.charAt(0)}
               </div>

               <div className="p-4 flex-1 min-w-0">
                  <h3
                     id={`service-${service.id}`}
                     className="text-lg font-semibold text-slate-900 dark:text-white"
                  >
                     {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                     {service.short}
                  </p>

                  <ul className="mt-3 grid grid-cols-1 gap-1 text-sm text-slate-500">
                     {service.features.slice(0, 3).map((f) => (
                        <li key={f}>• {f}</li>
                     ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-3">
                     <Link
                        to={`/services/${service.slug}`}
                        className="inline-block"
                     >
                        <Button className="bg-gradient-to-r from-amber-400 to-emerald-400 text-black px-4 py-2">
                           Learn more
                        </Button>
                     </Link>

                     <Link
                        to="/contact"
                        className="text-sm text-slate-600 hover:underline"
                     >
                        Request a quote
                     </Link>
                  </div>
               </div>
            </div>
         </Card>
      </motion.article>
   );
}
