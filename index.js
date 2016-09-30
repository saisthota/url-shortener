var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db');
var url = require('./models/urls.js');
var lib = require('./functions');

//BodyParser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router
var router = express.Router();
app.use('/', router);

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

router.get('/:shortcode', function(req, res, next) {
    var shortCode = req.params.shortcode;

        url.findOne({shortCode: shortCode}, function (err, data) {
            if (err) {
                res.status(500).json({'Error': 'Unknown Error'});
            } else {
                res.redirect(data.url);
            }
        })
});

router.post('/api/add', function(req, res, next) {
    var payload = req.body;
    var reqURL = payload.url;
    var shortCode = lib.generateURL();

    var saveURL = function() {

        if (lib.checkURL(shortCode) != 0) {

            var newDocument = new url({shortCode: shortCode, url: reqURL});

            newDocument.save(function (err) {
                if (err) {
                    res.status(500).json({'Error': 'Unknown Error'});
                }
                else {

                    var responseData = {
                        url: reqURL,
                        shortURL: 'http://localhost:' + port + '/' + shortCode
                    };

                    res.status(200).json(responseData);
                }
            })
        } else {
            saveURL();
        }
    }

    saveURL();
});



app.listen(port);