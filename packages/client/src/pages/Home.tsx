import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import ServicesPreview from '../components/ServicesPreview';

export default function Home() {
   return (
      <div>
         <HeroSection />
         <main id="main-content" className="bg-white dark:bg-slate-900">
            <section className="py-16">
               <div className="mx-auto max-w-7xl px-4 md:px-8">
                  <ServicesPreview />
               </div>
            </section>
            <section className="py-16 bg-slate-50 dark:bg-slate-800">
               <div className="mx-auto max-w-7xl px-4 md:px-8">
                  <FeaturesGrid />
               </div>
            </section>
         </main>
      </div>
   );
}
