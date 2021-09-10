module.exports = function greeted(pool) {

    let listNames = [];

    async function pushName (name, languageBtn){

       var nameFirstLetterCap = name[0].toUpperCase() + name.slice(1).toLowerCase();

        var names =  await pool.query("SELECT * FROM users WHERE name = $1", [nameFirstLetterCap]);

        if(names.rows.length == 0){

            return await pool.query("INSERT INTO users (name,count,language) VALUES($1, $2, $3)", [nameFirstLetterCap, 1, languageBtn]);

        }else{

            return await pool.query("UPDATE users SET count =  count + 1 WHERE name = $1", [nameFirstLetterCap]);

        }

    }

    // gets data from 
    async function getValueFromDb() {

        return await pool.query("SELECT * FROM users");
    }

    // records names
    async function recordNames(action) {

        var obj = {};

        async function setName() {
            try {
                obj["name"] = action.name;


            } catch (e) {
                console.log('Catch an error: ', e)


            }

        }

        setName()

        async function setLanguage() {
            try {

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
            
            
            catch (e) {
                console.log('Catch an error: ', e)


            }


        }
        setLanguage()

        listNames.push(obj);
        return await {name: obj.name, language: obj.languageBtn}

    }

    async function getGreetedList() {

        return await pool.query("SELECT name FROM users");
    }


    // gets name from database
    async function getCountOFName() {

        return await pool.query("SELECT * FROM users");

    }



    //clears data
    async function reset() {

        return await pool.query("DELETE FROM users")
    }


    return {
        getValueFromDb,
        pushName,
        getGreetedList,
        getCountOFName,
        recordNames,
        reset
    }
}
