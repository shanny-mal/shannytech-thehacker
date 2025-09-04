// src/components/Footer.tsx
import { type JSX, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
   FaMapMarkerAlt,
   FaEnvelope,
   FaPhoneAlt,
   FaFacebookF,
   FaTwitter,
   FaInstagram,
   FaLinkedinIn,
   FaEnvelopeOpenText,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';

/**
 * Responsive, world-class Footer — fixed overlap bugs on mobile/tablet:
 *  - uses min-w-0, w-full and responsive stacks
 *  - input is flexible and doesn't overflow
 */

export default function Footer(): JSX.Element {
   const [email, setEmail] = useState('');
   const [status, setStatus] = useState<
      null | 'idle' | 'sending' | 'success' | 'error'
   >(null);
   const year = new Date().getFullYear();
   const inputRef = useRef<HTMLInputElement | null>(null);

   async function onSubscribe(e: React.FormEvent) {
      e.preventDefault();
      setStatus('idle');

      const value = email.trim();
      if (!/^\S+@\S+\.\S+$/.test(value)) {
         setStatus('error');
         inputRef.current?.focus();
         setTimeout(() => setStatus(null), 3000);
         return;
      }

      try {
         setStatus('sending');
         // Demo: replace with real API call
         await new Promise((res) => setTimeout(res, 900));
         setStatus('success');
         setEmail('');
         setTimeout(() => setStatus(null), 3500);
      } catch {
         setStatus('error');
         setTimeout(() => setStatus(null), 3000);
      }
   }

   return (
      <footer className="bg-gradient-to-r from-black via-slate-900 to-slate-950 text-slate-100">
         {/* CTA strip */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="rounded-2xl bg-gradient-to-r from-amber-600/8 to-emerald-500/6 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
               <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-extrabold text-white break-words">
                     Ready to build something great?
                  </h3>
                  <p className="mt-1 text-sm text-slate-200/90 max-w-full">
                     Work with ShannyTech to design modern products, grow
                     revenue and deliver reliable systems — starting with a free
                     30min consultation.
                  </p>
               </div>

               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  <a
                     href="/case-studies"
                     className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-white/8 text-sm text-slate-100 hover:bg-white/5 transition w-full sm:w-auto justify-center"
                  >
                     View case studies
                  </a>
               </div>
            </div>
         </div>

         {/* Links / newsletter grid */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
               {/* Company */}
               <div className="min-w-0">
                  <Link
                     to="/"
                     aria-label="ShannyTech home"
                     className="inline-flex items-center gap-3"
                  >
                     <div className="h-10 w-10 rounded-md bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-black font-bold shadow">
                        S
                     </div>
                     <div>
                        <div className="text-lg font-semibold text-white">
                           ShannyTech
                        </div>
                        <div className="text-sm text-slate-400">
                           Web • Mobile • Cloud • Networking
                        </div>
                     </div>
                  </Link>

                  <p className="mt-4 text-sm text-slate-300 max-w-full">
                     We design & build modern digital products and integrate AI
                     to help organizations scale and bridge the digital divide.
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                     <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
                        aria-label="Facebook"
                     >
                        <FaFacebookF />
                     </a>
                     <a
                        href="https://x.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
                        aria-label="X"
                     >
                        <FaTwitter />
                     </a>
                     <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
                        aria-label="Instagram"
                     >
                        <FaInstagram />
                     </a>
                     <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
                        aria-label="LinkedIn"
                     >
                        <FaLinkedinIn />
                     </a>
                  </div>
               </div>

               {/* Resources */}
               <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white">
                     Resources
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                     <li>
                        <Link
                           to="/case-studies"
                           className="hover:underline break-words"
                        >
                           Case studies
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/blog"
                           className="hover:underline break-words"
                        >
                           Blog
                        </Link>
                     </li>
                  </ul>

                  <div className="mt-6">
                     <h5 className="text-sm font-semibold text-white">
                        Quick links
                     </h5>
                     <div className="mt-3 flex flex-col gap-2 text-sm">
                        <Link
                           to="/privacy"
                           className="hover:underline text-slate-300 break-words"
                        >
                           Privacy
                        </Link>
                        <Link
                           to="/terms"
                           className="hover:underline text-slate-300 break-words"
                        >
                           Terms
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Contact & Newsletter */}
               <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white">Contact</h4>

                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                     <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="mt-1 text-amber-400 flex-shrink-0" />
                        <div className="break-words">
                           2964 Batonga, Kariba, Zimbabwe
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <FaEnvelope className="mt-1 text-emerald-400 flex-shrink-0" />
                        <div>
                           <a
                              href="mailto:info@shannytech.solutions"
                              className="underline break-words"
                           >
                              info@shannytech.solutions
                           </a>
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <FaPhoneAlt className="mt-1 text-sky-400 flex-shrink-0" />
                        <div>
                           <a
                              href="tel:+263784071973"
                              className="underline break-words"
                           >
                              +263 78 407 1973
                           </a>
                        </div>
                     </div>
                  </div>

                  <form
                     onSubmit={onSubscribe}
                     className="mt-6"
                     aria-label="Subscribe to newsletter"
                  >
                     <label htmlFor="footer-email" className="sr-only">
                        Email address
                     </label>

                     <div className="flex gap-2 items-center w-full">
                        <input
                           id="footer-email"
                           ref={inputRef}
                           type="email"
                           inputMode="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Your email"
                           className="flex-1 min-w-0 px-3 py-2 rounded-md bg-white/5 border border-white/6 placeholder:text-slate-400 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300 w-full"
                           aria-invalid={status === 'error'}
                        />

                        <div className="flex-shrink-0">
                           <Button
                              type="submit"
                              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-emerald-400 text-black"
                           >
                              {status === 'sending' ? 'Sending…' : 'Subscribe'}
                           </Button>
                        </div>
                     </div>

                     <div
                        aria-live="polite"
                        className="mt-2 text-sm min-h-[1.1rem]"
                     >
                        {status === 'success' && (
                           <span className="text-emerald-300">
                              Subscribed — check your email!
                           </span>
                        )}
                        {status === 'error' && (
                           <span className="text-amber-300">
                              Please enter a valid email address.
                           </span>
                        )}
                     </div>

                     <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
                        <FaEnvelopeOpenText className="text-slate-400" />
                        <span>
                           We respect your privacy — unsubscribe anytime.
                        </span>
                     </div>
                  </form>
               </div>
            </div>
         </div>

         {/* Bottom bar */}
         <div className="border-t border-white/6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
                  <div>© {year} ShannyTech</div>
                  <div className="hidden sm:block mx-2">•</div>
                  <div>Built with care</div>
               </div>

               <div className="flex flex-col sm:flex-row sm:items-center gap-3 items-center">
                  <div className="text-xs text-slate-400">
                     Created by Shannon Chipezeze
                  </div>

                  <div className="flex items-center gap-3">
                     <Link
                        to="/privacy"
                        className="text-slate-300 hover:underline"
                     >
                        Privacy
                     </Link>
                     <Link
                        to="/terms"
                        className="text-slate-300 hover:underline"
                     >
                        Terms
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
