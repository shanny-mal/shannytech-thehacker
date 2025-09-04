import { type JSX, useState } from 'react';
import classNames from 'classnames';

export default function ServiceFilters({
   tags,
   onSearch,
   onFilter,
}: {
   tags: string[];
   onSearch: (q: string) => void;
   onFilter: (tag: string | null) => void;
}): JSX.Element {
   const [q, setQ] = useState('');
   const [active, setActive] = useState<string | null>(null);

   return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
         <div className="flex-1 min-w-0">
            <label htmlFor="service-search" className="sr-only">
               Search services
            </label>
            <input
               id="service-search"
               type="search"
               value={q}
               onChange={(e) => {
                  setQ(e.target.value);
                  onSearch(e.target.value);
               }}
               placeholder="Search services, e.g. 'AI', 'API', 'frontend'…"
               className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/6 placeholder:text-slate-400 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
         </div>

         <div className="flex gap-2 overflow-x-auto py-1">
            <button
               onClick={() => {
                  setActive(null);
                  onFilter(null);
               }}
               className={classNames(
                  'px-3 py-1 rounded-full text-sm',
                  !active
                     ? 'bg-amber-400/20 text-white font-medium'
                     : 'bg-white/5 text-slate-300'
               )}
            >
               All
            </button>

            {tags.map((t) => (
               <button
                  key={t}
                  onClick={() => {
                     setActive((a) => (a === t ? null : t));
                     onFilter(active === t ? null : t);
                  }}
                  className={classNames(
                     'px-3 py-1 rounded-full text-sm whitespace-nowrap',
                     active === t
                        ? 'bg-amber-400/20 text-white font-medium'
                        : 'bg-white/5 text-slate-300'
                  )}
               >
                  {t}
               </button>
            ))}
         </div>
      </div>
   );
}
