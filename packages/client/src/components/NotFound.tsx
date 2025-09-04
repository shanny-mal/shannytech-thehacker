import { Link } from 'react-router-dom';
export default function NotFound() {
   return (
      <main className="min-h-[60vh] flex items-center justify-center p-8">
         <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Page not found</h1>
            <p className="mb-4">The requested route does not exist.</p>
            <Link to="/" className="text-amber-400 hover:underline">
               Return home
            </Link>
         </div>
      </main>
   );
}
