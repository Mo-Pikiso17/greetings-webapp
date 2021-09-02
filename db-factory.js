// require('make-promises-safe'); // installs an 'unhandledRejection' handler


module.exports = function greeted(pool) {
    // var obj = { count: 0 }

    // try {
        
    // } catch (error) {

    //     console.log('Catch an error: ', error)
    // }

    // try {
        
    // } catch (error) {

    //     console.log('Catch an error: ', error)
    // }

    // try {
        
    // } catch (error) {

    //     console.log('Catch an error: ', error)
    // }

    // try {
        
    // } catch (error) {

    //     console.log('Catch an error: ', error)
    // }

    // try {
        
    // } catch (error) {

    //     console.log('Catch an error: ', error)
    // }


    async function setDataToDb(name, languageBtn) {
        return await pool.query("INSERT INTO users (name,count,language) VALUES($1, $2, $3)", [name, 1, languageBtn])
    }

    async function getValueFromDb() {

        return await pool.query("SELECT * FROM users")
    }

    async function getGreetedList() {

        return await pool.query("SELECT DISTINCT name FROM users");
    }

    async function getCountOFName() {

        return await pool.query("SELECT name FROM users")

    }

    async function reset() {

        return await pool.query("DELETE FROM users")
    }


    return {
        setDataToDb,
        getValueFromDb,
        getGreetedList,
        getCountOFName,
        reset
    }
}
