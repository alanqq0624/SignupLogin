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
    console.log('Example app listening on port ' + port_express + ' !');
});

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
    console.log('mongodb is running!');
    client.close();
});

//accept 'post' from /ajax_data (input forum) and send back to front page
//save message function have not done
app.post("/signup", function (req, res) {
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
                console.log('Account ' + req.body.accountid + " create success");
                res.send('Account ' + req.body.accountid + " create success");
            } else {
                console.log("Account create fail: accountID or email may already exist");
                res.send("Account create fail: accountID or email may already exist");
            }
            client.close();
        })

    });
});