function OpenWindow(url, height, width) {
    $.fancybox.open({
        modal: true,
        autoSize: false,
        height: height,
        width: width,
        type: 'iframe',
        closeBtn: false,
        href: url,
        iframe: { scrolling: 'no' },
        padding: 0,
        minHeight: 0
    });
}

function CloseWindow() {
    window.parent.$.fancybox.close();
}

var LingLa = (function () {

    function lingla() { //全局函数构造函数在该函数里面添加对常用函数的扩展
        //给window添加replaceAll
        //例如str.replaceAll("从","");
        String.prototype.replaceAll = function(s1, s2) {
            return this.replace(new RegExp(s1, "gm"), s2);
        };
        //给日期格式支持format
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        Date.prototype.Format = function(fmt) { //author: zouqj 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        var self = this;
    }
    //获取URl链接里面的参数使用方法getUrlParam("name")
    lingla.prototype.getUrlParam = function(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    };
    lingla.prototype.isWeixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
    };
    lingla.prototype.confirm = function(para) {
        var self = this;
    };
    return lingla; //全局函数需new一次
}());

var globle = new LingLa();


function clickNumber(id) {
    $.post("/CommonBase/AddAdvClickCount", { id: id });
}