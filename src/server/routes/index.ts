import express from 'express';
import path from 'path';
import compression from 'compression';

// MIddleware
import accessLog from '../middleware/accessLog';
import cors from '../middleware/cors';
import responseTime from '../middleware/responseTime';
import errorHandler from '../middleware/errorHandler';

// Page Routes
import homepage from './homepage';
import status from './status';
import error from './error';

// API Routes

const expressApp = (app) => {
  // Global Middleware
  app.use(accessLog());
  app.use(responseTime);
  app.use(cors);
  app.use(compression());

  // routes
  app.get('/status', status);

  app.get(`/error`, error);

  app.get(`/`, homepage);

  // Serve static files.
  app.use(
    '/',
    express.static(path.join(__dirname, '../../public'), { redirect: false })
  );

  // Catch All
  app.get('*', (_req, res) => {
    return res.status(404).send({ error: 'Not Found' });
  });

  app.use(errorHandler);

  return app;
};

export default expressApp;
