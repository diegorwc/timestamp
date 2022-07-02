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

app.get("/api/:date/", function(req, res) {
  console.log(typeof req.params.date)
  const dateRegex = /^(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))$/    
  // req.params.date = req.params.date.replace(/'/g, '')
  let dateSplit = req.params.date.split(/[\D\W]/)  
  console.log(dateSplit)
  // console.log(parseInt(tst))
  // if(dateRegex.test(req.params.date)) {
  if(/\d/.test(req.params.date)) {
    
  } 
  if(req.params.date.includes('-')) {
    let dateObj = new Date(req.params.date)    
    let unixDate = Number(Date.parse(req.params.date))
    let splitDate = req.params.date.split('-')    
    let utcDate = dateObj.toUTCString()            
    res.json({
      'unix': unixDate,
      'utc': utcDate
    })
  // } else if(/[1-9]\d*/.test(req.params.date)) {                  
  } else if(!req.params.date.includes('-')) {   
      let unixD = ''
      if(req.params.date.includes("'")) {
        unixD = Date.parse(req.params.date)
      } else {
        unixD = Number(req.params.date)
      }  
      res.json({
        'unix': unixD,
        'utc': new Date(Number(Date.parse(req.params.date))).toUTCString()
      })
  }
  else {
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
