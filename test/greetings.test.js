'use strict';

const assert = require('assert');
const greetings = require('../greetings-webapp');

describe('Greeting function', function () {

    describe('Language', function () {

        let greetingApp = greetings();

        it('should greet a user in English', function () {

            assert.strictEqual(("Hello, Moddy"), greetingApp.greets("English", "Moddy"));
        });

        it('should greet a user in IsiXhosa', function () {

            assert.equal(("Molo, Moddy"), greetingApp.greets("IsiXhosa", "Moddy"));
        });

        it('should greet a user in Swahili', function () {

            assert.equal(("Jambo, Moddy"), greetingApp.greets("Swahili", "Moddy"));
        });

        it('should be able to record greeting', function () {
            greetingApp.recordNames('Hello');
            assert.equal(1, greetingApp.greetedNames('Hello').length);
        });
    });


    describe('Count', function () {

        let greetingApp = greetings();


        it('should prevent duplicatation of a username', function(){

    
            greetingApp.setNames("Moddy");
            greetingApp.setNames("Moddy");
            greetingApp.setNames("Moddy");
            greetingApp.setNames("Nalo");
            greetingApp.setNames("Ndalo");
            // greetingApp.getC()
    
            assert.equal(3, greetingApp.getC());
        }); 

        it('should count three usernames', function(){

    
            greetingApp.recordNames('Moddy');
            greetingApp.recordNames('Moddy');
            greetingApp.recordNames('Moddy');
            greetingApp.recordNames('Ndalo');
            greetingApp.recordNames('Ndalo');
            greetingApp.recordNames('Luyanda');
    
            assert.equal(3, greetingApp.getC());
        });

    });

});