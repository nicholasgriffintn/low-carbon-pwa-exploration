import fs from 'fs';
import path from 'path'

const keyPath = path.join(__dirname, '', '../../certs/key.pem');
const certPath = path.join(__dirname, '', '../../certs/cert.pem');
const useSSL = false;

const readCertificates = () => {
  try {
    fs.statSync(keyPath);
    fs.statSync(certPath);
  } catch (e) {
    console.error(`Certificates was not found: ${keyPath} or ${certPath}. Please run the command 'pnpm run generateCertificates'`);
    process.exit(0);
  }

  return Promise.resolve({
    clientKey: fs.readFileSync(keyPath, 'utf8'),
    certificate: fs.readFileSync(certPath, 'utf8'),
  });
};

const getOptions = ({ certificate, clientKey }) => {
  return {
    key: clientKey,
    cert: certificate,
    ssl: useSSL,
    spdy: {
      plain: !useSSL,
    },
    agent: false,
    strictSSL: false,
  };
};

export default (useSSL
  ? readCertificates()
  : Promise.resolve({ certificate: null, clientKey: null })
)
  .then(getOptions)
  .catch((err) => {
    throw err;
  });
