(function($) {
    $.fn.form = function (options) {
        this.each(function () {
            var el = this;
            $(el).ajaxForm({
                beforeSubmit: function(data) {
                    if (options.beforeSubmit != null) {
                        options.beforeSubmit(data);
                    }
                    $("#loading").css("display", "block");
                },
                success: function(data) {
                    if (options.success != null) {
                        options.success(data);
                    }
                    $("#loading").css("display", "none");
                }
            });
        });
    };
})(jQuery);
(function($) {
    var _post = $.post;
    $.post = function(url, data, callback) {
        $("#loading").css("display", "block");
        if ($.isFunction(data)) {
            _post(url, function(d) {
                $("#loading").css("display", "none");
                if (data) {
                    data(d);
                }
            });
        } else {
            _post(url, data, function(d) {
                $("#loading").css("display", "none");
                if (callback) {
                    callback(d);
                }
            });
        }

    };
})(jQuery);