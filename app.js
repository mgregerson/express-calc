/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode } = require('./stats')
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());

// process traditional form data => req.body
// app.use(express.urlencoded());

/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get('/mean/:nums', function (req, res) {

  let notNumber = req.params.nums.split(',').filter(num => isNaN(Number(num)))
  let nums = req.params.nums.split(',').map(Number)

  let mean = findMean(nums)

  if (notNumber.length > 0) {
    throw new BadRequestError(`The following are not numbers: ${notNumber.join(', ')}`)
  }

  return res.json({
    operation: 'mean',
    value: mean,
  });

})

/** Finds median of nums in qs: returns {operation: "median", result } */



/** Finds mode of nums in qs: returns {operation: "mean", result } */


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