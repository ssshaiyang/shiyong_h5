var app = {
    share: function (text, url, icon) {
        if (browser.ios) {
            location.href = encodeURI('ios#share*' + text + '*' + url + '*' + icon);
        } else if (browser.android) {
            android.share(text, url, icon);
        }
    },
    share1: function (icon) {
        if (browser.ios) {
            location.href = encodeURI('ios#shareImgUrl*' + icon);
        } else if (browser.android) {
            android.share(icon);
        }
    },
    weixinlogin: function () {
        if (browser.ios) {
            location.href = encodeURI('ios#login');
        } else if (browser.android) {
            android.login();
        }
    },
    shareToTarget: function (title, content, url, icon, target) {
        if (browser.ios) {
            location.href = encodeURI('ios#shareToTarget*' + title + '*' + content + '*' + url + '*' + icon + "*" + target);
        } else if (browser.android) {
            android.shareToTarget(title, content, url, icon, target);
        }
    },
    openUrl: function (url) {
        if (browser.ios) {
            location.href = encodeURI('ios#openurl*' + url);
        } else if (browser.android) {
            android.openUrl(url);
        }
    }
}

function callback(name, uid, token,tkn,icon) {
    location.href = '/UserAccount/WeiXinCallback?openID=' + uid + '&nick=' + name + '&token=' + token + '&access_Token=' + tkn + '&icon=' + icon;
}
