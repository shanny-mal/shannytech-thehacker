import { useEffect, type JSX } from 'react';
import { Link } from 'react-router-dom';

/**
 * Privacy page (draft)
 *
 * NOTE: This is a template / starting point. It is NOT legal advice.
 * Please review with legal counsel and update placeholders (company name, email, jurisdiction).
 */

const COMPANY_NAME = 'ShannyTech';
const DATA_CONTROLLER = 'ShannyTech (Shannon Chipezeze)';
const CONTACT_EMAIL = 'info@shannytech.solutions';
const EFFECTIVE_DATE = '2025-09-04'; // update when you publish

export default function Privacy(): JSX.Element {
   useEffect(() => {
      document.title = `Privacy Policy — ${COMPANY_NAME}`;
      return () => {
         document.title = COMPANY_NAME;
      };
   }, []);

   return (
      <main
         id="main-content"
         className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
      >
         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-8">
               <h1 className="text-3xl md:text-4xl font-extrabold">
                  Privacy Policy
               </h1>
               <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Effective date: <strong>{EFFECTIVE_DATE}</strong>
               </p>
               <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                  This privacy policy explains how{' '}
                  <strong>{COMPANY_NAME}</strong> collects, uses, discloses and
                  protects personal information when you visit our website or
                  use our services.
               </p>
            </header>

            {/* Quick nav */}
            <nav aria-label="Privacy policy sections" className="mb-8">
               <ul className="flex flex-wrap gap-3 text-sm">
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#what-we-collect"
                     >
                        What we collect
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#how-we-use"
                     >
                        How we use
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#cookies"
                     >
                        Cookies
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#third-parties"
                     >
                        Third parties
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#rights"
                     >
                        Your rights
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#security"
                     >
                        Security
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#contact"
                     >
                        Contact
                     </a>
                  </li>
               </ul>
            </nav>

            {/* Sections */}
            <article className="prose dark:prose-invert max-w-none">
               <section id="what-we-collect">
                  <h2>1. Information we collect</h2>
                  <p>
                     We collect information you provide directly and information
                     collected automatically when you use our website or
                     services.
                  </p>

                  <h3>Information you provide</h3>
                  <ul>
                     <li>
                        Contact details (name, email, phone) when you contact us
                        or sign up for consultations.
                     </li>
                     <li>
                        Content you share with us (example: files uploaded for
                        an assessment).
                     </li>
                     <li>
                        Payment details (if you purchase services) — we use
                        third-party payment processors; we do not store full
                        card numbers on our servers.
                     </li>
                  </ul>

                  <h3>Information we collect automatically</h3>
                  <ul>
                     <li>
                        Log and usage data (IP address, browser user agent,
                        pages visited, timestamps).
                     </li>
                     <li>
                        Device and performance data (screen resolution, OS,
                        crashes, latency metrics).
                     </li>
                     <li>
                        Cookies and similar technologies (see the Cookies
                        section).
                     </li>
                  </ul>
               </section>

               <section id="how-we-use" className="mt-6">
                  <h2>2. How we use your information</h2>
                  <p>We use personal data for the following purposes:</p>
                  <ul>
                     <li>
                        To provide, maintain and improve our products and
                        services.
                     </li>
                     <li>
                        To respond to your inquiries and communicate important
                        notices (service changes, billing).
                     </li>
                     <li>
                        To analyze usage and performance so we can improve the
                        experience and secure our services.
                     </li>
                     <li>
                        To send marketing communications if you opt in (you can
                        unsubscribe at any time).
                     </li>
                     <li>
                        To comply with legal obligations and enforce our
                        agreements.
                     </li>
                  </ul>
               </section>

               <section id="legal-basis" className="mt-6">
                  <h2>3. Legal basis for processing (ZIMBABWE / AFRICA)</h2>
                  <p>
                     If you are in the ZIMBABWE/AFRICA, we rely on one or more
                     of the following legal bases to process personal data:
                  </p>
                  <ul>
                     <li>
                        Contractual necessity (to provide services you request).
                     </li>
                     <li>
                        Legitimate interests (improving services, preventing
                        fraud) — balanced against your rights.
                     </li>
                     <li>Consent (for marketing, cookies where required).</li>
                     <li>Compliance with legal obligations.</li>
                  </ul>
               </section>

               <section id="cookies" className="mt-6">
                  <h2>4. Cookies & similar technologies</h2>
                  <p>
                     We use cookies, local storage and similar technologies to
                     make our site work, to remember preferences, and to
                     understand how our site is used.
                  </p>

                  <h3>Types of cookies</h3>
                  <ul>
                     <li>
                        <strong>Strictly necessary:</strong> required for basic
                        site functionality (cannot be disabled).
                     </li>
                     <li>
                        <strong>Performance & analytics:</strong> help us
                        understand usage (e.g., Google Analytics).
                     </li>
                     <li>
                        <strong>Functional:</strong> remember preferences and UI
                        settings.
                     </li>
                     <li>
                        <strong>Marketing:</strong> used by third parties to
                        display targeted ads (we do not use advertising networks
                        by default).
                     </li>
                  </ul>

                  <h3>Cookie consent</h3>
                  <p>
                     When required by law, we present a cookie consent banner
                     allowing you to accept or decline non-essential cookies.
                     You can also control and clear cookies via your browser
                     settings.
                  </p>
               </section>

               <section id="third-parties" className="mt-6">
                  <h2>5. Third-party services</h2>
                  <p>
                     We may share data with trusted third parties that provide
                     services on our behalf, such as:
                  </p>
                  <ul>
                     <li>
                        Hosting and infrastructure providers (e.g., cloud
                        platforms).
                     </li>
                     <li>
                        Analytics providers (e.g., Google Analytics; you can opt
                        out where available).
                     </li>
                     <li>Payment processors (to handle transactions).</li>
                     <li>
                        Customer support, CRM, marketing automation services.
                     </li>
                  </ul>
                  <p>
                     These providers have access only to the data necessary to
                     perform their functions and are contractually required to
                     protect it.
                  </p>
               </section>

               <section id="data-retention" className="mt-6">
                  <h2>6. Data retention</h2>
                  <p>
                     We retain personal data as long as necessary to provide
                     services, comply with legal obligations, resolve disputes
                     and enforce our agreements. Typical retention examples:
                  </p>
                  <ul>
                     <li>
                        Contact & inquiry records: retained for up to 3 years
                        (unless you request deletion sooner).
                     </li>
                     <li>
                        Billing records: retained for up to 7 years to meet
                        accounting and tax requirements.
                     </li>
                     <li>
                        Analytics data: generally aggregated and retained for up
                        to 24 months.
                     </li>
                  </ul>
                  <p>
                     If you want a specific retention period or deletion,
                     contact us (see the Contact section).
                  </p>
               </section>

               <section id="security" className="mt-6">
                  <h2>7. Security</h2>
                  <p>
                     We take reasonable technical and organizational measures to
                     protect personal data, including access controls,
                     encryption in transit (TLS), and secure hosting. However,
                     no system is 100% secure — if you suspect a breach, contact
                     us immediately.
                  </p>
               </section>

               <section id="international" className="mt-6">
                  <h2>8. Cross-border transfers</h2>
                  <p>
                     Our systems and service providers may be located in
                     multiple countries. Where data is transferred outside your
                     country, we use appropriate safeguards (standard
                     contractual clauses, approved frameworks) as required by
                     law.
                  </p>
               </section>

               <section id="rights" className="mt-6">
                  <h2>9. Your rights</h2>
                  <p>
                     Depending on your jurisdiction, you may have rights
                     including:
                  </p>
                  <ul>
                     <li>
                        Access: request a copy of personal data we hold about
                        you.
                     </li>
                     <li>
                        Correction: ask us to correct inaccurate or incomplete
                        data.
                     </li>
                     <li>
                        Deletion: request deletion of your personal data in
                        certain circumstances.
                     </li>
                     <li>
                        Portability: receive your data in a structured,
                        machine-readable format.
                     </li>
                     <li>
                        Object / Restrict processing: where we process based on
                        legitimate interests.
                     </li>
                     <li>
                        Opt-out from marketing communications (link included in
                        emails or contact us).
                     </li>
                  </ul>
                  <p>
                     To exercise your rights, contact us at{' '}
                     <a
                        className="text-amber-500 hover:underline"
                        href={`mailto:${CONTACT_EMAIL}`}
                     >
                        {CONTACT_EMAIL}
                     </a>
                     . We will respond within a reasonable timeframe, and may
                     ask for information to verify your identity before
                     fulfilling a request.
                  </p>
               </section>

               <section id="children" className="mt-6">
                  <h2>10. Children's privacy</h2>
                  <p>
                     Our website and services are not intended for children
                     under 16. We do not knowingly collect personal data from
                     children under this age. If you believe we have collected
                     such data, contact us to request deletion.
                  </p>
               </section>

               <section id="changes" className="mt-6">
                  <h2>11. Changes to this policy</h2>
                  <p>
                     We may update this policy occasionally. If changes are
                     material, we will post a prominent notice on our website or
                     send you a notice when required.
                  </p>
                  <p>
                     Last updated: <strong>{EFFECTIVE_DATE}</strong>
                  </p>
               </section>

               <section id="contact" className="mt-6">
                  <h2>12. Contact & complaints</h2>
                  <p>
                     If you have questions, requests or complaints about this
                     policy or our data practices, contact:
                  </p>

                  <div className="mt-3">
                     <div>
                        <strong>Data controller:</strong> {DATA_CONTROLLER}
                     </div>
                     <div>
                        <strong>Email:</strong>{' '}
                        <a
                           className="text-amber-500 hover:underline"
                           href={`mailto:${CONTACT_EMAIL}`}
                        >
                           {CONTACT_EMAIL}
                        </a>
                     </div>
                     <div>
                        <strong>Address:</strong> 2964 Batonga, Kariba (update
                        as needed)
                     </div>
                  </div>

                  <p className="mt-4">
                     If you are in the ZIMBABWE or AFRICA and believe we did not
                     resolve your complaint, you may have the right to lodge a
                     complaint with a supervisory authority.
                  </p>
               </section>

               <section id="disclaimer" className="mt-6">
                  <h2>13. Disclaimer</h2>
                  <p>
                     This privacy policy is provided for informational purposes
                     and does not constitute legal advice. You should seek legal
                     counsel to ensure compliance with local laws (e.g., GDPR,
                     CCPA) applicable to your activities and target users.
                  </p>
               </section>
            </article>

            <footer className="mt-10 border-t pt-6">
               <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                     © {new Date().getFullYear()} {COMPANY_NAME}. All rights
                     reserved.
                  </div>

                  <div className="text-sm flex gap-4">
                     <Link to="/" className="text-amber-500 hover:underline">
                        Home
                     </Link>
                     <a
                        className="text-amber-500 hover:underline"
                        href={`mailto:${CONTACT_EMAIL}`}
                     >
                        Contact
                     </a>
                  </div>
               </div>
            </footer>
         </div>
      </main>
   );
}
