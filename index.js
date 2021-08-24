"use strict";

let express = require('express');
// const flash = require('express-flash');
const session = require('express-session');
let app = express();
const timeout = require('connect-timeout')


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

app.use(timeout('5s'))

const pg = require('pg');
const Pool = pg.Pool;

// use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

// database connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/greetingWeb';

const pool = new Pool({
  connectionString,
  ssl: useSSL

});



app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

//database factory function
const dbLogic = require('./db-factory');

const greetings = require('./greetings-webapp');

const greeting = greetings();

app.post('/save', timeout('5s'), bodyParser.json(), haltOnTimedout, function (req, res, next) {
  savePost(req.body, function (err, id) {
    if (err) return next(err)
    if (req.timedout) return
    res.send('saved as id ' + id)
  })
})

//home route
app.get('/', function (req, res) {

  dbLogic().dbLog('data', res).getValueFromDb()
  //to keep data on the home route
  // res.render('index')
})


app.post('/', function (req, res) {

  const names = req.body.name
  const language = req.body.languageBtn

  // greeting.recordNames(req.body, res)

  // const counts = req.body.count

  if (names == '' && language == null) {

    req.session.message = {
      type: 'ERROR!',
      intro: 'Empty field',
      message: 'Please enter and select a language!'
    }
    res.redirect('/');

  }

  else if (names == '') {

    req.session.message = {
      type: 'ERROR!',
      intro: 'Empty field',
      message: 'Please enter a name!'
    }
    res.redirect('/');
  }

  else if (language == null) {

    req.session.message = {
      type: 'ERROR!',
      intro: 'Empty field',
      message: 'Please select a language!'
    }
    res.redirect('/');

  }

  else {
    greeting.recordNames(req.body, res)
  }

  // else {
  // greetings.recordNames(req.body, res)
  //   const msg = greeting.greets(language, names);
  //   // console.log({ msg });
  //   const count = greeting.getC();
  //   // console.log(count);
  //   greeting.greetedNames(req.body)


  // pool.query(
  //   'INSERT INTO users (name, count) VALUES ($1, $2)',

  //   [names, count],

  // );

  // res.render('index', {
  //   msg,
  //   count
  // });

  // }

});



app.get('/greetedNames', function (req, res) {

  // res.render('greetedNames', { greetedNames: greeting.greetedNames() })
  dbLogic().getGreetedList(res)
});

app.get('/greetedNames/:name', function (req, res) {
  const actionType = req.params.name;
  // res.render('count', { greetedNames: greeting.getCount(actionType) });
  dbLogic().getCountOFName(res, actionType)

});

app.get('/reset', function (req, res) {

  dbLogic().reset(res)
    req.session.messages = {
      types: 'SUCCESS!',
      intro: 'Empty field',
      messages: 'Page Reloaded!'
    }


})




//   //check empty field and send a flash message for that.
//   if(req.body.name == '' && req.body.languageBtn == null ){

//       req.flash.message = {
//           type: 'ERROR!',
//           intro: 'Empty field and no language',
//           message: 'Please enter a name & select a language'
//       }
//       res.redirect('/');
//   }
//   if (req.body.name == ''){

//       req.flash.message = {
//           type: 'ERROR!',
//           intro: 'Empty field',
//           message: 'Please enter a name'
//       }
//       res.redirect('/');
//   }
//   // else if (req.body.languageBtn == null ){

//   //     req.session.message = {
//   //         type: 'ERROR!',
//   //         intro: 'no language',
//   //         message: 'Please select a language'
//   //     }
//   //     res.redirect('/');
//   // }
//   else{
//       req.flash.message = {
//           type: 'Success!',
//           intro: 'Name entered',
//           message: 'Name greeted sucessfully'
//       }
//       res.redirect('/');
//   }

// })


// process.on("unhandledRejection", err =>{

//   console.log(`send this error to: ${err.stack}`);
//   console.log("---------------------------");

// })


//start the server
let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log('App starting at port:', PORT);
});
