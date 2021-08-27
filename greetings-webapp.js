const dbLogic = require('./db-factory');
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
  

module.exports = function greetings() {


    //AIM:

    //greets
    //recordNames
    //countsNames
    //No duplicates

    let listNames = [];
    let check = [];
    let greetedNamesList = {};



    async function recordNames(action) {

        var obj = {};

        function setName() {

            obj["name"] = action.name;
            // obj["count"] = 1;
        }

        setName()

        function setLanguage() {


            if (action.languageBtn === "English") {
                obj["languageBtn"] = "Hello, "
            }

            if (action.languageBtn === "IsiXhosa") {
                obj["languageBtn"] = "Molo, "

            }

            if (action.languageBtn === "Swahili") {
                obj["languageBtn"] = "Jambo, "
            }
        }

        setLanguage()


        await listNames.push(obj);
        dbLogic(pool).dbLog(obj.name, obj.languageBtn).setDataToDb();
        // console.log(listNames);
        // console.log("here "+listNames);

    }

    function greets(language, name) {
        // console.log({language, name})

        setNames(name)

        
        if (language === "English") {
            return "Hello, " + name;
        }

        if (language === "IsiXhosa") {

            return "Molo, " + name;
        }

        if (language === "Swahili") {
            return "Jambo, " + name;
        }
     
        return language + name


    }

    function getCount(name) {

        const counter = 0;
        const recordList = [];

        for (let index = 0; index < listNames.length; index++) {
            const element = listNames[index];

            if (element.name == name) {
                recordList.push(element)
                counter;
            }

        }
        return { count: recordList.length, name }
    }

    function greetedNames() {

        //check empty object if has the index of names

        for (let i = 0; i < listNames.length; i++) {

            var names = listNames[i].name
            // console.log(names)
            if (check.indexOf(names) !== -1) {

            } else {
                check.push(names)
            }
        }
        // dbLogic().setDataToDb()

        console.log(listNames)

        return check;
    }


    

    function setNames(name) {
        

        if (greetedNamesList[name] == undefined) {
            // console.log(greetedNamesList)

            greetedNamesList[name] = 0;
        }

        //console.log(greetedNamesList);
    }

    function getC() {
        // console.log(Object.keys(greetedNamesList).length)

        return Object.keys(greetedNamesList).length;
        // return listed.length;
    }



    return {

        recordNames,
        setNames,
        getC,
        greetedNames,
        greets,
        getCount,
    }
}


