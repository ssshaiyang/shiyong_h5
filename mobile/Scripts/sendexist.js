//通用发送验证码方法
var phonenum;
$.ajax({
        url:"http://api.feizhugou.com/users/getAccountSecurity",
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
            if(data.code == 1000){
                phonenum = data.data.phone;
            }else{
               
            }
        }
    })
var _ctr, _send;
function bindCaptcha(ctr) {
    _ctr = ctr;
    _send = function () { showverdialog(); };
    $(ctr).bind("click", function () { _send(); });
}

function showverdialog() {
    var html =  '<div class="captcha" style="text-align: center">' +
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
        style: "position:fixed; bottom:0; left:0;width:100%;box-sizing:border-box; font-family:Microsoft Yahei;padding:0.4rem;",
        anim: 'up',
        shadeClose: false,
    });
}

function afterVerification() {
    layer.closeAll();
    $(_ctr).unbind("click");
     $.post("http://api.feizhugou.com/code", { phone: phonenum, source: 0}, function (data) {
        if (!data.code) {
            $(_ctr).bind("click", function () { _send(); });
        } else {
            capNum = 120;
            capTimer = setInterval(function () {
                capNum--;
                if (capNum == 0) {
                    $(_ctr).text("重新发送");
                    $(_ctr).bind("click", function () { _send(); });
                    clearInterval(capTimer);
                } else {
                    $(_ctr).text(capNum + "秒后可重发");
                }
            }, 1000);
        }
    });
}

