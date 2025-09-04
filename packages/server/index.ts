import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './src/routes/contact';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

// CORS configuration
const allowed = (process.env.CORS_ORIGINS || 'http://localhost:5173')
   .split(',')
   .map((s) => s.trim());
app.use(
   cors({
      origin: (
         origin: string | undefined,
         cb: (err: Error | null, allow?: boolean) => void
      ) => {
         if (!origin) return cb(null, true);
         if (allowed.includes(origin)) return cb(null, true);
         cb(new Error('CORS not allowed'));
      },
   })
);

// security & parsing
app.use(helmet());
app.use(express.json({ limit: '32kb' })); // keep small
app.use(express.urlencoded({ extended: true }));

// health
app.get('/health', (_req, res) => res.json({ ok: true }));

// contact API
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
   // eslint-disable-next-line no-console
   console.log(`Server listening on http://localhost:${PORT}`);
});
