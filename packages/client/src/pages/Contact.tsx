import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

type ApiResponse = { ok?: boolean; error?: string };

export default function ContactPage() {
   useEffect(() => {
      document.title = 'Contact — ShannyTech';
      return () => {
         document.title = 'ShannyTech';
      };
   }, []);

   const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
   });
   const [loading, setLoading] = useState(false);
   const [status, setStatus] = useState<{
      type: 'success' | 'error';
      message: string;
   } | null>(null);

   function setField<K extends keyof typeof form>(k: K, v: string) {
      setForm((s) => ({ ...s, [k]: v }));
      setStatus(null);
   }

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setStatus(null);

      // client validation
      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
         setStatus({
            type: 'error',
            message: 'Please fill name, email and message.',
         });
         return;
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
         setStatus({ type: 'error', message: 'Please enter a valid email.' });
         return;
      }

      setLoading(true);
      try {
         const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...form }),
         });
         const body: ApiResponse = await res.json();
         if (!res.ok) {
            setStatus({
               type: 'error',
               message: body.error || 'Failed to send message',
            });
         } else {
            setStatus({
               type: 'success',
               message:
                  'Thanks — we received your message and will reply soon.',
            });
            setForm({
               name: '',
               email: '',
               phone: '',
               subject: '',
               message: '',
            });
         }
      } catch (err) {
         setStatus({
            type: 'error',
            message: 'Network error — please try again.',
         });
      } finally {
         setLoading(false);
      }
   }

   return (
      <main
         id="main-content"
         className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14"
      >
         <motion.header
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
         >
            <h1 className="text-3xl font-extrabold mb-2">Contact Us</h1>
            <p className="text-slate-600">
               Have a project or question? Tell us about it below — we’ll
               respond within one business day.
            </p>
         </motion.header>

         <motion.form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.06 }}
         >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                     id="name"
                     value={form.name}
                     onChange={(e) => setField('name', e.target.value)}
                     required
                  />
               </div>

               <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     type="email"
                     value={form.email}
                     onChange={(e) => setField('email', e.target.value)}
                     required
                  />
               </div>

               <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                     id="phone"
                     value={form.phone}
                     onChange={(e) => setField('phone', e.target.value)}
                  />
               </div>

               <div className="sm:col-span-2">
                  <Label htmlFor="subject">Subject (optional)</Label>
                  <Input
                     id="subject"
                     value={form.subject}
                     onChange={(e) => setField('subject', e.target.value)}
                  />
               </div>

               <div className="sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                     id="message"
                     rows={6}
                     value={form.message}
                     onChange={(e) => setField('message', e.target.value)}
                     required
                  />
               </div>
            </div>

            <div className="flex items-center gap-4">
               <Button type="submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send message'}
               </Button>
               <Link
                  to="/services"
                  className="text-sm text-slate-600 hover:underline"
               >
                  Explore services
               </Link>
            </div>

            {status && (
               <div
                  role="status"
                  aria-live="polite"
                  className={`mt-2 p-3 rounded ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}
               >
                  {status.message}
               </div>
            )}
         </motion.form>

         {/* small contact info block */}
         <aside className="mt-8 rounded-xl p-4 bg-slate-50 dark:bg-slate-800">
            <div className="text-sm text-slate-700 dark:text-slate-300">
               <div>
                  <strong>Email:</strong>{' '}
                  <a
                     href="mailto:info@shannytech.solutions"
                     className="underline"
                  >
                     info@shannytech.solutions
                  </a>
               </div>
               <div className="mt-1">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+263784071973" className="underline">
                     +263 78 407 1973
                  </a>
               </div>
               <div className="mt-1">
                  <strong>Address:</strong> 2964 Batonga, Kariba
               </div>
            </div>
         </aside>
      </main>
   );
}
