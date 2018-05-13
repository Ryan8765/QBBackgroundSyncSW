var express = require('express');
var app = express();
var path = require('path');
const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index2.html');
});

console.log("listenting on 8080");
app.listen(8080);
