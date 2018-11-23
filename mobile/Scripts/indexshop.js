var shopid ='';
var searchshopname =''; 
var shopsname = 'all';
// 搜索框搜索
$('#searchtext').on('change',function(){
            searchshopname = $('#searchtext').val();
            start();
})
$('#searchbtn').on('click',function(){
            searchshopname = $('#searchtext').val();
            start();
})
// 点击全部时的触发
function listindex(){
    var lialength = $('.lia').length;
    for(var z = 0;z<lialength;z++){
            $('.lia:eq('+z+')').removeClass('act');
        }
        $('.lia:eq(0)').addClass('act');
        shopsname = 'all';
        allstart();
}
function allstart(){
            $('#list li').remove();
            $('#showloding').css("display",'block')
             $.ajax({
                url:"http://api.feizhugou.com/activity?page=1&limit=20&filter="+searchshopname+"&treasure_class="+shopsname,
                 dataType:'json',
                async:true,
                type:'GET',
                success:function(data){
                        var arrs = data.data.info;
                        if(data.code == 1000){
                            if(data.data.info.length > 0){
                                for(var i =0;i<arrs.length;i++){
                                    $('#list').append('<li id="'+arrs[i].id+'" onclick="paytoid(this.id)"><a ><img id="'+arrs[i].id+'" onclick="paytoid(this.id)"  class="lazy" src="'+arrs[i].imgUrl+'"  alt="加载失败" /><div><span class="red">首单99%中奖</span></div></a><p><span class="iconfont icon-tb"></span>'+arrs[i].title+'</p><div class="jp-num"><span>¥'+arrs[i].treasure_price+'</span><span>'+arrs[i].applyNum+'人申请</span></div><div class="jp-btn"><a class="tbn tod" id="'+arrs[i].id+'" onclick="paytoid(this.id)"">免费申请</a></div></li>')
                                }
                            }
                            $('#showloding').css("display",'none')
                        }else{
                            myAlert(data.msg)
                        }
                    }
                })
} 
// 头部导航点击切换
function runid(s,x){
    shopid =x+1;
    var lialength = $('.lia').length;
    $('.lia:eq(0)').addClass('act');
    if(shopid!=null &&shopid!=''){
            for(var z = 0;z<lialength;z++){
                   $('.lia:eq('+z+')').removeClass('act');
               }
               $('.lia:eq('+shopid+')').addClass('act');
               $.ajax({
                   url:"http://api.feizhugou.com/activity/goodsClassify",
                   dataType:'json',
                   async:true,
                   type:'GET',
                   success:function(data){
                       var arrs1 = data.data;
                       var  shopid2 = shopid -1;
                       if(shopid!=null){
                           if(arrs1[shopid2].name != null){
                               shopsname = arrs1[shopid2].name;
                               $('#list li').remove();
                               $('#showloding').css("display",'block')
                               start();
                           }else{
                               $('#list li').remove();
                               $('#showloding').css("display",'block')
                           }
                       }
                   }
               });
        }
}
// 获取商品分类     
$.ajax({
    url:"http://api.feizhugou.com/activity/goodsClassify",
    dataType:'json',
    async:true,
    type:'GET',
    success:function(data){
        var arrs1 = data.data;
        console.log(arrs1)
            for(var x = 0;x <arrs1.length;x++){
                $('#lists').append('<li><a class="lia" onclick="runid('+arrs1[x].id+","+x+')" class="">'+arrs1[x].name+'</a></li>');
                if(shopid!=null &&shopid!=''){
                    var shopid1 = shopid -1;
                    shopsname = arrs1[shopid1].name;
                }
            }
          var lialength = $('.lia').length;
          if(shopid!=null && shopid!=''){
            for(var z = 0;z<lialength;z++){
                    $('.lia:eq('+z+')').removeClass('act');
            }
            $('.lia:eq('+shopid+')').addClass('act');
                 allstart();
          }else{
            for(var z = 0;z<lialength;z++){
                    $('.lia:eq('+z+')').removeClass('act');
            }
            $('.lia:eq(0)').addClass('act');
                allstart();
          }
    }
});
var activityid;
// 首次进入页面加载
function start(){
    if(searchshopname==undefined){
        searchshopname=""
    }
    $('#list li').remove();
    $.ajax({
    url:"http://api.feizhugou.com/activity?page=1&limit=20&filter="+searchshopname+"&treasure_class="+shopsname,
    dataType:'json',
    async:true,
    type:'GET',
    success:function(data){
            var arrs = data.data.info;
            if(arrs.length > 0){
                    for(var i =0;i<arrs.length;i++){
                        $('#list').append('<li  id="'+arrs[i].id+'" onclick="paytoid(this.id)"><a ><img id="'+arrs[i].id+'" onclick="paytoid(this.id)"  class="lazy" src="'+arrs[i].imgUrl+'"  alt="加载失败" /><div><span class="red">首单99%中奖</span></div></a><p><span class="iconfont icon-tb"></span>'+arrs[i].title+'</p><div class="jp-num"><span>¥'+arrs[i].treasure_price+'</span><span>'+arrs[i].applyNum+'人申请</span></div><div class="jp-btn"><a class="tbn tod" id="'+arrs[i].id+'" onclick="paytoid(this.id)"">免费申请</a></div></li>')
                    }
            }else{
                // console.log(1);
            }
            $('#showloding').css("display",'none')
        }
    })
}
var activityid;
var  changeid=1;
// 美丽播报获取及滚动
$.ajax({
    url:"http://api.feizhugou.com/home/carousel",
    dataType:'json',
    async:true,
    type:'GET',
    success:function(data){
        var arr =data.data;
        console.log(arr)
        for(var i =0;i<arr.length;i++){
            var arrtext = arr[i].username
            if(arr[i].username.length>6){
                arrtext = arr[i].username.substring(0,6) +"*****"
            }
            var arrtexts = arr[i].activityName
            if(arr[i].activityName.length>12){
                arrtexts = arr[i].activityName.substring(0,12)+"***"
            }
            var arr
            $('#repotrList').append('<li><em>'+arrtext+' </em>中了<em> '+arrtexts+' </em></li>')
}

var $this = $(".report");
var scrollTimer;
    $this.hover(function () {
            clearInterval(scrollTimer);
    }, function () {
    scrollTimer = setInterval(function () {
                scrollNews($this);
    }, 2000);
    }).trigger("mouseleave");
function scrollNews(obj) {
    var $self = obj.find("ul");
    var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -lineHeight + "px"
            }, 600, function () {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }

         }
})


function paytoid(d){
    activityid = d;
    location.href="indexshop.html?shopId="+activityid
}