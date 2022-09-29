function status(_req, res) {
  res.set('Cache-Control', 'no-store');
  return res.status(200).send('Status: Everything Seems Fine');
}

export default status;