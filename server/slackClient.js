const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, IncomingWebhook } = require('@slack/client');
require('dotenv').config();
const axios = require('axios');


let rtm = null;
const url = process.env.SLACK_WEBHOOK_URL || ''; 
const webhook = new IncomingWebhook(url);
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_GENDER_WHAT_TOKEN || '';
const web = new WebClient(token);
const authToken = process.env.SLACK_AUTH



const handleOnAuthenticated = (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
};

const handleOnMessage = (nlp, message) => {
  console.log("=====================",message)
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
            "icon_emoji": ":smile:",
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
                    "style": "primary",
                    "type": "button",
                    "value": "war",
                  }
                ]
              }
            ]
          }
          const params = {}
          const array = JSON.stringify([{"pretext": "pre-hello", "text": "text-world"}])

          params.attachments = array;
          // rtm.sendMesssage()
          // return web.chat.postMessage(message.channel, {"text": "hello"},  function(err, res) {
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
    const body = JSON.parse(req.body.payload);
    const msg = {};
    msg.ts = body.message_ts;
    msg.channel = body.channel.id;
    console.log(body.original_message.attachments[0])
    msg.text = body.original_message.attachments[0].title;
    msg.bot_access_token = token;
    msg.bot_user_id = 'B5V81UYDR';
    msg.as_user = true;
    console.log(msg)
    rtm.updateMessage(msg, (err, res) => {
      console.log("err",err)
    })
    // res.status(200).send({
    //   replace_original: true,
    // })
    // axios.post(req.body.response_url, {})
  })
  addAuthentiatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, message => handleOnMessage(nlp, message));
  return rtm;
};


module.exports.addAuthentiatedHandler = addAuthentiatedHandler;
