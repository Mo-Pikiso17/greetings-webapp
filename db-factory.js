// require('make-promises-safe'); // installs an 'unhandledRejection' handler


module.exports = function greeted(pool) {
    var obj = { count: 0 }

    function dbLog(name, languageBtn) {

        async function setDataToDb() {
            try {
                await pool.query("INSERT INTO users (name,count,language) VALUES($1, $2, $3)", [name, 1, languageBtn])

            } catch (e) {

                console.log('Catch an error: ', e)


            }

        }


        async function getValueFromDb() {

            try {
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
                return await { data: database, count: obj.count }




            } catch (e) {

                console.log('Catch an error: ', e)


            }

        } return { setDataToDb, getValueFromDb }

    }


    async function getGreetedList() {

        try {

            var greetList = (await pool.query("SELECT DISTINCT name FROM users")).rows

            const list = []
            greetList.forEach(element => {
                list.push(element.name)
            })
            return list

        } catch (e) {
            console.log('Catch an error: ', e)

        }


    }

    async function getCountOFName(names) {

        try {

            var nameCountNames = await pool.query("SELECT name FROM users")
            const data = nameCountNames.rows
            const listCount = []
            data.forEach(element => {
                if (element.name === names) {
                    listCount.push(element.name)
                }
            })

            return { count: listCount.length, names }


        } catch (e) {

            console.log('Catch an error: ', e)


        }

        // setTimeout(() => {
        // res.render('count', { count: listCount.length, names })

        // }, 2000);

    }

    async function reset() {

        try {
            await pool.query("DELETE FROM users")


        } catch (e) {
            console.log('Catch an error: ', e)

        }

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
