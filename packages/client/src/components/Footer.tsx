import { type JSX } from 'react';
import { Link } from 'react-router-dom';

export default function Footer(): JSX.Element {
   return (
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
         <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
               <div className="text-xl font-bold">Ready to start?</div>
               <div className="text-sm text-slate-300">
                  Contact us for a free consultation and roadmap.
               </div>
            </div>

            <div className="flex gap-3">
               <Link
                  to="/contact"
                  className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
               >
                  Request a demo
               </Link>
               <a
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-white/10 rounded-lg text-white/90 hover:border-white/20 transition"
               >
                  Pricing
               </a>
            </div>
         </div>

         <div className="border-t border-white/6 pt-6 text-sm text-slate-300">
            <div className="mx-auto max-w-7xl px-4 md:px-8 pb-6">
               © {new Date().getFullYear()} ShannyTech • Built with care
            </div>
         </div>
      </footer>
   );
}
