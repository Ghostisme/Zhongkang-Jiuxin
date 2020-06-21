mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var usrName;
var telNumber;
var address;
var qq;
var gTel;
//console.log($("input"));
var id = sessionStorage.getItem('userId');
$('#userid').val(id);
$.ajax({
	type: "GET",
	//	url: "http://192.168.18.189:8080/gcafu_commerce/rest/buyer/buyerhome",
	url: config + 'buyer/buyerhome',
	contentType: "json; charset=utf-8",
	async: true,
	data: {
		"mobile": 1,
		"id": id
	},
	dataType: 'JSONP',
	jsonp: 'jsoncallback',
	success: function(data) {
		if(data.code == 1) {
			if(data.data.image == ''){
				$('#user_img').attr('src', "../../styles/img/my_img/userImg.jpg");
			}else{
				$('#user_img').attr('src', src + data.data.image);
			}
			$('#user_img').error(function(){
			    $(this).attr('src',"../../styles/img/my_img/userImg.jpg");
			});
			$('#filename').val(data.data.image);
//			console.log(data.data.cellphone);
			$('#user_name').val(data.data.username);
			$('#user_tel').val(data.data.cellphone);
			$('#user_addr').val(data.data.address);
			$('#user_qq').val(data.data.qq);
			$('#user_fixed_tel').val(data.data.tel);
			$('#user_fixed_email').val(data.data.email);
		}

	},
	error: function(data) {

	}
});
$("#person_change").attr("action", config + "buyer/editorbuyer");
var inputs = $("input");
$("#saveBtn").click(function() {
	
	$('#person_change').submit();
});
$("#changePwd").click(function() {
	window.location.href = "../changePwd/changePwd.html";
});