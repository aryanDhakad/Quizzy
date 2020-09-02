console.log("Hello its me");
$("#MakerBtn")[0].addEventListener("click", function () {

    var arr = []
    var arr1 = document.querySelectorAll("input[type=checkbox]:checked")
    arr1.forEach(element => {
        arr.push(element.id)
    })

    document.querySelector("#Bool").value = arr

})