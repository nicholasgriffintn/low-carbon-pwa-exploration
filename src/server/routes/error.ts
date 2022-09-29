function error(req, res) {
  res.render('error', {
    title: `${req.query.status_code || 500}: ${
      req.query.error || 'Internal Server Error'
    }`,
    description:
      req.query.error_description || 'Something unexpected has occurred.',
  });
}

export default error;