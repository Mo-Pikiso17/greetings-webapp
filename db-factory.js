// require('make-promises-safe'); // installs an 'unhandledRejection' handler


module.exports = function greeted(pool) {
    var obj = { count: 0 }

    function dbLog(name, languageBtn) {

        async function setDataToDb() {
            await pool.query("INSERT INTO users (name,count,language) VALUES($1, $2, $3)", [name, 1, languageBtn])

        }


        async function getValueFromDb() {
            var getting = await pool.query("SELECT DISTINCT name FROM users")
            const arg = getting.rows
            arg.forEach(element => {
                obj.count++
            })

            //Promise
            var listArray = await pool.query("SELECT * FROM users")
            const array = listArray.rows

            const database = array[array.length - 1]

            // console.log(database, obj.count )
            return { data: database, count: obj.count }

        }

        return { setDataToDb, getValueFromDb }

    }

    async function getGreetedList() {
        var greetList = (await pool.query("SELECT DISTINCT name FROM users")).rows

        const list = []
        greetList.forEach(element => {
            list.push(element.name)
        })
        return list 

    }

    async function getCountOFName(names) {
        var nameCountNames = await pool.query("SELECT name FROM users")
        const data = nameCountNames.rows
        const listCount = []
        data.forEach(element => {
            if (element.name === names) {
                listCount.push(element.name)
            }
        })

        return { count: listCount.length, names }

        // setTimeout(() => {
        // res.render('count', { count: listCount.length, names })

        // }, 2000);

    }

    async function reset() {

        await pool.query("DELETE FROM users")
        // .then(resp => {

        //     res.redirect('/')
        // })
        // .catch(err => console.log(err));

    }


    return {
        dbLog,
        getGreetedList,
        getCountOFName,
        reset
    }
}
