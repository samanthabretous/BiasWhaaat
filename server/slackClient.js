const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');

let rtm = null;

const handleOnAuthenticated = (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
};

const handleOnMessage = (nlp, message) => {
  // nlp === witClient
  nlp.ask(message.text, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
      if (!res || !res.bias) {
        throw new Error('Could not extract bias.');
      }

      const intent = require(`./intents/bias`);

      intent.process(res, message.text, (error, response) => {
        if (error) {
          console.log(error.message);
          return;
        }
        return rtm.sendMessage(response, message.channel);
      })
  });
};

const addAuthentiatedHandler = (rtm, handler) => {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
};

module.exports.init = function slackClient(token, logLevel, nlp) {
  rtm = new RtmClient(token, { logLevel });
  addAuthentiatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, message => handleOnMessage(nlp, message));
  return rtm;
};


module.exports.addAuthentiatedHandler = addAuthentiatedHandler;
