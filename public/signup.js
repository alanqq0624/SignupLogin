$(document).ready(function () {
    $("#submit").click(function (event) {
        if (document.getElementById("signup").checkValidity()) {
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
        } else {
            $("#status").text("Account create fail: input can't be empty or email form valid");
        }
    })
})