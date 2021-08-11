module.exports = function greetings() {

    //greets
    //recordNames
    //countsNames
    //No duplicates

    let names;
    let count = 0;
    let listNames = [];
    let check = [];


    function recordNames(action) {

        var obj = {};

        function setName() {

            if (action.name) {
                obj["name"] = action.name;
                // obj["count"] = 1;
            }
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
        console.log(obj);



    }

    function greets(language, name) {
console.log({language, name})
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





    // function recordNames(action) {

    //     if (action === "English") {
    //         count += names;
    //     }

    //     if (action === "IsiXhosa") {
    //         count += names;
    //     }

    //     if (action === "Swahili") {
    //         count += names;
    //     }



    // }


    // function pushNames(names) {

    //     if (!listNames.includes(names)) {

    //         listNames.push(names);
    //     }
    // }


    function greetedNames() {

        //check empty object if has the index of names

        for (let i = 0; i < listNames.length; i++) {

            var names = listNames[i].name
            if (check.indexOf(names) !== -1) {

            } else {
                check.push(names)
            }
        }
        return check;
    }




    // function actionsFor(name) {
    //     const filteredNames = [];
    //     const counter = 0;
    //     // loop through all the entries in the action list 
    //     for (let index = 0; index < listNames.length; index++) {
    //         const action = listNames[index].name;
    //         console.log(listNames)
    //         // check this is the type we are doing the total for 
    //         if (action == name ) {
    //             // add the action to the list
    //             filteredNames.push(action);
    //         }
    //     }
    //     // console.log(filteredNames)
    //     return  {count: counter, name}


    //     // return actionList.filter((action) => action.type === type);
    // }

    return {

        recordNames,
        greetedNames,
        greets,
        getCount,

    }
}