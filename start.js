const { server, app } = require('./server');
const request = require('superagent');
const slackClient = require('./server/slackClient');
require('dotenv').config()

const witToken = process.env.WIT_TOKEN || '';
const witClient = require('./server/witClient')(witToken);

const slackToken = process.env.SLACK_GENDER_WHAT_TOKEN || '';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

// this if statement will prevent our express server and test server
// (using supertest) from trying to access the same port at the same time
if (!module.parent) {
  slackClient.addAuthentiatedHandler(rtm, () => {
    // wait to connect to server until slack is connected
    server.on('listening', () => console.log(`Listening on port ${server.address().port} in ${app.get('env')} mode`))
  })
}
