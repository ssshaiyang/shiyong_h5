    var loc = location.href;
    var arr = loc.split('?')[1];
    var oid =arr.split('=')[1];
    // 流程显示与隐藏
     $('#flow').on('click',function(){
        $("#flex-bg").css("display",'none');
        $('#flow').css("display",'none');
    })
    $('#showflowbtn').on('click',function(){
        $("#flex-bg").css("display",'block');
        $('#flow').css("display",'block');
    })
     // 申请按钮跳转
     $('#applyText').on('click',function(){
        location.href = '../mobile/JpinShopIssue/OrderFlow0.html?id=' + oid;
    })
    // 商品详情
    $.ajax({
        url:"http://api.feizhugou.com/activity/getGoodsDetail/" + oid,
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
            if(data.code==1000){
               for(var i=0;i<data.data.length;i++){
                    $('#list-apply1').append('<li style="width:100%"><img style="width:100%" src="'+data.data[i]+'" alt="加载失败"></div>')
                }
                $('#showloading').css('display','none')
            }else{
                alert(data.msg)
                $('#showloading').css('display','none')
            }
        }
    })
    // 获取活动详情信息
    $.ajax({
        url:"http://api.feizhugou.com/activity/" + oid,
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
           $('#shop_name').html(data.data.title);
           $('#shop-money').html(data.data.treasure_price);
           $('#shop-copies').html(data.data.surplusNum+ '/'+data.data.totalNum +'  份');
           $('#listpeople1').html(data.data.applyNum + '人已申请');
           $('#listpeople2').html(data.data.luckyNum + '人已中奖');
           // $('#logo_pic1').attr('src',''+data.data.imgInfo[0].imgUrl)
           var arrPics =[]
           for(var i=0;i<data.data.imgInfo.length;i++){
                arrPics[i]=0
           }
           var index =1;
           for(var i=0;i<data.data.imgInfo.length;i++){
                if(data.data.imgInfo[i].isHead==1){
                    arrPics[0]= data.data.imgInfo[i].imgUrl
                }else{
                    arrPics[index]= data.data.imgInfo[i].imgUrl
                    index++
                }
           }
           for(var i=0;i<arrPics.length;i++){
                    $('#shopic').append('<div class="swiper-slide"><img src="'+arrPics[i]+'" alt="加载失败"></div>')
                }
        }
    }) 
    // 猜你喜欢内容获取
    $.ajax({
                url:"http://api.feizhugou.com/activity/guessYouLike/" + oid,
                dataType:'json',
                async:true,
                type:'GET',
                success:function(data){
                  console.log(data)
                  var likedata=data.data;
                  console.log(data.data.length)
                   // $('#logo_pic1').attr('src',''+data.data.imgInfo[0].imgUrl)
                   $('#list-apply li').remove()
                   for(var i=0;i<likedata.length;i++){
                            $('#list-apply').append('<li onclick="payshopId('+likedata[i].id+')"><a class="tod" data-id="68572"><img class="lazy" src="'+likedata[i].imgUrl+'" alt=""><div><span class="red">90%中奖率</span></div></a><p><span class="iconfont icon-tm"></span> '+likedata[i].title+'</p><div class="jp-num"><span>¥'+likedata[i].treasure_price+'</span><span>'+likedata[i].applyNum+'人申请</span></div><div class="jp-btn"><a class="tod" >免费申请</a></div></li>')
                    }
                     $('#showloding').css('display','none')
                }
    }) 
    //点击获取猜你喜欢
     function payshopId(id){
            location.href = '../mobile/indexshop.html?shopId=' + id;
     }
    $(".info-cat span").on("click", function () {
        $(this).addClass("act").siblings().removeClass("act");
        $(".info-list>div").eq($(this).index()).addClass("act").siblings().removeClass("act");
        // if ($(this).index() == 1 && getMoreFlag) {
        //     if (getMoreid == $("#detail .get-more").data("id")) {
        //         console.log(11)
        //         return false;
        //     }
        //     getMoreDetail();
        // }
    });
    var mySwiper = new Swiper ('.swiper-container', {
                 pagination: '.swiper-pagination',
                    paginationClickable: true,
                    speed: 2000,
                    loop: true,
                    observer:true,
                    observeParents:true,
                    autoplayDisableOnInteraction : false,
                    autoplay:5000,
                onSlideChangeStart:function(swiper){
                    if(mySwiper.activeIndex == 4){
                        index = 1;
                    }
                    if(mySwiper.activeIndex == 0){
                        index = 3;
                    }
                }
                }) 