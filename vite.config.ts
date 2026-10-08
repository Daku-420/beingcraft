import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './server/apiRouter.ts';
import { paymentService } from './server/paymentService.ts';

dotenv.config();
paymentService.reloadConfig();

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server',
    configureServer(server) {
      const app = express();
      app.use(
        express.json({
          verify: (req: any, _res, buf) => {
            req.rawBody = buf;
          },
        })
      );
      app.use(express.urlencoded({ extended: true }));
      app.use('/api', apiRouter);

      server.middlewares.use(app);
    },
  };
}

export default defineConfig({
  plugins: [react(), apiServerPlugin()],
});
