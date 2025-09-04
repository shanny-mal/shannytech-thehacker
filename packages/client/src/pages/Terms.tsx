// src/pages/Terms.tsx
import { useEffect, type JSX } from 'react';
import { Link } from 'react-router-dom';

/**
 * Terms of Service (template)
 * NOTE: This is a starting point only and NOT legal advice.
 * Please review with legal counsel before publishing.
 */

const COMPANY_NAME = 'ShannyTech';
const CONTACT_EMAIL = 'info@shannytech.solutions';
const EFFECTIVE_DATE = '2025-09-04';
const JURISDICTION = 'Zimbabwe';

export default function Terms(): JSX.Element {
   useEffect(() => {
      document.title = `Terms of Service — ${COMPANY_NAME}`;
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
               <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  Terms of Service
               </h1>
               <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Effective date: <strong>{EFFECTIVE_DATE}</strong>
               </p>

               <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                  These Terms of Service (&quot;Terms&quot;) govern your access
                  to and use of the website, services, applications and other
                  products (collectively, the &quot;Services&quot;) provided by{' '}
                  {COMPANY_NAME}. By using the Services you accept these Terms.
                  If you do not agree, please do not use the Services.
               </p>
            </header>

            {/* Quick navigation */}
            <nav aria-label="Terms navigation" className="mb-8">
               <ul className="flex flex-wrap gap-3 text-sm">
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#acceptance"
                     >
                        Acceptance
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#services"
                     >
                        Services
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#payments"
                     >
                        Payments
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#content"
                     >
                        User content
                     </a>
                  </li>
                  <li>
                     <a className="text-amber-500 hover:underline" href="#ip">
                        Intellectual property
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#liability"
                     >
                        Liability
                     </a>
                  </li>
                  <li>
                     <a
                        className="text-amber-500 hover:underline"
                        href="#governing"
                     >
                        Governing law
                     </a>
                  </li>
               </ul>
            </nav>

            <article className="prose dark:prose-invert max-w-none">
               {/* Acceptance */}
               <section id="acceptance">
                  <h2>1. Acceptance of terms</h2>
                  <p>
                     By accessing or using the Services you agree to be bound by
                     these Terms and our Privacy Policy. If you are using the
                     Services on behalf of an organization, you represent that
                     you have authority to bind that organization to these
                     Terms.
                  </p>
               </section>

               {/* Services */}
               <section id="services" className="mt-6">
                  <h2>2. Services</h2>
                  <p>
                     {COMPANY_NAME} provides professional services, software,
                     integrations and consulting (the &quot;Services&quot;).
                     Specific services, scope, deliverables, timelines and fees
                     will be set forth in statements of work, proposals, order
                     forms or other written agreements (each a &quot;Service
                     Agreement&quot;) between you and
                     {COMPANY_NAME}. In the event of any conflict between a
                     Service Agreement and these Terms, the Service Agreement
                     will control.
                  </p>

                  <h3>Availability & changes</h3>
                  <p>
                     We may change, suspend or discontinue any aspect of the
                     Services (including features, functionality or content) at
                     any time. We will use commercially reasonable efforts to
                     provide notice of material changes.
                  </p>
               </section>

               {/* Accounts */}
               <section id="accounts" className="mt-6">
                  <h2>3. Accounts, security & permitted use</h2>
                  <p>
                     To access certain Services you may be required to create an
                     account. You are responsible for all activity on your
                     account and must keep credentials secure. You must notify
                     us immediately of any unauthorized use.
                  </p>

                  <h3>Acceptable use</h3>
                  <p>
                     You agree not to use the Services for unlawful purposes or
                     to upload or transmit malicious code. You will not attempt
                     to gain unauthorized access to the Services or interfere
                     with their operation.
                  </p>
               </section>

               {/* Payments */}
               <section id="payments" className="mt-6">
                  <h2>4. Payment, billing & refunds</h2>
                  <p>
                     Fees for paid Services will be described in the applicable
                     Service Agreement. Unless otherwise stated, fees are
                     exclusive of taxes, and you are responsible for any taxes
                     arising from payments.
                  </p>

                  <h3>Payment terms</h3>
                  <p>
                     We may require prepayment, deposits or milestone payments.
                     Payment methods and billing cycles will be specified in
                     your Service Agreement. Late payments may incur interest or
                     suspension of Services.
                  </p>

                  <h3>Refunds</h3>
                  <p>
                     Refund policies are set forth in your Service Agreement.
                     For purchases made directly through {COMPANY_NAME}, refunds
                     are discretionary and subject to our assessment of work
                     performed and costs incurred.
                  </p>
               </section>

               {/* Subscriptions / Trials */}
               <section id="subscriptions" className="mt-6">
                  <h2>5. Trials, subscriptions & cancellation</h2>
                  <p>
                     If you receive trial access, trial restrictions and
                     durations will be specified when you sign up. For
                     subscription services, cancellation and renewal terms will
                     be set out in your Service Agreement.
                  </p>
               </section>

               {/* User content */}
               <section id="content" className="mt-6">
                  <h2>6. User content & responsibilities</h2>
                  <p>
                     You retain ownership of the content you upload or submit to
                     the Services (&quot;User Content&quot;). By submitting User
                     Content you grant {COMPANY_NAME} a non-exclusive,
                     worldwide, royalty-free license to host, copy, transmit and
                     display the User Content to provide the Services.
                  </p>

                  <h3>Responsibility</h3>
                  <p>
                     You represent and warrant that you have all rights
                     necessary to submit User Content and that such content does
                     not violate any third-party rights (including privacy,
                     intellectual property, or other rights).
                  </p>
               </section>

               {/* Intellectual property */}
               <section id="ip" className="mt-6">
                  <h2>7. Intellectual property</h2>
                  <p>
                     All materials, software, source code, designs and
                     documentation provided by {COMPANY_NAME} (the &quot;Company
                     Materials&quot;) are owned by {COMPANY_NAME} or its
                     licensors and are protected by copyright, trademark and
                     other laws. Except as expressly provided in a Service
                     Agreement, you are granted no rights to Company Materials.
                  </p>

                  <h3>Feedback</h3>
                  <p>
                     If you provide feedback about the Services, you grant{' '}
                     {COMPANY_NAME} a perpetual, irrevocable, worldwide,
                     royalty-free license to use and incorporate that feedback.
                  </p>
               </section>

               {/* Third-party services */}
               <section id="third-party" className="mt-6">
                  <h2>8. Third-party services & integrations</h2>
                  <p>
                     The Services may integrate with or link to third-party
                     products and services. We are not responsible for the
                     practices, content, or privacy policies of third parties.
                     Use of third-party services may require separate agreements
                     and consents.
                  </p>
               </section>

               {/* Confidentiality */}
               <section id="confidentiality" className="mt-6">
                  <h2>9. Confidentiality</h2>
                  <p>
                     Each party agrees to protect the other's confidential
                     information. Confidential information does not include
                     information that is public, rightfully received from a
                     third party, independently developed, or required to be
                     disclosed by law.
                  </p>
               </section>

               {/* Warranties and disclaimers */}
               <section id="warranties" className="mt-6">
                  <h2>10. Warranties & disclaimers</h2>
                  <p>
                     EXCEPT AS EXPRESSLY SET FORTH IN A WRITTEN SERVICE
                     AGREEMENT, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND{' '}
                     {COMPANY_NAME} DISCLAIMS ALL WARRANTIES, EXPRESS OR
                     IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
                     PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
               </section>

               {/* Liability */}
               <section id="liability" className="mt-6">
                  <h2>11. Limitation of liability</h2>
                  <p>
                     TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                     EVENT WILL {COMPANY_NAME} BE LIABLE FOR CONSEQUENTIAL,
                     INCIDENTAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES, OR FOR
                     LOSS OF PROFITS, REVENUE, DATA OR BUSINESS, EVEN IF ADVISED
                     OF THE POSSIBILITY OF SUCH DAMAGES. THE AGGREGATE LIABILITY
                     OF {COMPANY_NAME}
                     FOR CLAIMS ARISING OUT OF OR RELATED TO THE SERVICES WILL
                     NOT EXCEED THE AMOUNTS PAID BY YOU TO
                     {COMPANY_NAME} UNDER THE APPLICABLE SERVICE AGREEMENT IN
                     THE 12 MONTHS PRECEDING THE CLAIM (OR, IF NONE, $5,000).
                  </p>
               </section>

               {/* Indemnity */}
               <section id="indemnity" className="mt-6">
                  <h2>12. Indemnification</h2>
                  <p>
                     You agree to indemnify, defend and hold harmless{' '}
                     {COMPANY_NAME} and its officers, directors, employees and
                     agents from and against any claims, losses, damages,
                     liabilities, including legal fees, arising out of or
                     related to your use of the Services or breach of these
                     Terms.
                  </p>
               </section>

               {/* Termination */}
               <section id="termination" className="mt-6">
                  <h2>13. Suspension & termination</h2>
                  <p>
                     We may suspend or terminate access to the Services for
                     violations of these Terms, inactivity, or non-payment.
                     Termination does not relieve you of obligations accrued
                     prior to termination (including payment).
                  </p>
               </section>

               {/* Export control */}
               <section id="export" className="mt-6">
                  <h2>14. Export control & compliance</h2>
                  <p>
                     You will comply with all applicable laws, regulations and
                     sanctions, including export control laws. You may not use
                     the Services in violation of such laws.
                  </p>
               </section>

               {/* Governing law */}
               <section id="governing" className="mt-6">
                  <h2>15. Governing law & dispute resolution</h2>
                  <p>
                     These Terms are governed by the laws of {JURISDICTION},
                     without regard to conflict of laws principles. Parties will
                     attempt to resolve disputes through good faith
                     negotiations. If unresolved, disputes will be resolved in
                     the courts located in {JURISDICTION} (or through binding
                     arbitration if the parties agree).
                  </p>
               </section>

               {/* Changes */}
               <section id="changes" className="mt-6">
                  <h2>16. Changes to terms</h2>
                  <p>
                     We may revise these Terms from time to time. Material
                     changes will be communicated by posting an updated
                     effective date and by notice (email or banner) where
                     practical. Continued use of the Services after changes
                     constitutes acceptance of the updated Terms.
                  </p>
               </section>

               {/* Notices */}
               <section id="notices" className="mt-6">
                  <h2>17. Notices</h2>
                  <p>
                     Notices under these Terms should be sent to {COMPANY_NAME}{' '}
                     at{' '}
                     <a
                        className="text-amber-500 hover:underline"
                        href={`mailto:${CONTACT_EMAIL}`}
                     >
                        {CONTACT_EMAIL}
                     </a>
                     .
                  </p>
               </section>

               {/* Misc */}
               <section id="misc" className="mt-6">
                  <h2>18. Miscellaneous</h2>
                  <ul>
                     <li>
                        These Terms, together with any Service Agreement and our
                        Privacy Policy, constitute the entire agreement.
                     </li>
                     <li>
                        If any provision is held invalid, the remaining
                        provisions remain in force.
                     </li>
                     <li>
                        Failure to exercise a right does not waive that right.
                     </li>
                  </ul>
               </section>

               {/* Contact */}
               <section id="contact" className="mt-6">
                  <h2>19. Contact</h2>
                  <p>For questions about these Terms, please contact:</p>
                  <div className="mt-3">
                     <div>
                        <strong>{COMPANY_NAME}</strong>
                     </div>
                     <div>
                        Email:{' '}
                        <a
                           className="text-amber-500 hover:underline"
                           href={`mailto:${CONTACT_EMAIL}`}
                        >
                           {CONTACT_EMAIL}
                        </a>
                     </div>
                     <div>Address: 2964 Batonga, Kariba (update as needed)</div>
                  </div>
               </section>
            </article>

            {/* Footer navigation for the terms page */}
            <footer className="mt-10 border-t pt-6">
               <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                     © {new Date().getFullYear()} {COMPANY_NAME}. All rights
                     reserved.
                  </div>

                  <div className="flex gap-4 text-sm">
                     <Link to="/" className="text-amber-500 hover:underline">
                        Home
                     </Link>
                     <Link
                        to="/privacy"
                        className="text-amber-500 hover:underline"
                     >
                        Privacy
                     </Link>
                     <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-amber-500 hover:underline"
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
