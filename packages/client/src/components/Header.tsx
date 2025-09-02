import {
   useCallback,
   useEffect,
   useRef,
   useState,
   startTransition,
   type JSX,
} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import {
   FaMoon,
   FaSun,
   FaBars,
   FaTimes,
   FaChevronDown,
   FaFacebookF,
   FaTwitter,
   FaInstagram,
   FaLinkedinIn,
   FaMapMarkerAlt,
   FaEnvelope,
} from 'react-icons/fa';
import SearchBar from './SearchBar';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useScrollSpy from '../hooks/useScrollSpy';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo/logo.png';

/**
 * Modern Header + Top Ribbon
 * - Full-width ribbon with social icons (left), sliding statement (center),
 *   contact info (right)
 * - Full-width sticky nav (background applied to full-width element)
 * - Desktop dropdown + mobile drawer
 */

/* ---------------------------
   Content data
   --------------------------- */
const NAV_LINKS = [
   { to: '/', label: 'Home', id: 'hero' },
   { to: '/services', label: 'Services', id: 'services', dropdown: true },
   { to: '/about', label: 'About', id: 'about' },
   { to: '/blog', label: 'Blog', id: 'blog' },
   { to: '/contact', label: 'Contact', id: 'contact' },
];

const SERVICES = [
   {
      id: 'web',
      title: 'Web Development',
      slug: 'web-development',
      desc: 'Fast, accessible React & static sites',
   },
   {
      id: 'mobile',
      title: 'Mobile Apps',
      slug: 'mobile-apps',
      desc: 'iOS & Android',
   },
   {
      id: 'cloud',
      title: 'Cloud & DevOps',
      slug: 'cloud-devops',
      desc: 'Scalable infra & observability',
   },
];

/* ---------------------------
   Component
   --------------------------- */
export default function Header(): JSX.Element {
   const { isDark, toggleTheme } = useTheme();
   const [mobileOpen, setMobileOpen] = useState(false);
   const [servicesOpen, setServicesOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   const dropdownRef = useRef<HTMLDivElement | null>(null);
   useOnClickOutside(dropdownRef, () => setServicesOpen(false));

   const current = useScrollSpy(
      NAV_LINKS.map((l) => l.id),
      { offset: -80 }
   );

   // debounced-ish scroll handler
   useEffect(() => {
      let raf = 0;
      const onScroll = () => {
         if (raf) cancelAnimationFrame(raf);
         raf = requestAnimationFrame(() => {
            setScrolled(window.scrollY > 48);
         });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => {
         if (raf) cancelAnimationFrame(raf);
         window.removeEventListener('scroll', onScroll);
      };
   }, []);

   // close menus with Escape
   const onEsc = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
         startTransition(() => {
            setMobileOpen(false);
            setServicesOpen(false);
         });
      }
   }, []);
   useEffect(() => {
      document.addEventListener('keydown', onEsc);
      return () => document.removeEventListener('keydown', onEsc);
   }, [onEsc]);

   return (
      <>
         <TopRibbonSliding />

         <motion.nav
            role="navigation"
            aria-label="Main navigation"
            initial={{ y: -140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className={classNames(
               'fixed inset-x-0 top-0 z-40 pt-[3.25rem] transition-colors duration-250',
               scrolled
                  ? 'backdrop-blur-md bg-white/80 dark:bg-slate-900/70 shadow-sm'
                  : 'bg-transparent'
            )}
         >
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
               <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Link
                     to="/"
                     onClick={() => startTransition(() => setMobileOpen(false))}
                     className="flex items-center gap-3"
                     aria-label="ShannyTech — home"
                  >
                     <motion.img
                        src={logo}
                        alt="ShannyTech logo"
                        className="h-10 w-10 rounded-lg shadow-md"
                        whileHover={{ rotate: 6, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                     />
                     <div className="leading-tight">
                        <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                           ShannyTech
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5 hidden md:block">
                           Digital Products & AI Integrations
                        </div>
                     </div>
                  </Link>

                  {/* Desktop nav */}
                  <div className="hidden md:flex items-center gap-6">
                     {NAV_LINKS.map((link) =>
                        link.dropdown ? (
                           <div
                              key={link.to}
                              ref={dropdownRef}
                              className="relative"
                           >
                              <button
                                 aria-expanded={servicesOpen}
                                 aria-haspopup="true"
                                 onClick={() => setServicesOpen((s) => !s)}
                                 onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                       e.preventDefault();
                                       setServicesOpen((s) => !s);
                                    }
                                 }}
                                 className={classNames(
                                    'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                    current === link.id
                                       ? 'text-sky-600'
                                       : 'text-slate-700 dark:text-slate-200 hover:text-sky-600'
                                 )}
                              >
                                 {link.label}
                                 <FaChevronDown
                                    className="text-xs opacity-80"
                                    aria-hidden
                                 />
                              </button>

                              <AnimatePresence>
                                 {servicesOpen && (
                                    <motion.div
                                       initial={{
                                          opacity: 0,
                                          y: -8,
                                          scale: 0.98,
                                       }}
                                       animate={{ opacity: 1, y: 0, scale: 1 }}
                                       exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                       transition={{
                                          duration: 0.16,
                                          ease: 'easeOut',
                                       }}
                                       className="absolute right-0 mt-2 w-[340px] rounded-xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-black/5 overflow-hidden"
                                       role="menu"
                                       aria-label="Services menu"
                                    >
                                       <div className="p-3 grid gap-2">
                                          {SERVICES.map((s) => (
                                             <Link
                                                key={s.id}
                                                to={`/services/${s.slug}`}
                                                role="menuitem"
                                                onClick={() =>
                                                   setServicesOpen(false)
                                                }
                                                className="flex flex-col gap-0.5 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                                             >
                                                <div className="flex items-center justify-between">
                                                   <div className="font-medium text-slate-900 dark:text-slate-100">
                                                      {s.title}
                                                   </div>
                                                   <div className="text-xs text-slate-400">
                                                      {/* icon slot */}
                                                   </div>
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                                   {s.desc}
                                                </div>
                                             </Link>
                                          ))}
                                       </div>
                                    </motion.div>
                                 )}
                              </AnimatePresence>
                           </div>
                        ) : (
                           <NavLink
                              key={link.to}
                              to={link.to}
                              className={({ isActive }) =>
                                 classNames(
                                    'text-sm px-3 py-2 rounded-lg',
                                    isActive
                                       ? 'text-sky-600 font-semibold'
                                       : 'text-slate-700 dark:text-slate-200 hover:text-sky-600'
                                 )
                              }
                           >
                              {link.label}
                           </NavLink>
                        )
                     )}

                     <SearchBar className="w-64" />

                     <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        title={isDark ? 'Switch to light' : 'Switch to dark'}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                     >
                        {isDark ? (
                           <FaSun className="text-yellow-400" />
                        ) : (
                           <FaMoon className="text-slate-700" />
                        )}
                     </button>

                     <Link
                        to="/contact"
                        className="ml-2 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-500 text-white text-sm font-medium shadow hover:from-sky-500 hover:to-indigo-400 transition"
                     >
                        Get a Quote
                     </Link>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex items-center gap-2">
                     <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="p-2 rounded-md"
                     >
                        {isDark ? (
                           <FaSun className="text-yellow-400" />
                        ) : (
                           <FaMoon />
                        )}
                     </button>

                     <motion.button
                        onClick={() =>
                           startTransition(() => setMobileOpen((o) => !o))
                        }
                        aria-label={
                           mobileOpen ? 'Close navigation' : 'Open navigation'
                        }
                        className="p-2 rounded-md"
                        animate={{ rotate: mobileOpen ? 90 : 0 }}
                     >
                        {mobileOpen ? <FaTimes /> : <FaBars />}
                     </motion.button>
                  </div>
               </div>
            </div>

            {/* Mobile panel */}
            <AnimatePresence>
               {mobileOpen && (
                  <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="md:hidden overflow-hidden bg-white dark:bg-slate-900 shadow-lg"
                  >
                     <nav
                        className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800"
                        aria-label="Mobile navigation"
                     >
                        {NAV_LINKS.map((link) =>
                           !link.dropdown ? (
                              <NavLink
                                 key={link.to}
                                 to={link.to}
                                 className="p-4 text-base"
                                 onClick={() => setMobileOpen(false)}
                              >
                                 {link.label}
                              </NavLink>
                           ) : (
                              <MobileServices
                                 key={link.to}
                                 items={SERVICES}
                                 onClose={() => setMobileOpen(false)}
                              />
                           )
                        )}

                        <div className="p-4">
                           <SearchBar mobile placeholder="Search…" />
                        </div>

                        <div className="p-4">
                           <Link
                              to="/contact"
                              className="w-full inline-block text-center px-4 py-2 rounded-lg bg-sky-600 text-white"
                           >
                              Get a Quote
                           </Link>
                        </div>
                     </nav>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.nav>
      </>
   );
}

/* ---------------------------
   Mobile services accordion
   --------------------------- */
function MobileServices({
   items,
   onClose,
}: {
   items: { id: string; title: string; slug: string }[];
   onClose: () => void;
}) {
   const [open, setOpen] = useState(false);
   return (
      <div className="p-4">
         <button
            onClick={() => setOpen((o) => !o)}
            className="w-full flex justify-between items-center font-medium text-base"
            aria-expanded={open}
         >
            Services
            <FaChevronDown
               className={classNames(
                  'transition-transform',
                  open && 'rotate-180'
               )}
            />
         </button>

         <AnimatePresence>
            {open && (
               <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2 space-y-2 pl-4"
               >
                  {items.map((s) => (
                     <li key={s.id}>
                        <Link
                           to={`/services/${s.slug}`}
                           onClick={onClose}
                           className="block py-2 text-slate-700 dark:text-slate-200 hover:underline"
                        >
                           {s.title}
                        </Link>
                     </li>
                  ))}
               </motion.ul>
            )}
         </AnimatePresence>
      </div>
   );
}

/* ---------------------------
   Top ribbon with:
   left  => social icons
   center => sliding messages (hidden on xs)
   right => location + email
   --------------------------- */
function TopRibbonSliding(): JSX.Element {
   const messages = [
      'we help you grow your business',
      'bridge the digital divide gap',
   ];
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const t = setInterval(
         () => setIndex((i) => (i + 1) % messages.length),
         3600
      );
      return () => clearInterval(t);
   }, []);

   return (
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
         <div className="w-full">
            {/* full-width gradient bar */}
            <div
               className="h-11 flex items-center justify-center text-sm text-white"
               style={{
                  background:
                     'linear-gradient(90deg,#1e40af 0%,#0891b2 50%,#06b6d4 100%)',
               }}
            >
               <div className="max-w-7xl w-full px-4 md:px-8 flex items-center justify-between pointer-events-auto">
                  {/* LEFT: social icons */}
                  <div className="flex items-center gap-3">
                     <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                     >
                        <FaFacebookF aria-hidden />
                        <span className="sr-only">Facebook</span>
                     </a>
                     <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                     >
                        <FaTwitter aria-hidden />
                        <span className="sr-only">X / Twitter</span>
                     </a>
                     <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                     >
                        <FaInstagram aria-hidden />
                        <span className="sr-only">Instagram</span>
                     </a>
                     <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                     >
                        <FaLinkedinIn aria-hidden />
                        <span className="sr-only">LinkedIn</span>
                     </a>
                  </div>

                  {/* CENTER: sliding message (hidden on very small screens) */}
                  <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
                     <div className="h-6 relative w-full max-w-xl hidden sm:block">
                        <AnimatePresence mode="wait">
                           <motion.div
                              key={index}
                              initial={{ x: 28, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -28, opacity: 0 }}
                              transition={{
                                 duration: 0.42,
                                 ease: [0.16, 0.84, 0.24, 1],
                              }}
                              className="absolute left-0 right-0 text-center uppercase tracking-wide font-semibold text-white/95"
                              aria-live="polite"
                           >
                              {messages[index]}
                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </div>

                  {/* RIGHT: location + email */}
                  <div className="flex items-center gap-5 text-xs text-white/95">
                     <div className="flex items-center gap-2">
                        <FaMapMarkerAlt aria-hidden />
                        <span className="whitespace-nowrap">
                           2964 Batonga kariba
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <FaEnvelope aria-hidden />
                        <a
                           href="mailto:info@shannytech.solutions"
                           className="underline"
                        >
                           info@shannytech.solutions
                        </a>
                     </div>
                  </div>
               </div>
            </div>

            {/* decorative SVG wave (subtle) */}
            <div className="-mt-1 pointer-events-none">
               <svg
                  className="w-full block"
                  viewBox="0 0 1440 60"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
               >
                  <path
                     d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z"
                     fill="rgba(2,6,23,0.03)"
                  />
               </svg>
            </div>
         </div>
      </div>
   );
}
