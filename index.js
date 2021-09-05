"use strict";

let express = require('express');
// const flash = require('express-flash');
const session = require('express-session');
let app = express();
// const timeout = require('connect-timeout')
const routes = require('./routes'); //import the routes

//handlebars
const exphbs = require('express-handlebars');

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

//html forms
const bodyParser = require('body-parser');

//helpers
const helpers = require('handlebars-helpers')();
// const session = require('express-session');

const cookieParser = require('cookie-parser');

//make the style in ccs folder visible
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('secret'));

app.use(session({
  secret: "<a string sessions in javaScript>",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null },

}));

// app.use(flash());

app.use((req, res, next) => {
  res.locals.message = req.session.message
  res.locals.messages = req.session.messages

  delete req.session.message
  delete req.session.messages
  next()
});


const pg = require('pg');
const Pool = pg.Pool;

// use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = {rejectUnauthorized:false}
}

// database connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/greetingWeb';

const pool = new Pool({
  connectionString,
  ssl: useSSL

});


app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');


// my routes
app.use('/', routes);

app.use('/', routes);

app.use('/greetedNames', routes);

app.use('/greetedNames/:name', routes);

app.use('/reset', routes);


//start the server
let PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
  console.log('App starting at port:', PORT);
});
