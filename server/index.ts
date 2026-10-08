import express from 'express';
import cors from 'cors';
import path from 'node:path';
import dotenv from 'dotenv';
import { apiRouter } from './apiRouter.ts';
import { paymentService } from './paymentService.ts';

// Load environment variables
dotenv.config();
paymentService.reloadConfig();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors());

// Webhook raw body preservation & standard json parser
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api', apiRouter);

// Serve static frontend assets if in production
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

app.listen(PORT, () => {
  const config = paymentService.getConfig();
  console.log(`=======================================================`);
  console.log(` BeingCraft Secure Payment & API Server running on port ${PORT}`);
  console.log(` Mode: ${config.paymentMode.toUpperCase()}`);
  console.log(` Razorpay Key ID: ${config.keyId ? config.keyId.slice(0, 10) + '...' : '(none - sandbox test mode)'}`);
  console.log(` Razorpay Secret Set: ${config.hasSecret ? 'YES' : 'NO'}`);
  console.log(` Webhook Secret Set: ${config.webhookSecretSet ? 'YES' : 'NO'}`);
  console.log(`=======================================================`);
});

export default app;
