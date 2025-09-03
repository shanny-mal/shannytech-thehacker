import { useEffect, useRef, useState, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button'; // update path if needed
import classNames from 'classnames';

/**
 * Cookie consent popup
 * - stores decision in cookie "shanny_consent" with values "accepted" | "declined"
 * - also writes to localStorage for quick checks
 * - exposes helper functions getCookieConsent() and clearCookieConsent()
 */

/* ---------- Utilities ---------- */
const COOKIE_NAME = 'shanny_consent';
const LS_KEY = 'shanny_consent';

// days before cookie expires
const COOKIE_EXPIRES_DAYS = 365;

function setCookie(name: string, value: string, days = COOKIE_EXPIRES_DAYS) {
   if (typeof document === 'undefined') return;
   const date = new Date();
   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
   const expires = 'expires=' + date.toUTCString();
   document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax; Secure`;
}

function getCookie(name: string): string | null {
   if (typeof document === 'undefined') return null;
   const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='));
   if (!match) return null;
   return decodeURIComponent(match.split('=')[1] ?? '');
}

function deleteCookie(name: string) {
   if (typeof document === 'undefined') return;
   document.cookie = `${name}=; Max-Age=0; path=/; sameSite=Lax; Secure`;
}

/* ---------- Helpers exported for other modules ---------- */

/**
 * Returns "accepted" | "declined" | null
 */
export function getCookieConsent(): 'accepted' | 'declined' | null {
   if (typeof window === 'undefined') return null;
   const ls = window.localStorage.getItem(LS_KEY);
   if (ls === 'accepted' || ls === 'declined') return ls;
   const cookie = getCookie(COOKIE_NAME);
   if (cookie === 'accepted' || cookie === 'declined') return cookie;
   return null;
}

/** Clear stored consent (useful in dev) */
export function clearCookieConsent() {
   if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LS_KEY);
   }
   deleteCookie(COOKIE_NAME);
}

/* ---------- Component ---------- */

export default function CookieConsent({
   privacyHref = '/privacy',
   onAccept,
   onDecline,
   showDecline = true,
   position = 'bottom-right',
}: {
   privacyHref?: string;
   onAccept?: () => void;
   onDecline?: () => void;
   showDecline?: boolean;
   position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}): JSX.Element | null {
   const [visible, setVisible] = useState<boolean>(false);
   const acceptRef = useRef<HTMLButtonElement | null>(null);
   const [mounted, setMounted] = useState(false);

   // ensure we only access window/document on client
   useEffect(() => {
      setMounted(true);
      const existing = getCookieConsent();
      if (!existing) {
         // show popup
         setVisible(true);
      }
      // if user has choice already, don't show
   }, []);

   // focus accept button when opened for accessibility
   useEffect(() => {
      if (visible && acceptRef.current) {
         acceptRef.current.focus({ preventScroll: true });
      }
   }, [visible]);

   function accept() {
      setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRES_DAYS);
      if (typeof window !== 'undefined')
         window.localStorage.setItem(LS_KEY, 'accepted');
      setVisible(false);
      onAccept?.();
      // Example: You could call initAnalytics() here
   }

   function decline() {
      setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRES_DAYS);
      if (typeof window !== 'undefined')
         window.localStorage.setItem(LS_KEY, 'declined');
      setVisible(false);
      onDecline?.();
      // disable analytics, etc.
   }

   // If running server-side (or not mounted) don't render popup to avoid hydration mismatch
   if (!mounted) return null;

   return (
      <AnimatePresence>
         {visible && (
            <motion.div
               initial={{ y: 60, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 60, opacity: 0 }}
               transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1] }}
               role="dialog"
               aria-label="Cookie consent"
               aria-live="polite"
               className={classNames('fixed z-50 max-w-full px-4', {
                  'right-6 bottom-6': position === 'bottom-right',
                  'left-6 bottom-6': position === 'bottom-left',
                  'left-1/2 -translate-x-1/2 bottom-6':
                     position === 'bottom-center',
               })}
            >
               <div className="w-full max-w-2xl">
                  <div className="rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-lg border border-slate-200/10 backdrop-blur-md p-4 md:p-5">
                     <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <div className="flex-1 min-w-0">
                           <div className="flex items-start gap-3">
                              <div className="flex-shrink-0">
                                 {/* small cookie icon */}
                                 <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-amber-400"
                                    aria-hidden
                                 >
                                    <path
                                       d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                       fill="currentColor"
                                    ></path>
                                 </svg>
                              </div>
                              <div className="min-w-0">
                                 <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
                                    We use cookies to improve your experience
                                 </p>
                                 <p className="mt-1 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                                    We use essential cookies and, with your
                                    permission, analytics cookies to improve our
                                    site. Read our{' '}
                                    <a
                                       href={privacyHref}
                                       className="underline text-slate-700 dark:text-slate-200"
                                    >
                                       privacy policy
                                    </a>
                                    .
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="flex-shrink-0 flex gap-2 items-center">
                           {showDecline && (
                              <button
                                 onClick={decline}
                                 className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-slate-200/30 bg-transparent text-slate-700 dark:text-slate-200 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                                 aria-label="Decline cookies"
                              >
                                 Decline
                              </button>
                           )}

                           <Button
                              ref={acceptRef as any}
                              onClick={accept}
                              className="px-4 py-2 rounded-lg bg-amber-400 text-black hover:brightness-95"
                              aria-label="Accept cookies"
                           >
                              Accept
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
