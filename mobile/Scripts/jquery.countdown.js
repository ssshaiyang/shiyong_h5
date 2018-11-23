(function ($) {
    $.fn.countdown = function (options) {
        // default options
        var defaults = {
            nowTime: new Date().toString(),
            tmpl: '%{d}天%{h}时%{m}分%{s}秒%{f}毫秒',
            end: '已到期',
            afterEnd: null,
            change: null,
            secondDigit: false//秒后面显示一位小数
        };
        options = $.extend(defaults, options);
        function getDate(strDate) {
            return Date.parse(strDate.replace(/-/g, "/"));
        }
        // format time
        function format(diff) {
            var tmpl = options.tmpl, day, hour, minute, second, millisecond;
            day = Math.floor(diff / 1000 / 60 / 60 / 24);
            hour = Math.floor(diff / 1000 / 60 / 60 % 24);
            if (tmpl.indexOf('%{d}') < 0) {
                hour = day * 24 + hour;
            }
            minute = Math.floor(diff / 1000 / 60 % 60);
            if (options.secondDigit) {
                second = ((diff - day * 1000 * 60 * 60 * 24 - hour * 1000 * 60 * 60 - minute * 1000 * 60) / 1000).toFixed(1);//保留一位小数的秒
            } else {
                second = Math.floor(diff / 1000 % 60);//整数秒
            }
            millisecond = (diff - day * 1000 * 60 * 60 * 24 - hour * 1000 * 60 * 60 - minute * 1000 * 60 - second * 1000);
            tmpl = tmpl.replace(/%\{d\}/ig, day < 10 ? "0" + day : day)
				.replace(/%\{h\}/ig, hour < 10 ? "0" + hour : hour)
				.replace(/%\{m\}/ig, minute < 10 ? "0" + minute : minute)
                .replace(/%\{s\}/ig, second < 10 ? "0" + second : second)
                .replace(/%\{s\}/ig, millisecond < 10 ? "00" + millisecond : millisecond < 100 ? "0" + second : millisecond);
            return tmpl;
        }
        // main
        return this.each(function () {
            var el = this;
            if ($(el).attr('nowTime') != null) {
                options.nowTime = $(el).attr('nowTime');
            }
            if ($(el).attr('endTime') == null) {
                return;
            }
            var diff = getDate($(el).attr('endTime')) - getDate(options.nowTime);
            if (diff <= 0) {
                $(el).html(options.end);
                return;
            }
            function update() {
                if (diff <= 0) {
                    $(el).html(options.end);
                    if (options.afterEnd) {
                        options.afterEnd(el);
                    }
                    return;
                }
                $(el).html(format(diff));
                if (options.change != null) {
                    options.change(el);
                }
                var per = options.tmpl.indexOf('%{f}') >= 0 ? 81 : 1000;//刷新频率
                setTimeout(function () {
                    diff = diff - per;
                    update();
                }, per);
            }
            update();
        });
    };
})(jQuery);