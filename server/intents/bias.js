const request = require('superagent');


module.exports.process = function process(biasData, message, cb) {
  const bias = biasData.bias[0].value;
  console.log(biasData)
  if(biasWords[bias]) {
    const question = `Did you mean to say *${biasWords[bias].join(' ')}*?`
    const replaceBias = message.text.split(' ').map(word => {
      if(word !== bias) return word
      else return `*${biasWords[bias][1]}*`
    }).join(' ');
    const newSentence = `Maybe try.. ${replaceBias}`
    return cb(false, { question, newSentence });
  }
};
const biasWords = {
  "guys":["everyone"]
  "girls": ["women"],
  "businessman": ["executive", "entrepreneur"],
  "career girl": ["professional", "manager", "executive" ],
  "career woman": ["professional", "manager", "executive" ],
  "cleaning lady": ["cleaner"],
  "delivery boy": ["courier", "messenger" ],
  "foreman": ["supervisor"],
  "girl Friday": ["clerk", "office", "assistant", "receptionist"],
  "insurance man": ["insurance agent"],
  "landlady": ["proprietor", "building", "manager"],
  "mailman": ["mail carrier", "letter", "carrier"],
  "newsman": ["journalist", "reporter"],
  "policeman": ["police officer"],
  "repairman": ["repairer", "technician"],
  "saleslady": ["sales clerk", "sales rep", "sales agent"],
  "salesman": ["sales clerk", "sales rep", "sales agent"],
  "serviceman": ["service representative"],
  "steward": ["flight attendant"],
  "stewardess": ["flight attendant"],
  "waitress": ["waiter", "server"],
  "workman": ["worker"],
  "alumni": ["gruaduates"],
  "chairman,": ["chair", "chairman"],
  "chairwoman": ["chair", "chairman"],
  "committee man": ["committee member"],
  "committee woman": ["committee member"],
  "corporate wife": ["corporate spouse"],
  "faculty wife": ["faculty spouse"],
  "freshman": ["first-year student"],
  "front man": ["front", "figurehead" ],
  "hostess": ["host"],
  "housewife": ["homemaker"],
  "househusband":["homemaker"],
  "middleman": ["go-between"],
  "man and wife": ["husband and wife"],
  "ombudsman": ["troubleshooter"],
  "self-made man": ["self-made person", "entrepreneur" ],
  "spokesman": ["spokesperson", " representative"],
  "brotherhood": ["kinship", "community"],
  "common man": ["common person", "average person"],
  "countryman": ["compatriot"],
  "fatherland": ["native land"],
  "fellowship": ["camaraderie"],
  "forefathers": ["ancestors", "forebears"],
  "fraternal": ["warm", "intimate" ],
  "Frenchmen": ["the French"],
  "man": ["humankind", "humanity", "humans"],
  "mankind": ["humankind", "humanity", "humans"],
  "mother tongue": ["native language"],
  "rise of man": ["rise of civilization"],
  "thinking man": ["thinking person", "thinker", "intellectual"],
  "working man": ["thinking person", "thinker", "intellectual"],
  "working man": ["wage earner", "taxpayer"],
  "working woman": ["wage earner", "taxpayer"],
  "king-size": ["jumbo", "gigantic"],
  "kingmaker": ["power behind the throne"],
  "lady": ["woman"],
  "ladylike": ["courteous", "cultured"],
  "like a man": ["resolutely", "bravely"],
  "maiden name": ["birth name"],
  "maiden voyage": ["first voyage"],
  "man enough": ["strong enough"]
}
