const request = require('superagent');
const biasWords = require('./biasWords');

module.exports.process = function process(biasData, message, cb) {
  const bias = biasData.bias[0].value;
  console.log(biasData)
  if(biasWords[bias]) {
    const question = `Did you mean to say *${bias}*?`
    const replaceBias = message.text.split(' ').map(word => {
      console.log(word)
      if(word.toLowerCase() !== bias.toLowerCase()) return word
      else {
        console.log(biasWords[bias.toLowerCase()][0])
        return `*${biasWords[bias.toLowerCase()][0]}*`
      }
    }).join(' ');
    const newSentence = `Maybe try.. ${replaceBias}`
    return cb(false, { question, newSentence });
  }
};