var str = window.location.search;
var aid = str.replace(/[^0-9]/ig,"");
$.ajax({
        url:"http://api.feizhugou.com/order/get/one/" + aid,
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
                $('#shopname').html(data.data.title);
                $('#storename').html(data.data.hideShopName);
                $('#shopmoney').html(data.data.price);
                $('#shopspic').attr('src',''+data.data.imgUrl)
            }
})