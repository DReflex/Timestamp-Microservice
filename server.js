// server.js
// where your node app starts

// init project
var path = require("path");
var express = require('express');
var moment = require('moment')

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// homepage
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});


// if there is string in url 
app.get('/:timeString', function(request, response){
  var timeString = request.params.timeString;
  var output;
  
  //check for format 
   if(/^-?[0-9]*$/.test(timeString)){
     output = moment(timeString, "X")
   
   }
else{
  output = moment(timeString, "MMMM DD YYYY");
}
  //using moment documentation
    if (output.isValid()){
    response.json({
      unix: output.utc().format("X"),
      natural: output.utc().format("MMMM D, YYYY")
    });
  } else{
    response.json({
      unix: 'null',
      natural: 'null'
    });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
