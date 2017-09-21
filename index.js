var express = require('express');
var app = express();
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'Yfp4E1/cS+OUoQOVVHc2/uLctihQ5gHv9o5rPRMLp0drPl0ObyZwI8uYQjm/VozeGloTmKsOnpdNdwmUrJTw91JQX3LJG3bVSpRFe/q++N0p0ZuTsLoksNRK6TBkmR4+KIgNplG7sib3btmH6nYuowdB04t89/1O/w1cDnyilFU=',
  channelSecret: '0da330ec4b770054c765bbe26205bf62',
};

const client = new line.Client(config);

app.set('port', (process.env.PORT || 5000));

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  const echo = { type: 'text', text: event.message.text };
  return client.replyMessage(event.replyToken, echo);
}

app.get('/', (req, res) => {
  res.send('OK /webhook');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
