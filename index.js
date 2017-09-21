var express = require('express');
var app = express();
const line = require('@line/bot-sdk');
var bodyParser = require('body-parser');
var request = require('request')
const config = {
  channelAccessToken: 'Yfp4E1/cS+OUoQOVVHc2/uLctihQ5gHv9o5rPRMLp0drPl0ObyZwI8uYQjm/VozeGloTmKsOnpdNdwmUrJTw91JQX3LJG3bVSpRFe/q++N0p0ZuTsLoksNRK6TBkmR4+KIgNplG7sib3btmH6nYuowdB04t89/1O/w1cDnyilFU=',
  channelSecret: '0da330ec4b770054c765bbe26205bf62',
};

const client = new line.Client(config);

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {  
  Promise
  .all(req.body.events.map(handleEvent))
  .then((result) => res.json(result));
  
})
app.get('/', (req, res) => {
  res.send('OK /webhook');
});
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
    if(event.message.text === "[]"){
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
    
      // use reply API
      return client.replyMessage(event.replyToken, echo);

    }else{
      return Promise.resolve(null);
    }
 
}


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
