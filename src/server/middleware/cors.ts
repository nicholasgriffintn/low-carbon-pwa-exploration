function corsMiddleware(req, res, next) {
  const allowedOrigins = ['0.0.0.0', 'localhost'];
  const { origin } = req.headers;

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, ETag, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
}

export default corsMiddleware;
