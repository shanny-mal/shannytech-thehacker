import {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
   type JSX,
} from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * HeroSection
 * - Smooth crossfade + subtle scale animations for slides
 * - Pause on hover / focus, keyboard navigation (←/→)
 * - Dynamically imports images from src/assets/images/hero via Vite
 * - Refactored small subcomponents: Controls, Indicators, FeatureCard
 *
 * Notes:
 * - Ensure you have `/// <reference types="vite/client" />` in your project (or a vite-env.d.ts).
 * - Name images predictably (01.webp, 02.webp...) if you want an explicit order.
 */

/* -------------------------
   Slide data (text only)
   ------------------------- */
const BASE_SLIDES = [
   {
      id: 'slide-1',
      headline: 'Build faster. Ship smarter.',
      subhead: 'Modern web & cloud products with AI integrations that scale.',
      ctaText: 'Get a free consultation',
      ctaHref: '/contact',
   },
   {
      id: 'slide-2',
      headline: 'Make data useful with semantic search',
      subhead:
         'Turn documents into answers — fast retrieval and helpful assistants.',
      ctaText: 'Explore AI services',
      ctaHref: '/services/ai-integrations',
   },
   {
      id: 'slide-3',
      headline: 'Reliable APIs & infrastructure',
      subhead:
         'Bun + Express, scalable MySQL backends, and observability built-in.',
      ctaText: 'See our stack',
      ctaHref: '/services/cloud-devops',
   },
] as const;

type Slide = {
   id: string;
   image: string;
   headline: string;
   subhead: string;
   ctaText?: string;
   ctaHref?: string;
};

/* -------------------------
   Import hero images (Vite)
   ------------------------- */
const modules = import.meta.glob(
   '../assets/images/hero/*.{jpg,jpeg,png,webp}',
   { eager: true }
) as Record<string, { default: string }>;
const imagePaths = Object.keys(modules)
   .sort()
   .map((k) => modules[k].default);

const SLIDES: Slide[] = BASE_SLIDES.map((b, i) => ({
   id: b.id,
   image: imagePaths[i] ?? '',
   headline: b.headline,
   subhead: b.subhead,
   ctaText: b.ctaText,
   ctaHref: b.ctaHref,
}));

/* -------------------------
   Small subcomponents
   ------------------------- */
function Controls({
   onPrev,
   onNext,
}: {
   onPrev: () => void;
   onNext: () => void;
}) {
   return (
      <div className="flex items-center gap-3">
         <button
            onClick={onPrev}
            aria-label="Previous slide"
            className="rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 bg-white/10 hover:bg-white/20 text-white shadow-sm"
         >
            <FaChevronLeft />
         </button>

         <button
            onClick={onNext}
            aria-label="Next slide"
            className="rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg"
         >
            <FaChevronRight />
         </button>
      </div>
   );
}

function Indicators({
   count,
   active,
   onGoTo,
}: {
   count: number;
   active: number;
   onGoTo: (i: number) => void;
}) {
   return (
      <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-black/30">
         {Array.from({ length: count }).map((_, i) => (
            <button
               key={i}
               aria-label={`Go to slide ${i + 1}`}
               onClick={() => onGoTo(i)}
               className={classNames(
                  'h-2 w-8 rounded-full transition-all',
                  i === active ? 'bg-white scale-[1.08]' : 'bg-white/40'
               )}
            />
         ))}
      </div>
   );
}

function FeatureCard() {
   return (
      <motion.aside
         initial={{ opacity: 0, y: 8 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.45 }}
         className="rounded-2xl bg-gradient-to-br from-white/90 to-slate-50/80 dark:from-slate-900/75 dark:to-slate-800/60 backdrop-blur-md p-6 shadow-2xl border border-white/10"
      >
         <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-14 w-14 rounded-lg bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow">
               S
            </div>

            <div className="flex-1">
               <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  How we deliver value
               </div>
               <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Product design, engineering and AI — delivered iteratively.
               </div>

               <ul className="mt-4 grid grid-cols-1 gap-3 text-sm">
                  <li className="flex items-center justify-between">
                     <div className="text-slate-700 dark:text-slate-100">
                        Rapid prototypes
                     </div>
                     <div className="text-slate-500">2–4 weeks</div>
                  </li>
                  <li className="flex items-center justify-between">
                     <div className="text-slate-700 dark:text-slate-100">
                        MVP to Prod
                     </div>
                     <div className="text-slate-500">CI / CD</div>
                  </li>
                  <li className="flex items-center justify-between">
                     <div className="text-slate-700 dark:text-slate-100">
                        AI Assistants
                     </div>
                     <div className="text-slate-500">RAG + Chat</div>
                  </li>
               </ul>

               <div className="mt-4">
                  <Link
                     to="/services"
                     className="inline-flex items-center px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-sm font-medium shadow hover:brightness-105 transform-gpu transition"
                  >
                     View Services
                  </Link>
               </div>
            </div>
         </div>
      </motion.aside>
   );
}

/* -------------------------
   Main component
   ------------------------- */
function HeroSection(): JSX.Element {
   const prefersReducedMotion = usePrefersReducedMotion();
   const slides = useMemo(() => SLIDES, []);
   const [index, setIndex] = useState<number>(0);
   const current = slides[index];
   const timerRef = useRef<number | null>(null);
   const pausedRef = useRef(false);

   const SLIDE_INTERVAL = 6000;

   const clearTimer = () => {
      if (timerRef.current) {
         window.clearInterval(timerRef.current);
         timerRef.current = null;
      }
   };

   const startTimer = useCallback(() => {
      clearTimer();
      if (prefersReducedMotion || slides.length <= 1) return;
      timerRef.current = window.setInterval(() => {
         if (!pausedRef.current) setIndex((i) => (i + 1) % slides.length);
      }, SLIDE_INTERVAL);
   }, [prefersReducedMotion, slides.length]);

   useEffect(() => {
      startTimer();
      return clearTimer;
   }, [startTimer]);

   // Pause on hover / focus
   const handlePointerEnter = () => {
      pausedRef.current = true;
   };
   const handlePointerLeave = () => {
      pausedRef.current = false;
   };

   // keyboard navigation
   useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
         if (e.key === 'ArrowLeft')
            setIndex((i) => (i - 1 + slides.length) % slides.length);
         if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides.length);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
   }, [slides.length]);

   const prev = useCallback(
      () => setIndex((i) => (i - 1 + slides.length) % slides.length),
      [slides.length]
   );
   const next = useCallback(
      () => setIndex((i) => (i + 1) % slides.length),
      [slides.length]
   );
   const goTo = useCallback((i: number) => setIndex(i), []);

   /* Motion variants for nicer crossfade + subtle vertical parallax */
   const bgVariants = {
      initial: { opacity: 0, scale: 1.03 },
      enter: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
   };

   const contentVariants = {
      initial: { opacity: 0, y: 10 },
      enter: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
   };

   return (
      <section
         aria-label="Hero"
         className="relative isolate"
         onMouseEnter={handlePointerEnter}
         onMouseLeave={handlePointerLeave}
         onFocus={handlePointerEnter}
         onBlur={handlePointerLeave}
      >
         {/* Background slides */}
         <div className="absolute inset-0 -z-10">
            <AnimatePresence initial={false} mode="wait">
               {slides.map((s, idx) =>
                  idx === index ? (
                     <motion.div
                        key={s.id}
                        initial={prefersReducedMotion ? 'enter' : 'initial'}
                        animate="enter"
                        exit={prefersReducedMotion ? 'exit' : 'exit'}
                        variants={bgVariants}
                        transition={{
                           duration: prefersReducedMotion ? 0 : 1.0,
                           ease: [0.2, 0.9, 0.3, 1],
                        }}
                        className="absolute inset-0"
                        aria-hidden
                     >
                        {/* using <img> ensures better performance / decoding on some browsers */}
                        <motion.img
                           src={s.image}
                           alt=""
                           className="h-full w-full object-cover"
                           initial={{ scale: 1.02 }}
                           animate={{ scale: 1 }}
                           transition={{
                              duration: prefersReducedMotion ? 0 : 10,
                              ease: 'linear',
                           }} // very subtle zoom
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25 pointer-events-none" />
                     </motion.div>
                  ) : null
               )}
            </AnimatePresence>
         </div>

         {/* Content */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="pt-28 pb-20 lg:pt-32 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
               {/* Left content */}
               <div className="lg:col-span-7">
                  <div className="max-w-2xl">
                     <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                           key={current.id}
                           variants={contentVariants}
                           initial="initial"
                           animate="enter"
                           exit="exit"
                           transition={{
                              duration: prefersReducedMotion ? 0 : 0.45,
                              ease: 'easeOut',
                           }}
                        >
                           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
                              {current.headline}
                           </h1>

                           <p className="mt-4 text-lg text-white/90 max-w-xl">
                              {current.subhead}
                           </p>

                           <div className="mt-8 flex flex-wrap gap-3 items-center">
                              {current.ctaHref ? (
                                 <Link
                                    to={current.ctaHref}
                                    className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold shadow-lg hover:brightness-105 transform-gpu transition"
                                 >
                                    {current.ctaText ?? 'Learn more'}
                                 </Link>
                              ) : (
                                 <button className="inline-flex items-center px-5 py-3 rounded-lg bg-white/10 text-white font-semibold">
                                    {current.ctaText ?? 'Learn more'}
                                 </button>
                              )}

                              <a
                                 href="#services"
                                 className="inline-flex items-center px-4 py-2 rounded-lg border border-white/20 text-white/95 text-sm hover:bg-white/5 transition"
                              >
                                 Explore services
                              </a>
                           </div>
                        </motion.div>
                     </AnimatePresence>

                     {/* badges */}
                     <ul className="mt-6 flex flex-wrap gap-3 text-sm text-white/90">
                        <li className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                           <strong className="font-semibold">200+</strong>
                           <span className="opacity-90">projects</span>
                        </li>
                        <li className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                           <strong className="font-semibold">AI • RAG</strong>
                           <span className="opacity-90">semantic search</span>
                        </li>
                        <li className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                           <strong className="font-semibold">Bun</strong>
                           <span className="opacity-90">fast runtime</span>
                        </li>
                     </ul>
                  </div>
               </div>

               {/* Right card */}
               <div className="lg:col-span-5">
                  <FeatureCard />
               </div>
            </div>
         </div>

         {/* Controls + indicators (bottom right) */}
         <div className="absolute right-6 bottom-6 flex items-center gap-3 z-10">
            <Controls
               onPrev={() => {
                  prev();
                  startTimer();
               }}
               onNext={() => {
                  next();
                  startTimer();
               }}
            />
            <div className="ml-3">
               <Indicators
                  count={slides.length}
                  active={index}
                  onGoTo={(i) => {
                     goTo(i);
                     startTimer();
                  }}
               />
            </div>
         </div>
      </section>
   );
}

/* ---------------------------
   Small hook: prefers-reduced-motion
   --------------------------- */
function usePrefersReducedMotion(): boolean {
   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
   useEffect(() => {
      const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (!media) return;
      setPrefersReducedMotion(media.matches);
      const handler = () => setPrefersReducedMotion(media.matches);
      try {
         media.addEventListener('change', handler);
      } catch {
         // Safari fallback
         // @ts-ignore
         media.addListener(handler);
      }
      return () => {
         try {
            media.removeEventListener('change', handler);
         } catch {
            // @ts-ignore
            media.removeListener(handler);
         }
      };
   }, []);
   return prefersReducedMotion;
}

export default HeroSection;
