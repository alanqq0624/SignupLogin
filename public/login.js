$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault(); //取消reload
        $.ajax({
            method: "post",
            url: "./login_submit",
            data: {
                accountid: $("#login input[id=accountid]").val(),
                password: md5($("#login input[id=password]").val()),
            },
            //parameter is a JSON formate
            success: function (receive) {
                if (receive.result) {
                    $("#login").hide();
                    $("#status").text(receive.message);
                } else {
                    $("#status").text(receive.message);
                }
            }
        })
    })
})