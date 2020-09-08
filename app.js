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
    res.render("home")


});

app.get("/maker", function (req, res) {
    res.render("Maker")
})
app.post("/maker1", function (req, res) {
    var arr = req.body.Bool.split(",")
    console.log(arr);
    var que = {
        id: req.body.no,
        title: req.body.title,
        options: {
            A: {

                cont: req.body.At,
                bool: false
            },
            B: {
                cont: req.body.Bt,
                bool: false
            },
            C: {
                cont: req.body.Ct,
                bool: false
            }
        }
    }
    for (i in que.options) {

        if (arr.includes(i))
            que.options[i].bool = true;
    }
    Que.doc(que.id).set(que);
    res.render("Maker")

})

app.post("/question", function (req, res) {
    const rollNo = req.body.rollNo.substring(0, 3).toUpperCase() + req.body.rollNo.slice(3)
    var arr = []
    Que.get().then(function (doc) {
        for (i in doc.docs)
            arr.push(doc.docs[i].data())

        res.render("demo", {
            data: arr,
            rollNo: rollNo
        })

    })
})
app.post("/submit", function (req, res) {
    console.log(req.body.submit);
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("The server is running successfully");
})