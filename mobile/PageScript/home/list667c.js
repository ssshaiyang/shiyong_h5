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
                console.log(data);
                if (data.Result) {
                    location.href = '/JpinShopIssue/OrderFlow?applyType=1&activityId=' + id;
                } else {
                    if (data.Message == "请先登陆！") {
                        location.href = '/UserAccount/Login';
                        return;
                    }
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
                    if (data.Data == 6 && data.Message == '金币不足！') {
                        myConfirmDefinedText("您的账号不足" + goodPrice + "金币，充值后可直接兑换该商品！", "立即充值兑换", "残忍拒绝", function () {
                            //location.href = "/JpinShopIssue/OrderFlow?activityId=' + id";
                            location.href = "/UserAccount/GoldRecharge";
                        }, function () {

                        });
                        document.getElementsByClassName("layui-m-layercont")[0].style.textAlign = "left";
                        //myAlert(data.Message, function () {
                        //    location.href = "/UserAccount/GoldRecharge";
                        //});
                        return;
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

    $(".info-cat span").on("click", function () {
        $(this).addClass("act").siblings().removeClass("act");
    });

    $(".tod").on("click", function () {
        indexSW = 1;
        scrolH = $document.scrollTop();
        $(".jp-fixed-top,footer").fadeOut();
        $(".info-foot").fadeIn();
        $(".go-mj").show();
        $(".go-mj").attr("href", "/jing/share?invitationCode=" + userid + "&shopid=" + $(this).data("id"));
        $("#detail .get-more").data("id", $(this).data("id"));
        getDetail($(this).data("id"));
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
    lingaSort.order = globle.getUrlParam("order")|| order || 0;
    lingaSort.key = globle.getUrlParam("key") || "";
    lingaSort.type = globle.getUrlParam("type") || -1;
    lingaSort.shopcat = globle.getUrlParam("shopcat") || -1;
    lingaSort.sort = globle.getUrlParam("sort") || 1;
    lingaSort.orderType = globle.getUrlParam("orderType") || 0;
    getList();

    //搜索词搜索
    $(".jp-hd .icon-search").on("click", function () {
        var key = $(".jp-hd input").val();
        lingaSort.key = key;
        lingaSort.sort = 1;
        $(".search-input").blur();
        getList(1);
    });
    $(".search-input").on("keyup", function (e) {
        e = e || window.event;
        var code = e.charCode || e.keyCode;
        if (code == 13) {
            $(".jp-hd .icon-search").click();
        }
    });
    //平台类型
    $(".plat span").on("click", function () {
        $(this).addClass("act").siblings().removeClass("act");
        lingaSort.orderType = $(this).data("num");
        lingaSort.sort = 1;
        getList(1);
    });
    //order搜索
    $(".jp-con .con-cat li a").on("click", function () {
        lingaSort.sort = 1;
        if ($(this).parent().hasClass("act") && $(this).find("i").hasClass("icon-sortD")) {
            $(this).find("i").addClass("icon-sortA").removeClass("icon-sortD");
            lingaSort.sort = 0;
        } else {
            $(this).find("i").addClass("icon-sortD").removeClass("icon-sortA");
        }
        $(".jp-con .con-cat li").removeClass("act");
        $(this).parent().addClass("act");
        lingaSort.order = $(this).data("href");
        getList(1);
    });
    //type搜索
    $(".jp-cat li a").on("click", function () {
        $(".jp-cat li a").removeClass("act");
        $(this).addClass("act");
        lingaSort.type = $(this).data("href");
        lingaSort.sort = 1;
        getList(1);
    });
    var vm = new Vue({
        // 选项
        el: '#list',
        data: {
            showZt: window.showZt,
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
            getList();
        }
    });
    function getList(clearFlag) {
        if (clearFlag) {
            window.scrollTo(0, 0);
            lingaSort.page = 1;
            vm.$data.list = [];
        }
        $.ajax({
            type: 'GET',
            url: 'http://api.feizhugou.com/activity?page=1&limit=10',
            // data: lingaSort,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                listFlag = false;
                if (data.data.length == 0) {
                    layer.open({
                        content: '没有更多商品了'
                          , skin: 'msg'
                          , time: 2
                    });
                    return false;
                }
                for (var i = 0; i < data.data.Data.length; i++) {
                    data.Data[i].id = data.Data[i].sk_id;
                    data.Data[i].showG = parseInt(data.Data[i].sk_clinch_price) >= 100 ? true : false;
                    data.Data[i].sk_id = "/jing/Detail?id=" + data.Data[i].id;
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
                    $(".tod").off("click");
                    $(".tod").on("click", function () {
                        indexSW = 1;
                        scrolH = $document.scrollTop();
                        $(".jp-fixed-top,footer").fadeOut();
                        $(".info-foot").fadeIn();
                        $(".go-mj").show();
                        $(".go-mj").attr("href", "/jing/share?invitationCode=" + userid + "&shopid=" + $(this).data("id"));
                        $("#detail .get-more").data("id", $(this).data("id"));
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
        var day = Math.ceil(days / (1000 * 60 * 60));
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
            sk_shop_type: "",
            Cart: "",
            Collects: "",
            showZt: window.showZt,
            apply_sendgold: "",
            Prize: "",
            logo_pic1: "",
            logo_pic2: "",
            logo_pic3: "",
            logo_pic4: "",
            sk_is_BlockLottery: false, //是否参团
            sk_group_passcount: 0,
            sk_group_SendCount: 0,
            hour: 0,

            sk_commodity_source: false,
            sk_is_useTokio: false,
            sk_is_useCreditCard: false,
            sk_isvoucher: false,
            sk_nondelivery_area: '',
            send_gold: ''  //送多少金币
        }
    });
    var mySwiper1 = "";
    var goodPrice = 0;
    function getDetail(id) {
        current_id = id;
        $("#detail .get-more").data("id", id);
        $("#detail .get-more span").html("加载更多");
        $(".info-cat span").removeClass("act").eq(0).addClass("act");
        $(".info-list>div").removeClass("act").eq(0).addClass("act");
        getMoreFlag = true;
        $.post("/Jing/JinpDetail", { id: id }, function (data) {
            goodPrice = (data.Data && data.Data.sk_replace_price) ? data.Data.sk_replace_price : 0;   //给金币不足弹框使用
            $("#index").addClass("showHidden");
            $("#detail").removeClass("showHidden");
            vmDetail.$data.activity_name = data.Data.activity_name;
            vmDetail.$data.clinch_price = data.Data.clinch_price;
            vmDetail.$data.apply_sendgold = data.Data.apply_sendgold;
            if (data.Data.apply_sendgold > 0)
                vmDetail.$data.return_moeny = data.Data.return_moeny + "元+" + data.Data.apply_sendgold + "金币";
            else
            vmDetail.$data.return_moeny = data.Data.return_moeny + "元";
            vmDetail.$data.remaining_copies = data.Data.remaining_copies;
            vmDetail.$data.apply_count = data.Data.apply_count;
            vmDetail.$data.Cart = data.Data.Cart;
            vmDetail.$data.Collects = data.Data.Collects;
            vmDetail.$data.Prize = data.Data.Prize;
            vmDetail.$data.hour = data.Data.hour;
            vmDetail.$data.sk_is_BlockLottery = data.Data.sk_is_BlockLottery;  //是否参团
            vmDetail.$data.sk_group_passcount = data.Data.sk_group_passcount;
            vmDetail.$data.sk_group_SendCount = data.Data.sk_group_SendCount;  //需组团人数
            vmDetail.$data.restzt = data.Data.sk_group_passcount ? data.Data.sk_group_passcount.split('/')[0] : '0';  //组团剩余份数
            vmDetail.$data.send_gold = data.Data.send_gold;  //送多少金币

            vmDetail.$data.sk_is_useCreditCard = data.Data.sk_is_useCreditCard;         //信用卡
            var str = data.Data.sk_nondelivery_area || '';
            if (str) {
                vmDetail.$data.sk_nondelivery_area = str.substring(0., str.length - 1).replaceAll(',', '，') + '。';         //偏远地区
            }
            vmDetail.$data.sk_is_useTokio = data.Data.sk_is_useTokio;                   //花呗  白条
            vmDetail.$data.sk_isvoucher = data.Data.sk_isvoucher;                       //优惠券
            vmDetail.$data.sk_commodity_source = data.Data.sk_commodity_source;         //2表示京东
            var shoptype = data.Data.sk_commodity_source;
            vmDetail.$data.sk_shop_type = ["iconfont icon-tb", "iconfont icon-tm", "iconfont icon-jd", "iconfont icon-tb"][shoptype];
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
            var goldText = "";
            var goldBtn = "";

            if (data.Data.sk_is_BlockLottery) {   //参团

                
                var pinkBtn = "get-apply pink", pinkText = (data.Data.applyText == "继续参团" ? "继续参团" : "立即参团") + "<br><span style='font-size:0.512rem;'>距开奖仅差" + (parseInt(data.Data.sk_group_SendCount) - parseInt(data.Data.sk_group_applycount)) + "人</span>";
             
                goldText = "暂无金币份额";
                goldBtn = "get-invite gray";
                $(".get-invite").attr("class", goldBtn);
                $(".get-invite").html(goldText);

                $(".dona-image").attr("src", "/Content/images/JPin/flow2.png");
                $("#detail-type").html("组团流程");
                if (data.Data.hour >= 21 || vmDetail.$data.restzt == '0') {
                    $("#applyText").attr("class", "get-apply gray");
                    $("#applyText").attr("href", 'javascript:void(0)');
                    $("#applyText").html("今日份额已满");
                } else if (data.Data.applyText == "已申请") {
                    $("#applyText").attr("class", "get-apply");
                    $("#applyText").html("已申请");
                    $("#applyText").attr("href", 'javascript:void(0)');
                }
                else if (data.Data.applyText == "明日继续申请") {
                    $("#applyText").attr("class", "get-apply gray");
                    $("#applyText").html("明日继续申请");
                    $("#applyText").attr("href", 'javascript:void(0)');
                }
                else {
                    $("#applyText").attr("href", '/JpinShopIssue/OrderFlow?activityId=' + id + "&free" + data.Data.free);
                    $("#applyText").attr("class", pinkBtn);
                    $("#applyText").html(pinkText);
                }
                if (!data.Data.isSubmit) {
                    pinkBtn = "get-apply gray";
                    $("#applyText").attr("href", 'javascript:void(0)');
                    $("#applyText").attr("class", pinkBtn);
                }
            } else {   //不是参团
                $(".dona-image").attr("src", "/Content/images/JPin/flow.png");
                $("#detail-type").html("试用流程");
                if (data.Data.sk_replace_count == 0 || data.Data.sk_gold_applyCount == data.Data.sk_replace_count) {
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
                        if (data.Data.sk_replace_price > myGold) {
                            goldText = "金币不足<br><span style='font-size:0.512rem;'>" + data.Data.sk_replace_price + "金币</span>";
                            goldBtn = "get-invite gold double-line";
                            $(".get-invite").off("click");
                            $(".get-invite").on("click", function () {
                                GoldAplly(id);
                            });
                        } else {
                            //goldText = data.Data.sk_replace_price + "<br />" + "金币兑换";;
                            goldText = "金币兑换" + "<br /><span style='font-size:0.512rem;'>" + data.Data.sk_replace_price + "金币</span>";
                            goldBtn = "get-invite gold";
                            $(".get-invite").off("click");
                            $(".get-invite").on("click", function () {
                                GoldAplly(id);
                            });
                        }
                    }
                }

                $(".get-invite").attr("class", goldBtn);
                $(".get-invite").html(goldText);
                //var dataHref = '/JpinShopIssue/OrderFlow?activityId=' + id + "&free=" + data.Data.free + "&applyType=1";
                //$(".get-invite").attr("data-href", dataHref);

                if (data.Data.isSubmit) {
                    $("#applyText").attr("href", '/JpinShopIssue/OrderFlow?activityId=' + id + "&free" + data.Data.free);
                } else {
                    //$("#applyText").attr("class", "gray");
                    $("#applyText").attr("href", 'javascript:void(0)');
                }
                //if (!data.Data.isSubmit) {

                //}
                if (data.Data.applyText == "已申请") {
                    $("#applyText").html(data.Data.applyText);
                    $("#applyText").attr("class", "get-apply gray");
                } else {
                    $("#applyText").html(data.Data.applyText);
                    $("#applyText").attr("class", "get-apply");
                }
            }

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
                $("#detail #guss-like").show();
                $("#detail .intro").html(getPaiB(money, reMoney));
                $("#get-more").show()
                getMoreDetail();
            } else {
                
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
        $(".go-mj").hide();
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
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
