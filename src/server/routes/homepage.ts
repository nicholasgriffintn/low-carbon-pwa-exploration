function homepage(_req, res) {
  res.render('homepage', {
    title: 'Hello World!',
    responseTime: res.locals.responseTime || "NA",
  });
}

export default homepage;
