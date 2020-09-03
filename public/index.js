document.querySelector(".forward").addEventListener("click", function () {
    console.log("forward");
    var arr = document.querySelectorAll("input[type=checkbox]:checked")
    var ans = []
    arr.forEach(element => {
        ans.push(element.value);
    })
    document.getElementById("qtitleF").value = document.getElementById("heading").innerHTML;
    document.getElementById("answeredF").value = ans
    document.nav1.submit()
})
document.querySelector(".backward").addEventListener("click", function () {
    var arr = document.querySelectorAll("input[type=checkbox]:checked")
    var ans = []
    arr.forEach(element => {
        ans.push(element.value);
    })
    document.getElementById("qtitleB").value = document.getElementById("heading").innerHTML;
    document.getElementById("answeredB").value = ans
    document.nav2.submit()
})
document.querySelectorAll(".Any").forEach(element => {
    element.addEventListener("click", function () {
        var arr = document.querySelectorAll("input[type=checkbox]:checked")
        var ans = []
        arr.forEach(element => {
            ans.push(element.value);
        })

        document.getElementById("qtitle" + this.innerHTML).value = document.getElementById("heading").innerHTML;
        document.getElementById("answered" + this.innerHTML).value = ans

        console.log(document.forms[this.innerHTML]);
        document.forms[this.innerHTML].submit()
    })
})