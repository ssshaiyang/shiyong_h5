$(function () {
    $("#PayBtnSubmit").click(function () {
        var arrayTB = [""];
        var i =0;
        console.log(shopId)
        if ($(".Validform_wrong").length < 1) {
            $("[name='sk_taobao']").each(function () {
                arrayTB[i] ='';
                arrayTB[i] += $(this).val();
                i++;
            });
            var arrayTB = JSON.stringify(arrayTB);
            console.log(arrayTB)
            $.ajax({
                url:'http://api.feizhugou.com/users/modify/taobao',
                dataType:'json',
                async:true,
                data:{
                    taobao: arrayTB,
                },
                type:'POST',
                success:function(data){
                    console.log(arrayTB)
                    console.log(data)
                    console.log(1)
                    if (data.msg == 'ok') {
                        if(shopId!=-1){
                            location.href="../../mobile/JpinShopIssue/OrderFlow0.html?id="+shopId
                        }else{
                            location.href = "../UserAccount/AccountSecurity.html";
                        }
                    } else {
                        myAlert(data.Message);
                        return;
                    }
                }
            })
        }
    });

    $("#addTB").click(function () {
        var div = '<section class="clearfix"><input style="width: 75%" name="sk_taobao" class="auto-input it lf" type="text" placeholder="请填写'+(param==0?"淘宝":"京东")+'账号" datatype="*" maxlength="50"/> <img src="../Content/images/remove.png" onclick="delTb(this) " /></div>  </section>';
        $("#addTB").before(div);
    });
})
