const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */
function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const numsArray = strNums.split(',');

  const nonNumsArray = numsArray.filter(num => isNaN(Number(num)));
  const validNums = numsArray.map(Number);

  if (nonNumsArray.length > 0) {
    throw new BadRequestError(`The following are not numbers: ${nonNumsArray.join(', ')}`)
  }

  return validNums;
}


module.exports = { convertStrNums };