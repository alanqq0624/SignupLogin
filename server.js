//express server
//server open and environmet value
const express = require('express');
const app = express();
const port_express = 10072;
//let express can use .body. to get data for method'post'
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//use data at '/public'
app.use(express.static(__dirname + '/public'));
//listen port
app.listen(port_express, function () {
    console.log('Example app listening on port ' + port_express + ' !\n');
});

//session
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'random 128 byte string',
    store: new MongoStore({
        url: 'mongodb://localhost:27017/sessiondb'
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
}));

//MongoDB
//URL, may change due to different server
const db_url = 'mongodb://localhost:27017';
const db_name = 'nodejs';
const db_col = 'account';
//import mongodb
var MongoClient = require('mongodb').MongoClient;
//Test DB connection
MongoClient.connect(db_url, function (err, client) {
    if (err) throw err;
    console.log('mongodb is running!\n');
    client.close();
});

//index
app.post("/index_redirect", function (req, res) {
    if (req.session.isLogin) {
        console.log("Had login\n")
        res.send(true);

    } else {
        console.log("Had not login\n")
        res.send(false);
    }
})

//SIGNUP
//accept 'post' from /ajax_data (input forum) and send back to front page
//save message function have not done
app.post("/signup_submit", function (req, res) {
    console.log('ID: ' + req.body.accountid + "\npassword: " + req.body.password + "\nemail: " + req.body.email);
    MongoClient.connect(db_url, function (err, client) {
        const db = client.db(db_name);
        const col = db.collection(db_col);
        if (err) throw err;
        const findIDEM = col.findOne({
            $or: [{
                accountid: req.body.accountid
            }, {
                email: req.body.email
            }]
        }).then(function (find) {
            console.log(find);
            if (!find) {
                col.insertOne({
                    accountid: req.body.accountid,
                    password: req.body.password,
                    email: req.body.email
                });
                console.log('Account ' + req.body.accountid + " create success\n");
                res.send('Account ' + req.body.accountid + " create success");
            } else {
                console.log("Account create fail: accountID or email may already exist\n");
                res.send("Account create fail: accountID or email may already exist");
            }
            client.close();
        })

    });
});

//LOGIN
app.post("/login_submit", function (req, res) {
    console.log('ID: ' + req.body.accountid + "\npassword: " + req.body.password + "\nemail: " + req.body.email);
    MongoClient.connect(db_url, function (err, client) {
        const db = client.db(db_name);
        const col = db.collection(db_col);
        if (err) throw err;
        col.findOne({
                accountid: req.body.accountid
            },
            function (err, find) {
                if (err) throw err;
                if (find) {
                    req.session.isLogin = true;
                    console.log(find);
                    console.log("Login Success: Welcome " + find.accountid + "\n");
                    res.json({
                        result: true,
                        message: "Login Succecss: " + find.accountid
                    });
                } else {
                    console.log("Login fail: Account doesn't exist\n");
                    res.json({
                        result: false,
                        message: "Login fail: Account doesnt exist"
                    });
                }
                client.close();
            }
        );
    });
});