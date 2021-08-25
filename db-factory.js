require('make-promises-safe'); // installs an 'unhandledRejection' handler

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/greetingWeb';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

module.exports = function greeted(pool) {
    var obj = { count: 0 }

    function dbLog(data, res) {

        async function setDataToDb() {
            await pool
                .query("INSERT INTO users (name,count,language) VALUES($1, $2, $3)", [data.name, 1, data.languageBtn])
                .then(resp => {
                    res.redirect('/')
                })
                .catch(err => console.log(err))
        }

        // setDataToDb()

        async function getValueFromDb() {
            await pool
                .query("SELECT DISTINCT name FROM users")
                .then(resp => {
                    const arg = resp.rows
                    arg.forEach(element => {
                        obj.count++
                    })
                })
                .catch()

//Promise
            await pool
                .query("SELECT * FROM users")
                .then(resp => {
                    const array = resp.rows

                    const database = array[array.length - 1]

                    // const realDb = [database.name, database.language]
                    // console.log(realDb)
                    // database["count"] = 0
                    setTimeout(() => {
                        res.render('index', { data: database, count: obj.count })

                    }, 2000);

                })
                .catch()


        }

        return { setDataToDb, getValueFromDb }

    }

    async function getGreetedList(res) {
        await pool
            .query("SELECT DISTINCT name FROM users")
            .then(resp => {
                //get data from that specific row
                const data = resp.rows
                const list = []
                data.forEach(element => {
                    list.push(element.name)
                })
                setTimeout(() => {
                    res.render('greetedNames', { list })

                }, 2000);

            })
            .catch(err => console.log(err));

    }

    async function getCountOFName(res, names) {
        await pool
            .query("SELECT name FROM users")
            .then(resp => {
                const data = resp.rows
                const listCount = []
                data.forEach(element => {
                    if (element.name === names) {
                        listCount.push(element.name)
                    }
                })

                setTimeout(() => {
                    res.render('count', { count: listCount.length, names })

                }, 2000);


            })
            .catch(err => console.log(err));



    }

    async function reset(res) {

        await pool
            .query("DELETE FROM users")
            .then(resp => {

                res.redirect('/')
            })
            .catch(err => console.log(err));

    }

    // function haltOnTimedout (req, res, next) {
    //     if (!req.timedout) next()
    //   }


    return {
        dbLog,
        getGreetedList,
        getCountOFName,
        reset
    }
}
