/*
* @Author: Administrator
* @Date:   2018-08-24 11:20:04
* @Last Modified by:   jian.weng
* @Last Modified time: 2018-08-29 10:14:56
*/
$.ajax({
        url:"http://api.feizhugou.com/order/get/orderCount",
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
            var arrs = data.data;
            $('#userstate1').append('<span style="color:#ff464e">'+arrs.first+'</span>')
            $('#userstate2').append('<span style="color:#ff464e">'+arrs.second+'</span>')
            $('#userstate3').append('<span style="color:#ff464e">'+arrs.third+'</span>')
            $('#userstate4').append('<span style="color:#ff464e">'+arrs.fourth+'</span>')
            $('#userstate5').append('<span style="color:#ff464e">'+arrs.fifth+'</span>')
        }
    })
function changeList(typeId){
        
    $.ajax({
        url:"http://api.feizhugou.com/order/get/status/" + typeId,
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){          
            $('#showloding').css("display",'block')
            var arr = data.data.data;
            var newData = new Date()
             $('#list dd').remove();
            if(arr != undefined){
                $('#showloding').css("display",'block')
                for(var i = 0;i < arr.length;i++){ 
                      $('#list').append("<dd class='my-list'><ul><li><em>2018-08-28 19:56:29</em></li><li><span style='color: black'>很遗憾，您绑定的身份证审核为通过</span></li></ul></dd>")
                }
                $('#showloding').css("display",'none')
            }else{
                $('#showloding').css("display",'none')
            }
        }
    })
                if(typeId == 1){
                    $('#ulilst li').removeClass('act');                   
                    $('#ulilst li:eq(0)').addClass('act');
                }else if(typeId == 2){
                    $('#ulilst li').removeClass('act'); 
                    $('#ulilst li:eq(1)').addClass('act');
                }
}
