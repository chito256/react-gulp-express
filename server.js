var express = require('express');
var app = express();
var port = process.env.port || 8080;

app.use('/js/', express.static(__dirname + '/dist/js/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});
