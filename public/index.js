var curr = "1"

document.querySelector(".forward").addEventListener("click", function () {
    var temp = curr
    document.querySelectorAll(".question").forEach(element => {

        if (element.id === (parseInt(curr) + 1).toString()) {
            console.log(element.id);
            element.style.display = "block";
            temp = element.id
        } else
            element.style.display = "none";
    })
    curr = temp
})
document.querySelector(".backward").addEventListener("click", function () {

    document.querySelectorAll(".question").forEach(element => {

        if (element.id === (parseInt(curr) - 1).toString()) {
            console.log(element.id);
            element.style.display = "block";
            curr = element.id
        } else
            element.style.display = "none";
    })
})

document.querySelectorAll(".Any").forEach(element => {
    element.addEventListener("click", function () {
        document.querySelectorAll(".question").forEach(element => {

            if (element.id === this.id) {
                console.log(element.id);
                element.style.display = "block";
                curr = this.id
            } else
                element.style.display = "none";
        })
    })
})
document.getElementById("check").addEventListener("click", function () {

    var arr = document.querySelectorAll("input[type=checkbox]:checked")
    var ans = []
    arr.forEach(element => {
        ans.push(element.id)
    })
    document.getElementById("submit").value = ans


})