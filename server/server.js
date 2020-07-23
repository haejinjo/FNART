const express = require('express');
const bodyParser = require('body-parser');
const reviewController = require('./controllers/reviewController');
const userController = require('./controllers/userController');
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

const app = express();

const PORT = 3000;

/*
 * Handle parsing request body
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: check if you really need an api route??
// maybe for modifying a specific review?
app.use('/api', apiRouter);
app.use('/user', userRouter);

app.get('/', /* reviewController.getReviews, */(req, res) => {
  if (res.locals.noReviews) {
    res.status(200).send(`This fellow has not reviewed any resident assessments yet!`)
  }

  // const {fellow_id, resident_id, week, body, created_at, updated_at} = res.locals.data[0];
  // res.status(200).json(res.locals.data);
  res.status(200).send('This is the homepage (dashboard?)');
});

/*
 * Catch-all route handler for any requests to an unknown route
 */
app.use((req, res) => res.sendStatus(404));

/*
 * Express Global Error Handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error:\n', err,
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/*
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;