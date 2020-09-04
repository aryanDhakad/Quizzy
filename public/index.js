document.querySelector(".forward").addEventListener("click", function () {

    var arr = document.querySelectorAll("input[type=checkbox]:checked")
    var ans = []
    arr.forEach(element => {
        ans.push(element.value);
    })
    document.querySelectorAll(".qtitle").forEach(ele => {
        ele.value = document.getElementById("heading").innerHTML;
    })
    document.querySelectorAll(".answered").forEach(ele => {
        ele.value = ans
    })


    document.nav1.submit()
})
document.querySelector(".backward").addEventListener("click", function () {

    var arr = document.querySelectorAll("input[type=checkbox]:checked")
    var ans = []
    arr.forEach(element => {
        ans.push(element.value);
    })
    document.querySelectorAll(".qtitle").forEach(ele => {
        ele.value = document.getElementById("heading").innerHTML;
    })
    document.querySelectorAll(".answered").forEach(ele => {
        ele.value = ans
    })
    document.nav2.submit()
})

document.querySelectorAll(".Any").forEach(element => {
    element.addEventListener("click", function () {
        var arr = document.querySelectorAll("input[type=checkbox]:checked")
        var ans = []
        arr.forEach(element => {
            ans.push(element.value);
        })
        document.querySelectorAll(".qtitle").forEach(ele => {
            ele.value = document.getElementById("heading").innerHTML;
        })
        document.querySelectorAll(".answered").forEach(ele => {
            ele.value = ans
        })
        document.forms[this.innerHTML].submit()
    })
})