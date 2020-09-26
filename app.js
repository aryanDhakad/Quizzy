const express = require("express");
const ejs = require("ejs");
const app = express();
const bcrypt = require("bcrypt");
const saltRound = 2;
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
const Int = db.collection("Intergers")

var correct = 0;
var incorrect = 0;
var correct1 = 0;
var incorrect1 = 0;
var ans = [];
var ans1 = [];
var arr3 = [];
var arr1 = [];
var rollNo = 0;

var time = [13, 10];

app.get("/", function (req, res) {
    res.render("home")
})


app.post("/register", function (req, res) {
    rollNo = req.body.St.substring(0, 3).toUpperCase() + req.body.St.slice(3)

    bcrypt.hash(req.body.password, saltRound, function (err, hash) {
        {
            docRef.doc(rollNo).set({
                Name: req.body.name1,
                Password: hash
            })
        }
    })

    res.render("home")


});

app.get("/maker", function (req, res) {
    res.render("Maker")
})
app.post("/maker1", function (req, res) {
    var arr = req.body.Bool.split(",")

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

app.post("/maker2", function (req, res) {
    var i = {
        id: req.body.no,
        title: req.body.title,
        opt: req.body.A
    }
    Int.doc(i.id).set(i)
    res.render("Maker")
})

app.post("/question", function (req, res) {
    rollNo = req.body.rollNo.substring(0, 3).toUpperCase() + req.body.rollNo.slice(3)
    arr3 = []
    var d = new Date();

    if (d.getHours() >= time[0] && d.getMinutes() >= time[1]) {
        docRef.doc(rollNo).get().then(function (snapshot) {

            const hash = snapshot.data().Password
            bcrypt.compare(req.body.password, hash, function (err, result) {
                if (result) {
                    Que.get().then(function (doc) {
                        for (i in doc.docs)
                            arr3.push(doc.docs[i].data())

                        res.redirect("/part1")


                    })
                } else {
                    res.render("home")
                }
            })
        })
    } else {

        res.render("home")
    }

})
app.get("/part1", function (req, res) {
    res.render("demo", {
        time: time,
        data: arr3,
        rollNo: rollNo
    })
})

app.post("/submit", function (req, res) {

    var arr = req.body.submit.split(",")
    arr.sort();

    Que.get().then(function (snapshot) {
        const d = snapshot.docs
        for (i in d) {
            const id = d[i].data().id
            var temp = {
                id: d[i].data().id,
                title: d[i].data().title,
                check: []
            }
            const opt = d[i].data().options
            for (j in opt) {
                const item = id + "." + j
                if (arr.includes(item)) {
                    var temp2 = {
                        optNo: j,
                        optCont: opt[j].cont,
                        optBool: opt[j].bool
                    }
                    if (temp2.optBool) {
                        correct += 1;
                    } else {
                        incorrect += 1;
                    }
                    temp.check.push(temp2)
                }

            }
            ans.push(temp);
        }

        arr1 = [];
        Int.get().then(function (doc) {
            for (i in doc.docs)
                arr1.push(doc.docs[i].data())
            res.redirect("/part2")

        })
    })
})

app.get("/part2", function (req, res) {
    res.render("demo1", {
        time: time,
        data: arr1,
        rollNo: rollNo
    })
})


app.post("/submitF", function (req, res) {

    var arr3 = req.body.submit.split(",")

    Int.get().then(function (snapshot) {
        const d = snapshot.docs
        for (i in d) {

            const id = d[i].data().id
            var temp = {
                id: d[i].data().id,
                title: d[i].data().title,
                check: []
            }
            for (i in arr3) {
                const answer = arr3[i].split(".")[1]
                const id = arr3[i].split(".")[0]
                if (id == temp.id) {
                    if (answer == d[i].data().opt) {
                        temp.check = {
                            optBool: true,
                            ans1: answer,
                            ans2: answer

                        }
                        correct1 += 1;
                    } else {
                        temp.check = {
                            optBool: false,
                            ans1: answer,
                            ans2: d[i].data().opt
                        }
                        incorrect1 += 1;
                    }
                }
            }
            ans1.push(temp)
        }


        docRef.doc(rollNo).collection("Answer").doc("1").set({
            Data: ans,
            Data1: ans1
        })
        res.redirect("/disp");

    })
})
app.get("/disp", function (req, res) {


    res.render("display", {
        time: [-1, -1],
        data: ans,
        rollNo: rollNo,
        stat: {
            right: correct,
            wrong: incorrect
        }
    })
})

app.get("/disp1", function (req, res) {

    res.render("display1", {
        time: [-1, -1],
        data: ans1,
        rollNo: rollNo,
        stat: {
            right: correct1,
            wrong: incorrect1
        }
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("The server is running successfully");
})