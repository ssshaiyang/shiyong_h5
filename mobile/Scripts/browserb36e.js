var u = navigator.userAgent;
var browser = {
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    weiXin: u.match(/MicroMessenger/i) == "MicroMessenger",
    app: $.cookie("isOpenInApp") != null,
    download: function () {
        if (browser.app) {
            location.href = "/UserAccount";
        } else {
            if (browser.weiXin) {
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.example.meilipa";
            } else if (browser.ios) {
                location.href = "https://itunes.apple.com/cn/app/qq/id1291213125";
            } else {
                location.href = "http://mobile/update/meilipa.apk";
            }
        }
    }
};
