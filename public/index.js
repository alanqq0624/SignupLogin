//check if user is login
var CurrentStatus;
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
        $("#status").text("Welcome " + CurrentStatus.accountid);
    } else {
        $(document).ready(async function () {
            $("#login").click(function (event) {
                event.preventDefault(); //取消reload
                if (isLogin) {
                    alert("You had already login");
                } else {
                    console.log("go to login");
                    document.location.href = "./login.html";
                }
            })
            $("#signup").click(function (event) {
                event.preventDefault(); //取消reload
                if (isLogin) {
                    alert("You had already login");
                } else {
                    console.log("go to sign up");
                    document.location.href = "./signup.html";
                }
            })
        })
    }
})