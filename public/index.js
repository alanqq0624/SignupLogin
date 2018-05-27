$(document).ready(function () {
    $("#login").click(function (event) {
        console.log("go to login");
        document.location.href = "./login.html";
    })
    $("#signup").click(function (event) {
        console.log("go to sign up");
        document.location.href = "./signup.html";
    })
})