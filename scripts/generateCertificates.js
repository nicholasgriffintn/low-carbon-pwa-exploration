const pem = require('pem');
const fs = require('fs');

const certPath = 'certs/cert.pem';
const keyPath = 'certs/key.pem';

pem.createCertificate(
  {
    days: 90,
    selfSigned: true,
  },
  (error, { certificate, clientKey }) => {
    if (error) {
      console.error(error);
      return;
    }

    const dir = require('path').dirname(keyPath);
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFileSync(keyPath, clientKey);
      fs.writeFileSync(certPath, certificate);

      return 'Done!';
    } catch (e) {
      console.error(e);

      return;
    }
  }
);
