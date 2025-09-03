/// <reference types="vite/client" />
import {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
   type JSX,
} from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/* ---------------------------
   Tunables
   --------------------------- */
const CROSSFADE_DURATION = 0.72;
const TEXT_TRANSITION = 0.45;
const SLIDE_INTERVAL = 4200;

/* ---------------------------
   Slides + images (vite glob)
   --------------------------- */
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

type SlideText = {
   id: string;
   headline: string;
   subhead: string;
   ctaText?: string;
   ctaHref?: string;
};

const modules = import.meta.glob(
   '../assets/images/hero/*.{jpg,jpeg,png,webp}',
   { eager: true }
) as Record<string, { default: string }>;
const imagePaths = Object.keys(modules)
   .sort()
   .map((k) => modules[k].default);

const SLIDES: (SlideText & { image: string })[] = BASE_SLIDES.map((b, i) => ({
   ...b,
   image: imagePaths[i] ?? imagePaths[0] ?? '',
}));

/* ---------------------------
   Image cache helper
   --------------------------- */
const imageLoadedCache = new Map<string, boolean>();
function preloadImage(src: string) {
   if (!src || imageLoadedCache.get(src)) return;
   const img = new Image();
   img.src = src;
   img.onload = () => imageLoadedCache.set(src, true);
   img.onerror = () => imageLoadedCache.set(src, false);
}

/* ---------------------------
   prefers-reduced-motion hook
   --------------------------- */
function usePrefersReducedMotion(): boolean {
   const [prefers, setPrefers] = useState(false);
   useEffect(() => {
      if (typeof window === 'undefined' || !window.matchMedia) return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefers(mq.matches);
      const handler = () => setPrefers(mq.matches);
      try {
         mq.addEventListener('change', handler);
      } catch {
         // Safari fallback
         // @ts-ignore
         mq.addListener?.(handler);
      }
      return () => {
         try {
            mq.removeEventListener('change', handler);
         } catch {
            // @ts-ignore
            mq.removeListener?.(handler);
         }
      };
   }, []);
   return prefers;
}

/* ---------------------------
   Small UI subcomponents
   --------------------------- */
function Controls({
   onPrev,
   onNext,
}: {
   onPrev: () => void;
   onNext: () => void;
}) {
   return (
      <div
         className="flex items-center gap-3"
         role="group"
         aria-label="Slide controls"
      >
         <button
            onClick={onPrev}
            aria-label="Previous slide"
            className="rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/70 bg-black/60 hover:bg-black/80 text-white shadow"
            type="button"
         >
            <FaChevronLeft />
         </button>

         <button
            onClick={onNext}
            aria-label="Next slide"
            className="rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-300 bg-gradient-to-r from-blue-600 via-orange-400 to-green-500 text-white shadow-lg"
            type="button"
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
   prefersReducedMotion,
}: {
   count: number;
   active: number;
   onGoTo: (i: number) => void;
   prefersReducedMotion: boolean;
}) {
   return (
      <div
         className="flex items-center gap-2 rounded-full px-3 py-1 bg-black/30"
         role="tablist"
         aria-label="Slide indicators"
      >
         {Array.from({ length: count }).map((_, i) => (
            <motion.button
               key={i}
               aria-label={`Go to slide ${i + 1}`}
               role="tab"
               aria-selected={i === active}
               onClick={() => onGoTo(i)}
               initial={false}
               animate={{
                  scale: i === active ? 1.08 : 1,
                  opacity: i === active ? 1 : 0.7,
                  backgroundColor: i === active ? '#38bdf8' : undefined, // sky-400 fallback
               }}
               transition={
                  prefersReducedMotion
                     ? { duration: 0 }
                     : { type: 'spring', stiffness: 300, damping: 22 }
               }
               className={classNames(
                  'h-2 w-8 rounded-full transition-all outline-none',
                  i === active ? 'bg-sky-400' : 'bg-white/30'
               )}
               type="button"
            />
         ))}
      </div>
   );
}

function FeatureCardAnimated() {
   return (
      <motion.div
         initial={{ opacity: 0, y: 8, rotate: -0.5, scale: 0.995 }}
         animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
         whileHover={{ y: -6, scale: 1.01 }}
         transition={{ duration: 0.48, ease: 'easeOut' }}
      >
         <Card className="overflow-hidden rounded-2xl p-4 shadow-2xl transform-gpu transition hover:shadow-2xl/40 bg-white dark:bg-slate-900/80 border border-black/5">
            <div className="flex gap-4 items-start">
               <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center text-white text-2xl font-bold shadow">
                  S
               </div>

               <div className="flex-1">
                  <div className="text-base font-semibold text-slate-900 dark:text-white">
                     How we deliver value
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                     Product design, engineering and AI — delivered iteratively.
                  </div>

                  <ul className="mt-4 grid gap-2 text-sm">
                     <li className="flex justify-between">
                        <span className="text-slate-700 dark:text-slate-100">
                           Rapid prototypes
                        </span>
                        <span className="text-slate-500">2–4 weeks</span>
                     </li>
                     <li className="flex justify-between">
                        <span className="text-slate-700 dark:text-slate-100">
                           MVP to Prod
                        </span>
                        <span className="text-slate-500">CI / CD</span>
                     </li>
                     <li className="flex justify-between">
                        <span className="text-slate-700 dark:text-slate-100">
                           AI Assistants
                        </span>
                        <span className="text-slate-500">RAG + Chat</span>
                     </li>
                  </ul>

                  <div className="mt-4">
                     <Link to="/services" aria-label="View Services">
                        <Button className="bg-gradient-to-r from-blue-600 via-orange-400 to-green-500 text-white shadow-md">
                           View Services
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </Card>
      </motion.div>
   );
}

/* ---------------------------
   Main Hero component
   --------------------------- */
export default function HeroSection(): JSX.Element {
   const prefersReducedMotion = usePrefersReducedMotion();
   const slides = useMemo(() => SLIDES, []);
   const [index, setIndex] = useState<number>(0);
   const current = slides[index];

   // Preload first + next
   useEffect(() => {
      if (!slides.length) return;
      preloadImage(slides[0].image);
      if (slides[1]) preloadImage(slides[1].image);
   }, [slides]);

   // Timer refs
   const timerRef = useRef<number | null>(null);
   const pausedRef = useRef(false);

   const clearTimer = useCallback(() => {
      if (typeof window === 'undefined') return;
      if (timerRef.current !== null) {
         window.clearInterval(timerRef.current);
         timerRef.current = null;
      }
   }, []);

   const startTimer = useCallback(() => {
      clearTimer();
      if (
         prefersReducedMotion ||
         slides.length <= 1 ||
         typeof window === 'undefined'
      )
         return;
      timerRef.current = window.setInterval(() => {
         if (!pausedRef.current) setIndex((i) => (i + 1) % slides.length);
      }, SLIDE_INTERVAL);
   }, [clearTimer, prefersReducedMotion, slides.length]);

   useEffect(() => {
      startTimer();
      return clearTimer;
   }, [startTimer, clearTimer]);

   // Pause on hover/focus
   const handlePointerEnter = useCallback(() => {
      pausedRef.current = true;
   }, []);
   const handlePointerLeave = useCallback(() => {
      pausedRef.current = false;
   }, []);

   // helpers
   const prev = useCallback(
      () => setIndex((i) => (i - 1 + slides.length) % slides.length),
      [slides.length]
   );
   const next = useCallback(
      () => setIndex((i) => (i + 1) % slides.length),
      [slides.length]
   );
   const goTo = useCallback((i: number) => setIndex(i), []);

   // keyboard nav
   useEffect(() => {
      if (typeof window === 'undefined') return;
      const onKey = (e: KeyboardEvent) => {
         if (e.key === 'ArrowLeft') {
            prev();
            startTimer();
         }
         if (e.key === 'ArrowRight') {
            next();
            startTimer();
         }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
   }, [prev, next, startTimer]);

   /* motion variants for background slides (all slides rendered; active gets visible state) */
   const bgVariants = {
      hidden: {
         opacity: 0,
         scale: 1.015,
         y: 10,
         pointerEvents: 'none' as const,
      },
      visible: { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' as const },
   } as const;

   const textVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
   } as const;

   return (
      <section
         aria-label="Hero"
         className="relative isolate overflow-hidden bg-black"
         onMouseEnter={handlePointerEnter}
         onMouseLeave={handlePointerLeave}
         onFocus={handlePointerEnter}
         onBlur={handlePointerLeave}
      >
         {/* A11y announcer */}
         <div aria-live="polite" className="sr-only">
            Slide {index + 1} of {slides.length}: {current?.headline}
         </div>

         {/* Background slides - render all but animate visibility to avoid overlap flicker */}
         <div className="absolute inset-0 -z-20">
            {slides.map((s, idx) => {
               const isActive = idx === index;
               return (
                  <motion.div
                     key={s.id}
                     initial={prefersReducedMotion ? 'visible' : 'hidden'}
                     animate={isActive ? 'visible' : 'hidden'}
                     variants={bgVariants}
                     transition={{
                        duration: prefersReducedMotion ? 0 : CROSSFADE_DURATION,
                        ease: [0.22, 1, 0.36, 1],
                     }}
                     className="absolute inset-0 w-full h-full"
                     style={{
                        zIndex: isActive ? 10 : 0,
                        willChange: 'opacity, transform',
                     }}
                     aria-hidden={!isActive}
                  >
                     <motion.img
                        src={s.image}
                        alt=""
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover"
                        initial={
                           prefersReducedMotion ? undefined : { scale: 1.03 }
                        }
                        animate={
                           prefersReducedMotion
                              ? undefined
                              : { scale: isActive ? 1 : 1.03 }
                        }
                        transition={
                           prefersReducedMotion
                              ? { duration: 0 }
                              : { duration: 12, ease: 'linear' }
                        } // subtle slow zoom
                        onLoad={() => imageLoadedCache.set(s.image, true)}
                     />
                     <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
                  </motion.div>
               );
            })}
         </div>

         {/* Foreground content */}
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="pt-20 pb-20 lg:pt-28 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
               {/* Left text */}
               <div className="lg:col-span-7">
                  <div className="max-w-2xl">
                     <motion.div
                        key={current?.id ?? 'empty'}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={textVariants}
                        transition={{
                           duration: prefersReducedMotion ? 0 : TEXT_TRANSITION,
                           ease: 'easeOut',
                        }}
                     >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
                           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-orange-400 to-green-400">
                              {current?.headline}
                           </span>
                        </h1>

                        <p className="mt-4 text-lg text-white/90 max-w-xl">
                           {current?.subhead}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 items-center">
                           {current?.ctaHref ? (
                              <Link to={current.ctaHref}>
                                 <Button className="px-5 py-3 bg-gradient-to-r from-blue-600 via-orange-400 to-green-500 text-white shadow-lg hover:brightness-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/70">
                                    {current.ctaText ?? 'Learn more'}
                                 </Button>
                              </Link>
                           ) : (
                              <Button variant="secondary" className="px-5 py-3">
                                 {current?.ctaText ?? 'Learn more'}
                              </Button>
                           )}

                           <a
                              href="#services"
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-black/50 border border-white/12 text-white text-sm hover:bg-black/40 transition"
                           >
                              Explore services
                           </a>
                        </div>
                     </motion.div>

                     {/* Badges */}
                     <ul className="mt-6 flex flex-wrap gap-3 text-sm text-white/90">
                        <li className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                           <strong className="font-semibold text-white">
                              200+
                           </strong>
                           <span className="opacity-90">projects</span>
                        </li>
                        <li className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                           <strong className="font-semibold text-white">
                              AI • RAG
                           </strong>
                           <span className="opacity-90">semantic search</span>
                        </li>
                        <li className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                           <strong className="font-semibold text-white">
                              Bun
                           </strong>
                           <span className="opacity-90">fast runtime</span>
                        </li>
                     </ul>
                  </div>
               </div>

               {/* Right card */}
               <div className="lg:col-span-5">
                  <FeatureCardAnimated />
               </div>
            </div>
         </div>

         {/* Controls & indicators */}
         <div className="absolute inset-x-0 bottom-6 flex items-center justify-center md:justify-end px-4 z-30">
            <div className="flex items-center gap-3">
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
               <div className="ml-3 hidden md:block">
                  <Indicators
                     count={slides.length}
                     active={index}
                     onGoTo={(i) => {
                        goTo(i);
                        startTimer();
                     }}
                     prefersReducedMotion={prefersReducedMotion}
                  />
               </div>
            </div>

            {/* mobile indicators centered */}
            <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2">
               <Indicators
                  count={slides.length}
                  active={index}
                  onGoTo={(i) => {
                     goTo(i);
                     startTimer();
                  }}
                  prefersReducedMotion={prefersReducedMotion}
               />
            </div>
         </div>
      </section>
   );

   // NOTE: prev/next/goTo/startTimer/clearTimer are defined above in this scope (useCallback).
}
