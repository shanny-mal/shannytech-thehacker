import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO } =
   process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
   console.warn('SMTP not fully configured — outgoing emails will fail.');
}

export const transporter = nodemailer.createTransport({
   host: SMTP_HOST,
   port: Number(SMTP_PORT || 587),
   secure: Number(SMTP_PORT || 587) === 465, // true for 465
   auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
   },
});

export async function sendNotificationEmail({
   name,
   email,
   phone,
   subject,
   message,
}: {
   name: string;
   email: string;
   phone?: string;
   subject?: string;
   message: string;
}) {
   if (!EMAIL_FROM || !EMAIL_TO) return;
   const html = `
    <h3>New contact message</h3>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '')}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject || '')}</p>
    <hr/>
    <pre>${escapeHtml(message)}</pre>
  `;
   await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New contact — ${subject ?? 'General inquiry'}`,
      text: message,
      html,
   });
}

// minimal HTML escaping
function escapeHtml(str: string) {
   return str.replace(
      /[&<>"']/g,
      (m) =>
         ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
         })[m]!
   );
}
