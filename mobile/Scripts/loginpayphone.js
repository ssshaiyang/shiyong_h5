var _ctr, _m, _send;
function bindCaptcha(ctr, mobile) {
    _ctr = ctr;
    _send = function () {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        var m = $(mobile).val().trim();
        _m = m;
        if (m == null || m == "")
            m = $(mobile).text().trim();
        if (reg.test(m)) {
            showverdialog();
        } else {
            myAlert("手机号不正确");
        }
    };
    $(ctr).bind("click", function () { _send(); });
}

function showverdialog() {
    var html = '<div class="captcha" style="text-align: center">' +
                            '<p>是否确定发送验证码</p>'+
                            '<div style="margin-top:1rem">' +
                                '<span class="redbtn" onclick="afterVerification();">' +
                                    '确定' +
                                '</span>' +
                                '<span class="graybtn" style="margin-left: 20px" onclick="layer.closeAll();">' +
                                    '取消' +
                                '</span>' +
                            '</div>' +
                        '</div>';
    layer.open({
        type: 1,
        content: html,
        style: "font-family:Microsoft Yahei;width: 80%;padding:20px;border-radius: 10px;",
        shadeClose: false,
    });
    $("#captcha_img").attr("src", '/CommonBase/GetCaptchaImg?' + Math.random())
}
var capTimer = null;
var capNum = 0;
function afterVerification() {
    console.log(1)
    if (capNum != 0) {
        return false;
    }
    layer.closeAll();
    console.log(_m);
    $(_ctr).unbind("click");

    $.post("http://api.feizhugou.com/code", { phone: _m, source: 0}, function (data) {
        if (!data.code) {
            $(_ctr).bind("click", function () { _send(); });
        } else {
            capNum = 120;
            capTimer = setInterval(function () {
                capNum--;
                if (capNum == 0) {
                    $(_ctr).val("重新发送");
                    $(_ctr).bind("click", function () { _send(); });
                    clearInterval(capTimer);
                } else {
                    $(_ctr).val(capNum + "秒后可重发");
                }
            }, 1000);
        }
    });
}