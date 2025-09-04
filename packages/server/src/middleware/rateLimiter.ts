import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
   windowMs: 1000 * 60 * 5, // 5 minutes
   max: 6, // allow 6 requests per window per IP
   message: { error: 'Too many contact requests, please try again later.' },
   standardHeaders: true,
   legacyHeaders: false,
});
