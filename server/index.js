const express = require("express");
const app = express();
app.use(express.json());

const mysql = require("mysql2");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "register", 
});

const cors = require("cors");
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.get('/', (req,res) => {
    res.end('welcome');
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.passwordReg;
    db.execute(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' `,
        (err, result) => {
            if(err){
                console.log('err');
                res.sendStatus(404);
            }
            if(result.length < 1){
                db.execute(
                    `INSERT INTO users (username,password) VALUES ("${username}", "${password}")` ,
                    (err, result) => {
                        if(err){
                            console.log(err);
                            res.sendStatus(409);
                            return;
                        }
                        res.status(201).json('Created');
                    }
                );
            }
            if(result.length > 0){
                console.log(result);
                res.sendStatus(409);
            }
        }
    );
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.execute(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' `,
        (err, result) => {
            if(err){
                console.log('err');
                res.sendStatus(404);
            }
            if(result.length < 1){
                res.sendStatus(401);
            }
            if(result.length > 0){
                console.log(result);
                res.sendStatus(200);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server");
});