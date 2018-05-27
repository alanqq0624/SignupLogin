$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault(); //取消reload
        $.ajax({
            method: "post",
            url: "./signup",
            data: {
                accountid: $("#signup input[id=accountid]").val(),
                password: md5($("#signup input[id=password]").val()),
                email: $("#signup input[id=email]").val(),
            },
            success: function (receive) {
                $("#status").text(receive);
            }
        })
    })
})