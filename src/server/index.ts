import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import spdy from 'spdy';

import engine from './engine';
import routes from './routes';
import ssl from './ssl';

dotenv.config();

const app = express();

app.set('trust proxy', 'loopback');
app.disable('x-powered-by');
app.engine('html', engine);
app.set('views', path.join(__dirname, '', '/views'));
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    type: [
      'application/json',
      'application/csp-report',
      'application/reports+json',
    ],
  })
);

const useSSL = false;
const sslPort = 7443;
const httpPort = 7080;
const hostname = '0.0.0.0';

ssl
  .then((options) => {
    routes(app);

    console.log(options);

    spdy
      .createServer(options, app)
      .listen(useSSL ? sslPort : httpPort, hostname, () => {
        console.log(
          `App server started on ${hostname}:${useSSL ? sslPort : httpPort}`
        );
      });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
