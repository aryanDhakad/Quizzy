var curr = "1"
const mxLength = $("#mxLength").val()

const iMin = parseInt($("#time").val().split(",")[1])
const iHrs = parseInt($("#time").val().split(",")[0])

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

function doit() {
    Array.from($(".Any")).forEach(element => {
        if (element.id == curr) {
            element.classList.remove("btn-success")
            element.classList.add("btn-warning")
        }
    })
}

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

function doit1() {

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

}

function doit2() {
    var arr2 = Array.from($("input[type=text]"))
    var arr2Ans = []
    arr2.forEach(ele => {
        if (ele.value !== "")
            arr2Ans.push(ele.id + "." + ele.value)
    })
    $("#submit")[0].value = arr2Ans;

    var st = ""
    for (i in arr2Ans) {
        if (arr2Ans[i].split(".")[1] !== "") {
            st += arr2Ans[i].split(".")[0];
            st += " , "
        }
    }

    $("#modalContent")[0].innerHTML = st;
    clearInterval(kill)

}


window.addEventListener("load", function () {
    if (iHrs > -1)
        kill = setInterval(timer, 1000);
})


function timer() {

    var t = new Date();
    min = t.getMinutes();
    hrs = t.getHours();
    sec = t.getSeconds();
    if (hrs > iHrs)
        min += 60;

    m = (15 - (min - iMin)).toString() + " : ";
    s = (60 - sec).toString();
    if (parseInt(m) < 0) {
        alert("Tme up");
        clearInterval(kill);
        document.getElementById("modalBtn").click();
        document.getElementById("f1").click();
    }
    $("#watch")[0].innerHTML = m + s;

}