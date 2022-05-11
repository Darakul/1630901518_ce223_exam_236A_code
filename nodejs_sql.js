//Open Call Express 
const express = require('express')
const bodyParser = require('body-parser')
 
const mysql = require('mysql')
 
const app = express()
const port = process.env.PORT || 5000;
 
app.use(bodyParser.json())
 
//MySQL Connect phpMyAdmin
const pool = mysql.createPool({
    connectionLimit : 10,
    connectionTimeout : 20,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'lottery' 
})
 

app.get('',(req, res) => {
 
    pool.getConnection((err, connection) => {  
        if(err) throw err
        console.log("connected id : ?" ,connection.threadId) 
         
        connection.query('SELECT * FROM tbl_lottery', (err, rows) => { 
            connection.release();
            if(!err){ 
                //console.log(rows)
                //res.json(rows)
                res.send(rows)
            } else {
                console.log(err)
            }
         }) 
    })
})


 
app.get('/index', (req, res) => {
    res.render('index')
})

app.listen(port, () => 
    console.log("listen on port : ?", port)
    )