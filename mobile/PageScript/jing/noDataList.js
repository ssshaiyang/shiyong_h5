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

    //金币兑换按钮
    function GoldAplly(id) {
        $.ajax({
            type: 'post',
            url: '/jing/CheckGoldQualification',
            data: { shopissueId: id },
            dataType: 'json',
            success: function (data) {
                if (data.Result) {
                    location.href = '/JpinShopIssue/OrderFlow?applyType=1&activityId=' + id;
                } else {
                    if (data.Data == 1) {
                        myConfirmDefinedText(data.Message, "兑换其他商品", "我要免费申请", function () {
                            location.href = "/jing/goldHit";
                        }, function () {
                            location.href = "/JpinShopIssue/OrderFlow?activityId=" + id;
                        });
                    }
                    if (data.Data == 2) {
                        myConfirmDefinedText(data.Message, "去看看其他活动", "我要免费申请", function () {
                            location.href = "/jing/goldHit";
                        }, function () {
                            location.href = "/JpinShopIssue/OrderFlow?activityId=" + id;
                        });
                    }
                    if (data.Data == 3) {
                        myConfirmDefinedText(data.Message, "我要免费申请", "成为VIP", function () {
                            location.href = "/JpinShopIssue/OrderFlow?activityId=' + id";
                        }, function () {
                            location.href = "/UserAccount/Vip";
                        });
                    }
                    if (data.Data == 6 || data.Data == 4) {
                        myAlert(data.Message, function () {
                            location.href = "/jing/goldHit";
                        });
                    }

                }

            }
        });
    }

    $(".flow-con span.btn").on("click", function () {
        $(".flow-con").slideUp();
    });

    $(".show-flow").on("click", function () {
        $(".flow-con").fadeIn();
    });
    //回退按钮
    $(".to-index").on("click", function () {
        toIndex();
    });
    
    $("img.lazy").lazyload({ effect: "fadeIn" });
    var $window = $(window);
    var $document = $(document);
    $(".tod").on("click", function () {
        indexSW = 1;
        scrolH = $document.scrollTop();
        $("#index").hide();
        $(".header").hide();
        $(".go-mj").attr("href", "/jing/share?invitationCode=" + userid + "&shopid=" + $(this).data("id"));
        $(".go-mj").show().find("img").attr("src", "/Content/images/icon/share-icon.png");
        $(".info-foot").fadeIn();
        getDetail($(this).data("id"));
    });
    

    $(".app-share-img .icon-Toright").on("click", function () {
        $(".app-share-img").fadeOut(200);
    });
    $(".app-share-img .icon-share").on("click", function () {
        var url = $(".app-share-img img").attr("src");
        app.share1(url);
    });
    function addDate(date, days) {
        if (days == undefined || days == '') {
            days = 1;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day) + " " + date.getHours() + ":" + date.getMinutes()
            + ":" + date.getSeconds();
    }

    // 日期月份/天的显示，如果是1位数，则在前面加上'0'
    function getFormatDate(arg) {
        if (arg == undefined || arg == '') {
            return '';
        }

        var re = arg + '';
        if (re.length < 2) {
            re = '0' + re;
        }

        return re;
    }

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + ":" + date.getMinutes()
            + ":" + date.getSeconds();
        return currentdate;
    }

    function DateMinus(sDate, eDate) {
        var sdate = new Date(sDate.replace(/-/g, "/"));
        var now = new Date(eDate.replace(/-/g, "/"));
        var days = now.getTime() - sdate.getTime();
        var day = parseInt(days / (1000 * 60 * 60));
        return day;
    }
    function compareTime(startTime, endTime) {
        var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
        if (thisResult < 0) {
            return true;
        } else if (thisResult > 0) {
            return false;
        } else if (thisResult == 0) {
            return true;
        } else {
            return false;
        }
    }
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
            apply_sendgold: "",
            logo_pic1: "",
            logo_pic2: "",
            logo_pic3: "",
            logo_pic4: "",
            sk_shop_type: "",
            share_id: '',
            send_gold: ''
        }
    });
    var mySwiper1 = "";
    //获取详情
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
            vmDetail.$data.remaining_copies = data.Data.remaining_copies;
            vmDetail.$data.apply_count = data.Data.apply_count;
            vmDetail.$data.Cart = data.Data.Cart;
            vmDetail.$data.apply_sendgold = data.Data.apply_sendgold;
            vmDetail.$data.Collects = data.Data.Collects;
            vmDetail.$data.Prize = data.Data.Prize;
            vmDetail.$data.send_gold = data.Data.send_gold;  //送多少金币
            var shoptype = data.Data.sk_commodity_source;
            vmDetail.$data.sk_shop_type = ["iconfont icon-tb", "iconfont icon-tm", "iconfont icon-jd", "iconfont icon-tb"][shoptype];
            if (data.Data.is_original) {
                var index = 0;
                if (data.Data.img_index == 0) {
                    index = 1;
                } else {
                    index = 0;
                }
                vmDetail.$data.logo_pic1 = data.Data.logo_pic.split("|")[index];
                vmDetail.$data.logo_pic2 = vmDetail.$data.logo_pic1;
                vmDetail.$data.logo_pic3 = vmDetail.$data.logo_pic1;
                vmDetail.$data.logo_pic4 = vmDetail.$data.logo_pic1;
            } else {
                vmDetail.$data.logo_pic1 = data.Data.logo_pic.split("|")[0];
                vmDetail.$data.logo_pic2 = data.Data.logo_pic.split("|")[1];
                vmDetail.$data.logo_pic3 = data.Data.logo_pic.split("|")[2];
                vmDetail.$data.logo_pic4 = data.Data.logo_pic.split("|")[3];
            }
            var goldText = "";
            var goldBtn = "";
            if (data.Data.sk_replace_count == 0) {
                goldText = "已兑完";
                goldBtn = "get-invite gray";
            } else {
                if (data.Data.sk_replace_price > myGold) {
                    goldText = "金币不足";
                    goldBtn = "get-invite gray";
                    $(".get-invite").on("click", function () {
                        location.href = "/UserAccount/GoldRecharge";
                    });
                } else {
                    if (data.Data.sk_gold_applyCount == data.Data.sk_replace_count) {
                        goldText = "已兑完";
                        goldBtn = "get-invite gray";
                    } else {

                        if (data.Data.sk_lottery_mode == 0 && (data.Data.sk_activity_type == 2 && compareTime(addDate(data.Data.sk_begindate, 2), getNowFormatDate()) || data.Data.sk_activity_type == 3 && compareTime(addDate(data.Data.sk_begindate, 3), getNowFormatDate()))) {
                            if (data.Data.sk_activity_type == 2) {
                                goldText = DateMinus(getNowFormatDate(), addDate(data.Data.sk_begindate, 2)) + "小时后可以兑换";
                                goldBtn = "get-invite gray";
                            } else {
                                goldText = DateMinus(getNowFormatDate(), addDate(data.Data.sk_begindate, 3)) + "小时后可以兑换";
                                goldBtn = "get-invite gray";
                            }
                        } else {
                            goldText = data.Data.sk_replace_price + "<br />" + "金币兑换";;
                            goldBtn = "get-invite gold";
                            $(".get-invite").on("click", function () {
                                GoldAplly(id);
                            });
                        }
                    }
                }
            }
            $(".get-invite").attr("class", goldBtn);
            $(".get-invite").html(goldText);
            //var dataHref = '/JpinShopIssue/OrderFlow?activityId=' + id + "&free=" + data.Data.free + "&applyType=1";
            //$(".get-invite").attr("data-href", dataHref);
            //vmDetail.$data.logo_pic4 = data.Data.logo_pic.split("|")[3];
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
                //$("#applyText").attr("class", "gray");
                $("#applyText").attr("href", 'javascript:void(0)');
            }
            if (data.Data.applyText == "还有机会") {
                $("#applyText").attr("class", "gray");
                $("#applyText").css("background-color", "#808080");
            }
            $("#applyText").html(data.Data.applyText);

        });
        //空图片黑名单
        var emptyImg = [
                  'https://assets.alicdn.com/kissy/1.0.0/build/imglazyload/spaceball.gif',
                  'https://img.alicdn.com/imgextra/i2/51762646/TB22ZiEdgMPMeJjy1XdXXasrXXa_!!51762646.jpg_468x468q90s150.jpg_q90.jpg_468x468q90s150.jpg',
                  'https://img.alicdn.com/imgextra/i2/51762646/TB2rytqXaagSKJjy0FbXXa.mVXa_!!51762646.jpg_468x468q90s150.jpg_q90.jpg_468x468q90s150.jpg',
                  'https://img.alicdn.com/imgextra/i2/51762646/TB2BWhpXjuhSKJjSspmXXcQDpXa_!!51762646.jpg_468x468q90s150.jpg_q90.jpg_468x468q90s150.jpg',
                  'https://img.alicdn.com/imgextra/i3/51762646/TB2b0iGdlUSMeJjSszeXXcKgpXa_!!51762646.jpg_468x468q90s150.jpg_q90.jpg_468x468q90s150.jpg',
                  'https://img.alicdn.com/imgextra/i1/692125945/TB2Xk8lbFXXXXXeXpXXXXXXXXXX-692125945.gif'
        ];
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
                /*
                * 清除一行
                * */
                data.Data.tbhtml = data.Data.tbhtml.replaceAll('<p>&nbsp;</p>', '');
                data.Data.tbhtml = data.Data.tbhtml.replaceAll('<p style="text-align: center;">&nbsp;</p>', '');
                /*
                * 正则替换空图片
                * */
                data.Data.tbhtml = data.Data.tbhtml.replace(/<img[^>]+data-original=[\'\"]([^"]+)[\'\"][^>]*>/gi, function (match, capture) {
                    if (emptyImg.indexOf(capture) != -1) {
                        return '';
                    }
                    return match;
                });
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
        $("#flow").css("display", "block");
        $("#flow").removeClass("fadeout");
    });

    //点击遮罩隐藏
    $(".flow-con .code-con").on("click", function () {
        $(".flow-con").addClass("fadeout");
        $(".flex-bg").fadeOut(300);
    });
    //点击隐藏流程框
    $(".flow-con span.btn").on("click", function () {
        $(".flow-con").addClass("fadeout");
        $(".flex-bg").fadeOut(300);
    });
});

//如果是拍A发B把商品详情的html改变
function getPaiB(money, reMoney) {
    var html = '<div class="tryout"><h3>试用流程：</h3><p>1、申请试用，获得试用资格。<br />' +
        '2、申请通过后，按照搜索流程提示，以 <em>' + money + ' 元去指定平台下单。<br />' +
        '3、下单完成后，回飞猪购填写购买付款的订单号。<br />' +
        ' 4、等待收货 → 确认收货 → 给予宝贝评价，并填写试用报告。<br />' +
        '5、报告通过 → 返还 <em>' + reMoney + '</em>' +
        '元到您的飞猪购账户中 → 试用完成。</p></div><div class="tryout"><h3>注意事项</h3><p>' +
        '1、禁止使用信用卡、淘金币、优惠券、红包、天猫积分等。<br />' +
        '2、禁止通过淘宝客、返利网、一淘等返现返利网链接下单。<br />' +
        '以上由于买家违规下单所产生的费用，由买家承担。飞猪购有权冻结其帐号，限制提现操作，IP列入黑名单。</p></div>' +
        '<div class="tryout"><h3>温馨提示：</h3><p>' +
        '1、若因未按时提交以上信息而被系统取消试用资格,<br />' +
        '将无法恢复资格，由此造成的损失需由买家承担。</p></div>';
    return html;
}


String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function toIndex() {
    $("#detail .intro").html("");
    $("#detail").addClass("showHidden");
    $("#index").removeClass("showHidden");
    $("#index").show();
    $(".jp-fixed-top,footer").fadeIn();
    $(".header").show();
    $(".info-foot").fadeOut();
    if (globle.isWeixin()) {
        $(".go-mj").attr("href", "/other/appdownload");
        $(".go-mj img").attr("src", "/Content/images/icon/openApp.gif");
    } else {
        $(".go-mj").hide();
    }
    window.scrollTo(0, scrolH);
}
