const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

var admin = require("firebase-admin");

var serviceAccount = require("./firstr.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quiz1-c4888.firebaseio.com"
});

const db = admin.firestore();
const docRef = db.collection("Students");
const Que = db.collection("Questions");
const Score = db.collection("Scores")


var correct = 0;
var incorrect = 0;

var ans = [];

var arr3 = [];

var name = '';
var email = '';
var result1 = [];



app.get("/", function (req, res) {
    res.render("home")
})

app.get("/maker1179", function (req, res) {
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


app.post("/login", function (req, res) {
    name = req.body.name;
    email = req.body.email;


    docRef.get().then(function (snapshot) {
        const d1 = snapshot.docs
        var flg = 0;
        for (i in d1) {
            if (d1[i].data().Email == email) {
                flg = 1
                var ee = {
                    ...d1[i].data(),
                    Attempt: d1[i].data().Attempt + 1
                }
                docRef.doc(email).set(ee)
            }
        }

        if (flg == 0) {
            docRef.doc(req.body.email).set({
                Name: name,
                Email: email,
                Attempt: 1
            })
        }

        arr3 = []
        Que.get().then(function (doc) {
            for (i in doc.docs)
                arr3.push(doc.docs[i].data())
            res.redirect("/part1")
        })

    })

})

app.get("/part1", function (req, res) {
    res.render("demo", {
        data: arr3,
        rollNo: name
    })
})

app.post("/submit", function (req, res) {

    var arr = req.body.submit.split(",")
    arr.sort();
    ans = [];
    correct = 0;
    incorrect = 0;
    Que.get().then(function (snapshot) {
        const d = snapshot.docs
        for (i in d) {
            const id = d[i].data().id
            var temp = {
                id: d[i].data().id,
                title: d[i].data().title,
                check: [],
                corr: []
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
                if (opt[j].bool) {
                    var temp3 = {
                        optNo: j,
                        optCont: opt[j].cont,
                        optBool: opt[j].bool
                    }

                    temp.corr.push(temp3)
                }

            }
            ans.push(temp);
        }


        var t = new Date()
        var key = t.getDate() + "." + t.getMonth() + "." + t.getFullYear() + "." + t.getHours() + "." + t.getMinutes();

        Score.get().then(function (snapshot) {
            const dd = snapshot.docs
            var flg = 0
            for (i in dd) {
                if (dd[i].data().Email == email) {
                    flg = 1;
                }
            }
            if (flg == 0) {
                Score.doc(email).set({
                    Name: name,
                    Email: email,
                    Ans: ans,
                    right: correct + "",
                    wrong: incorrect + "",
                    Time: key.toString()
                })

            }
            res.redirect("/disp");
        })

    })
})


app.get("/disp", function (req, res) {


    res.render("display", {

        data: ans,
        rollNo: name,
        stat: {
            right: correct,
            wrong: incorrect
        }
    })
})



app.get("/result", function (req, res) {


    Score.get().then(function (snapshot) {
        const d = snapshot.docs
        result1 = []

        for (i in d) {
            var stu = {
                name: "",
                email: "",
                time: "",
                right: 0,
                wrong: 0
            }
            stu.email = d[i].data().Email
            stu.name = d[i].data().Name
            stu.time = d[i].data().Time
            stu.right = d[i].data().right
            stu.wrong = d[i].data().wrong

            result1.push(stu)
        }

        result1.sort(function (a, b) {
            if ((a.right - a.wrong) > (b.right - b.wrong))
                return -1;
            else if ((a.right - a.wrong) < (b.right - b.wrong))
                return 1;
            else
                return 0;
        });
        // console.log(result1);
        res.render("Result", {
            data: result1
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