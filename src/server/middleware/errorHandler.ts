function getLogLevel(err, status) {
  if (status >= 400 && status < 500) {
    return 'log';
  } else if (err.isServer) {
    return 'error';
  }
}

function getLoggerErrorObject(req, error, errorIsCritical) {
  const customValues = {
    url: req.url,
    route: req.routeName,
    requestId: req.headers['request-id'] || 'none',
  };

  if (!errorIsCritical || process.env.NODE_ENV === 'development') {
    return { customValues };
  }

  return {
    customValues,
    error,
  };
}

function hideErrorDetails(err) {
  const privateMessage = err.isServer || (err.data && err.data.private);

  if (privateMessage) {
    err.message = err.output.payload.error;
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err?.output?.statusCode || 500;
  const logLevel = getLogLevel(err, statusCode);
  const errorIsCritical = logLevel === 'error';

  if (logLevel) {
    const errorMessage = err.message;
    console[logLevel](
      errorMessage,
      getLoggerErrorObject(req, err, errorIsCritical)
    );
  }

  hideErrorDetails(err);

  res.redirect('/error');
}

export default errorHandler;