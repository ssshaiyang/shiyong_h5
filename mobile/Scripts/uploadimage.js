//通用上传图片方法
function bindUploadImage(div, callback, isMultiple, compressType, checkSize) {
    var file;
    var form = $('<form action="http://api.feizhugou.com/upload  method="post" nam enctype="multipart/form-data></form>');
    //if (window.attachEvent) {//判断是否是低版本IE
    //万恶的低版本IE如果绑定按钮click事件来触发file的click事件会提示拒绝访问，只能把file控件隐藏在按钮下面
    //    file = $('<input type="file" accept="image/*" id="file" name="file" style="position:absolute;cursor: pointer;left:0;top:0;width: 55px;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);opacity:0"/>');
    //    file.css({ "width": $(div).width(), "height": $(div).height() });
    //    $(div).css("position", 'relative');
    //    $(div).append(form);
    //} else {
    file = $('<input type="file" accept="image/*;" name="file" style="display:none"/>');
    $(div).bind('click', function () {file.click();});
    $('body').append(form);
    //}
    $(form).append(file);
    file.bind('change', function () { form.submit(); });
    if (isMultiple) {
        file.attr("multiple", "multiple");
    }
    form.ajaxForm({
        beforeSubmit: function () {
            $("#loading").fadeIn();
            //if (!window.attachEvent) {
            var check = true;
            $.map(file.get(0).files, function (f) {
                var filepath = f.name;
                var extStart = filepath.lastIndexOf(".");
                var ext = filepath.substring(extStart, filepath.length).toUpperCase();
                if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
                    myAlert("图片限于bmp,png,gif,jpeg,jpg格式");
                    check = false;
                    $("#loading").fadeOut();
                    return;
                }
                if ((checkSize == null || checkSize == true) && f.size > 1024 * 1024*3) {
                    myAlert("图片大小不能超过3M");
                    $("#loading").fadeOut();
                    check = false;
                    return;
                }
            });
            return check;
            //}
            //return true;
        },
        success: function (data) {
            $("#loading").fadeOut();
            console.log(1);
            var d = eval('(' + data + ')');
            if (!d.Result) {
                myAlert(d.Message);
            } else if (callback != null) {
                for (var i = 0; i < d.Data.length; i++) {
                    if (d.Data[i] != null && d.Data[i] != "") {
                        callback(d.data);
                    }
                }
            }
        }
    });
}
