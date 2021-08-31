// require('make-promises-safe'); // installs an 'unhandledRejection' handler


module.exports = function greeted(pool) {
    // var obj = { count: 0 }

    async function setDataToDb(name, languageBtn) {
        return pool.query("INSERT INTO users (name,count,language) VALUES($1, $2, $3)", [name, 1, languageBtn])
    }

    async function getValueFromDb() {

        return pool.query("SELECT * FROM users")
    }

    async function getGreetedList() {

        return pool.query("SELECT DISTINCT name FROM users");
    }

    async function getCountOFName() {

        return pool.query("SELECT name FROM users")

    }

    async function reset() {

        return pool.query("DELETE FROM users")
    }


    return {
        setDataToDb,
        getValueFromDb,
        getGreetedList,
        getCountOFName,
        reset
    }
}
