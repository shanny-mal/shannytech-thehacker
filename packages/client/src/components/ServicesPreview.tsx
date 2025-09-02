import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SERVICES = [
   {
      id: 'web',
      title: 'Web Development',
      desc: 'Modern frontends with React, Vite, Tailwind, and performant UX.',
      href: '/services/web-development',
   },
   {
      id: 'ai',
      title: 'AI Integrations',
      desc: 'RAG, chat assistants, semantic search and content automation.',
      href: '/services/ai-integrations',
   },
   {
      id: 'cloud',
      title: 'Cloud & DevOps',
      desc: 'Managed infra, CI/CD and observability for production systems.',
      href: '/services/cloud-devops',
   },
   {
      id: 'network',
      title: 'Networking & Consulting',
      desc: 'Design, secure and optimize on-premise & hybrid networks.',
      href: '/services/networking',
   },
];

export default function ServicesPreview(): JSX.Element {
   return (
      <section id="services">
         <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
               Our services
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
               End-to-end product development, AI-enabled experiences and
               reliable cloud platforms.
            </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
               <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow hover:shadow-lg transition"
                  aria-labelledby={`service-${s.id}`}
               >
                  <div className="flex items-center justify-between">
                     <div>
                        <h3
                           id={`service-${s.id}`}
                           className="text-lg font-semibold text-slate-900 dark:text-white"
                        >
                           {s.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                           {s.desc}
                        </p>
                     </div>
                     <div className="ml-4">
                        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                           {s.title.charAt(0)}
                        </div>
                     </div>
                  </div>

                  <div className="mt-4">
                     <Link
                        to={s.href}
                        className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline"
                     >
                        Learn more →
                     </Link>
                  </div>
               </motion.article>
            ))}
         </div>
      </section>
   );
}
