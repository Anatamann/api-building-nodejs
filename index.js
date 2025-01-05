// index.js
// where your node app starts

// init project
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

// time-stamp API endpoint

app.get("/api/:date?", (req,res) => {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2864826874.
  const regex = /^\d+$/; // Matches one or more digits
  
  let date = req.params.date
  // console.log(date);
  if (isNaN(date)) {
    date = req.params.date ? new Date(req.params.date) : new Date();
  }  
  else if(regex.test(date) /* && date >= 0*/){
      date = new Date(parseInt(date));
      }
      // console.log(date.getTime());
  else {
        return res.json({error: "Invalid Date"});
  }
  if (isNaN(date.getTime()) /*|| date.getTime() <0*/) {
    return res.json({error: "Invalid Date"});
  }

    // printing the json response
  res.json({unix: date.getTime(), utc: date.toUTCString()});
  
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
