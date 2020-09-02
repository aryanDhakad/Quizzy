const express = require("express");
const ejs = require("ejs");
const app = express();
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.set('view engine', 'ejs');
const admin = require('firebase-admin');

const serviceAccount = require('./firstr.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const docRef = db.collection("Students");
const Que = db.collection("Questions");

app.get("/", function (req, res) {
    res.render("home")
})


app.post("/register", function (req, res) {
    const rollNo = req.body.St.substring(0, 3).toUpperCase() + req.body.St.slice(3)
    docRef.doc(rollNo).set({
        Name: req.body.name1
    })
    const stColl = db.collection("Students/" + rollNo + "/ans");
    stColl.doc("Answers").set({
        1: Math.floor(Math.random() * 10),
        2: Math.floor(Math.random() * 10),
        3: Math.floor(Math.random() * 10),
        4: Math.floor(Math.random() * 10)
    })

    docRef.doc(rollNo.toString()).get().then(function (snapshot) {
        db.doc("Students/" + rollNo.toString() + "/ans/Answers").get().then(function (list) {
            console.log(list.data());
            res.render("Student", {
                data: snapshot.data(),
                list: list.data()
            })
        })
    });
});
app.post("/find", function (req, res) {
    const rollNo = req.body.St.substring(0, 3).toUpperCase() + req.body.St.slice(3)

    docRef.doc(rollNo.toString()).get().then(function (snapshot) {
        db.doc("Students/" + rollNo.toString() + "/ans/Answers").get().then(function (list) {

            res.render("Student", {
                data: snapshot.data(),
                list: list.data()
            })
        })
    });
})
app.get("/maker", function (req, res) {
    res.render("Maker")
})
app.post("/maker1", function (req, res) {
    var arr = req.body.Bool.split(",")
    var que = {
        title: req.body.title,
        options: {
            q1: {

                cont: req.body.q1t,
                bool: false
            },
            q2: {
                cont: req.body.q2t,
                bool: false
            },
            q3: {
                cont: req.body.q3t,
                bool: false
            }
        }
    }
    for (i in que.options) {

        if (arr.includes(i.toString()))
            que.options[i].bool = true;
    }
    Que.doc(que.title).set(que);
    res.render("Maker")

})
app.get("/demo", function (req, res) {
    var arr = []
    Que.get().then(function (doc) {
        for (i in doc.docs)
            arr.push(doc.docs[i].data())

        res.render("demo", {
            data: arr
        })

    })
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("The server is running successfully");
})