import { useEffect, useState } from 'react';

export default function useScrollSpy(
   ids: (string | undefined)[],
   options?: { offset?: number }
) {
   const [active, setActive] = useState<string | null>(null);
   const offset = options?.offset ?? 0;

   useEffect(() => {
      function onScroll() {
         let found: string | null = null;
         for (const id of ids) {
            if (!id) continue;
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top - offset <= 0 && rect.bottom > 0) {
               found = id;
               break;
            }
         }
         setActive(found);
      }
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      return () => {
         window.removeEventListener('scroll', onScroll);
         window.removeEventListener('resize', onScroll);
      };
   }, [ids.join(','), offset]);

   return active;
}
