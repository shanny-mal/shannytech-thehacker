import express from 'express';
import validator from 'validator';
import { pool } from '../db';
import { sendNotificationEmail } from '../mailer';
import { contactRateLimiter } from '../middleware/rateLimiter';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', contactRateLimiter, async (req, res) => {
   try {
      const ip =
         (req.headers['x-forwarded-for'] as string) ||
         req.socket.remoteAddress ||
         '';
      const ua = String(req.headers['user-agent'] || '');
      const { name, email, phone, subject, message, recaptchaToken } =
         req.body ?? {};

      // Basic validation + sanitization
      if (!name || !message || !email) {
         return res
            .status(400)
            .json({ error: 'Name, email and message are required.' });
      }
      const cleanName = String(name).trim().slice(0, 200);
      const cleanEmail = String(email).trim();
      if (!validator.isEmail(cleanEmail)) {
         return res.status(400).json({ error: 'Invalid email address.' });
      }
      const cleanPhone = phone ? String(phone).trim().slice(0, 40) : null;
      const cleanSubject = subject
         ? String(subject).trim().slice(0, 250)
         : null;
      const cleanMessage = String(message).trim();

      // Optional: verify recaptcha / hcaptcha on server (disabled if not configured)
      if (process.env.RECAPTCHA_SECRET) {
         // perform verification (fetch to Google API) - omitted here for brevity
         // if verification fails, return 400
      }

      // store in DB
      const conn = await pool.getConnection();
      try {
         const [result] = await conn.execute(
            `INSERT INTO contact_messages (name,email,phone,subject,message,ip,user_agent,source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
               cleanName,
               cleanEmail,
               cleanPhone,
               cleanSubject,
               cleanMessage,
               ip,
               ua,
               req.headers.referer || 'contact-page',
            ]
         );

         // send notification email asynchronously (do not block response)
         sendNotificationEmail({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone ?? undefined,
            subject: cleanSubject ?? undefined,
            message: cleanMessage,
         }).catch((err) => {
            console.error('Failed to send contact email:', err);
         });

         return res.status(201).json({ ok: true });
      } finally {
         conn.release();
      }
   } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
   }
});

// Simple admin endpoint to list messages. Protect with ADMIN_API_KEY header.
router.get('/admin/list', async (req, res) => {
   const key = req.header('x-api-key');
   if (!key || key !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
   }
   const conn = await pool.getConnection();
   try {
      const [rows] = await conn.query(
         `SELECT id,name,email,phone,subject,message,handled,created_at FROM contact_messages ORDER BY created_at DESC LIMIT 200`
      );
      return res.json({ data: rows });
   } finally {
      conn.release();
   }
});

export default router;
