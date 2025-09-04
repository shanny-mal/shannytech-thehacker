// src/App.tsx
import React, {
   Suspense,
   lazy,
   type JSX,
   useLayoutEffect,
   useRef,
   useState,
   useCallback,
   useMemo,
   useEffect,
} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookieConsent from './components/CookieConsent';

/* Lazy-loaded pages (faster initial bundle) */
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

/* Small accessible loading fallback used by Suspense */
function LoadingFallback(): JSX.Element {
   return (
      <div
         role="status"
         aria-live="polite"
         className="flex items-center justify-center py-20"
      >
         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-500" />
         <span className="sr-only">Loading…</span>
      </div>
   );
}

/* Simple ErrorBoundary for route-level errors */
class RouteErrorBoundary extends React.Component<
   { children: React.ReactNode },
   { hasError: boolean }
> {
   constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError() {
      return { hasError: true };
   }

   componentDidCatch(_error: unknown, _info: unknown) {
      // Optionally log the error to an analytics/monitoring service here
      // console.error("Route error:", error, info);
   }

   render() {
      if (this.state.hasError) {
         return (
            <main
               id="main-content"
               className="min-h-[60vh] flex items-center justify-center p-8"
            >
               <div className="max-w-xl text-center">
                  <h1 className="text-2xl font-semibold mb-2">
                     Something went wrong
                  </h1>
                  <p className="text-slate-600 mb-6">
                     We couldn't load this page. Try refreshing or come back
                     later.
                  </p>
                  <button
                     onClick={() => this.setState({ hasError: false })}
                     className="inline-flex items-center px-4 py-2 rounded bg-amber-400 text-black hover:brightness-95 transition"
                  >
                     Try again
                  </button>
               </div>
            </main>
         );
      }
      return this.props.children as React.ReactElement;
   }
}

/* ScrollToTop: scrolls to top on route changes */
function ScrollToTop(): null {
   const { pathname } = useLocation();
   useEffect(() => {
      if (typeof window !== 'undefined') {
         window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
   }, [pathname]);
   return null;
}

/* Helper: safely measure an element's height (rounded up) */
function getHeight(el: Element | null): number {
   if (!el || !(el instanceof HTMLElement)) return 0;
   return Math.ceil(el.getBoundingClientRect().height);
}

/**
 * App
 *
 * Layout algorithm:
 * - Measure the top stacked bars (top ribbon + nav) and footer height.
 * - Apply exact `paddingTop` to <main> so fixed header doesn't overlap content.
 * - Compute `minHeight` so main area tries to fill remaining viewport (avoids premature page overflow).
 */
export default function App(): JSX.Element {
   const footerWrapperRef = useRef<HTMLDivElement | null>(null);
   const appRootRef = useRef<HTMLDivElement | null>(null);

   // measured px values (defaults chosen as a reasonable fallback)
   const [topOffsetPx, setTopOffsetPx] = useState<number>(88);
   const [footerHeightPx, setFooterHeightPx] = useState<number>(88);

   // measurement callback (stable via useCallback)
   const measure = useCallback(() => {
      if (typeof document === 'undefined') return;

      // Prefer explicit data attributes if present in your Header/TopRibbon.
      // Fallback to the original selectors used earlier.
      const topRibbon =
         document.querySelector('[data-top-ribbon]') ??
         document.querySelector('.fixed.inset-x-0.top-0.z-50') ??
         null;

      // we added aria-label="Main navigation" to nav in Header — use that where possible
      const nav =
         document.querySelector('nav[aria-label="Main navigation"]') ??
         document.querySelector('header nav') ??
         null;

      const topRibbonH = getHeight(topRibbon);
      const navH = getHeight(nav);

      const totalTop = Math.max(0, topRibbonH + navH);

      const footerEl = footerWrapperRef.current;
      const footerH = footerEl
         ? Math.ceil(footerEl.getBoundingClientRect().height)
         : 0;

      setTopOffsetPx(totalTop || 88);
      setFooterHeightPx(footerH || 88);
   }, []);

   // Run measurements synchronously after DOM mutates so layout is accurate
   useLayoutEffect(() => {
      if (typeof window === 'undefined') return;

      let raf = 0;

      const measureRaf = () => {
         if (raf) cancelAnimationFrame(raf);
         raf = requestAnimationFrame(() => {
            measure();
            raf = 0;
         });
      };

      // initial measurement
      measureRaf();

      // re-measure after images/fonts load to reduce jumps
      const onLoad = () => measureRaf();
      window.addEventListener('load', onLoad, { once: true });

      // measure on resize/orientation change with throttling via RAF
      const onResize = () => measureRaf();
      window.addEventListener('resize', onResize);
      window.addEventListener('orientationchange', onResize);

      // also observe footer in case it dynamically changes (optional)
      let ro: ResizeObserver | null = null;
      try {
         if (
            footerWrapperRef.current &&
            typeof ResizeObserver !== 'undefined'
         ) {
            ro = new ResizeObserver(() => measureRaf());
            ro.observe(footerWrapperRef.current);
         }
      } catch {
         ro = null;
      }

      return () => {
         if (raf) cancelAnimationFrame(raf);
         window.removeEventListener('load', onLoad);
         window.removeEventListener('resize', onResize);
         window.removeEventListener('orientationchange', onResize);
         if (ro && footerWrapperRef.current)
            ro.unobserve(footerWrapperRef.current);
      };
   }, [measure]);

   // Prevent horizontal overflow globally for this app root (safe cleanup)
   useEffect(() => {
      const root = appRootRef.current;
      const prevBodyOverflowX =
         typeof document !== 'undefined' ? document.body.style.overflowX : '';
      if (typeof document !== 'undefined')
         document.body.style.overflowX = 'hidden';

      if (root) {
         root.style.overflowX = 'hidden';
         root.style.boxSizing = 'border-box';
      }

      return () => {
         if (typeof document !== 'undefined')
            document.body.style.overflowX = prevBodyOverflowX;
         if (root) {
            root.style.overflowX = '';
            root.style.boxSizing = '';
         }
      };
   }, []);

   // compute inline styles for main once values are set
   const mainStyle = useMemo<React.CSSProperties>(
      () => ({
         paddingTop: `${topOffsetPx}px`,
         minHeight: `calc(100vh - ${topOffsetPx + footerHeightPx}px)`,
         overflow: 'auto',
      }),
      [topOffsetPx, footerHeightPx]
   );

   return (
      <div
         ref={appRootRef}
         className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
      >
         <Header />

         {/* ScrollToTop listens to route changes */}
         <ScrollToTop />

         {/* Main: measured top padding prevents overlap with fixed header/ribbon */}
         <main id="main-content" className="flex-1 w-full" style={mainStyle}>
            <RouteErrorBoundary>
               <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/services" element={<Services />} />
                     <Route
                        path="/services/:slug"
                        element={<ServiceDetail />}
                     />

                     {/* Add other routes here (lazy import them similarly) */}
                     <Route path="/about" element={<About />} />
                     <Route path="/contact" element={<Contact />} />
                     <Route path="/privacy" element={<Privacy />} />
                     <Route path="/terms" element={<Terms />} />
                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </Suspense>
            </RouteErrorBoundary>
         </main>

         {/* Footer wrapper (measured by ResizeObserver to update layout) */}
         <div ref={footerWrapperRef}>
            <Footer />
         </div>

         {/* Client-only cookie consent; component should itself be safe for SSR */}
         <CookieConsent privacyHref="/privacy" />
      </div>
   );
}
