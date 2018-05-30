//check if user is login
function check() {
    event.preventDefault(); //取消reload
    $.ajax({
        method: "post",
        url: "./index_redirect",
        success: function (receive) {
            return receive;
        }
    })
}

$(document).ready(function () {
    $("#login").click(function (event) {
        if (check()) {
            alert("You had already login");
        } else {
            console.log("go to login");
            document.location.href = "./login.html";
        }

    })
    $("#signup").click(function (event) {
        if (check()) {
            alert("You had already login");
        } else {
            console.log("go to sign up");
            document.location.href = "./signup.html";
        }
    })
})