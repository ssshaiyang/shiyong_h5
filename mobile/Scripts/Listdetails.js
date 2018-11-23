var str = window.location.search;
var typenum = str.replace(/[^0-9]/ig,"");
// 获取试用详情
    $.ajax({
        url:"http://api.feizhugou.com/order/get/status/" + typenum,
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
            var arr = data.data.data;
            $('#showloding').css("display",'block')
            if(arr != undefined){
                for(var i = 0;i < arr.length;i++){ 
                    
                     $('#list').append("<dd class='my-list'><ul><li><em>2018-08-28 19:56:29</em></li><li><span style='color: black'>很遗憾，您绑定的身份证审核为通过</span></li></ul></dd>")
                } 
                $(function () {
                    $(".time").countdown({ tmpl: '%{d}天%{h}时%{m}分后' }); //倒计时
                    $(".time1").countdown({ tmpl: '%{d}天%{h}时%{m}分内' }); //倒计时
                    $("span.read").on("click", function () {
                        myAlert($(this).data("task"));
                    });
                });
                $('#showloding').css("display",'none')
            }else{
                $('#showloding').css("display",'none')
            }
        }
    })
                if(typenum == 1){
                    $('#ulilst li').removeClass('act');                   
                    $('#ulilst li:eq(0)').addClass('act');
                }else if(typenum == 2){
                    $('#ulilst li').removeClass('act'); 
                    $('#ulilst li:eq(1)').addClass('act');
                }else if(typenum == 3){
                    $('#ulilst li').removeClass('act'); 
                    $('#ulilst li:eq(2)').addClass('act');
                }else if(typenum == 4){
                    $('#ulilst li').removeClass('act'); 
                    $('#ulilst li:eq(3)').addClass('act');
                }else if(typenum == 5){
                    $('#ulilst li').removeClass('act'); 
                    $('#ulilst li:eq(4)').addClass('act');
                }else{
                    $('#ulilst li').removeClass('act'); 
                    $('#ulilst li:eq(0)').addClass('act');
                }

        // 获取订单详情
        function runother(oid,status,aid,e){
            if(status>=0&&status<=6){
                location.href = '../JpinShopIssue/OrderDetail.html?id='+oid+'&aid='+aid;
            }
        }