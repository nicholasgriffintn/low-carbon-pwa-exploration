export default (req, res, next) => {
  const start = new Date().getTime();
  res.on('finish', function () {
    const end = new Date().getTime();
    const duration = end - start;

    res.locals.responseTime = duration;

    console.log(`Request - ${req.method} - ${req.url} took: ${duration} ms`);
  });
  next();
};
