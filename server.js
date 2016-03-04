// SERVER-SIDE JAVASCRIPT
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');

var routes = require('./config/routes');


// serve static files from public folder

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(logger('dev'));


app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
hbs.registerPartials(__dirname + '/views/partials');

hbsutils.registerWatchedPartials(__dirname + '/views/partials');


/**********
 * SERVER *
 **********/
app.use(routes);
// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
