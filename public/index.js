var curr = "1"
const mxLength = $("#mxLength").val()


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
        ans1.add(element.id.split(".")[0])
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

// DARK MODE

function darkmode() {
    // Array.from($(".ans-area"))[0].classList.toggle("grey1")
    $("body").toggleClass("dark1")
    Array.from($(".nav")).forEach(element => {

        element.classList.toggle("dark1")
    })
    Array.from($(".Any")).forEach(element => {

        element.classList.toggle("dark1")
    })
    Array.from($(".options")).forEach(element => {

        element.classList.toggle("dark1")
    })
    Array.from($(".options1")).forEach(element => {

        element.classList.toggle("dark1")
    })
    $("#modalBtn").toggleClass("grey1")
    $("#markForReview").toggleClass("dark1")

    $(".ans-area").toggleClass("grey1")
    $("#darkModeBtn").toggleClass("grey1")
    Array.from($(".cust1")).forEach(element => {

        element.classList.toggle("bg-dark")
    })
    Array.from($(".heading-font")).forEach(element => {
        element.classList.toggle("text-white")
        element.classList.toggle("dark1")
    })

}