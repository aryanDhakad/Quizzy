var curr = "1"
const mxLength = $("#mxLength").val()

var a = 0,
    sec = 0,
    min = 0;



Array.from($(".nav")).forEach(id => {
    id.addEventListener("click", function () {
        var temp = (parseInt(curr) + parseInt(id.value)).toString()
        if (parseInt(temp) < parseInt(mxLength) + 1 && parseInt(temp) > 0) {
            Array.from($(".question")).forEach(element => {

                if (element.id === temp) {

                    element.style.display = "block";

                    $("#" + temp).removeClass("btn-primary");
                    $("#" + temp).removeClass("btn-warning");
                    $("#" + temp).addClass("btn-success");
                } else
                    element.style.display = "none";
            })
        }
        if (parseInt(temp) < 1)
            temp = "1";
        else if (parseInt(temp) > parseInt(mxLength))
            temp = mxLength;
        else
            temp = temp;
        curr = temp
    })
})

$("#review")[0].addEventListener("click", function () {
    Array.from($(".Any")).forEach(element => {
        if (element.id == curr) {
            element.classList.remove("btn-success")
            element.classList.add("btn-warning")
        }
    })
})

Array.from($(".Any")).forEach(element => {
    element.addEventListener("click", function () {
        Array.from($(".question")).forEach(element => {

            if (element.id === this.id) {

                element.style.display = "block";
                curr = this.id

                $("#" + curr).removeClass("btn-primary");
                $("#" + curr).removeClass("btn-warning");
                $("#" + curr).addClass("btn-success");
            } else
                element.style.display = "none";
        })
    })
})

$("#check")[0].addEventListener("click", function () {

    var arr = Array.from($("input[type=checkbox]:checked"))
    var ans = []
    var ans1 = new Set()
    arr.forEach(element => {
        ans.push(element.id)
        ans1.add(element.id.substring(0, 1))
    })
    var set1 = Array.from(ans1);
    $("#submit")[0].value = ans;

    var st = ""
    for (i in set1) {
        st += set1[i];
        st += " , "
    }
    $("#modalContent")[0].innerHTML = st;

})

function doit() {
    var arr2 = Array.from($("input[type=text]"))
    var arr2Ans = []
    arr2.forEach(ele => {
        if (ele.value !== "")
            arr2Ans.push(ele.id + "." + ele.value)
        else
            arr2Ans.push(ele.id + ".NaN")
    })
    $("#submit")[0].value = arr2Ans;

    var st = ""
    for (i in arr2Ans) {
        if (arr2Ans[i].split(".")[1] !== "NaN") {
            st += arr2Ans[i].split(".")[0];
            st += " , "
        }
    }

    $("#modalContent")[0].innerHTML = st;
    clearInterval(kill)

}


window.addEventListener("load", function () {

    kill = setInterval(timer, 100);
})


function timer() {
    a += 100;
    if (a === 1000) {
        sec += 1;
        a = 0
    }
    if (sec === 60) {
        min += 1;
        sec = 0
    }
    m = (min > 10) ? (10 - min).toString() + " : " : (10 - min).toString() + " : "
    s = (sec > 10) ? (60 - sec).toString() : (60 - sec).toString()
    $("#watch")[0].innerHTML = m + s;

}