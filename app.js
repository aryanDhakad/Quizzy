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
app.post("/find", function (req, res) {


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
            no: 1,
            rollNo: rollNo,
            answered1: []
        })

    })
})
app.post("/nav", function (req, res) {
    var rollNo = req.body.rollNo
    console.log(req.body.demobtn);
    var arr1 = req.body.answered.split("],[")
    var ans = []
    for (j in arr1) {
        var arr2 = arr1[j].split(",")
        ans.push({
            optNo: arr2[0],
            optCont: arr2[1],
            optBool: arr2[2]
        })
    }
    var i = {
        id: req.body.id,
        Question: req.body.qtitle,
        answers: ans
    }

    if (arr1[0]) {
        docRef.doc(rollNo).collection("Answers").doc(i.id).set(i);
    }
    var arr3 = [];

    docRef.doc(rollNo).collection("Answers").doc(req.body.demobtn).get().then(function (snapshot) {

        if (snapshot.data()) {
            var datArr = snapshot.data()["answers"]
            for (i in datArr) {
                arr3.push(datArr[i].optNo);
            }
        }
        var arr = []
        Que.get().then(function (doc) {
            for (i in doc.docs)
                arr.push(doc.docs[i].data())

            res.render("demo", {
                data: arr,
                no: req.body.demobtn,
                rollNo: req.body.rollNo,
                answered1: arr3
            })

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