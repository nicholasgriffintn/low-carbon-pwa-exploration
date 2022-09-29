import express from 'express';
import path from 'path';
import compression from 'compression';

// MIddleware
import accessLog from '../middleware/accessLog';
import cors from '../middleware/cors';
import errorHandler from '../middleware/errorHandler';

// Page Routes
import status from './status';
import error from './error';

// API Routes

const expressApp = (app) => {
  // Global Middleware
  app.use(accessLog());
  app.use(compression());
  app.use(cors);

  // routes
  app.get('/status', status);

  app.get(`/error`, error);

  // Serve static files.
  app.use(
    '/',
    express.static(path.join(__dirname, '../public'), { redirect: false })
  );

  // Catch All
  app.get('*', error);

  app.use(errorHandler);

  return app;
};

export default expressApp;
