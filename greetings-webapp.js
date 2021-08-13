module.exports = function greetings() {


    //AIM:

    //greets
    //recordNames
    //countsNames
    //No duplicates

    let listNames = [];
    let check = [];
    let greetedNamesList = {};



    function recordNames(action) {

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


        listNames.push(obj);
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
            console.log(names)
            if (check.indexOf(names) !== -1) {

            } else {
                check.push(names)
            }
        }
        console.log(check)

        return check;
    }


    // function getList(){
    //     console.log(check.length)
    //     return check.length;

    // }

    function setNames(name) {

        if (greetedNamesList[name] == undefined) {
            console.log(greetedNamesList)

            greetedNamesList[name] = 0;
        }

        console.log(greetedNamesList);
    }

    function getC() {
        console.log(Object.keys(greetedNamesList).length)

        return Object.keys(greetedNamesList).length;
        // return listed.length;
    }

    // function checking(data) {
    //     var name = ""
    //     var language = ""
    //     // const empty = ""

    //     if (data.languageBtn == undefined || data.name == "") {
    //         // console.log('missing value')
    //         return {language, name};

    //     } else {
    //         // console.log('got the value')
    //         name = data.name
    //         language = data.languageBtn
    //         return { language, name }
    //     }

    // }

    return {

        recordNames,
        setNames,
        getC,
        greetedNames,
        greets,
        getCount,
    }
}