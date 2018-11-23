function myAlert(html, callback) {
    layer.open({
        content: html
         , btn: '确定',
         yes: function (index) {
             layer.close(index);
             if (callback) {
                 callback();
             }
         }
    });
}

function myShowMsg(html) {
    layer.open({
        content: html
        , skin: 'msg'
        , time: 2
    });
}

function myConfirm(message, callback,callback1) {
    layer.open({
        content: message,
        btn: ['确认', '取消'],
        shadeClose: false,
        yes: function (index) {
            if (callback) {
                callback();
            }
            layer.close(index);
        },
        no: function (index) {
            if (callback1) {
                callback1();
            }
            layer.close(index);
        }
    });
}
function myConfirmDefinedText(message, leftText, rightText, callback, callback1) {
    layer.open({
        content: message,
        btn: [leftText, rightText],
        shadeClose: false,
        yes: function (index) {
            layer.close(index);
            if (callback) {
                callback();
            }
        },
        no: function (index) {
            layer.close(index);
            if (callback1) {
                callback1();
            }
        }
    });
}
function checkLogin(callback) {
    if (userId == 0) {
        location.href = '/UserAccount/Login?url=' + location.href;
    } else {
        if (callback) {
            callback();
        }
    }
}

function openDialog(id, callback) {
    var html = $(id).html();
    layer.open({
        type: 1,
        content: html,
        anim: 'up',
        style: "position:fixed; bottom:0; left:0;width:100%;box-sizing:border-box; font-family:Microsoft Yahei;padding:0.4rem;",
        shadeClose: true,
        end: callback
    });
}

function alertDownApp() {
    myAlert("<div><a href='/Other/AppDownload' style='display: block; width: 100%; height: 100%;overflow: hidden; color: #fff;'>安装飞猪购APP才能分享，立即下载</a><div>");
}