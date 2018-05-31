//Save Current Status like is isLogin and accountID which user login
var CurrentStatus;
//check if user is login
var check = new Promise(function (resolve, reject) {
    $.ajax({
        method: "post",
        url: "./index_redirect",
        success: function (receive) {
            CurrentStatus = receive;
            console.log("isLogin: " + receive.isLogin);
            return resolve(receive.isLogin);
        }
    })
});


check.then(function (isLogin) {
    if (isLogin) {
        $("#login").hide();
        $("#signup").hide();
        $("#logout").show();
        $("#status").text("Welcome " + CurrentStatus.accountid);
    }
})
$(document).ready(function () {
    $("#login").click(function (event) {
        event.preventDefault(); //取消reload
        console.log("go to login");
        document.location.href = "./login.html";
    })
    $("#signup").click(function (event) {
        event.preventDefault(); //取消reload
        console.log("go to sign up");
        document.location.href = "./signup.html";
    })
    $("#logout").click(function (event) {
        event.preventDefault(); //取消reload
        console.log("Log out");
        $.ajax({
            method: "post",
            url: "./logout",
            success: function (receive) {
                $("#login").show();
                $("#signup").show();
                $("#logout").hide();
                $("#status").text("Bye " + CurrentStatus.accountid);
                CurrentStatus = null;
            }
        })
    })
})