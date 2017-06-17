const request = require('superagent');

module.exports.process = function process(biasData, cb) {
  console.log(biasData)
  // const bias = biasData[0].value;
  console.log("biasData",biasData.bias[0].value)
  return cb(false, biasData.bias[0].value);
};
