let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let index = require('./routes/index');
let expressSanitizer = require('express-sanitizer');
import webpack from 'webpack';
import config from '../webpack.config.js';
import session from 'express-session';

// Useful vars
let app = express();

// Setting up ENV vars
export let urls = {
    videoServerURL: process.env.VIDEO_SERVER_URL || "localhost",
    forumServerURL: process.env.FORUM_SERVER_URL || "localhost",
    chatServerURL: process.env.CHAT_SERVER_URL || "localhost",
};

export let ports = {
    videoServerPort: process.env.VIDEO_SERVER_PORT || 8000,
    chatServerPort: process.env.CHAT_SERVER_PORT || 4000,
    forumServerPort: process.env.FORUM_SERVER_PORT || 5000,
};

// Webpack config
let production = process.env.PRODUCTION;
let compiler = webpack(config);
if (!production) {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
    }));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(session({
    secret: "webapp",
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, 'public')));

// Rendering routes
app.use('/', index);

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();

});

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/
/*

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
*/

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

