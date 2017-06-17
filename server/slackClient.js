const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, IncomingWebhook } = require('@slack/client');
require('dotenv').config()


let rtm = null;
const url = process.env.SLACK_WEBHOOK_URL || ''; 
const webhook = new IncomingWebhook(url);
var WebClient = require('@slack/client').WebClient;
var token = process.env.SLACK_GENDER_WHAT_TOKEN || '';
var web = new WebClient(token);



const handleOnAuthenticated = (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
};

const handleOnMessage = (nlp, message) => {
  //check to see if message is not coming from a bot
  if(!message.bot_id) {
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

        intent.process(res, message, (error, response) => {
          if (error) {
            console.log(error.message);
            return;
          }
          // return rtm.sendMessage(response, message.channel);
          const config = {
            attachments: [
              {
                "title": response.question,
                "text": response.newSentence,
                "mrkdwn_in": ["text"],
                "callback_id": "wopr_game",
                "actions": [
                  {
                    "name": "fixed",
                    "text": "Yes, change!",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                  }
                ]
              }
            ]
          }

          // return web.chat.postMessage(message.channel, {
          //   attachments: [{"text": "hello"}]
          // },  function(err, res) {
          //   if (err) {
          //     console.log('Error:', err);
          //   } else {
          //     console.log('Message sent: ', res);
          //   }
          // });
          return webhook.send(config, function(err, res) {
            if (err) {
              console.log('Error:', err);
            } else {
              console.log('Message sent: ', res);
            }
          });
        })
    });
  }
};



const addAuthentiatedHandler = (rtm, handler) => {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
};

module.exports.init = function slackClient(token, logLevel, nlp, app) {
  rtm = new RtmClient(token, { logLevel });
  app.post('/updateMessage', (req, res) => {
    console.log("================",req.body);
    res.status(200).send({attachments: [{"text": "message"}]})
    // axios.post(req.body.response_url, {})
  })
  addAuthentiatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, message => handleOnMessage(nlp, message));
  return rtm;
};


module.exports.addAuthentiatedHandler = addAuthentiatedHandler;
