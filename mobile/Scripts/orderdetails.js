function getdatail() {
	var token = localStorage.getItem("token");

	var searchURL = window.location.search;
	searchURL = searchURL.substring(1, searchURL.length);
	console.log(searchURL);
	var orderid = searchURL.split("&")[0].split("=")[1];
	var uid = searchURL.split("&")[1].split("=")[1];
	console.log(uid);
	console.log("执行了getdatail");

	var url = "http://api.feizhugou.com/order/" + orderid
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		async: true,
		data: {
			uid: uid
		},
		headers: {
			'Accept': 'aplication/json',
			'Authorization': '' + token
		},
		success: function(e) {
			console.log(e);
			if (e.code == 1000) {

				var finishimg = '<img class="ok" src="./Content/images/gouxuan.png">';
				var nofinishimg = '<img class="ok" src="./Content/images/nogou.png">';
				var noneedimg = './Content/images/noneed.jpg'
				var data = e.data;
				if (data.type == 1) {
					data.second_time = '未完成' + nofinishimg;
					data.third_time = '未完成' + nofinishimg;
					data.courierNumber = '无';
					data.courier_time = '未完成' + nofinishimg;
					data.third_treasurePic = noneedimg;
					data.third_commentPic = noneedimg;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
					data.second_orderNumber = "尚未提交";
				};
				if (data.type == 2) {
					data.second_time = data.second_time + finishimg;
					data.third_time = '未完成' + nofinishimg;
					data.courierNumber = '无';
					data.courier_time = '未完成' + nofinishimg;
					data.third_treasurePic = noneedimg;
					data.third_commentPic = noneedimg;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
					//data.second_orderNumber = ;
				};
				if (data.type == 3) {
					data.second_time = data.second_time + finishimg;
					data.third_time = '未完成' + nofinishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = noneedimg;
					data.third_commentPic = noneedimg;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
					//data.second_orderNumber = "还没有提交";
				};
				if (data.type == 4) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = '未完成' + nofinishimg;
					data.return_money = '未返款';
				};
				if (data.type == 5) {
					data.second_time = data.second_time + finishimg;
					data.third_time = data.third_time + finishimg;
					data.courierNumber = data.courierNumber;
					data.courier_time = data.courier_time + finishimg;
					data.third_treasurePic = data.third_treasurePic;
					data.third_commentPic = data.third_commentPic;
					data.return_time = data.return_time + finishimg;
					
				};
				var treasureCollect ="./Content/images/noupload.png"
				var shopCollect ="./Content/images/noupload.png"
				var orderPic ="./Content/images/noupload.png"
				if(data.type>=2){
					treasureCollect=data.second_treasureCollect
					shopCollect =data.second_shopCollect
					orderPic=data.second_orderPic;
				}
				var html =
					'<div class="order-flow-title">接手任务</div>'+
					'<tr><td>任务编号</td><td>'++'</td></tr>'+
					'<tr><td>买号</td><td><'++'/td></tr>'+
					'<tr><td>商品金额</td><td>'++'</td></tr>'+

					'<div class="title">订单付款</div>'+
					'<tr>' +
					'<td class="bdd-b bdl pl-35">加入购物车</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="./Content/images/noneed.jpg"><img class="pro_img "  src="./Content/images/noneed.jpg" width="62" height="62"></a>' +
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdd-b bdl pl-35">收藏宝贝及关注店铺</td>' +
					'<td class="bdd-b bdr">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + data.second_treasureCollect + '"><img class="pro_img " alt="./Content/images/noupload.png"  src="' + treasureCollect + '" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + data.second_shopCollect + '"><img class="pro_img " alt="./Content/images/noupload.png"   src="' + shopCollect + '" width="62" height="62"></a>' +
					'</td>' +
					'</tr>' +

					'<div class="order-flow-title"></div>'+
					'<tr>' +
					'<td class="bdd-b bdl pl-35">货比三家 浏览副宝贝</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="./Content/images/noneed.jpg"><img class="pro_img "  src="./Content/images/noneed.jpg" width="62" height="62"></a>' +
					'<br>' +
					'</td>' +
					'</tr>' +

					
					

					'<div class="order-flow-title">商家确认订单</div>'+
					'<tr>' +
					'<td class="bdd-b bdl pl-35">淘宝订单编号</td>' +
					'<td class="bdd-b bdr ">：' + data.courierNumber +
					'</td>' +
					'</tr>' +

					'<tr>' +
					'<td class="bdd-b bdl pl-35">退款方式</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" target="_blank" href="' + data.second_orderPic + '"><img class="pro_img " alt="./Content/images/noupload.png"   src="' + orderPic + '" width="62" height="62"></a>' +
					'<br>' +
					'<div>订单编号：'+ data.second_orderNumber +'</div>'+
					'</td>' +
					'</tr>' +

					'<tr>' +
					'<td class="bdd-b bdl pl-35">退款金额</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" target="_blank" href="' + data.second_orderPic + '"><img class="pro_img " alt="./Content/images/noupload.png"   src="' + orderPic + '" width="62" height="62"></a>' +
					'<br>' +
					'<div>订单编号：'+ data.second_orderNumber +'</div>'+
					'</td>' +
					'</tr>' +

					'<div class="order-flow-title">收货好评</div>'+
					'<tr>' +
					'<td class="bdd-b bdl pl-35">评价及物流截图</td>' +
					'<td class="bdd-b bdr ">' +
					'<p style="margin-bottom: 10px;">' +
					'普通好评' +
					'<a class="hurryevaluate" href="javascript: void(0)" data-id="59908491"></a>' +
					'</p>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + data.third_commentPic + '"><img class="pro_img "  src="' + data.third_commentPic + '" width="62" height="62"></a>' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" href="' + data.third_treasurePic + '"><img class="pro_img "  src="' + data.third_treasurePic + '" width="62" height="62"></a>' +
					'</td>' +
					'</tr>' +
					'<tr>' +
					'<td class="bdb bdl pl-35"><p>确认无误发放佣金</p><p class="striking">(无操作2小时自动确认)</p></td>' +
					'<td class="bdb bdr ">返款金额：'+data.return_money+'</td>' +
					'</tr>';+

					'<div class="title">完成</div>'+
					'<tr>' +
					'<td class="bdd-b bdl pl-35">任务完成</td>' +
					'<td class="bdd-b bdr ">' +
					'<a class="fancybox-effects-d" data-fancybox-group="gallery" target="_blank" href="' + data.second_orderPic + '"><img class="pro_img " alt="./Content/images/noupload.png"   src="' + orderPic + '" width="62" height="62"></a>' +
					'<br>' +
					'<div>订单编号：'+ data.second_orderNumber +'</div>'+
					'</td>' +
					'</tr>' +
				$("#orderdetail-flow").append(html)


			} else {
				$("#orderdetail-flow").append(e.msg)
			}
		}
	})
}