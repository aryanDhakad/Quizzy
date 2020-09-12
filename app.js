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

app.get("/", function (req, res) {
    res.render("home")
})


app.post("/register", function (req, res) {
    const rollNo = req.body.St.substring(0, 3).toUpperCase() + req.body.St.slice(3)

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
    const rollNo = req.body.rollNo.substring(0, 3).toUpperCase() + req.body.rollNo.slice(3)
    var arr = []
    var arr1 = []
    docRef.doc(rollNo).get().then(function (snapshot) {

        const hash = snapshot.data().Password
        bcrypt.compare(req.body.password, hash, function (err, result) {
            if (result) {
                Que.get().then(function (doc) {
                    for (i in doc.docs)
                        arr.push(doc.docs[i].data())
                    Int.get().then(function (doc1) {
                        for (i in doc.docs)
                            arr1.push(doc.docs[i].data())
                    })

                    res.render("demo", {
                        data: arr,
                        data1: arr1,
                        rollNo: rollNo
                    })

                })
            } else {
                res.render("home")
            }
        })
    })
})
app.post("/question1", function (req, res) {
    const rollNo = req.body.rollNo.substring(0, 3).toUpperCase() + req.body.rollNo.slice(3)
    var arr = []

    docRef.doc(rollNo).get().then(function (snapshot) {

        const hash = snapshot.data().Password
        bcrypt.compare(req.body.password, hash, function (err, result) {
            if (result) {
                Int.get().then(function (doc) {
                    for (i in doc.docs)
                        arr.push(doc.docs[i].data())

                    res.render("demo1", {
                        data: arr,
                        rollNo: rollNo
                    })
                })
            } else {
                res.render("home")
            }
        })
    })
})
app.post("/submit", function (req, res) {
    var correct = 0;
    var incorrect = 0
    var arr = req.body.submit.split(",")
    arr.sort();
    var ans = []
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
        docRef.doc(req.body.rollNo).collection("Answer").add({
            Data: ans
        })
        res.render("display", {
            data: ans,
            rollNo: req.body.rollNo,
            stat: {
                right: correct,
                wrong: incorrect
            }
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