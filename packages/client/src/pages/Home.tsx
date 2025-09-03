import { Suspense, lazy, type JSX } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Button } from '@/components/ui/button'; // shadcn/ui - adjust path if needed

// Lazy-load heavier sections for faster initial paint
const ServicesPreview = lazy(() => import('../components/ServicesPreview'));
const FeaturesGrid = lazy(() => import('../components/FeaturesGrid'));
const Testimonials = lazy(() => import('../components/Testimonials'));

/* Small typed section header component with animation */
function SectionHeader({
   title,
   subtitle,
}: {
   title: string;
   subtitle?: string;
}): JSX.Element {
   return (
      <motion.div
         initial={{ opacity: 0, y: 8 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.45 }}
         className="mb-8"
         aria-hidden={false}
      >
         <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {title}
         </h2>
         {subtitle ? (
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
               {subtitle}
            </p>
         ) : null}
      </motion.div>
   );
}

/* Lightweight skeleton shown while lazy components load */
function SectionFallback({ height = 220 }: { height?: number }) {
   return (
      <div className="animate-pulse">
         <div
            className="rounded-xl bg-slate-100 dark:bg-slate-800"
            style={{ height }}
         />
      </div>
   );
}

export default function Home(): JSX.Element {
   return (
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
         {/* Hero (kept eager for best LCP) */}
         <HeroSection />

         {/* Main content */}
         <main id="main-content" role="main" className="pt-12">
            {/* Services */}
            <section aria-labelledby="services-heading" className="py-16">
               <div className="mx-auto max-w-7xl px-4 md:px-8">
                  <SectionHeader
                     title="Our services"
                     subtitle="End-to-end product development, AI-enabled experiences and reliable cloud platforms."
                  />

                  <Suspense fallback={<SectionFallback height={340} />}>
                     <ServicesPreview />
                  </Suspense>
               </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-slate-50 dark:bg-slate-800">
               <div className="mx-auto max-w-7xl px-4 md:px-8">
                  <SectionHeader
                     title="Why teams choose us"
                     subtitle="Design, build and operate production-grade software with confidence."
                  />

                  <Suspense fallback={<SectionFallback height={360} />}>
                     <FeaturesGrid />
                  </Suspense>
               </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
               <div className="mx-auto max-w-7xl px-4 md:px-8">
                  <SectionHeader
                     title="Customer stories"
                     subtitle="Real outcomes from organizations we've partnered with."
                  />

                  <Suspense fallback={<SectionFallback height={300} />}>
                     <Testimonials />
                  </Suspense>
               </div>
            </section>
         </main>

         {/* Floating CTA */}
         <div className="fixed right-6 bottom-6 z-50">
            <Link to="/contact" aria-label="Get a quote">
               <Button className="bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-400 text-black shadow-lg px-5 py-3">
                  Get a Quote
               </Button>
            </Link>
         </div>
      </div>
   );
}
