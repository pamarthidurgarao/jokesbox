'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Joke = require('./src/model/jokes');
var secrets = require('./secrets');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db config -- set your URI from mLab in secrets.js
var mongoDB = secrets.requestSecret('db_uri');
mongoose.connect(mongoDB, {  })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/jokes')
  .get(function(req, res) {
    var sort={ versionDate: 1 };
    Joke.find().sort(sort).then(function(err, jokes) {
      if (err)
        res.send(err);
      res.json(jokes)
    });
  })
  .post(function(req, res) {
    debugger
    console.log(req.body);
    var joke = new Joke();
    (req.body.user) ? joke.user = req.body.user : null;
    (req.body.text) ? joke.text = req.body.text : null;
    joke.versionDate = new Date().getTime();
    joke.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'joke successfully added!' });
    });
  });

router.route('/jokes/:joke_id')
  .put(function(req, res) {
    Joke.findById(req.params.joke_id, function(err, joke) {
      if (err)
        res.send(err);
      (req.body.user) ? joke.user = req.body.user : null;
      (req.body.text) ? joke.text = req.body.text : null;
      joke.versionDate = new Date().getTime();
      joke.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'joke has been updated' });
      });
    });
  })
  .delete(function(req, res) {
    Joke.remove({ _id: req.params.joke_id }, function(err, joke) {
      if (err)
        res.send(err);
      res.json({ message: 'joke has been deleted' })
    })
  });

app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
},function(error){
  console.log(`Error on ${port}`);
});