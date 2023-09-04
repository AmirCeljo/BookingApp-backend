const mysql = require('mysql');


const db = mysql.createConnection({
    host:"bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:"hoovq6y5nyaosqvd",
    password: "qeentege39g9hzko",
    database: "msv54eb4op4tk5hs",
})
// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password: "123456Jedandvatri",
//     database: "estateselect",
// })


// mysql://hoovq6y5nyaosqvd:qeentege39g9hzko@bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/msv54eb4op4tk5hs



// mysql://baecc534027e9b:67d1e96a@eu-cdbr-west-03.cleardb.net/heroku_f7985af22320dc2?reconnect=true

// db.connect((err) => {
//     if(err) throw err;
//     console.log('MySql Connected')
// })

module.exports= db