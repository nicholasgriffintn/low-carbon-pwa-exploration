function homepage(_req, res) {
  const now = new Date().getTime();

  res.render('homepage', {
    title: 'Hello World!',
    responseTime: now - res.locals.responseStartTime,
    dateRendered: now,
  });
}

export default homepage;
