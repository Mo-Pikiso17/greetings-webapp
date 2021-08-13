"use strict";

let express = require('express');
// const flash = require('express-flash');
const session = require('express-session');
let app = express();

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


// initialise the flash middleware
// webApp.use(flash());


//make the style in ccs folder visible
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('secret'));

app.use(session({
  cookie: { maxAge: null },
  // secret: "<a string session in javaScript>",
  // resave: false,
  // saveUninitialized: true
}));

// app.use(flash());

app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
});



app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');


const greetings = require('./greetings-webapp');

const greeting = greetings();


//home route
app.get('/', function (req, res) {

  //to keep data on the home route
  res.render('index')
})


app.post('/', function (req, res) {

  const names = req.body.name
  const language = req.body.languageBtn
  // const counts = req.body.count

  if (names == '') {

    req.session.message = {
      type: 'ERROR!',
      intro: 'Empty field',
      message: 'Please enter a name!'
    }
    res.redirect('/');

  } else {

    const msg = greeting.greets(language, names);
    // console.log({ msg });
    const count = greeting.getC();
    // console.log(count);

    greeting.recordNames(req.body);

    res.render('index', {
      msg,
      count
    });

  }
  // if (req.body.name == '') {
  //   req.flash = ('info', 'Please enter a name')
  // }

})


app.get('/greetedNames', function (req, res) {

  res.render('greetedNames', { greetedNames: greeting.greetedNames() })

});

app.get('/greetedNames/:name', function (req, res) {
  const actionType = req.params.name;
  res.render('count', { greetedNames: greeting.getCount(actionType) });
});



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



//start the server
let PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
  console.log('App starting at port:', PORT);
});
