module.exports = function greetings() {

    //greets
    //recordNames
    //countsNames
    let names;
    let count = 0;
    let listNames = [];


    function greet(action, names) {

        if (action === "English") {
            return "Hello, " + names;
        }

        if (action === "IsiXhosa") {
            return "Molo, " + names;
        }

        if (action === "Swahili") {
            return "Jambo, " + names;
        }
    }

    function recordNames(action) {

        if (action === "English") {
            count += names;
        }

        if (action === "IsiXhosa") {
            count += names;
        }

        if (action === "Swahili") {
            count += names;
        }

        listNames.push({
            Name: names,
            count,
        });

    }


    function pushNames(names) {

        if (!listNames.includes(names)) {

            listNames.push(names);
        }
    }


    function greetedNames() {
        return listNames;
    }

    function getCount() {
        return listNames.length;
    }

    function actionsFor(Name) {
        const filteredNames = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < listNames.length; index++) {
            const action = listNames[index];
            // check this is the type we are doing the total for 
            if (action.Name === Name) {
                // add the action to the list
                filteredNames.push(action);
            }
        }

        return filteredNames;

        // return actionList.filter((action) => action.type === type);
    }

    return {
        greet,
        recordNames,
        greetedNames,
        actionsFor,
        getCount,
        pushNames
    }

}
