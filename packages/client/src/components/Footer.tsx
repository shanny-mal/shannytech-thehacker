// src/components/Footer.tsx
import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
// shadcn/ui Button — adjust path if needed
import { Button } from '@/components/ui/button';

/**
 * Modern Footer
 * - Responsive 4-column layout
 * - CTA + newsletter
 * - Social links, contact block, sitemap links
 */

export default function Footer(): JSX.Element {
   const [email, setEmail] = useState('');
   const [subscribed, setSubscribed] = useState<null | 'success' | 'error'>(
      null
   );
   const year = new Date().getFullYear();

   function onSubscribe(e: React.FormEvent) {
      e.preventDefault();
      // client-only demo: validate email
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
         setSubscribed('error');
         setTimeout(() => setSubscribed(null), 2500);
         return;
      }
      setSubscribed('success');
      setEmail('');
      // In production: send to your newsletter API here.
      setTimeout(() => setSubscribed(null), 3500);
   }

   return (
      <footer className="bg-gradient-to-r from-slate-900 via-black to-slate-800 text-slate-100">
         {/* CTA */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="rounded-2xl bg-gradient-to-r from-sky-800/5 to-emerald-800/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"></div>
         </div>

         {/* Links / newsletter */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Company */}

               {/* Resources */}
               <div>
                  <h4 className="text-sm font-semibold text-white">
                     Resources
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                     <li>
                        <Link to="/case-studies" className="hover:underline">
                           Case studies
                        </Link>
                     </li>
                     <li>
                        <Link to="/blog" className="hover:underline">
                           Blog
                        </Link>
                     </li>

                     <li>
                        <Link to="/about" className="hover:underline">
                           About
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Contact & newsletter */}
               <div>
                  <h4 className="text-sm font-semibold text-white">Contact</h4>

                  <div className="mt-4 text-sm text-slate-300 flex items-start gap-3">
                     <FaMapMarkerAlt className="mt-1 text-sky-400" />
                     <div>2964 Batonga, Kariba</div>
                  </div>

                  <div className="mt-2 text-sm text-slate-300 flex items-start gap-3">
                     <FaEnvelope className="mt-1 text-emerald-400" />
                     <div>
                        <a
                           href="mailto:info@shannytech.solutions"
                           className="underline"
                        >
                           info@shannytech.solutions
                        </a>
                     </div>
                  </div>

                  <div className="mt-2 text-sm text-slate-300 flex items-start gap-3">
                     <FaPhoneAlt className="mt-1 text-amber-400" />
                     <div>
                        <a href="tel:+263770000000" className="underline">
                           +263 78 407 1973
                        </a>
                     </div>
                  </div>

                  <form onSubmit={onSubscribe} className="mt-6">
                     <label htmlFor="newsletter-email" className="sr-only">
                        Subscribe to newsletter
                     </label>
                     <div className="flex items-center gap-2">
                        <input
                           id="newsletter-email"
                           type="email"
                           inputMode="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Your email"
                           className="flex-1 min-w-0 px-3 py-2 rounded-md bg-white/5 border border-white/6 placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                           aria-label="Email address"
                        />
                        <Button
                           type="submit"
                           className="px-4 py-2 bg-gradient-to-r from-amber-400 to-emerald-400 text-black"
                        >
                           Subscribe
                        </Button>
                     </div>

                     <div aria-live="polite" className="mt-2 text-sm">
                        {subscribed === 'success' && (
                           <span className="text-emerald-300">
                              Subscribed — check your email!
                           </span>
                        )}
                        {subscribed === 'error' && (
                           <span className="text-amber-300">
                              Please enter a valid email.
                           </span>
                        )}
                     </div>
                  </form>
               </div>
            </div>
         </div>

         {/* Bottom bar */}
         <div className="border-t border-white/6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
               <div>© {year} ShannyTech • Built with care</div>

               <div className="flex items-center gap-4">
                  <Link to="/privacy" className="hover:underline">
                     Privacy
                  </Link>
                  <Link to="/terms" className="hover:underline">
                     Terms
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
}
