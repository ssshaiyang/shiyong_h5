$(function () {
    var lingaSort = {};
    lingaSort.page = 1;
    getList(lingaSort.page);

    var vm = new Vue({
        // 选项
        el: '#list',
        data: {
            list: []
        }
    });

    var listFlag = false;
    var $window = $(window);
    var $document = $(document);
    //下滑加载
    $window.scroll(function () {
        //if (indexSW == 1) {
        //    return false;
        //}
        if ($document.scrollTop() + $window.height() >= $document.height()) {
            if (listFlag) {
                layer.open({
                    content: '加载中'
                  , skin: 'msg'
                  , time: 2
                });
                return false;
            }
            listFlag = true;
            getList(lingaSort.page);
        }
    });
    function getList(page) {
        lingaSort.page = page || 1;
        $.ajax({
            type: 'post',
            url: '/Help/GetReportList',
            data: { page: lingaSort.page },
            dataType: 'json',
            success: function (data) {
                listFlag = false;
                if (data.Data.length == 0) {
                    layer.open({
                        content: '没有更多官方公告了'
                          , skin: 'msg'
                          , time: 2
                    });
                    return false;
                }
                for (var i = 0; i < data.Data.length; i++) {
                    if (data.Data[i].sk_url != "" && data.Data[i].sk_url != null && data.Data[i].sk_url != "null") {
                        data.Data[i].sk_url = "location.href = '" + data.Data[i].sk_url + "'";
                    } else {
                        data.Data[i].sk_url = "location.href = '/help/reportinfo?id=" + data.Data[i].sk_id + "'";
                    }
                    data.Data[i].sk_add_date = getNowFormatDate(data.Data[i].sk_add_date);
                    vm.$data.list.push(data.Data[i]);
                }
                lingaSort.page++;
            },
            error: function () {
                listFlag = false;
            }
        });
    }
    function getNowFormatDate(date) {
        var dt = date.replace('/Date(', '').replace(')/', '');
        var date = new Date(parseInt(dt));
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + ":" + date.getMinutes();
        return currentdate;
    }
});


