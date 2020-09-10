var curr = "1"
var a = 0,
    sec = 0,
    min = 0;

$(".forward")[0].addEventListener("click", function () {
    var temp = curr
    Array.from($(".question")).forEach(element => {

        if (element.id === (parseInt(curr) + 1).toString()) {

            element.style.display = "block";
            temp = element.id
            $("#" + temp).removeClass("btn-primary");
            $("#" + temp).removeClass("btn-warning");
            $("#" + temp).addClass("btn-success");
        } else
            element.style.display = "none";
    })
    curr = temp
})
$(".backward")[0].addEventListener("click", function () {
    if (parseInt(curr) > 1) {
        Array.from($(".question")).forEach(element => {

            if (element.id === (parseInt(curr) - 1).toString()) {

                element.style.display = "block";
                curr = element.id
                $("#" + curr).removeClass("btn-primary");
                $("#" + curr).removeClass("btn-warning");
                $("#" + curr).addClass("btn-success");
            } else
                element.style.display = "none";
        })
    }
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
    clearInterval(kill)
})

$("#review")[0].addEventListener("click", function () {
    Array.from($(".Any")).forEach(element => {
        if (element.id == curr) {
            element.classList.remove("btn-success")
            element.classList.add("btn-warning")
        }
    })
})
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