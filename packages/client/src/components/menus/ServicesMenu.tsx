import { Link } from 'react-router-dom';

export default function ServicesMenu({
   items = [] as any[],
}: {
   items?: { id: string; title: string; slug: string }[];
}) {
   return (
      <ul className="w-64 rounded bg-white dark:bg-gray-800 shadow p-2">
         {items.map((it) => (
            <li key={it.id}>
               <Link
                  to={`/services/${it.slug}`}
                  className="block px-3 py-2 hover:bg-slate-50 dark:hover:bg-gray-700"
               >
                  {it.title}
               </Link>
            </li>
         ))}
      </ul>
   );
}
