// index.js
// where your node app starts

// init project
require('dotenv').config()
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function(req, res) {
  let now = new Date()
  res.json({
    'unix': Number(now.getTime()),
    'utc': now.toUTCString()
  })
})


app.get("/api/:date?/", function(req, res) {
  console.log(req.params.date)
  // const receivedDate = req.params.date.replace(/'/g, '')
  let receivedDate = req.params.date
  let unixTimestamp = ''
  let utcString = ''

  // if(!/\d/.test(receivedDate)) {
  //   return res.json({'error': 'Invalid Date'})
  // }

  if(receivedDate.includes('-')) {
    console.log('here?')    
    unixTimestamp = Date.parse(receivedDate)
    utcString = new Date(receivedDate).toUTCString()
  } else if (receivedDate.includes("'") || !receivedDate.includes('-')) {
    console.log('aqui')
    receivedDate = req.params.date.replace(/'/g, '')
    unixTimestamp = receivedDate
    utcString = new Date(Number(receivedDate)).toUTCString()
  } else if (new Date(receivedDate) != 'Invalid Date') {
    unixTimestamp = Date.parse(receivedDate)
    utcString = receivedDate
  } else {
    return res.json({'error': 'Invalid Date'})
  }
    

  res.json({
    'unix': Number(unixTimestamp),
    'utc': utcString
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
