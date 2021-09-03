'use strict';

const assert = require('assert');
const greeted = require('../db-factory');
const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/greetingWeb';

const pool = new Pool({
    connectionString,
    ssl: useSSL

});

// DATABASE TEST
describe('The basic database greeting app', function () {

    let gDatabase = greeted(pool);


    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("DELETE FROM users;");
        // await pool.query("delete from categories;");
    });

    it('should set data into Database', async function () {
        await gDatabase.setDataToDb("Ndalo", "English");

        var data = {
            name: "Ndalo",
            count: 1,
            language: "English",
        }

        let categories = await gDatabase.getValueFromDb()
        // delete id, in order to test
        delete categories.rows[0].id
        assert.deepEqual(data, categories.rows[0]);

    });

    it('should count the number of greeted users', async function () {

        await gDatabase.setDataToDb("Nalo", "English");
        await gDatabase.setDataToDb("Nalo", "English");
        await gDatabase.setDataToDb("Ndalo", "English");
        await gDatabase.setDataToDb("Ndalo", "English");

        var data = await gDatabase.getCountOFName()
        assert.equal(4, data.rows.length);

    });



    it('should not count duplicate greeted users', async function () {

        await gDatabase.setDataToDb("Nalo", "English");
        await gDatabase.setDataToDb("Ndalo", "English");
        await gDatabase.setDataToDb("Ndalo", "English");



        var data = await gDatabase.getGreetedList()
        assert.equal(2, data.rows.length);

    });

    it('should reset data in database', async function () {

        // input into database
        await gDatabase.setDataToDb("Nalo", "English");
        await gDatabase.setDataToDb("Ndalo", "English");
        await gDatabase.setDataToDb("Ndalo", "English");

        // clearing my database
        await gDatabase.reset();


        var data = await gDatabase.getValueFromDb()

        // return the index of zero
        assert.equal(0, data.rows.length);

    });


    it('should return a greeting using the database', async function () {

        await gDatabase.setDataToDb("Ndalo", "Hello");

        var data = "Hello, Ndalo"
        

        let categories = await gDatabase.getValueFromDb()
        var msg = categories.rows[0].language + ", " + categories.rows[0].name

        assert.equal(data, msg);
    });



    after(function () {
        pool.end();
    })

});

// PREVIOUS TESTS
// describe('Greeting function', function () {

//     describe('Language', function () {

//         let greetingApp = greetings();

//         it('should greet a user in English', function () {

//             assert.strictEqual(("Hello, Moddy"), greetingApp.greets("English", "Moddy"));
//         });

//         it('should greet a user in IsiXhosa', function () {

//             assert.equal(("Molo, Moddy"), greetingApp.greets("IsiXhosa", "Moddy"));
//         });

//         it('should greet a user in Swahili', function () {

//             assert.equal(("Jambo, Moddy"), greetingApp.greets("Swahili", "Moddy"));
//         });

//         it('should be able to record greeting', function () {
//             greetingApp.recordNames('Hello');
//             assert.equal(1, greetingApp.greetedNames('Hello').length);
//         });
//     });


//     describe('Count', function () {

//         let greetingApp = greetings();


//         it('should prevent duplicatation of a username', function(){


//             greetingApp.setNames("Moddy");
//             greetingApp.setNames("Moddy");
//             greetingApp.setNames("Moddy");
//             greetingApp.setNames("Nalo");
//             greetingApp.setNames("Ndalo");
//             // greetingApp.getC()

//             assert.equal(3, greetingApp.getC());
//         }); 

//         it('should count three usernames', function(){


//             greetingApp.recordNames('Moddy');
//             greetingApp.recordNames('Moddy');
//             greetingApp.recordNames('Moddy');
//             greetingApp.recordNames('Ndalo');
//             greetingApp.recordNames('Ndalo');
//             greetingApp.recordNames('Luyanda');

//             assert.equal(3, greetingApp.getC());
//         });

//     });

// });