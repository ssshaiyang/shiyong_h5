  // var str = window.location.search;
  //    var phone = str.replace(/[^0-9]/ig,"");
  //    var valToken = localStorage.getItem(''+phone);
if(localStorage.getItem('token')){
	var valToken = localStorage.getItem('token');
	$.ajaxSetup({
   headers: { 'Accept': 'aplication/json','Authorization':''+ valToken }
	});
	$.ajax({
        url:"http://api.feizhugou.com/users",
        dataType:'json',
        async:true,
        type:'GET',
        success:function(data){
        	console.log(data);
            if(data.code != 1000){
            	localStorage.removeItem('token');
            	location.href ='../UserAccount/Login.html';
            }
        }
    })
}else{
  myAlert("请登录");
	location.href ='../UserAccount/Login.html';
}