import morgan from 'morgan';
import os from 'os';
import fs from 'fs';

morgan.token('hostname', () => {
  return os.hostname();
});

morgan.token('pid', () => {
  return process.pid.toString();
});

function jsonFormat(tokens, req, res) {
  return JSON.stringify({
    requestPath: tokens['url'](req, res),
    requestMethod: tokens['method'](req, res),
    requestId: res.locals.requestId,
    processPid: tokens['pid'](req, res),
    responseStatus: Number(tokens['status'](req, res)),
    userAgent: tokens['user-agent'](req, res),
    referer: tokens['referrer'](req, res),
    UpstreamResponseTime: Number(tokens['response-time'](req, res)),
    ResponseTime: Number(tokens['total-time'](req, res)),
    ResponseSize: tokens['res'](req, res, 'content-length'),
    remoteAddress: tokens['remote-addr'](req, res),
    httpVersion: tokens['http-version'](req, res),
    hostname: tokens['hostname'](req, res),
    _aws: {
      Timestamp: tokens['date'](req, res, 'iso'),
      LogGroupName: `${process.env.COMPONENT_NAME}/access`,
      CloudWatchMetrics: [
        {
          Dimensions: [],
          Metrics: [
            { Name: 'UpstreamResponseTime', Unit: 'Seconds' },
            { Name: 'ResponseTime', Unit: 'Seconds' },
            { Name: 'RequestSize', Unit: 'Bytes' },
            { Name: 'BodySize', Unit: 'Bytes' },
            { Name: 'ResponseSize', Unit: 'Bytes' },
          ],
          NameSpace: process.env.COMPONENT_NAME,
        },
      ],
    },
  });
}
const loggingMiddleware = () => {
  const accessLogStream = fs.createWriteStream(
    process.env.ENVIRONMENT === 'development'
      ? './access.log'
      : `/var/log/low-carbon-app/access.log`
  );

  return morgan(jsonFormat, { stream: accessLogStream });
};

export default loggingMiddleware;
