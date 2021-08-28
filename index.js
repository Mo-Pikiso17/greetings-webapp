"use strict";

let express = require('express');
// const flash = require('express-flash');
const session = require('express-session');
let app = express();
// const timeout = require('connect-timeout')


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

// app.use(timeout('5s'))

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

// app.post('/save', timeout('5s'), bodyParser.json(), haltOnTimedout, function (req, res, next) {
//   savePost(req.body, function (err, id) {
//     if (err) return next(err)
//     if (req.timedout) return
//     res.send('saved as id ' + id)
//   })
// })

//home route
app.get('/', async function (req, res) {

  try {
    var gettingLogic = await dbLogic(pool).dbLog().getValueFromDb()
    res.render('index', { gettingLogic })


  } catch (e) {
    console.log('Catch an error: ', e)
    // return;
  }

  //to keep data on the home route
})


app.post('/', async function (req, res) {

  const names = req.body.name
  const language = req.body.languageBtn

  // function errors(names, language) {

  //   if (names  && language) {

  //     dbLogic(pool).dbLog(names, language).setDataToDb()
  //     // setTimeout(() => {
  //       res.redirect('/');

  // }, 100);



  //   } else {
  //     // console.log('no data')


  //   }

  // }
  // errors()


  // const counts = req.body.count

  try {

    if (names == '' && language == null) {

      req.session.message = {
        type: 'ERROR!',
        intro: 'Empty field',
        message: 'Please enter and select a language!'

      }
      res.redirect('/');

    }

    else if (names == '' && language) {

      req.session.message = {
        type: 'ERROR!',
        intro: 'Empty field',
        message: 'Please enter a name!'
      }
      res.redirect('/');
    }

    else if (names && language == null) {

      req.session.message = {
        type: 'ERROR!',
        intro: 'Empty field',
        message: 'Please select a language!'
      }

      res.redirect('/');

    }

    else if (names && language) {

      // dbLogic(pool).dbLog(names, language).setDataToDb()
      await greeting.recordNames(req.body)

      setTimeout(() => {
        res.redirect('/')
    
      }, 100);
    

    }

    

  }

  catch (e) {

    console.log('Catch an error: ', e)
    // return;



  }






});



app.get('/greetedNames', async function (req, res) {
  try {

    // res.render('greetedNames', { greetedNames: greeting.greetedNames() })
    var gList = await dbLogic(pool).getGreetedList()
    res.render('greetedNames', { gList })


  } catch (e) {
    console.log('Catch an error: ', e)
  }

  // console.log(gList)

});

app.get('/greetedNames/:name', async function (req, res) {
  const actionType = req.params.name;
  try {
    // res.render('count', { greetedNames: greeting.getCount(actionType) });
    var countN = await dbLogic(pool).getCountOFName(actionType)
    res.render('count', { countN })



  } catch (e) {
    console.log('Catch an error: ', e)
    // return;


  }



});

app.get('/reset', async function (req, res) {

  try {
    await dbLogic(pool).reset()
    req.session.messages = {
      types: 'SUCCESS!',
      intro: 'Empty field',
      messages: 'Page Reloaded!'
    }
    res.redirect('/')



  } catch (e) {

    console.log('Catch an error: ', e)
    // return;


  }

})



//start the server
let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log('App starting at port:', PORT);
});
