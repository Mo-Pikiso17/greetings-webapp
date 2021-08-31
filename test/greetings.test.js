'use strict';

const assert = require('assert');
const  greeted = require('../db-factory');
const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/greetingWeb';

const pool = new Pool({
  connectionString,
  ssl: useSSL

});

describe('The basic database greeting app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("DELETE FROM users;");
        // await pool.query("delete from categories;");
    });


    it('should count the number of users greeted', async function(){
        
        // the Factory Function is called CategoryService
        let gDatabase = greeted(pool);


        await gDatabase.setDataToDb("Moddy");

        var data = gDatabase.getValueFromDb()
        assert.equal(1, data.length);

    });


    it('should set data into Database', async function(){
        
        // the Factory Function is called CategoryService
        let gDatabase = greeted(pool);
        await gDatabase.setDataToDb("Ndalo","English");

        let categories = gDatabase.getValueFromDb();
        assert.deepEqual({row:"(1,English,Ndalo)"}, categories);

    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let gDatabase = greeted(pool);

        await gDatabase.getValueFromDb("Moddy");

        await gDatabase.getValueFromDb("Moddy");

        await gDatabase.getValueFromDb("Moddy");


        await gDatabase.getGreetedList("Moddy")
        await gDatabase.getGreetedList("Moddy")
        await gDatabase.getGreetedList("Moddy")

        assert.equal(1 ,await gDatabase.setDataToDb().length);
    });



    after(function(){
        pool.end();
    })

});


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