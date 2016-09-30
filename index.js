var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var functions = require('./functions');

mongoose.connect('mongodb://localhost:27017/urlShortener');

var url = require('./models/urls.js');

//BodyParser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router
var router = express.Router();
app.use('/api', router);

//Launch Port
var port = process.env.PORT || 8080;

//Startup Message
console.log("Service started at http://localhost:" + port);

//Logging & CORS
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var date = new Date();
    console.log('New Request at ' + date);
    next();
});

router.get('/', function(req, res, next) {
    res.json({ message: 'Hello' });
});

router.post('/add', function(req, res, next) {
    var payload = req.body;
    var requrl = payload.url;

    var newURL = new url({shortCode: 'abc1427', url: 'http://saisthota.com'});

    newURL.save(function(err){
        if(err) {
            console.log(err);
        } else {
            res.json(newURL);
        }
    })
})

app.listen(port);