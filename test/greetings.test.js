'use strict';

const assert = require('assert');
const greeting = require('../greetings-webapp');


describe('Greeting function' , function(){

    describe('Language' , function(){
    

    it('should greet a user in English', function(){

        let greetingName = greeting();
        assert.strictEqual(("Hello, Moddy"), greetingName.greets("English", "Moddy"));
    });

    it('should greet a user in IsiXhosa', function(){

        let greetingName = greeting();
        assert.equal(("Molo, Moddy"), greetingName.greets("IsiXhosa", "Moddy"));
    });

    it('should greet a user in Swahili', function(){

        let greetingName = greeting();
        assert.equal(("Jambo, Moddy"), greetingName.greets("Swahili", "Moddy"));
    });

    it('should take in a Lowercase input and return the first letter of the input as an Uppercase ', function(){

        let greetingName = greeting();

        greetingName.pushNames('moddy');

        assert.deepEqual(['Moddy'], greetingName.getNames());
    });

    it('should take in block-script input and return the first letter of the input as an Uppercase ', function(){

        let greetingName = greeting();

        greetingName.pushNames('MODDY');

        assert.deepEqual(['Moddy'], greetingName.getNames());
    });


    it('should return an input that consists of characters such as number as invalid.', function(){

        let greetingName = greeting();

        assert.equal('Please enter a valid name. E.g Ndalo', greetingName.conditions('IsiXhosa', 'Mod6545dy'));
    
    });

});

    describe('Counter' , function(){

        it('should prevent duplicatation of a username', function(){

            let greetingName = greeting();
    
            greetingName.pushNames('Moddy');
            greetingName.pushNames('Moddy');
            greetingName.pushNames('Moddy');
    
            assert.equal(1, greetingName.getCount());
        });

        it('should count three usernames', function(){

            let greetingName = greeting();
    
            greetingName.pushNames('Moddy');
            greetingName.pushNames('Moddy');
            greetingName.pushNames('Moddy');
            greetingName.pushNames('Ndalo');
            greetingName.pushNames('Ndalo');
            greetingName.pushNames('Luyanda');
    
            assert.equal(3, greetingName.getCount());
        });

        it('should not count username with invalid characters', function(){

            let greetingName = greeting();
    
            greetingName.pushNames('Moddy253');
        
            assert.equal(1, greetingName.getCount());
        });





    });


    describe('Error Messages' , function(){

        it('should return "Please select a language" if the input box is empty and the language/radio button is clicked', function(){

            let greetingName = greeting();
            
            assert.equal('Please select a language!',  greetingName.conditions('', 'Moddy'));
        });

        it('should return "Enter name and select a language!" if the input box is empty and the language/radio button is not selected', function(){

            let greetingName = greeting();
            
            assert.equal('Enter name and select a language!', greetingName.conditions('',''));
        });

        it('should return "Please enter a name!" if the input box is empty and the language/radio button is clicked', function(){

            let greetingName = greeting();
            
            assert.equal('Please enter a name!', greetingName.conditions('IsiXhosa', ''));
        });
    
    });

});