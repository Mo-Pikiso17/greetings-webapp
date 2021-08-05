'use strict';

const assert = require('assert');
const greetings = require('../greetings-webapp');

describe('Greeting function', function () {

    describe('Language', function () {

        let greetingApp = greetings();

        it('should greet a user in English', function () {

            assert.strictEqual(("Hello, Moddy"), greetingApp.greet("English", "Moddy"));
        });

        it('should greet a user in IsiXhosa', function () {

            assert.equal(("Molo, Moddy"), greetingApp.greet("IsiXhosa", "Moddy"));
        });

        it('should greet a user in Swahili', function () {

            assert.equal(("Jambo, Moddy"), greetingApp.greet("Swahili", "Moddy"));
        });

        it('should be able to record greeting', function () {
            greetingApp.recordNames('Hello');
            assert.equal(0, greetingApp.actionsFor('Hello').length);
        });
    });


    describe('Count', function () {

        let greetingApp = greetings();


        it('should prevent duplicatation of a username', function(){

    
            greetingApp.pushNames("Moddy");
            greetingApp.pushNames("Moddy");
            greetingApp.pushNames("Moddy");
    
            assert.equal(1, greetingApp.getCount());
        });

        it('should count three usernames', function(){

    
            greetingApp.pushNames('Moddy');
            greetingApp.pushNames('Moddy');
            greetingApp.pushNames('Moddy');
            greetingApp.pushNames('Ndalo');
            greetingApp.pushNames('Ndalo');
            greetingApp.pushNames('Luyanda');
    
            assert.equal(3, greetingApp.getCount());
        });

    });

});