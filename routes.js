'use strict';

let express = require('express');
let router = express.Router();

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


//database factory function
const dbLogic = require('./db-factory');

//home route
router.get('/', async function (req, res) {

  try {
    var gettingLogic = await dbLogic(pool).getValueFromDb()
      .then(value => {
        var obj = { count: 0 }
        var data = value.rows
        var nArray = []
        data.forEach(element => {
          if (nArray.indexOf(element.name) == -1) {
            nArray.push(element.name)
            obj.count++
          }

        });

        var currentData = data[data.length - 1]
        for (const key in currentData) {
          if (key == "name") {
            obj["name"] = currentData.name;
          }

          else if (key == "language") {
            obj["language"] = currentData.language
          }
        }

        res.render('index', { data: obj })

      })
      .catch(error => { console.log(error) })


  } catch (e) {
    console.log('Catch an error: ', e)
    // return;
  }
});


router.post('/', async function (req, res) {

  const names = req.body.name
  const language = req.body.languageBtn
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
      var setData = await dbLogic(pool).recordNames(req.body)
      var databaseData = await dbLogic(pool).pushName(setData.name, setData.language)
        .then(value => {

          res.redirect('/')

        })
        .catch(error => console.log(error))
    }
  }

  catch (e) {

    console.log('Catch an error: ', e)

  }

});



router.get('/greetedNames', async function (req, res) {
  try {

    // res.render('greetedNames', { greetedNames: greeting.greetedNames() })
    var gList = await dbLogic(pool).getGreetedList()
      .then(value => {
        var list = value.rows
        res.render('greetedNames', { list })

      })
  } catch (e) {
    console.log('Catch an error: ', e)
  }

});


router.get('/greetedNames/:name', async function (req, res) {
  const actionType = req.params.name;

  try {
    // res.render('count', { greetedNames: greeting.getCount(actionType) });
    var countN = await dbLogic(pool).getCountOFName(actionType)
    // console.log(countN.rows)
      .then(value => {
        var countList = value.rows
        console.log(countList)
        var cList = []
        countList.forEach(element => {
          if (element.name == actionType) {
            cList.push(element)
          }

          console.log(cList)
        })
      // })
        res.render('count', { count: cList[0].count, name: actionType })
      });

    // res.render('count', { countN })

  } catch (e) {
    console.log('Catch an error: ', e)

  }

})
  

router.get('/reset', async function (req, res) {

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
  }

});

module.exports = router;