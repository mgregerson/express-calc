/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode } = require('./stats')
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());

// process traditional form data => req.body
// app.use(express.urlencoded());

/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get('/mean/:nums', function (req, res) {
  const strNums = req.params.nums;

  let nums = convertStrNums(strNums);
  let mean = findMean(nums)

  return res.json({
    operation: 'mean',
    value: mean,
  });
});

/** Returns 400 Bad Request error if no nums are passed into mean route. */
app.get('/mean', function (req, res) {
  throw new BadRequestError(MISSING);
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get('/median/:nums', function (req, res) {
  const strNums = req.params.nums;
  console.log('strNums',strNums);

  let nums = convertStrNums(strNums);
  let median = findMedian(nums)

  return res.json({
    operation: 'median',
    value: median,
  });
});

/** Returns 400 Bad Request error if no nums are passed into median route. */
app.get('/median', function (req, res) {
  throw new BadRequestError(MISSING);
});


/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get('/mode/:nums', function (req, res) {
  const strNums = req.params.nums;

  let nums = convertStrNums(strNums);
  let mode = findMode(nums)

  return res.json({
    operation: 'mode',
    value: mode,
  });
});

/** Returns 400 Bad Request error if no nums are passed into mode route. */
app.get('/mode', function (req, res) {
  throw new BadRequestError(MISSING);
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;