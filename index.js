var express = require('express');
var app = express();
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'Yfp4E1/cS+OUoQOVVHc2/uLctihQ5gHv9o5rPRMLp0drPl0ObyZwI8uYQjm/VozeGloTmKsOnpdNdwmUrJTw91JQX3LJG3bVSpRFe/q++N0p0ZuTsLoksNRK6TBkmR4+KIgNplG7sib3btmH6nYuowdB04t89/1O/w1cDnyilFU=',
  channelSecret: '0da330ec4b770054c765bbe26205bf62',
};

const client = new line.Client(config);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send('OK');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
