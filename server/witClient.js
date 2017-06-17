const request = require('superagent');

const handleWitResponse = res => res.entities;
/** @summary sends an api call to wit.ai to see what type of intent the user is asking for. Weather? Time? Sound? etc.? The object comes back with a body object with the type of intent.
*/
module.exports = (token) => {
  const ask = (message, cb) => {
    request.get('https://api.wit.ai/message')
    .set('Authorization', `Bearer ${token}`)
    .query({ v: '20170617' })
    .query({ q: message })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.statusCode !== 200) return cb(`Expected status of 200 but got ${res.statusCode}`);
      const witResponse = handleWitResponse(res.body);
      return cb(null, witResponse);
    });
  };
  return {
    ask,
  };
};
