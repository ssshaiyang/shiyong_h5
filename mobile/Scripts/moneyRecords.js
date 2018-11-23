    function changeMoneyList(typeId){
            $('#con .billion').remove();
             $('#showloding').css('display','block')
            $.ajax({
            url:"http://api.feizhugou.com/wallet/detail/"+typeId+"?page=-1&limit=140",
            dataType:'json',
            async:true,
            type:'GET',
            success:function(data){
                var arr = data.data.data;
                var texts;
                console.log(data);
                var monbolan = '';
                for(var i = 0;i < arr.length;i++){
                    if(arr[i].operation == 1){
                        monbolan = '-'+ arr[i].amount;
                    }else{
                        monbolan = '+'+ arr[i].amount;
                    };
                    if(arr[i].status == 0){
                        texts = "<span style='color: #ff0000'>等待审核</span>";
                    }else if(arr[i].status == 1){
                        texts = "<span style='color: #10b60f'>交易完成</span>";
                    }else{
                         texts = "<span style='color: #ff0000'>已拒绝</span>";
                    }
                    var oncurl = '/UserAccount/moneyinfo?orderid=';
                    $('#con').append("<div class='billion' onclick='location.href = '><div class='sbj'><div class='exactly aaaa'><div onclick='getmoney("+arr[i].id+")' class='z l title'>"+ arr[i].from+"</div><div class='z r' style='color: #333333'><span style='color: #000; font-weight: bold; '>"+ monbolan+"</span></div></div><div class='exactly aaaa '><div class='y l' style='color: #999999'>"+ arr[i].createTime+"</div><div class='y r'>"+texts+"</div></div></div>")
                }
                $('#showloding').css('display','none')
            },
        });
        for(var i=0;i<3;i++){
             $('.typea').eq(i).css('color','');
            $('.typeli .sel').remove();
        }
        if(typeId == 2){
            $('.typea').eq(1).css('color','#ff464e');
            $('.typeli').eq(1).append("<div class='sel'></div>");
        }else if(typeId == 1){
            $('.typea').eq(2).css('color','#ff464e');
            $('.typeli').eq(2).append("<div class='sel'></div>");
        }else{
            $('.typea').eq(0).css('color','#ff464e');
            $('.typeli').eq(0).append("<div class='sel'></div>");
        }
    }
        var str = window.location.search;
        var typenum = str.replace(/[^0-9]/ig,"");
        console.log(typenum)
        if(typenum == 2){
            $('.typea').eq(1).css('color','#ff464e');
            $('.typeli').eq(1).append("<div class='sel'></div>");
        }else if(typenum == 1){
            $('.typea').eq(2).css('color','#ff464e');
            $('.typeli').eq(2).append("<div class='sel'></div>");
        }else{
            $('.typea').eq(0).css('color','#ff464e');
            $('.typeli').eq(0).append("<div class='sel'></div>");
        }
        $('#showloding').css('display','block')
      $.ajax({
            url:"http://api.feizhugou.com/wallet/detail/"+typenum+"?page=-1&limit=140",
            dataType:'json',
            async:true,
            type:'GET',
            success:function(data){
                var arr = data.data.data;
                var texts;
                var monbolan = '';
                for(var i = 0;i < arr.length;i++){
                    if(arr[i].operation == 1){
                        monbolan = '-'+ arr[i].amount;
                    }else{
                        monbolan = '+'+ arr[i].amount;
                    };
                    if(arr[i].status == 0){
                        texts = "<span style='color: #ff0000'>等待审核</span>";
                    }else if(arr[i].status == 1){
                        texts = "<span style='color: #10b60f'>交易完成</span>";
                    }else{
                         texts = "<span style='color: #ff0000'>已拒绝</span>";
                    }
                    var oncurl = '/UserAccount/moneyinfo?orderid=';
                    $('#con').append("<div class='billion' onclick='location.href = '><div class='sbj'><div class='exactly aaaa'><div onclick='getmoney("+arr[i].id+")' class='z l title'>"+ arr[i].from+"</div><div class='z r' style='color: #333333'><span style='color: #000; font-weight: bold; '>"+ monbolan+"</span></div></div><div class='exactly aaaa '><div class='y l' style='color: #999999'>"+ arr[i].createTime+"</div><div class='y r'>"+texts+"</div></div></div>")
                }
                $('#showloding').css('display','none')
            },
        });
      function getmoney(d){
            location.href ='../UserAccount/moneyinfo.html?id=' +d;
      }