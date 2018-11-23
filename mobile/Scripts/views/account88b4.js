$(function () {
    //渲染头像
    var selectImgHtml = "";
    for (var i = 1; i <= 16; i++) {
        selectImgHtml += '<li><img src="/Content/images/icon/' + i + '.png" alt="加载失败" /></li>';
    }
    $(".selectImg ul").html(selectImgHtml);
    //选择头像
    $('#imgPic').on("click", function () {
        $(".selectImg").slideDown(200);
    });

    //发送请求确认头像
    $(".selectImg ul img").on("click", function (e) {
        e.stopPropagation();
        $(".selectImg").slideUp(200);
        var imgURl = $(this).attr("src");
        $.post('/UserAccount/SaveLogo', { logo: imgURl }, function (d) {
            if (d.Result) {
                $('#imgPic').attr("src", imgURl);
            } else {
                myAlert("选择头像失败");
            }
        });
       
    });
    $(".selectImg").on("click", function() {
        $(this).slideUp(200);
    });

    setInterval('autoScroll();', 2000);
});

function autoScroll() {
    var h = $('.user-report').find("ul li:first").height();
    h = "-" + h + "px";
    $('.user-report').find("ul:first").animate({
        marginTop: h
    }, 500, function () {
        $(this).css({ marginTop: "0" }).find("li:first").appendTo(this);
    });
}

function signin() {
    if ($('#signbtn').hasClass("qdaocg"))
        return;
    checkLogin(function () {
        $.post('/CommonBase/SignIn', function (d) {
            if (d.Result == false) {
                myAlert(d.Message);
            } else {
                $(".sign-in").html("已签到");
                layer.open({
                    content: '签到成功！本次签到获取' + d.Data + '金币'
                    , btn: '我知道了'
                });
            }
        });
    });
}