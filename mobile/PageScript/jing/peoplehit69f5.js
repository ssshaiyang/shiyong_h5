var scrolH = 0;
var current_id = 1;
$(function () {
    //主页swiper
    var mySwiper = new Swiper('#swiper', {
        autoplay: 5000,
        pagination: '.swiper-pagination',
    });

    //全局swiper
    var indexSW = 0;

    $(".info-cat span").on("click", function () {
        $(this).addClass("act").siblings().removeClass("act");
    });

    $(".flow-con span.btn").on("click", function () {
        $(".flow-con").slideUp();
    });

    //$(".show-flow").on("click", function () {
    //    $(".flow-con").fadeIn();
    //});

    //签到
    $(".jp-hd>span").on("click", function () {

    });
    //初始化数据
    var lingaSort = {};
    lingaSort.page = globle.getUrlParam("page") || 1;
    lingaSort.order = globle.getUrlParam("order") || sortY || 0;
    lingaSort.key = globle.getUrlParam("key") || "";
    lingaSort.type = globle.getUrlParam("type") || -1;
    getList(lingaSort.page, lingaSort.order, lingaSort.key, lingaSort.type);

    //搜索词搜索
    $(".jp-hd .icon-search").on("click", function () {
        var key = $(".jp-hd input").val();
        getList(lingaSort.page, lingaSort.order, key, lingaSort.type, 1, 1);
    });
    //order搜索
    $(".jp-con .con-cat li a").on("click", function () {
        var sort = 1;
        if ($(this).parent().hasClass("act") && $(this).find("i").hasClass("icon-sortD")) {
            $(this).find("i").addClass("icon-sortA").removeClass("icon-sortD");
            sort = 0;
        } else {
            $(this).find("i").addClass("icon-sortD").removeClass("icon-sortA");
        }
        $(".jp-con .con-cat li").removeClass("act");
        $(this).parent().addClass("act");
        var order = $(this).data("href");
        getList(lingaSort.page, order, lingaSort.key, lingaSort.type, sort, 1);
    });
    //type搜索
    $(".jp-cat li a").on("click", function () {
        $(".jp-cat li a").removeClass("act");
        $(this).addClass("act");
        var type = $(this).data("href");
        getList(lingaSort.page, lingaSort.order, lingaSort.key, type, 1, 1);
    });
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
        if (indexSW == 1) {
            return false;
        }
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
            getList(lingaSort.page, lingaSort.order, lingaSort.key, lingaSort.type);
        }
    });
    function getList(page, order, key, type, sort, clearFlag) {
        lingaSort.page = page || 1;
        lingaSort.order = order || 0;
        lingaSort.key = key || "";
        lingaSort.type = type || -1;
        clearFlag = clearFlag || 0;
        if (clearFlag) {
            window.scrollTo(0, 0);
            lingaSort.page = 1;
            vm.$data.list = [];
        }
        $.ajax({
            type: 'post',
            url: '/jing/GetShopissueList3',
            data: { page: lingaSort.page, order: lingaSort.order, key: lingaSort.key, type: lingaSort.type, sort: sort },
            dataType: 'json',
            success: function (data) {
                listFlag = false;
                if (data.Data.length == 0) {
                    layer.open({
                        content: '没有更多商品了'
                          , skin: 'msg'
                          , time: 2
                    });
                    return false;
                }
                for (var i = 0; i < data.Data.length; i++) {
                    data.Data[i].id = data.Data[i].sk_id;
                    data.Data[i].showG = parseInt(data.Data[i].sk_clinch_price) >= 100 ? true : false;
                    data.Data[i].sk_id = "/jing/Detail?id=" + data.Data[i].sk_id;
                    data.Data[i].sk_back_price = data.Data[i].sk_back_price - data.Data[i].sk_clinch_price > 0 ? true : false;
                    data.Data[i].sk_clinch_price = "¥" + (data.Data[i].sk_clinch_price - 0).toFixed(2);
                    if (data.Data[i].sk_is_original) {
                        data.Data[i].sk_logo_pic = data.Data[i].sk_logo_pic.split("|")[data.Data[i].sk_img_index == 0 ? 1 : 0];
                    }
                    else {
                        data.Data[i].sk_logo_pic = data.Data[i].sk_logo_pic.split("|")[0];
                    }
                    data.Data[i].sk_shop_type = ["iconfont icon-tb", "iconfont icon-tm", "iconfont icon-jd", "iconfont icon-tb"][data.Data[i].sk_shop_type];
                    data.Data[i].share_id = "/jing/share?invitationCode=" + userid + "&shopid=" + data.Data[i].id;
                    data.Data[i].sk_apply_count = data.Data[i].sk_apply_count;
                    data.Data[i].sk_activity_name = data.Data[i].sk_activity_name.replaceAll(" ", "");
                    data.Data[i].isNewUser = isNewUser == "True" ? false : true;
                    vm.$data.list.push(data.Data[i]);
                }
                lingaSort.page++;
                vm.$nextTick(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                    $(".tod").on("click", function () {
                        indexSW = 1;
                        scrolH = $document.scrollTop();
                        $(".jp-fixed-top,footer").fadeOut();
                        $(".info-foot").fadeIn();
                        getDetail($(this).data("id"));
                    });

                });

            },
            error: function () {
                listFlag = false;
            }
        });
    }

    //回退按钮
    $(".to-index").on("click", function () {
        toIndex();
    });
    $("img.lazy").lazyload({ effect: "fadeIn" });
    $(".alert-sort").on("click", function () {
        //底部对话框
        layer.open({
            content: '选择排序',
            btn: ['90%返利', "高价值"],
            skin: 'footer',
            yes: function (index) {
                layer.open({ content: '选择了90%返利' });
            },
            no: function (index) {
                layer.open({ content: '高价值' });
            }
        });
    });

    //签到
    $(".icon-sign").on("click", function () {
        signin();
    });
    $(".app-share-img .icon-Toright").on("click", function () {
        $(".app-share-img").fadeOut(200);
    });
    $(".app-share-img .icon-share").on("click", function () {
        var url = $(".app-share-img img").attr("src");
        app.share1(url);
    });

    var vmDetail = new Vue({
        // 选项
        el: '#detail',
        data: {
            activity_name: "",
            clinch_price: "",
            return_moeny: "",
            remaining_copies: "",
            apply_count: "",
            Cart: "",
            Collects: "",
            Prize: "",
            sk_shop_type: "",
            apply_sendgold: "",
            logo_pic1: "",
            logo_pic2: "",
            logo_pic3: "",
            logo_pic4: "",

            sk_commodity_source: false,
            sk_is_useTokio: false,
            sk_is_useCreditCard: false,
            sk_isvoucher: false,
            sk_nondelivery_area: '',
            send_gold:''
        }
    });
    var mySwiper1 = "";
    function getDetail(id) {
        current_id = id;
        $("#detail .get-more").data("id", id);
        $("#detail .get-more span").html("加载更多");
        $(".info-cat span").removeClass("act").eq(0).addClass("act");
        $(".info-list>div").removeClass("act").eq(0).addClass("act");
        getMoreFlag = true;
        $.post("/Jing/JinpDetail", { id: id }, function (data) {
            $("#index").addClass("showHidden");
            $("#detail").removeClass("showHidden");
            vmDetail.$data.activity_name = data.Data.activity_name;
            vmDetail.$data.clinch_price = data.Data.clinch_price;
            vmDetail.$data.return_moeny = data.Data.return_moeny + "元";
            vmDetail.$data.remaining_copies = data.Data.remaining_copies;
            vmDetail.$data.apply_sendgold = data.Data.apply_sendgold;
            vmDetail.$data.apply_count = data.Data.apply_count;
            vmDetail.$data.Cart = data.Data.Cart;
            var shoptype = data.Data.sk_commodity_source;
            vmDetail.$data.sk_shop_type = ["iconfont icon-tb", "iconfont icon-tm", "iconfont icon-jd", "iconfont icon-tb"][shoptype];
            vmDetail.$data.Collects = data.Data.Collects;
            vmDetail.$data.Prize = data.Data.Prize;

            vmDetail.$data.sk_is_useCreditCard = data.Data.sk_is_useCreditCard;         //信用卡
            var str = data.Data.sk_nondelivery_area || '';
            if (str) {
                vmDetail.$data.sk_nondelivery_area = str.substring(0., str.length - 1).replaceAll(',', '，') + '。';         //偏远地区
            }
            vmDetail.$data.sk_is_useTokio = data.Data.sk_is_useTokio;                   //花呗  白条
            vmDetail.$data.sk_isvoucher = data.Data.sk_isvoucher;                       //优惠券
            vmDetail.$data.sk_commodity_source = data.Data.sk_commodity_source;         //2表示京东
            vmDetail.$data.send_gold = data.Data.send_gold;         //2表示京东

            $(".get-invite").attr("href", "/jing/share?invitationCode=" + userid + "&shopid=" + id);
            if (data.Data.is_original) {
                vmDetail.$data.logo_pic1 = data.Data.logo_pic.split("|")[data.Data.img_index == 0 ? 1 : 0];
                vmDetail.$data.logo_pic2 = vmDetail.$data.logo_pic1;
                vmDetail.$data.logo_pic3 = vmDetail.$data.logo_pic1;
                vmDetail.$data.logo_pic4 = vmDetail.$data.logo_pic1;
            } else {
                vmDetail.$data.logo_pic1 = data.Data.logo_pic.split("|")[0];
                vmDetail.$data.logo_pic2 = data.Data.logo_pic.split("|")[1];
                vmDetail.$data.logo_pic3 = data.Data.logo_pic.split("|")[2];
                vmDetail.$data.logo_pic4 = data.Data.logo_pic.split("|")[3];
            }
            if (!mySwiper1) {
                mySwiper1 = new Swiper('#swiper2', {
                    autoplay: 5000,
                    pagination: '.swiper-pagination',
                });
            } else {
                mySwiper1.slideTo(0, 0, false);
            }

            if (data.Data.isSubmit) {
                $("#applyText").attr("href", '/JpinShopIssue/OrderFlow?activityId=' + id + "&free" + data.Data.free);
            } else {
                $("#applyText").attr("href", 'javascript:void(0)');
            }
            $("#applyText").html(data.Data.applyText);

            vmDetail.$nextTick(function () {
                $(".not-area").off("click");
                //点击弹出不发货
                $(".not-area").on("click", function () {
                    $(".flex-bg").fadeIn(300);
                    $("#flow2").css("display", "block");
                    $("#flow2").removeClass("fadeout");
                });
            });

        });
        $("#detail #list-apply1").html("");
        $("#detail #guss-like").hide();
        $("#get-more").hide()
        $.post("/Jing/GetShopDetail", { id: id }, function (data) {
            if (data.Data.is_original) {
                var money = data.Data.sk_clinch_price;
                var reMoney = data.Data.sk_isfreefee ? data.Data.sk_clinch_price + data.Data.sk_increment_fee : data.Data.sk_back_price;
                $("#detail .intro").html(getPaiB(money, reMoney));
                $("#detail #guss-like").show();
                $("#get-more").show()
                getMoreDetail();
            } else {
                $("#detail .intro").html(data.Data.tbhtml);
                $("#detail .intro img").lazyload({ effect: "fadeIn" });
            }
            window.scrollTo(0, 0);
        });

    }

    var getMoreFlag = true;
    var getMoreid = 0;
    //点击获取猜你喜欢
    $(".info-cat span").on("click", function () {
        $(this).addClass("act").siblings().removeClass("act");
        $(".info-list>div").eq($(this).index()).addClass("act").siblings().removeClass("act");
        if ($(this).index() == 1 && getMoreFlag) {
            if (getMoreid == $("#detail .get-more").data("id")) {
                return false;
            }
            getMoreDetail();
        }
    });
    //猜你喜欢
    function getMoreDetail() {
        getMoreid = $("#detail .get-more").data("id");
        $.post("/Jing/GetNextPage", function (data) {
            if ($("#detail #list-apply").is(":hidden")) {
                getMoreid = 0;
                $("#detail #list-apply1").html(data);
            } else {
                $("#detail #list-apply").html(data);
            }

            $("#detail  .tod").on("click", function () {
                getDetail($(this).data("id"));
            });
        });
    }
    
    //点击弹出流程
    $(".show-flow").on("click", function () {
        $(".flex-bg").fadeIn(300);
        $("#flow").fadeIn();
        $("#flow").css("display", "block");
        $("#flow").removeClass("fadeout");
    });

    //点击遮罩隐藏
    $(".flow-con .code-con").on("click", function () {
        $("#flow").addClass("fadeout");
        $("#flow2").addClass("fadeout");
        $(".flex-bg").fadeOut(300);
    });
    //$(".dona-bottom").on("click", function () {
    //    return false;
    //})
    //点击隐藏流程框
    $(".flow-con span.btn").on("click", function () {
        $("#flow").addClass("fadeout");
        $("#flow2").addClass("fadeout");
        $(".flex-bg").fadeOut(300);
    });

    //点击弹出不发货
    $(".not-area").on("click", function () {
        $(".flex-bg").fadeIn(300);
        $("#flow2").css("display", "block");
        $("#flow2").removeClass("fadeout");
    });
    window.toIndex = function toIndex() {
        $("#detail .intro").html("");
        $("#detail").addClass("showHidden");
        $("#index").removeClass("showHidden");
        $(".jp-fixed-top,footer").fadeIn();
        $(".info-foot").fadeOut();
        vmDetail.$data.sk_nondelivery_area = '';
        window.scrollTo(0, scrolH);
    }
});

//如果是拍A发B把商品详情的html改变
function getPaiB(money, reMoney) {
    var html = '<div class="tryout"><h3>试用流程：</h3><p>1、申请试用，获得试用资格。<br />' +
        '2、申请通过后，按照搜索流程提示，以 <em>' + money + ' 元去指定平台下单。<br />' +
        '3、下单完成后，回飞猪购填写购买付款的订单号。<br />' +
        ' 4、等待收货 → 确认收货 → 给予宝贝评价，并填写试用报告。<br />' +
        '5、报告通过 → 返还 <em>' + reMoney + '</em>' +
        '元到您的飞猪购账户中 → 试用完成。</p></div><div class="tryout"><h3>注意事项</h3><p>' +
        '1、禁止私自使用信用卡、花呗、淘金币、优惠券、红包、天猫积分等下单(飞猪购指定可使用除外)。<br />' +
        '2、禁止通过淘宝客、返利网、一淘等返现返利网链接下单。<br />' +
        '以上由于买家违规下单所产生的费用，由买家承担。飞猪购有权冻结其帐号，限制提现操作，IP列入黑名单。</p></div>' +
        '<div class="tryout"><h3>温馨提示：</h3><p>' +
        '1、若因未按时提交以上信息而被系统取消试用资格,<br />' +
        '将无法恢复资格，由此造成的损失需由买家承担。</p></div>';
    return html;
}

function signin() {
    checkLogin(function () {
        $.post('/CommonBase/SignIn', function (d) {
            if (d.Result == false) {
                myAlert(d.Message);
            } else {
                $(".icon-sign").addClass("icon-signSucc").removeClass("icon-sign");
                layer.open({
                    content: '签到成功！本次签到获取' + d.Data + '金币'
                    , btn: '我知道了'
                });
            }
        });
    });
}
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
