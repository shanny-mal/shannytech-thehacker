// src/App.tsx
import React, { Suspense, lazy, type JSX } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

/* Lazy-loaded pages (faster initial bundle) */
const Home = lazy(() => import('./pages/Home'));

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
      // you can log the error to an analytics/monitoring service here
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
                     className="inline-flex items-center px-4 py-2 rounded bg-sky-500 text-white hover:brightness-95 transition"
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
   React.useEffect(() => {
      // Use instant scroll on route change to avoid safari/history jank
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
   }, [pathname]);
   return null;
}

/* App component */
export default function App(): JSX.Element {
   return (
      // If you already wrap <App /> with BrowserRouter in index.tsx, remove this BrowserRouter here.

      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
         <Header />

         {/* ScrollToTop listens to route changes */}
         <ScrollToTop />

         {/* Main: add top padding to account for the fixed TopRibbon + Navbar.
              Adjust the 'paddingTop' value if you change header heights.
              Example: TopRibbon (h-11) + nav (h-16) ~ 11 + 16 = 27 -> 6.5rem ≈ 104px.
              I used 5.5rem (88px) as a starting point — tweak as needed. */}
         <main
            id="main-content"
            className="flex-1"
            style={{ paddingTop: '5.5rem' }}
         >
            <RouteErrorBoundary>
               <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     {/* Add other routes here, eg:
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />
                  */}
                  </Routes>
               </Suspense>
            </RouteErrorBoundary>
         </main>

         <Footer />
      </div>
   );
}
