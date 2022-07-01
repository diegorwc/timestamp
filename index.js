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

app.get("/api/:date/", function(req, res) {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  if(dateRegex.test(req.params.date)) {
    let dateObj = new Date(req.params.date)
    let unixDate = Number(Date.parse(req.params.date))
    let splitDate = req.params.date.split('-')    
    let utcDate = dateObj.toUTCString()
    res.json({
      'unix': unixDate,
      'utc': utcDate
    })
  } else {
    res.json({'error': 'Invalid Date'})  
  }
  
  // console.log(dateRegex.test(req.params.date))
  // console.log(typeof req.params.date)
  // let dateToUnix = new Date(req.params.date)
  // console.log(Number(Date.parse(dateToUnix)))  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
