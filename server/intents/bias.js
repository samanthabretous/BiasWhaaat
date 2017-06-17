const request = require('superagent');

const biasWords = {
  businessman: ['executive', 'business', 'entrepreneur']
};

module.exports.process = function process(biasData, message, cb) {
  const bias = biasData.bias[0].value;
  console.log(biasData)
  if(biasWords[bias]) {
    const question = `Did you mean to say *${biasWords[bias].join(' ')}*?`
    const replaceBias = message.split(' ').map(word => {
      if(word !== bias) return word
      else return biasWords[bias][0]
    }).join(' ');
    const newSentence = `Maybe try ${replaceBias}`
    return cb(false, `${question}\n${newSentence}`);
  }
};
