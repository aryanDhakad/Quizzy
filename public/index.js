var curr = "1"

document.querySelector(".forward").addEventListener("click", function () {
    var temp = curr
    document.querySelectorAll(".question").forEach(element => {

        if (element.id === (parseInt(curr) + 1).toString()) {

            element.style.display = "block";
            temp = element.id
            document.getElementById(temp).classList.remove("btn-primary");
            document.getElementById(temp).classList.remove("btn-warning");
            document.getElementById(temp).classList.add("btn-success");
        } else
            element.style.display = "none";
    })
    curr = temp
})
document.querySelector(".backward").addEventListener("click", function () {
    if (parseInt(curr) > 1) {
        document.querySelectorAll(".question").forEach(element => {

            if (element.id === (parseInt(curr) - 1).toString()) {

                element.style.display = "block";
                curr = element.id
                document.getElementById(curr).classList.remove("btn-primary");
                document.getElementById(curr).classList.remove("btn-warning");
                document.getElementById(curr).classList.add("btn-success");
            } else
                element.style.display = "none";


        })
    }
})

document.querySelectorAll(".Any").forEach(element => {
    element.addEventListener("click", function () {
        document.querySelectorAll(".question").forEach(element => {

            if (element.id === this.id) {

                element.style.display = "block";
                curr = this.id
                document.getElementById(curr).classList.remove("btn-primary");
                document.getElementById(curr).classList.remove("btn-warning");
                document.getElementById(curr).classList.add("btn-success");
            } else
                element.style.display = "none";
        })
    })
})
document.getElementById("check").addEventListener("click", function () {

    var arr = document.querySelectorAll("input[type=checkbox]:checked")
    var ans = []
    var ans1 = new Set()
    arr.forEach(element => {
        ans.push(element.id)
        ans1.add(element.id.substring(0, 1))
    })
    var set1 = Array.from(ans1);
    document.getElementById("submit").value = ans;

    var st = ""
    for (i in set1) {
        st += set1[i];
        st += " , "
    }
    document.getElementById("modalContent").innerHTML = st;

})

document.getElementById("review").addEventListener("click", function () {
    document.querySelectorAll(".Any").forEach(element => {
        if (element.id == curr) {
            element.classList.remove("btn-success")
            element.classList.add("btn-warning")
        }
    })
})